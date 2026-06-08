/**
 * IMAP poller for the drafts@ inbox.
 *
 * Designed to be invoked from a cron-triggered API endpoint (every few
 * minutes). The flow per email:
 *
 *   1. Connect to Workspace IMAP (`imap.gmail.com:993`) with an app
 *      password.
 *   2. List `UNSEEN` messages in INBOX.
 *   3. For each, parse the MIME, check the sender against the
 *      allowlist, find the `.md` attachment (the filled-in
 *      copywriter template) and an optional image attachment.
 *   4. Parse the markdown into a `ParsedDraft`, insert a row in
 *      `PostDraft`, and mark the email Seen.
 *   5. If anything fails for a single message, log and continue —
 *      the message stays unseen and will be retried on the next run.
 *
 * Idempotency is provided by the unique constraint on
 * `PostDraft.messageId`. Duplicate processing of the same message
 * results in a no-op.
 */

import { ImapFlow } from 'imapflow';
import { simpleParser, type Attachment } from 'mailparser';
import { prisma } from './db';
import { parseDraftMarkdown } from './draft-parser';

interface PollerEnv {
  host: string;
  port: number;
  user: string;
  pass: string;
  allowlist: Set<string>;
  /** Maximum messages to process per invocation, to keep the cron
   *  endpoint responsive even if a backlog builds up. */
  batchLimit: number;
}

export interface PollResult {
  scanned: number;
  inserted: number;
  skipped: number;
  errors: Array<{ uid?: number; messageId?: string; reason: string }>;
}

export function loadPollerEnv(): PollerEnv | null {
  const host = process.env.IMAP_HOST ?? 'imap.gmail.com';
  const port = Number(process.env.IMAP_PORT ?? '993');
  const user = process.env.IMAP_USER ?? '';
  const pass = process.env.IMAP_APP_PASSWORD ?? '';
  const rawAllow = process.env.ALLOWLIST_SENDERS ?? '';
  const batchLimit = Math.max(1, Math.min(50, Number(process.env.IMAP_BATCH_LIMIT ?? '20')));

  if (!user || !pass) return null;

  const allowlist = new Set(
    rawAllow
      .split(/[,\s]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );

  return { host, port, user, pass, allowlist, batchLimit };
}

const MD_EXTENSIONS = new Set(['md', 'mdx', 'markdown', 'txt']);
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

function extOf(filename: string | undefined): string {
  if (!filename) return '';
  const dot = filename.lastIndexOf('.');
  return dot === -1 ? '' : filename.slice(dot + 1).toLowerCase();
}

function findMdAttachment(atts: Attachment[]): Attachment | null {
  // Prefer .md, then .mdx, then .markdown, then .txt.
  const ranked = atts
    .map((a) => ({ a, ext: extOf(a.filename) }))
    .filter((x) => MD_EXTENSIONS.has(x.ext))
    .sort((x, y) => {
      const order = ['md', 'mdx', 'markdown', 'txt'];
      return order.indexOf(x.ext) - order.indexOf(y.ext);
    });
  return ranked[0]?.a ?? null;
}

function findImageAttachment(atts: Attachment[]): Attachment | null {
  return (
    atts.find(
      (a) =>
        (a.contentType && IMAGE_TYPES.has(a.contentType.toLowerCase())) ||
        ['jpg', 'jpeg', 'png', 'webp'].includes(extOf(a.filename)),
    ) ?? null
  );
}

function senderAddress(from: { value?: Array<{ address?: string }> } | undefined): string | null {
  const addr = from?.value?.[0]?.address?.toLowerCase().trim();
  return addr || null;
}

function senderName(from: { value?: Array<{ name?: string }> } | undefined): string | null {
  return from?.value?.[0]?.name?.trim() || null;
}

export async function pollDraftsInbox(env: PollerEnv): Promise<PollResult> {
  const client = new ImapFlow({
    host: env.host,
    port: env.port,
    secure: env.port === 993,
    auth: { user: env.user, pass: env.pass },
    logger: false,
  });

  const result: PollResult = { scanned: 0, inserted: 0, skipped: 0, errors: [] };

  await client.connect();
  try {
    const lock = await client.getMailboxLock('INBOX');
    try {
      const uids = await client.search({ seen: false });
      const batch = uids.slice(0, env.batchLimit);

      for (const uid of batch) {
        result.scanned++;
        try {
          const msg = await client.fetchOne(String(uid), { source: true, envelope: true }, { uid: true });
          if (!msg || !msg.source) {
            result.errors.push({ uid, reason: 'No source returned' });
            continue;
          }

          const parsed = await simpleParser(msg.source as Buffer);
          const sender = senderAddress(parsed.from);
          const messageId = parsed.messageId ?? `synthetic:${uid}@inbox`;

          if (!sender) {
            result.errors.push({ uid, messageId, reason: 'No sender address' });
            // Mark seen — we don't want to retry malformed mail forever.
            await client.messageFlagsAdd({ uid }, ['\\Seen'], { uid: true });
            continue;
          }

          if (env.allowlist.size > 0 && !env.allowlist.has(sender)) {
            result.skipped++;
            await client.messageFlagsAdd({ uid }, ['\\Seen'], { uid: true });
            continue;
          }

          // Idempotency: skip if we've already processed this message-id.
          const existing = await prisma.postDraft.findUnique({
            where: { messageId },
            select: { id: true },
          });
          if (existing) {
            result.skipped++;
            await client.messageFlagsAdd({ uid }, ['\\Seen'], { uid: true });
            continue;
          }

          const attachments = parsed.attachments ?? [];
          const md = findMdAttachment(attachments);
          if (!md) {
            result.errors.push({ uid, messageId, reason: 'No .md attachment found' });
            // Leave Seen so it doesn't reappear forever — sender will
            // get a manual reply.
            await client.messageFlagsAdd({ uid }, ['\\Seen'], { uid: true });
            continue;
          }

          const mdText = md.content.toString('utf8');
          const draft = parseDraftMarkdown(mdText);

          const img = findImageAttachment(attachments.filter((a) => a !== md));
          const imageOk = img && img.content && img.content.length <= MAX_IMAGE_BYTES;

          await prisma.postDraft.create({
            data: {
              messageId,
              senderEmail: sender,
              senderName: senderName(parsed.from),
              emailSubject: parsed.subject ?? null,
              locale: draft.locale,
              slug: draft.slug,
              title: draft.title,
              description: draft.description,
              body: draft.body,
              tags: draft.tags,
              ctaHook: draft.ctaHook,
              publishedAt: draft.publishedAt,
              imageBrief: draft.imageBrief,
              imageFilename: imageOk ? img!.filename ?? 'cover' : null,
              imageMimeType: imageOk ? img!.contentType ?? null : null,
              imageBytes: imageOk ? (img!.content as Buffer) : null,
              parseNotes: draft.parseNotes.length ? draft.parseNotes.join('\n') : null,
              status: 'pending',
            },
          });

          await client.messageFlagsAdd({ uid }, ['\\Seen'], { uid: true });
          result.inserted++;
        } catch (err) {
          result.errors.push({
            uid,
            reason: err instanceof Error ? err.message : String(err),
          });
          // Leave message unseen so the next poll retries.
        }
      }
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }

  return result;
}

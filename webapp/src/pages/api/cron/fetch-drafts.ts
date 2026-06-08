import type { APIRoute } from 'astro';
import { loadPollerEnv, pollDraftsInbox } from '~/lib/imap-poll';

export const prerender = false;

/**
 * Cron-triggered endpoint that polls the drafts@ inbox for new
 * copywriter submissions and inserts each into the `PostDraft` table.
 *
 * Hit from the in-cluster `cron` container every five minutes (see
 * `deploy/docker-compose.prod.yml`). Protected by a shared secret
 * via `?secret=` or `X-Cron-Secret` header. Returns a small JSON
 * summary intended for log inspection, not browsers.
 */
export const GET: APIRoute = async ({ request, url }) => {
  const expected = process.env.CRON_SECRET ?? '';
  const provided = url.searchParams.get('secret') ?? request.headers.get('x-cron-secret') ?? '';

  if (!expected || provided !== expected) {
    return new Response('Forbidden', { status: 403 });
  }

  const env = loadPollerEnv();
  if (!env) {
    return new Response(
      JSON.stringify({ ok: false, reason: 'IMAP_USER or IMAP_APP_PASSWORD not configured.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const result = await pollDraftsInbox(env);
    return new Response(JSON.stringify({ ok: true, ...result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, reason: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

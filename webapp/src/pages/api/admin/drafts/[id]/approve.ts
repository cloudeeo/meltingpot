import type { APIRoute } from 'astro';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { prisma } from '~/lib/db';
import { renderDraftAsMdx, type ParsedDraft } from '~/lib/draft-parser';

export const prerender = false;

const EXPORT_ROOT = process.env.DRAFTS_EXPORT_DIR ?? '/data/drafts-export';

function safeSlug(input: string): string {
  const cleaned = (input || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
  return cleaned || 'draft';
}

function parseTags(raw: string): string[] {
  return raw
    .split(/[,;\n]+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 8);
}

function imageExtension(mime: string | null): string {
  if (!mime) return 'jpg';
  if (mime.includes('webp')) return 'webp';
  if (mime.includes('png')) return 'png';
  if (mime.includes('jpeg') || mime.includes('jpg')) return 'jpg';
  return 'bin';
}

function redirect(to: string, params: Record<string, string>): Response {
  const u = new URL(to, 'http://x');
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const target = `${u.pathname}${u.search}`;
  return new Response(null, { status: 303, headers: { Location: target } });
}

export const POST: APIRoute = async ({ params, request }) => {
  const id = params.id;
  if (!id) return new Response('Missing draft id', { status: 400 });

  const draft = await prisma.postDraft.findUnique({ where: { id } });
  if (!draft) return new Response('Draft not found', { status: 404 });

  const form = await request.formData();
  const localeRaw = (form.get('locale') ?? draft.locale)?.toString();
  const locale: 'en' | 'fr' = localeRaw === 'fr' ? 'fr' : 'en';

  const slug = safeSlug(form.get('slug')?.toString() || draft.slug);
  const title = form.get('title')?.toString().trim() || draft.title;
  const description = form.get('description')?.toString().trim() || draft.description;
  const body = form.get('body')?.toString().trim() || draft.body;
  const tags = parseTags(form.get('tags')?.toString() ?? draft.tags.join(','));
  const ctaHook = form.get('ctaHook')?.toString().trim() || null;
  const reviewerNote = form.get('reviewerNote')?.toString().trim() || null;
  const publishedAtRaw = form.get('publishedAt')?.toString() ?? '';
  const publishedAt = publishedAtRaw
    ? new Date(`${publishedAtRaw}T00:00:00Z`)
    : new Date();

  // Compose the MDX file content and write it to the export volume.
  const exportDir = path.join(EXPORT_ROOT, locale);
  await fs.mkdir(exportDir, { recursive: true });

  let coverFilename: string | undefined;
  if (draft.imageBytes) {
    const ext = imageExtension(draft.imageMimeType ?? null);
    coverFilename = `${slug}.${ext}`;
    await fs.writeFile(path.join(exportDir, coverFilename), draft.imageBytes);
  }

  const parsed: ParsedDraft = {
    locale,
    slug,
    title,
    description,
    body,
    tags,
    ctaHook,
    publishedAt,
    imageBrief: draft.imageBrief,
    parseNotes: [],
  };

  const mdx = renderDraftAsMdx(parsed, { coverFilename });
  const mdxFilename = `${slug}.mdx`;
  const mdxPath = path.join(exportDir, mdxFilename);
  await fs.writeFile(mdxPath, mdx, 'utf8');

  // Update DB record with edited values + mark approved.
  await prisma.postDraft.update({
    where: { id },
    data: {
      locale,
      slug,
      title,
      description,
      body,
      tags,
      ctaHook,
      publishedAt,
      reviewerNote,
      status: 'approved',
      reviewedAt: new Date(),
      exportedPath: mdxPath,
    },
  });

  return redirect(`/admin/drafts/${id}`, {
    ok: `Approved and exported to ${mdxPath}.`,
  });
};

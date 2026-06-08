import type { APIRoute } from 'astro';
import { prisma } from '~/lib/db';

export const prerender = false;

/**
 * Stream the image bytes attached to a draft email. Used by the
 * admin draft-detail page to render an inline preview. The route is
 * protected externally by HTTP Basic Auth on /admin/* (see the
 * nginx config).
 */
export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id) return new Response('Missing draft id', { status: 400 });

  const draft = await prisma.postDraft.findUnique({
    where: { id },
    select: { imageBytes: true, imageMimeType: true },
  });

  if (!draft || !draft.imageBytes) {
    return new Response('No image', { status: 404 });
  }

  return new Response(new Uint8Array(draft.imageBytes), {
    status: 200,
    headers: {
      'Content-Type': draft.imageMimeType || 'application/octet-stream',
      'Cache-Control': 'private, max-age=60',
    },
  });
};

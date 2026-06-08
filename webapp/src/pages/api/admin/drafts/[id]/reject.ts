import type { APIRoute } from 'astro';
import { prisma } from '~/lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
  const id = params.id;
  if (!id) return new Response('Missing draft id', { status: 400 });

  const form = await request.formData();
  const reviewerNote = form.get('reviewerNote')?.toString().trim() || null;

  await prisma.postDraft.update({
    where: { id },
    data: { status: 'rejected', reviewerNote, reviewedAt: new Date() },
  });

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin/drafts/${id}?ok=Rejected.` },
  });
};

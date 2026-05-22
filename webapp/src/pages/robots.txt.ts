import type { APIRoute } from 'astro';
import { SITE } from '~/lib/site';
import { SOFT_LAUNCH, HIDDEN_ROUTES } from '~/lib/launch';

export const prerender = true;

export const GET: APIRoute = () => {
  const hidden = SOFT_LAUNCH
    ? HIDDEN_ROUTES.map((r) => `Disallow: ${r}`).join('\n') + '\n'
    : '';
  const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
${hidden}
Sitemap: ${SITE.url}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

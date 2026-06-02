import type { APIRoute } from 'astro';
import { SITE } from '~/lib/site';
import { SOFT_LAUNCH, HIDDEN_ROUTES } from '~/lib/launch';
import { localizePath, locales } from '~/i18n';

export const prerender = true;

export const GET: APIRoute = () => {
  // Disallow each hidden route in every locale (e.g. /services and
  // /fr/services) while the soft launch is on.
  const hidden = SOFT_LAUNCH
    ? HIDDEN_ROUTES.flatMap((route) =>
        locales.map((locale) => `Disallow: ${localizePath(route, locale)}`),
      ).join('\n') + '\n'
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

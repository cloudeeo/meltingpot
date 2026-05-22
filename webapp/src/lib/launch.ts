/**
 * Temporary "coming soon" toggle.
 *
 * While `SOFT_LAUNCH` is true, only the landing page (/) is publicly
 * accessible. All other routes redirect to / and are removed from the
 * navigation, sitemap, and contact CTAs.
 *
 * To restore the full site: flip SOFT_LAUNCH to false and re-deploy.
 */
export const SOFT_LAUNCH = true;

/**
 * Routes that are hidden while SOFT_LAUNCH is true.
 * Keep in sync with the sitemap filter in `astro.config.mjs` (duplicated
 * there because the Astro config is a .mjs file that can't import .ts).
 */
export const HIDDEN_ROUTES: readonly string[] = [
  '/services',
  '/portfolio',
  '/digital-media',
  '/news',
  '/about',
  '/contact',
];

export function isHidden(path: string): boolean {
  if (!SOFT_LAUNCH) return false;
  const p = path.replace(/\/$/, '') || '/';
  return HIDDEN_ROUTES.some((h) => p === h || p.startsWith(`${h}/`));
}

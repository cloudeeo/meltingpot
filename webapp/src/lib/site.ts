/**
 * Brand invariants that do not change between locales. Locale-specific
 * copy (tagline, description, navigation, CTAs) lives in the i18n
 * dictionaries under `src/i18n/` — use `getDictionary` / `getNav` there.
 */
export const SITE = {
  name: 'Executive Founders',
  url: (import.meta.env.PUBLIC_SITE_URL ?? 'https://executivefounders.com').replace(/\/$/, ''),
  platformUrl: 'https://platform.executivefounders.com',
  /**
   * Google Analytics 4 measurement ID. Loaded only after the visitor
   * grants consent via the cookie banner — see `GoogleAnalytics.astro`
   * and `CookieBanner.astro`. Leave empty to disable analytics entirely
   * (the component renders nothing).
   */
  gaMeasurementId: 'G-511V0CTYES',
  social: {
    linkedin: 'https://www.linkedin.com/company/executive-founders',
    youtube: '',
    twitter: '',
  },
} as const;

/**
 * Brand invariants that do not change between locales. Locale-specific
 * copy (tagline, description, navigation, CTAs) lives in the i18n
 * dictionaries under `src/i18n/` — use `getDictionary` / `getNav` there.
 */
export const SITE = {
  name: 'Executive Founders',
  url: (import.meta.env.PUBLIC_SITE_URL ?? 'https://executivefounders.com').replace(/\/$/, ''),
  social: {
    linkedin: 'https://www.linkedin.com/company/executive-founders',
    youtube: '',
    twitter: '',
  },
} as const;

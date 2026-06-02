/**
 * i18n configuration. Keep in sync with the `i18n` block in
 * `astro.config.mjs` (the Astro config is a .mjs file and cannot import
 * this TypeScript module).
 *
 * URL strategy: the default locale (en) is served without a prefix
 * (`/`, `/contact`), every other locale lives under its code
 * (`/fr/`, `/fr/contact`). This keeps existing English URLs stable.
 */
export const locales = ['en', 'fr'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Human-readable label for each locale, shown in the language switcher. */
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

/** Short code shown in the compact language switcher. */
export const localeShortLabels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
};

/** BCP-47 tags used for `<html lang>`, date formatting and `hreflang`. */
export const localeHtmlLang: Record<Locale, string> = {
  en: 'en',
  fr: 'fr',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

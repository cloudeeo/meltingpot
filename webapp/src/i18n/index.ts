import en, { type Dictionary } from './en';
import fr from './fr';
import { defaultLocale, locales, type Locale } from './config';
import { getLocaleFromUrl, localizePath } from './utils';
import { isHidden } from '~/lib/launch';

export {
  locales,
  defaultLocale,
  localeLabels,
  localeShortLabels,
  localeHtmlLang,
  localeOg,
  isLocale,
  type Locale,
} from './config';

export {
  getLocaleFromPath,
  getLocaleFromUrl,
  stripLocale,
  localizePath,
  getAlternates,
} from './utils';

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, fr };

/** Return the dictionary for a locale (falls back to the default). */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/**
 * Convenience for components: resolve the active locale from the request
 * URL and return both it and its dictionary.
 */
export function useI18n(url: URL): { locale: Locale; t: Dictionary } {
  const locale = getLocaleFromUrl(url);
  return { locale, t: getDictionary(locale) };
}

export interface LocalizedNavItem {
  key: string;
  label: string;
  href: string;
}

/**
 * Primary navigation for a locale, with hrefs already localized and the
 * soft-launch hidden routes filtered out (matching the previous
 * behaviour in `src/lib/site.ts`).
 */
export function getNav(locale: Locale): LocalizedNavItem[] {
  const t = getDictionary(locale);
  return t.nav.items
    .filter((item) => !isHidden(item.path))
    .map((item) => ({ key: item.key, label: item.label, href: localizePath(item.path, locale) }));
}

export function getCta(locale: Locale): { label: string; href: string } {
  const t = getDictionary(locale);
  return { label: t.nav.cta.label, href: localizePath(t.nav.cta.path, locale) };
}

const dateLocales: Record<Locale, string> = { en: 'en-GB', fr: 'fr-FR' };

/** Locale-aware long date, e.g. `31 May 2026` / `31 mai 2026`. */
export function formatDate(value: Date | string, locale: Locale): string {
  const d = typeof value === 'string' ? new Date(value) : value;
  return d.toLocaleDateString(dateLocales[locale] ?? dateLocales[defaultLocale], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

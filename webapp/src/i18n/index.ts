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
  /** True when the entry points to an off-site URL (renders target=_blank). */
  external?: boolean;
  children?: LocalizedNavItem[];
}

interface RawNavChild {
  key: string;
  label: string;
  path: string;
  /** Mark as external to skip locale-prefixing and pass the URL through verbatim. */
  external?: boolean;
}

interface RawNavItem extends RawNavChild {
  children?: readonly RawNavChild[];
}

/**
 * Primary navigation for a locale, with hrefs already localized and the
 * soft-launch hidden routes filtered out. Items may carry a `children`
 * array (for dropdown / submenu support); hidden children are filtered
 * out the same way as top-level items. Items with `external: true` keep
 * their absolute URL intact and are excluded from the hidden-routes check.
 */
export function getNav(locale: Locale): LocalizedNavItem[] {
  const t = getDictionary(locale);
  const items = t.nav.items as readonly RawNavItem[];
  return items
    .filter((item) => item.external || !isHidden(item.path))
    .map((item) => {
      const children = item.children
        ?.filter((c) => c.external || !isHidden(c.path))
        .map((c) => ({
          key: c.key,
          label: c.label,
          href: c.external ? c.path : localizePath(c.path, locale),
          ...(c.external ? { external: true } : {}),
        }));
      return {
        key: item.key,
        label: item.label,
        href: item.external ? item.path : localizePath(item.path, locale),
        ...(item.external ? { external: true } : {}),
        ...(children && children.length ? { children } : {}),
      };
    });
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

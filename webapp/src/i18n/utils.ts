import { defaultLocale, isLocale, locales, type Locale } from './config';

/**
 * Determine the active locale from a URL pathname. The default locale
 * has no prefix, so anything that does not start with a known locale
 * segment is treated as the default.
 */
export function getLocaleFromPath(pathname: string): Locale {
  const first = pathname.replace(/^\/+/, '').split('/')[0] ?? '';
  return isLocale(first) ? first : defaultLocale;
}

export function getLocaleFromUrl(url: URL): Locale {
  return getLocaleFromPath(url.pathname);
}

/**
 * Strip any leading locale segment from a pathname, returning a
 * locale-agnostic path that always starts with `/` (e.g. `/fr/contact`
 * and `/contact` both become `/contact`; `/fr` and `/` become `/`).
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.replace(/^\/+/, '').split('/');
  if (segments[0] && isLocale(segments[0])) segments.shift();
  const rest = segments.join('/').replace(/\/+$/, '');
  return `/${rest}`.replace(/\/{2,}/g, '/');
}

/**
 * Build the URL path for a locale-agnostic route in a given locale.
 * The default locale is unprefixed; other locales get a `/<locale>`
 * prefix. Trailing slashes are normalised away (except for the root).
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = stripLocale(path);
  const base = clean === '/' ? '' : clean;
  if (locale === defaultLocale) return base === '' ? '/' : base;
  return `/${locale}${base}`;
}

/** The equivalent path in every locale, for `hreflang` alternates. */
export function getAlternates(pathname: string): { locale: Locale; path: string }[] {
  const bare = stripLocale(pathname);
  return locales.map((locale) => ({ locale, path: localizePath(bare, locale) }));
}

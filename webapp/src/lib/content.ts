import type { CollectionEntry } from 'astro:content';
import { defaultLocale, isLocale, type Locale } from '~/i18n';

type AnyEntry = { id: string };

/**
 * Content collections are bilingual by folder convention: the English
 * entry lives at `<collection>/en/foo.mdx` and its French translation at
 * `<collection>/fr/foo.mdx`. Both share the slug `foo`, so the language
 * switcher maps cleanly between locales.
 *
 * `entry.id` from the glob loader is the path without extension, e.g.
 * `en/foo` or `fr/foo`. (A leading locale folder is required; legacy
 * un-prefixed ids fall back to the default locale.)
 */
export function splitContentId(id: string): { locale: Locale; slug: string } {
  const [first, ...rest] = id.split('/');
  if (rest.length > 0 && isLocale(first)) {
    return { locale: first, slug: rest.join('/') };
  }
  return { locale: defaultLocale, slug: id };
}

export function contentLocale(id: string): Locale {
  return splitContentId(id).locale;
}

export function contentSlug(id: string): string {
  return splitContentId(id).slug;
}

/** Keep only the entries belonging to a given locale. */
export function filterByLocale<T extends AnyEntry>(entries: T[], locale: Locale): T[] {
  return entries.filter((entry) => contentLocale(entry.id) === locale);
}

export function postHref(entry: CollectionEntry<'posts'>, locale: Locale): string {
  const base = `/news/${contentSlug(entry.id)}`;
  return locale === defaultLocale ? base : `/${locale}${base}`;
}

export function caseStudyHref(entry: CollectionEntry<'caseStudies'>, locale: Locale): string {
  const base = `/portfolio/${contentSlug(entry.id)}`;
  return locale === defaultLocale ? base : `/${locale}${base}`;
}

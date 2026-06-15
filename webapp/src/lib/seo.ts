import { SITE } from './site';
import {
  defaultLocale,
  getDictionary,
  localeHtmlLang,
  type Locale,
} from '~/i18n';

export interface SeoInput {
  title?: string;
  description?: string;
  /** Locale-prefixed path, e.g. `/contact` or `/fr/contact`. */
  path: string;
  /** Active locale; defaults to English copy when omitted. */
  locale?: Locale;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
}

export interface Seo {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: 'website' | 'article';
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
}

export function buildSeo(input: SeoInput): Seo {
  const t = getDictionary(input.locale ?? defaultLocale);
  // Sub-pages: `<page> — Executive Founders`. Homepage: use the shorter
  // `meta.seoTitleSuffix` so the rendered title stays under Google's
  // ~580 px truncation threshold (~55–60 characters).
  const title = input.title ? `${input.title} — ${SITE.name}` : `${SITE.name} | ${t.meta.seoTitleSuffix}`;
  const description = input.description ?? t.meta.description;
  const canonical = `${SITE.url}${input.path}`;
  const image = input.image ?? `${SITE.url}/og-default.png`;
  return {
    title,
    description,
    canonical,
    image,
    type: input.type ?? 'website',
    publishedAt: input.publishedAt,
    modifiedAt: input.modifiedAt,
    author: input.author,
  };
}

const inLanguageOf = (locale: Locale | undefined): string =>
  localeHtmlLang[locale ?? defaultLocale];

export function organizationLd(locale?: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo-ef.svg`,
    inLanguage: inLanguageOf(locale),
    sameAs: [SITE.social.linkedin, SITE.social.youtube, SITE.social.twitter].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'business inquiries',
      url: `${SITE.url}/contact`,
    },
  };
}

export function websiteLd(locale?: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: inLanguageOf(locale),
  };
}

export function articleLd(args: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: string;
  locale?: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.title,
    description: args.description,
    image: args.image,
    datePublished: args.publishedAt,
    dateModified: args.modifiedAt ?? args.publishedAt,
    author: { '@type': 'Person', name: args.author ?? SITE.name },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo-ef.svg` },
    },
    mainEntityOfPage: args.url,
    inLanguage: inLanguageOf(args.locale),
  };
}

export function videoLd(args: {
  title: string;
  description: string;
  thumbnailUrl?: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  locale?: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: args.title,
    description: args.description,
    thumbnailUrl: args.thumbnailUrl,
    uploadDate: args.uploadDate,
    contentUrl: args.contentUrl,
    embedUrl: args.embedUrl,
    inLanguage: inLanguageOf(args.locale),
  };
}

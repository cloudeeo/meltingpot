import { SITE } from './site';

export interface SeoInput {
  title?: string;
  description?: string;
  path: string;
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
  const title = input.title ? `${input.title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const description = input.description ?? SITE.description;
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

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo-ef.svg`,
    sameAs: [SITE.social.linkedin, SITE.social.youtube, SITE.social.twitter].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'business inquiries',
      email: SITE.email,
    },
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/news?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
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
  };
}

export function videoLd(args: {
  title: string;
  description: string;
  thumbnailUrl?: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
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
  };
}

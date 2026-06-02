import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { SITE } from '~/lib/site';
import { isHidden } from '~/lib/launch';
import { filterByLocale, postHref } from '~/lib/content';
import { getDictionary, type Locale } from '~/i18n';

const rssLang: Record<Locale, string> = { en: 'en-gb', fr: 'fr-fr' };

/** Build the RSS feed for a single locale. */
export async function buildRss(context: APIContext, locale: Locale): Promise<Response> {
  const t = getDictionary(locale);
  const all: CollectionEntry<'posts'>[] = await getCollection('posts');
  const posts = isHidden('/news')
    ? []
    : filterByLocale(all, locale)
        .filter((post) => !post.data.draft)
        .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: `${SITE.name} — ${t.news.rssTitle}`,
    description: t.meta.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: postHref(post, locale),
    })),
    customData: `<language>${rssLang[locale]}</language>`,
  });
}

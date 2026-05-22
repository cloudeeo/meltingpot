import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '~/lib/site';
import { SOFT_LAUNCH } from '~/lib/launch';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = SOFT_LAUNCH
    ? []
    : (await getCollection('posts', ({ data }) => !data.draft))
        .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: `${SITE.name} — News & insights`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/news/${post.id.replace(/\.(md|mdx)$/, '')}`,
    })),
    customData: '<language>en-gb</language>',
  });
}

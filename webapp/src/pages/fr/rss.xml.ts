import type { APIContext } from 'astro';
import { buildRss } from '~/lib/rss';

export const prerender = true;

export async function GET(context: APIContext) {
  return buildRss(context, 'fr');
}

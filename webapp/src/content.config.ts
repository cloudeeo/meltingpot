import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      author: z.string().default('Executive Founders'),
      cover: image().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      // Auto-rendered CTA box at the end of every news post.
      // Authors set `hook` (the conditional self-recognition sentence)
      // and optionally override the button label.
      cta: z
        .object({
          hook: z.string(),
          label: z.string().default('Tell us about your situation'),
        })
        .optional(),
    }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      client: z.string().optional(),
      year: z.union([z.string(), z.number()]).optional(),
      sector: z.string().optional(),
      cover: image().optional(),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/videos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedAt: z.coerce.date(),
      url: z.string().url(),
      duration: z.string().optional(),
      thumbnail: image().optional(),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    lede: z.string(),
    effectiveDate: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    /** Short tagline shown under the title and on the listing card. */
    lede: z.string(),
    /** Position in the listing (lower = earlier). */
    order: z.number().default(0),
    /** Hide from build without deleting the file. */
    draft: z.boolean().default(false),
    /** Render the "coming soon" placeholder note. Default true; set
     *  false on services with full editorial body content. */
    placeholder: z.boolean().default(true),
  }),
});

export const collections = { posts, caseStudies, videos, legal, services };

import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

const SITE = process.env.PUBLIC_SITE_URL ?? 'https://executivefounders.com';

// Keep in sync with src/lib/launch.ts — duplicated because this Astro
// config is a .mjs file that cannot import the TypeScript module.
const SOFT_LAUNCH = true;
const HIDDEN_ROUTES = [
  '/services',
  '/portfolio',
  '/digital-media',
  '/news',
  '/about',
  '/contact',
];

export default defineConfig({
  site: SITE,
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        if (page.includes('/api/') || page.includes('/admin/')) return false;
        if (SOFT_LAUNCH) {
          const path = new URL(page).pathname.replace(/\/$/, '') || '/';
          if (HIDDEN_ROUTES.some((h) => path === h || path.startsWith(`${h}/`))) {
            return false;
          }
        }
        return true;
      },
    }),
  ],
  vite: {
    plugins: [tailwind()],
    ssr: {
      // Keep Prisma generated client out of Vite bundling.
      external: ['@prisma/client', '@prisma/adapter-pg', 'pg', '.prisma/client'],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});

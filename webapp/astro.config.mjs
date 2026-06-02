import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

const SITE = process.env.PUBLIC_SITE_URL ?? 'https://executivefounders.com';

// Keep in sync with src/i18n/config.ts — duplicated because this Astro
// config is a .mjs file that cannot import the TypeScript module.
const DEFAULT_LOCALE = 'en';
const LOCALES = ['en', 'fr'];

// Keep in sync with src/lib/launch.ts — duplicated because this Astro
// config is a .mjs file that cannot import the TypeScript module.
const SOFT_LAUNCH = true;
const HIDDEN_ROUTES = [
  '/services',
  '/portfolio',
  '/digital-media',
  '/about',
];

// Strip a leading locale segment (e.g. `/fr/services` -> `/services`) so
// the soft-launch filter matches regardless of language.
const stripLocale = (path) => {
  const segments = path.replace(/^\/+/, '').split('/');
  if (LOCALES.includes(segments[0])) segments.shift();
  return `/${segments.join('/')}`.replace(/\/+$/, '') || '/';
};

export default defineConfig({
  site: SITE,
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES,
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  // Passthrough image service. Sharp + pnpm 9 strict-mode native-binary
  // approval keeps failing in Docker; we serve images at their original
  // size/format instead of optimising them. The <Image /> component still
  // emits proper width/height/alt/loading attributes — only AVIF/WebP
  // conversion and responsive srcset generation are skipped. To re-enable
  // optimisation later, drop this `image` block and ensure `sharp` is
  // resolvable inside the build container.
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: { en: 'en', fr: 'fr' },
      },
      filter: (page) => {
        if (page.includes('/api/') || page.includes('/admin/')) return false;
        if (SOFT_LAUNCH) {
          const path = stripLocale(new URL(page).pathname.replace(/\/$/, '') || '/');
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
      external: ['@prisma/client', '@prisma/adapter-pg', 'pg', '.prisma/client', 'nodemailer'],
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

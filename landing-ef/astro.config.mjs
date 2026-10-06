import { defineConfig } from 'astro/config';

// Static-only build. The full site (with SSR, contact form, news, etc.)
// lives in ../webapp and ships separately. This project produces a
// single index.html + assets to be served by nginx as plain files.
export default defineConfig({
  site: 'https://executivefounders.com',
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
});

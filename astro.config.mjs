// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// Same architecture as sdx-website / jenomics-website / BLL_website:
// static pages + Node adapter (Hostinger entry server/entry.mjs), CSS inlined, self-hosted fonts, no CMS.
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.di5-tech.cz',
  trailingSlash: 'always',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  build: { inlineStylesheets: 'always', format: 'directory' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [sitemap()],
});

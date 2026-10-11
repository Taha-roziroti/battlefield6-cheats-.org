import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { SITE_URL } from './src/config/site.ts';
import { CHECKOUT_URLS } from './src/config/checkout-redirects.mjs';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/',
    '/cheats/lite/': '/',
    '/cheats/pro/': '/',
    '/cheats/elite/': '/',
    '/cheats/compare/': '/fragpunk-cheats-review/',
    '/contact/': '/support/',
    '/blog/': '/fragpunk-cheats-review/',
    '/forum/': '/',
    '/products/dota-2-cheats/': '/',
    '/products/dota-2-cheats/elite/': '/',
    '/products/dota-2-cheats/utilities/': '/fragpunk-cloud-dma/',
    '/go/fragpunk/': CHECKOUT_URLS.fragpunk,
    '/go/cloud-dma/': CHECKOUT_URLS.cloudDma,
    '/go/hwid-spoofer/': CHECKOUT_URLS.hwidSpoofer,
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/go/') &&
        !page.includes('/blog/') &&
        !page.includes('/forum/') &&
        !page.includes('/products/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});

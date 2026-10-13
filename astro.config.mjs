import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { SITE_URL } from './src/config/site.ts';
import {
  CHECKOUT_URLS,
  resolveCheckoutPathRedirect,
} from './src/config/checkout-redirects.mjs';

/** Dev/preview: real 302 for /go/* — production static host uses write-checkout-redirects.mjs + click intercept. */
function checkoutRedirectDevMiddleware() {
  return {
    name: 'checkout-go-redirect',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? '/').split('?')[0]?.split('#')[0] ?? '/';
        const destination = resolveCheckoutPathRedirect(pathname);
        if (!destination) {
          next();
          return;
        }
        res.statusCode = 302;
        res.setHeader('Location', destination);
        res.end();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? '/').split('?')[0]?.split('#')[0] ?? '/';
        const destination = resolveCheckoutPathRedirect(pathname);
        if (!destination) {
          next();
          return;
        }
        res.statusCode = 302;
        res.setHeader('Location', destination);
        res.end();
      });
    },
  };
}

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/',
    '/cheats/lite/': '/',
    '/cheats/pro/': '/',
    '/cheats/elite/': '/',
    '/cheats/compare/': '/',
    '/contact/': '/support/',
    '/blog/': '/',
    '/forum/': '/',
    '/products/dota-2-cheats/': '/',
    '/products/dota-2-cheats/elite/': '/',
    '/products/dota-2-cheats/utilities/': '/cloud-dma/',
    '/fragpunk-aimbot/': '/battlefield-6-aimbot/',
    '/fragpunk-esp/': '/battlefield-6-esp/',
    '/fragpunk-cloud-dma/': '/cloud-dma/',
    '/fragpunk-hwid-spoofer/': '/battlefield-6-hwid-spoofer/',
    '/fragpunk-cheats-pricing/': '/',
    '/fragpunk-cheats-review/': '/',
    '/go/main/': CHECKOUT_URLS.main,
    '/go/fragpunk/': CHECKOUT_URLS.main,
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
    plugins: [tailwindcss(), checkoutRedirectDevMiddleware()],
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

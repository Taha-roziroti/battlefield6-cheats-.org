# fragpunk-cheat.org

Static Astro site for FragPunk cheat guides, pricing notes, and checkout links to the seller.

## Requirements

- Node.js **22.12+**
- npm

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321/](http://localhost:4321/).

## Production build

```bash
npm run build
```

Output is written to **`dist/`** (plain HTML, assets, sitemap). Upload **`dist`** to any static host (Cloudflare Pages, Netlify, Vercel static, S3 + CDN, etc.).

### Checks before deploy

```bash
npm run check
npm run seo:audit
```

### Optional env (hosting dashboard)

- `PUBLIC_GA_MEASUREMENT_ID` — Google Analytics
- `PUBLIC_TWITTER_SITE` / `PUBLIC_TWITTER_CREATOR` — Twitter card metadata
- `PUBLIC_ORG_SAME_AS` — comma-separated social profile URLs for schema
- `INDEXNOW_KEY` — IndexNow ping on build (optional)

## Images

- Gameplay shots live under `public/images/fragpunk/`.
- Run `npm run optimize:images` to regenerate WebP sizes and OG crops.
- Run `npm run generate:icons` after changing `public/brand/fragpunk-logo-source.jpg`.

## Checkout redirects

Affiliate URLs are configured in `src/config/checkout-redirects.mjs`. Internal paths `/go/fragpunk/`, `/go/cloud-dma/`, and `/go/hwid-spoofer/` 301 to those URLs at build time and in dev middleware.

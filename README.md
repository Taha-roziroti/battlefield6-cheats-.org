# fragpunk-cheat.org

Static Astro site for Battlefield 6 cheat guides, pricing, and secure checkout.

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

Output is written to **`dist/`** (plain HTML, assets, sitemap).

### Auto deploy (GitHub Pages)

Pushes to **`main`** run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): `npm ci`, `npm run build`, then publish **`dist/`** to GitHub Pages.

**One-time setup** (repo owner, on GitHub):

1. **Settings → Pages → Build and deployment** → Source: **GitHub Actions**.
2. **Settings → Pages → Custom domain** → `battlefield6-cheats.org` (matches `public/CNAME`).
3. DNS at your registrar: **A** records to GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) or **CNAME** `www` → `<user>.github.io` if using the default Pages hostname first.

After that, every **`git push origin main`** updates the live site within a few minutes. You can also run **Actions → Deploy site → Run workflow** manually.

### Manual / other hosts

Upload **`dist`** to Cloudflare Pages, Netlify, Vercel static, S3 + CDN, etc.

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
- Run `npm run optimize:images` to upscale masters (1536px content / 1920px hero), regenerate WebP variants (480–1920w), and OG crops.
- Run `npm run generate:icons` after changing `public/brand/fragpunk-logo-source.jpg`.

## Checkout redirects

Affiliate URLs are configured in `src/config/checkout-redirects.mjs`. Internal paths `/go/fragpunk/`, `/go/cloud-dma/`, and `/go/hwid-spoofer/` 301 to those URLs at build time and in dev middleware.

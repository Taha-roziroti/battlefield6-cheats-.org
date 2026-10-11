/**
 * Replace Astro's visible /go/* redirect stubs with instant, empty-body redirects (GitHub Pages has no HTTP 302).
 */
import fs from 'node:fs';
import path from 'node:path';
import { CHECKOUT_PATH_REDIRECTS } from '../src/config/checkout-redirects.mjs';

const distDir = path.resolve('dist');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');
}

function escapeJsString(value) {
  return value.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
}

function writeInstantRedirect(pathname, targetUrl) {
  if (!pathname.endsWith('/')) return;

  const relativeDir = pathname.replace(/^\//, '').replace(/\/$/, '');
  const outDir = path.join(distDir, relativeDir);
  fs.mkdirSync(outDir, { recursive: true });

  const safeUrl = escapeHtml(targetUrl);
  const jsUrl = escapeJsString(targetUrl);

  const html = `<!DOCTYPE html><html lang="en-US"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><script>location.replace("${jsUrl}");</script><meta http-equiv="refresh" content="0;url=${safeUrl}"><link rel="canonical" href="${safeUrl}"></head><body></body></html>`;

  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
}

if (!fs.existsSync(distDir)) {
  console.error('write-checkout-redirects: dist/ missing — run astro build first.');
  process.exit(1);
}

const written = new Set();
for (const [pathname, targetUrl] of CHECKOUT_PATH_REDIRECTS) {
  if (written.has(pathname)) continue;
  writeInstantRedirect(pathname, targetUrl);
  written.add(pathname);
}

console.log(`Checkout redirect stubs updated: ${written.size} path(s).`);

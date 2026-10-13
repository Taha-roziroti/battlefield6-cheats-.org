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

  const html = `<!DOCTYPE html><html lang="en-US" class="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Secure checkout</title><style>html,body{margin:0;min-height:100%;background:#0a0d10;color:#c4cad4;font-family:system-ui,-apple-system,Segoe UI,sans-serif}body{display:flex;align-items:center;justify-content:center;padding:1.5rem;text-align:center}.msg{font-size:.9375rem;opacity:.92;animation:checkoutPulse 1.1s ease-in-out infinite}@keyframes checkoutPulse{50%{opacity:.5}}</style><script>setTimeout(function(){location.replace("${jsUrl}");},180);</script><meta http-equiv="refresh" content="1;url=${safeUrl}"></head><body><p class="msg">Opening secure checkout…</p></body></html>`;

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

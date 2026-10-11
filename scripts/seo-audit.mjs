/**
 * Post-build SEO snapshot (SEO SUPER BOOSTER §13.2). Run: npm run build && npm run seo:audit
 */
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

function walkHtml(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function extract(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : '';
}

const files = walkHtml(distDir).sort();
if (files.length === 0) {
  console.error('No HTML in dist/. Run npm run build first.');
  process.exit(1);
}

const rows = [];
let errors = 0;
let warnings = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  const urlPath = rel === 'index.html' ? '/' : `/${rel.replace(/index\.html$/, '')}`;

  const title = extract(html, /<title[^>]*>([^<]*)<\/title>/i);
  const description = extract(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const canonical = extract(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const robots = extract(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
  const mainHtml = extract(html, /<main[^>]*id=["']main-content["'][^>]*>([\s\S]*?)<\/main>/i) || html;
  const h1Count = (mainHtml.match(/<h1[\s>]/gi) ?? []).length;
  const lang = extract(html, /<html[^>]+lang=["']([^"']*)["']/i);
  const isRedirectStub =
    html.includes('http-equiv="refresh"') && html.includes('name="robots" content="noindex"');
  const goLinks = [...html.matchAll(/href=["']([^"']*\/go\/[^"']*)["']/gi)].map((m) => m[1]);
  const goMissingRel = goLinks.filter((href) => {
    const idx = html.indexOf(`href="${href}"`);
    if (idx < 0) return false;
    const chunk = html.slice(Math.max(0, idx - 120), idx + 120);
    return !chunk.includes('sponsored');
  });

  if (isRedirectStub) continue;

  if (!title) errors++;
  if (!description) errors++;
  if (!canonical) errors++;
  if (h1Count !== 1) warnings++;
  if (lang !== 'en-US') errors++;
  if (goMissingRel.length > 0) errors++;

  rows.push({
    path: urlPath,
    title: title.slice(0, 72),
    h1: h1Count,
    lang,
    goLinks: goLinks.length,
    relOk: goMissingRel.length === 0,
  });
}

console.log(
  `SEO audit: ${rows.length} indexable HTML files, ${errors} error(s), ${warnings} heading warning(s)\n`,
);
for (const row of rows) {
  const flags = [
    row.h1 !== 1 ? `h1=${row.h1}` : null,
    row.lang !== 'en-US' ? `lang=${row.lang}` : null,
    row.goLinks && !row.relOk ? 'go-missing-rel' : null,
  ]
    .filter(Boolean)
    .join(', ');
  console.log(`${row.path}${flags ? `  [${flags}]` : ''}`);
}

const robotsPath = path.join(distDir, 'robots.txt');
const sitemapPath = path.join(distDir, 'sitemap-index.xml');
console.log('\nrobots.txt:', fs.existsSync(robotsPath) ? 'yes' : 'MISSING');
console.log('sitemap-index.xml:', fs.existsSync(sitemapPath) ? 'yes' : 'MISSING');

process.exit(errors > 0 ? 1 : 0);

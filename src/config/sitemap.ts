import type { SitemapItem } from '@astrojs/sitemap';
import { blogPosts } from '../data/blog';
import { parseBlogDate } from '../utils/schema';

const blogLastmod = new Map(
  blogPosts.map((post) => [`/blog/${post.slug}/`, parseBlogDate(post.date)] as const),
);

function pathnameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

/** Filter non-indexable routes; set lastmod only where we have a real content date (SEO SUPER BOOSTER §10). */
export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const path = pathnameFromUrl(item.url);

  if (
    path.includes('/404') ||
    path.startsWith('/go/') ||
    path.includes('/rss.xml') ||
    path.startsWith('/blog/') ||
    path.startsWith('/forum/') ||
    path.startsWith('/products/')
  ) {
    return undefined;
  }

  delete item.priority;
  delete item.changefreq;

  if (path.startsWith('/blog/') && path !== '/blog/') {
    const mod = blogLastmod.get(path);
    if (mod) item.lastmod = mod;
  } else {
    delete item.lastmod;
  }

  return item;
}

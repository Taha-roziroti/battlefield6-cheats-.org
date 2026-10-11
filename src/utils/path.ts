/** Normalize internal paths to match trailingSlash: 'always'. */
export function withTrailingSlash(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const [pathname, hash = ''] = path.split('#');
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

export const FRAGPUNK_ROUTES = {
  home: '/',
  aimbot: '/fragpunk-aimbot/',
  esp: '/fragpunk-esp/',
  pricing: '/fragpunk-cheats-pricing/',
  review: '/fragpunk-cheats-review/',
  cloudDma: '/fragpunk-cloud-dma/',
  faq: '/faq/',
  support: '/support/',
  about: '/about/',
  privacy: '/privacy/',
  terms: '/terms/',
} as const;

export const ROUTES = FRAGPUNK_ROUTES;

/** Legacy Dota URLs → homepage (also mirrored in astro.config redirects). */
export const LEGACY_PATH_MAP: Record<string, string> = {
  '/cheats': '/',
  '/cheats/': '/',
  '/cheats/lite': '/',
  '/cheats/lite/': '/',
  '/cheats/pro': '/',
  '/cheats/pro/': '/',
  '/cheats/elite': '/',
  '/cheats/elite/': '/',
  '/cheats/compare': '/fragpunk-cheats-review/',
  '/cheats/compare/': '/fragpunk-cheats-review/',
  '/contact': '/support/',
  '/contact/': '/support/',
  '/products/dota-2-cheats': '/',
  '/products/dota-2-cheats/': '/',
  '/blog': '/fragpunk-cheats-review/',
  '/blog/': '/fragpunk-cheats-review/',
  '/forum': '/',
  '/forum/': '/',
};

export function normalizeInternalPath(href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('/go/')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';

  let pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  pathname = LEGACY_PATH_MAP[pathname] ?? pathname;

  return withTrailingSlash(pathname) + hash;
}

export function blogPostPath(slug: string): string {
  return `/blog/${slug}/`;
}

export function productPath(_slug: string): string {
  return FRAGPUNK_ROUTES.pricing;
}

export function cheatPath(slug: string): string {
  return productPath(slug);
}

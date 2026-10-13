/** Normalize internal paths to match trailingSlash: 'always'. */
export function withTrailingSlash(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const [pathname, hash = ''] = path.split('#');
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

export const SITE_ROUTES = {
  home: '/',
  aimbot: '/battlefield-6-aimbot/',
  esp: '/battlefield-6-esp/',
  requirements: '/battlefield-6-cheat-requirements/',
  cloudDma: '/cloud-dma/',
  hwidSpoofer: '/battlefield-6-hwid-spoofer/',
  faq: '/faq/',
  support: '/support/',
  about: '/about/',
  privacy: '/privacy/',
  terms: '/terms/',
} as const;

export const ROUTES = SITE_ROUTES;

/** Legacy URLs → current routes (also mirrored in astro.config redirects). */
export const LEGACY_PATH_MAP: Record<string, string> = {
  '/cheats': '/',
  '/cheats/': '/',
  '/cheats/lite': '/',
  '/cheats/lite/': '/',
  '/cheats/pro': '/',
  '/cheats/pro/': '/',
  '/cheats/elite': '/',
  '/cheats/elite/': '/',
  '/cheats/compare': '/',
  '/cheats/compare/': '/',
  '/contact': '/support/',
  '/contact/': '/support/',
  '/products/dota-2-cheats': '/',
  '/products/dota-2-cheats/': '/',
  '/blog': '/',
  '/blog/': '/',
  '/forum': '/',
  '/forum/': '/',
  '/fragpunk-aimbot': SITE_ROUTES.aimbot,
  '/fragpunk-aimbot/': SITE_ROUTES.aimbot,
  '/fragpunk-esp': SITE_ROUTES.esp,
  '/fragpunk-esp/': SITE_ROUTES.esp,
  '/fragpunk-cloud-dma': SITE_ROUTES.cloudDma,
  '/fragpunk-cloud-dma/': SITE_ROUTES.cloudDma,
  '/fragpunk-hwid-spoofer': SITE_ROUTES.hwidSpoofer,
  '/fragpunk-hwid-spoofer/': SITE_ROUTES.hwidSpoofer,
  '/fragpunk-cheats-pricing': SITE_ROUTES.home,
  '/fragpunk-cheats-pricing/': SITE_ROUTES.home,
  '/fragpunk-cheats-review': SITE_ROUTES.home,
  '/fragpunk-cheats-review/': SITE_ROUTES.home,
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
  return SITE_ROUTES.home;
}

export function cheatPath(slug: string): string {
  return productPath(slug);
}

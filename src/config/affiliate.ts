/** Commercial checkout link attributes. */

export const AFFILIATE_LINK_REL = 'sponsored nofollow noopener' as const;

export function isAffiliateCheckoutHref(href: string): boolean {
  if (!href) return false;
  try {
    const path = href.startsWith('http') ? new URL(href).pathname : href.split('?')[0] ?? href;
    return path.includes('/go/');
  } catch {
    return href.includes('/go/');
  }
}

export function affiliateRelAttrs(href: string): { rel?: string } {
  return isAffiliateCheckoutHref(href) ? { rel: AFFILIATE_LINK_REL } : {};
}

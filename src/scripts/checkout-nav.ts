import { CHECKOUT, CHECKOUT_SLUGS, type CheckoutProduct } from '../config/checkout';

function normalizeGoPath(pathname: string): string {
  let path = pathname.split('?')[0]?.split('#')[0] ?? '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function checkoutDestinationForPath(pathname: string): string | null {
  const normalized = normalizeGoPath(pathname);
  for (const [product, slug] of Object.entries(CHECKOUT_SLUGS) as [CheckoutProduct, string][]) {
    if (normalized === `/go/${slug}/`) return CHECKOUT[product];
  }
  return null;
}

export function initCheckoutLinkNavigation(): void {
  document.addEventListener(
    'click',
    (event) => {
      if (event.defaultPrevented) return;

      const anchor = (event.target as Element | null)?.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;

      let path: string;
      try {
        path = new URL(rawHref, window.location.href).pathname;
      } catch {
        return;
      }

      const destination = checkoutDestinationForPath(path);
      if (!destination) return;

      event.preventDefault();

      const newTab =
        event.button === 1 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        anchor.target === '_blank';

      if (newTab) {
        window.open(destination, '_blank', 'noopener,noreferrer');
        return;
      }

      window.location.assign(destination);
    },
    true,
  );
}

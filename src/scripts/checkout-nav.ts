import { CHECKOUT, CHECKOUT_SLUGS, type CheckoutProduct } from '../config/checkout';

const CHECKOUT_EXIT_CLASS = 'is-checkout-exit';
const CHECKOUT_EXIT_MS = 220;

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

export function navigateToCheckout(destination: string): void {
  const root = document.documentElement;
  if (root.classList.contains(CHECKOUT_EXIT_CLASS)) return;

  const picker = document.getElementById('checkout-picker');
  if (picker instanceof HTMLDialogElement && picker.open) {
    picker.close();
  }

  root.classList.add(CHECKOUT_EXIT_CLASS);
  window.setTimeout(() => {
    window.location.assign(destination);
  }, CHECKOUT_EXIT_MS);
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

      const newTab =
        event.button === 1 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        anchor.target === '_blank';

      if (newTab) {
        event.preventDefault();
        window.open(destination, '_blank', 'noopener,noreferrer');
        return;
      }

      event.preventDefault();
      navigateToCheckout(destination);
    },
    true,
  );
}

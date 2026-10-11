/** Affiliate checkout destinations (Zadeyo /go/TAHA). Same-tab via internal /go/* redirects. */
export const CHECKOUT_URLS = {
  fragpunk: 'https://zadeyo.com/go/TAHA?to=%2Fproducts%2Ffragpunk-novaxware',
  cloudDma: 'https://zadeyo.com/go/TAHA?to=%2Fproducts%2Fcloud-dma',
  hwidSpoofer: 'https://zadeyo.com/go/TAHA?to=%2Fproducts%2Fhwid-spoofer',
};

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/fragpunk', CHECKOUT_URLS.fragpunk],
  ['/go/fragpunk/', CHECKOUT_URLS.fragpunk],
  ['/go/cloud-dma', CHECKOUT_URLS.cloudDma],
  ['/go/cloud-dma/', CHECKOUT_URLS.cloudDma],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}

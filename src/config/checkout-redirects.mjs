/** External secure checkout URLs — same-tab via internal /go/* redirects. */
export const CHECKOUT_URLS = {
  main: 'https://zadeyo.com/go/TAHA?to=%2Fproducts%2Fbf6',
  cloudDma: 'https://zadeyo.com/go/TAHA?to=%2Fproducts%2Fcloud-dma',
  hwidSpoofer: 'https://zadeyo.com/go/TAHA?to=%2Fproducts%2Fhwid-spoofer',
};

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/main', CHECKOUT_URLS.main],
  ['/go/main/', CHECKOUT_URLS.main],
  ['/go/fragpunk', CHECKOUT_URLS.main],
  ['/go/fragpunk/', CHECKOUT_URLS.main],
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

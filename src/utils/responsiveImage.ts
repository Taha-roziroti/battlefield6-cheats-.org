import { ASSET_VERSION } from '../generated/asset-version';

const RASTER_EXT = /\.(png|jpe?g|webp)$/i;

/** Root-relative URL that respects Astro `base` (GitHub project pages) in production builds. */
export function publicAssetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const base = import.meta.env.BASE_URL || '/';
  let url = normalized;
  if (base !== '/') {
    const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
    url = `${prefix}${normalized}`;
  }
  if (import.meta.env.DEV || ASSET_VERSION === 'dev') return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}v=${ASSET_VERSION}`;
}

/** Full-width hero / site banner (4K masters). */
export const HERO_IMAGE_WIDTHS = [480, 640, 960, 1280, 1536, 1920, 2560, 3840] as const;
export const HERO_IMAGE_SIZES = '100vw';
export const HERO_LCP_WIDTH = 1920;

/** In-page screenshots (4K masters). */
export const IMAGE_4K_WIDTHS = [480, 640, 960, 1280, 1536, 1920, 2560, 3840] as const;

/** In-page screenshots and carousel slides (~72rem column, 2× retina). */
export const CONTENT_IMAGE_WIDTHS = IMAGE_4K_WIDTHS;
export const CONTENT_IMAGE_SIZES =
  '(min-width: 1280px) min(1024px, 72vw), (min-width: 768px) 90vw, 100vw';

/** BF6 split-column shots — full 4K srcset (masters are 3840px wide). */
export const BF6_ARTICLE_IMAGE_WIDTHS = IMAGE_4K_WIDTHS;

/** Display cap ~20–22rem; matches CSS max-width on `.bf6-split__media`. */
export const BF6_SPLIT_IMAGE_SIZES =
  '(min-width: 640px) 30vw, (min-width: 1280px) 17rem, min(92vw, 18rem)';

/** ~half of guide-page-shell in split layouts. */
export const SPLIT_IMAGE_SIZES =
  '(min-width: 960px) min(34rem, 46vw), (min-width: 768px) 88vw, 100vw';

/** @deprecated use CONTENT_IMAGE_WIDTHS */
export const DEFAULT_IMAGE_WIDTHS = CONTENT_IMAGE_WIDTHS;

export const CARD_IMAGE_WIDTHS = [640, 960, 1280, 1536] as const;
export const CARD_IMAGE_SIZES =
  '(min-width: 1280px) min(680px, 58vw), (min-width: 768px) 72vw, 88vw';

export const THUMB_IMAGE_WIDTHS = [320, 480, 640] as const;

export function stripRasterExt(src: string): string {
  return src.replace(RASTER_EXT, '');
}

export function webpSrc(src: string, width: number): string {
  return publicAssetUrl(`${stripRasterExt(src)}-${width}.webp`);
}

export function responsiveSrcSet(
  src: string,
  widths: readonly number[] = CONTENT_IMAGE_WIDTHS,
): string {
  return widths.map((width) => `${webpSrc(src, width)} ${width}w`).join(', ');
}

export function rasterMasterUrl(src: string): string {
  return publicAssetUrl(src);
}

/** Fallback `src` / preload — balanced for sharpness without always pulling the largest file. */
export function defaultWebpSrc(src: string, widths: readonly number[]): string {
  const preferred = [640, 960, 1280, 480, 1536, 1920];
  for (const w of preferred) {
    if ((widths as readonly number[]).includes(w)) return webpSrc(src, w);
  }
  return webpSrc(src, widths[widths.length - 1] ?? 640);
}

export function heroLcpWebpSrc(src: string): string {
  return webpSrc(src, HERO_LCP_WIDTH);
}

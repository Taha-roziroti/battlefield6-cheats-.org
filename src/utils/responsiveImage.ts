const RASTER_EXT = /\.(png|jpe?g|webp)$/i;

/** Full-width hero / site banner (up to 1920w masters). */
export const HERO_IMAGE_WIDTHS = [960, 1280, 1536, 1920] as const;
export const HERO_IMAGE_SIZES = '100vw';
export const HERO_LCP_WIDTH = 1280;

/** In-page screenshots and carousel slides (~72rem column, 2× retina). */
export const CONTENT_IMAGE_WIDTHS = [640, 960, 1280, 1536, 1920] as const;
export const CONTENT_IMAGE_SIZES =
  '(min-width: 1280px) min(1024px, 72vw), (min-width: 768px) 90vw, 100vw';

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
  return `${stripRasterExt(src)}-${width}.webp`;
}

export function responsiveSrcSet(
  src: string,
  widths: readonly number[] = CONTENT_IMAGE_WIDTHS,
): string {
  return widths.map((width) => `${webpSrc(src, width)} ${width}w`).join(', ');
}

/** Fallback `src` / preload — balanced for sharpness without always pulling the largest file. */
export function defaultWebpSrc(src: string, widths: readonly number[]): string {
  const preferred = [1280, 960, 1536, 640, 1920];
  for (const w of preferred) {
    if (widths.includes(w)) return webpSrc(src, w);
  }
  return webpSrc(src, widths[widths.length - 1] ?? 1280);
}

export function heroLcpWebpSrc(src: string): string {
  return webpSrc(src, HERO_LCP_WIDTH);
}

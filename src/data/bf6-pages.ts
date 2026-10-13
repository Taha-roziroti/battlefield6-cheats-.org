import { parseBf6Mdx, type Bf6ParsedPage } from '../utils/bf6-mdx';

import aimbotRaw from '../../pages/aimbot.mdx?raw';
import cloudDmaRaw from '../../pages/cloud-dma.mdx?raw';
import espRaw from '../../pages/esp.mdx?raw';
import homeRaw from '../../pages/home.mdx?raw';
import hwidSpooferRaw from '../../pages/hwid-spoofer.mdx?raw';
import requirementsRaw from '../../pages/requirements.mdx?raw';

const PARSED: Record<string, Bf6ParsedPage> = {
  home: parseBf6Mdx(homeRaw),
  aimbot: parseBf6Mdx(aimbotRaw),
  esp: parseBf6Mdx(espRaw),
  'hwid-spoofer': parseBf6Mdx(hwidSpooferRaw),
  'cloud-dma': parseBf6Mdx(cloudDmaRaw),
  requirements: parseBf6Mdx(requirementsRaw),
};

export type Bf6PageKey = keyof typeof PARSED;

export function getBf6Page(key: Bf6PageKey): Bf6ParsedPage {
  return PARSED[key];
}

/** SEO entries derived from MDX frontmatter (source of truth for the six routes). */
export const BF6_PAGE_SEO: Record<string, { title: string; description: string }> = Object.fromEntries(
  Object.values(PARSED).map((page) => [
    page.meta.slug === '/' ? '/' : page.meta.slug.endsWith('/') ? page.meta.slug : `${page.meta.slug}/`,
    { title: page.meta.title, description: page.meta.description },
  ]),
);

/**
 * Central titles/descriptions for indexable routes (keyword map source of truth).
 */

import { BF6_PAGE_SEO } from '../data/bf6-pages';

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  ...BF6_PAGE_SEO,
  '/faq/': {
    title: 'FAQ | Battlefield 6 Cheats, Pricing & Setup',
    description:
      'Answers on Battlefield 6 cheat features, Cloud DMA, listed pricing, checkout, and PC requirements on this site.',
  },
  '/terms/': {
    title: 'Terms & Conditions | Battlefield 6 Cheats',
    description: 'Terms of use for information and checkout links published on this site.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Battlefield 6 Cheats',
    description: 'How this site uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About Battlefield 6 Cheats',
    description: 'What this site publishes about Battlefield 6 cheat features, pricing, and setup notes.',
  },
  '/support/': {
    title: 'Support | Battlefield 6 Cheats',
    description: 'Get help with checkout, listed requirements, and product questions for Battlefield 6 software.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}

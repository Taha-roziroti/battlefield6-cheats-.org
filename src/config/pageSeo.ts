/**
 * Central titles/descriptions for indexable routes (keyword map source of truth).
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'FragPunk Cheats for PC | Features & Pricing',
    description:
      'FragPunk cheats explained in plain English—aimbot, ESP, plans, and PC notes. See listed prices, then confirm checkout before you buy.',
  },
  '/fragpunk-aimbot/': {
    title: 'FragPunk Aimbot Features & Pricing',
    description:
      'What the FragPunk listing says about aimbot controls, FOV, and smoothing—without the hype. Check pricing on the main plans page.',
  },
  '/fragpunk-esp/': {
    title: 'FragPunk ESP & Wallhack Features',
    description:
      'Player ESP, health bars, and wallhack jargon for FragPunk, translated into normal language. Confirm visuals on the seller page.',
  },
  '/fragpunk-cheats-pricing/': {
    title: 'FragPunk Cheats Price | Monthly vs Lifetime',
    description:
      '$35 for 31 days, $150 lifetime, Cloud DMA extra—last listed prices for FragPunk cheats. Reopen checkout before you pay.',
  },
  '/fragpunk-cheats-review/': {
    title: 'FragPunk Cheats Review | Features & Alternatives',
    description:
      'A straight FragPunk cheats review from public product info: features, costs, Cloud DMA quirks, and risks—no fake playtime claims.',
  },
  '/fragpunk-cloud-dma/': {
    title: 'FragPunk Cloud DMA: Requirements & Pricing',
    description:
      'Cloud DMA for FragPunk is Hyper-V on one PC, not a hardware card. Requirements, separate $50 listing, and what to ask before buying.',
  },
  '/faq/': {
    title: 'FAQ | FragPunk Cheats, Pricing & Setup',
    description:
      'Answers on FragPunk cheat features, Cloud DMA, listed pricing, checkout, and PC requirements at fragpunk-cheat.org.',
  },
  '/terms/': {
    title: 'Terms & Conditions | FragPunk Cheats',
    description: 'Terms of use for information and checkout links published on fragpunk-cheat.org.',
  },
  '/privacy/': {
    title: 'Privacy Policy | FragPunk Cheats',
    description: 'How fragpunk-cheat.org uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About FragPunk Cheats',
    description: 'What this site publishes about FragPunk cheat features, pricing, and setup notes.',
  },
  '/support/': {
    title: 'Support | FragPunk Cheats',
    description: 'Get help with checkout, listed requirements, and product questions for FragPunk cheats.',
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

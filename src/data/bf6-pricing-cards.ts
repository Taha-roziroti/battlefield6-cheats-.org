import { checkoutPath } from '../config/checkout';
import {
  CLOUD_DMA_PLAN,
  HWID_SPOOFER_PLANS,
  MAIN_PRODUCT_PLANS,
} from './fragpunk/pricing';

export type Bf6PricingCard = {
  id: string;
  product: string;
  termLabel: string;
  priceUsd: number | null;
  priceNote?: string;
  href: string;
  highlights: string[];
  compareNote?: string;
};

const mainMonthly = MAIN_PRODUCT_PLANS[0]!;
const mainLifetime = MAIN_PRODUCT_PLANS[1]!;
const hwidMonthly = HWID_SPOOFER_PLANS[0]!;
const hwidLifetime = HWID_SPOOFER_PLANS[1]!;

export const BF6_PRICING_MONTHLY_ROW: Bf6PricingCard[] = [
  {
    id: 'main-monthly',
    product: 'Battlefield 6 cheat',
    termLabel: '31 days',
    priceUsd: mainMonthly.priceUsd,
    href: checkoutPath('main'),
    highlights: [
      'Full aimbot + ESP menu',
      'Config save / load / share',
      'Windows 10 & 11 support',
    ],
    compareNote: `$${mainLifetime.priceUsd - mainMonthly.priceUsd} more for lifetime if you play long-term`,
  },
  {
    id: 'hwid-monthly',
    product: 'HWID Spoofer',
    termLabel: '31 days',
    priceUsd: hwidMonthly.priceUsd,
    href: checkoutPath('hwidSpoofer'),
    highlights: [
      'Hardware spoofer + cleaner',
      'Battlefield 6 supported',
      'Separate from main cheat',
    ],
    compareNote: `$${hwidLifetime.priceUsd - hwidMonthly.priceUsd} more for lifetime access`,
  },
  {
    id: 'cloud-monthly',
    product: 'Cloud DMA',
    termLabel: 'Lifetime only',
    priceUsd: null,
    priceNote: `$${CLOUD_DMA_PLAN.priceUsd} one-time — no monthly tier`,
    href: checkoutPath('cloudDma'),
    highlights: [
      'Single-PC Hyper-V layer',
      'Not a physical DMA card',
      'Sold apart from main cheat',
    ],
    compareNote: 'Choose the lifetime card below to compare all three lifetime prices',
  },
];

export const BF6_PRICING_LIFETIME_ROW: Bf6PricingCard[] = [
  {
    id: 'main-lifetime',
    product: 'Battlefield 6 cheat',
    termLabel: 'Lifetime',
    priceUsd: mainLifetime.priceUsd,
    href: checkoutPath('main'),
    highlights: [
      'Unlimited-duration main license',
      'Aimbot, ESP, misc menu',
      'Best value vs 5+ months monthly',
    ],
    compareNote: `$${mainLifetime.priceUsd - mainMonthly.priceUsd} vs one month — pays off after ~${Math.ceil(mainLifetime.priceUsd / mainMonthly.priceUsd)} monthly renewals`,
  },
  {
    id: 'hwid-lifetime',
    product: 'HWID Spoofer',
    termLabel: 'Lifetime',
    priceUsd: hwidLifetime.priceUsd,
    href: checkoutPath('hwidSpoofer'),
    highlights: [
      'Unlimited-duration spoofer access',
      'Cleaner included',
      'Hardware ban recovery tooling',
    ],
    compareNote: `$${hwidLifetime.priceUsd - hwidMonthly.priceUsd} more than 31-day HWID access`,
  },
  {
    id: 'cloud-lifetime',
    product: 'Cloud DMA',
    termLabel: 'Lifetime',
    priceUsd: CLOUD_DMA_PLAN.priceUsd,
    href: checkoutPath('cloudDma'),
    highlights: [
      'One-time Hyper-V stack fee',
      'Lowest lifetime price of the three',
      'Required layer for our delivery model',
    ],
    compareNote: `$${mainLifetime.priceUsd - CLOUD_DMA_PLAN.priceUsd} less than main cheat lifetime`,
  },
];

import type { SiteFaqItem } from '../faq';

export const SITE_FAQS: SiteFaqItem[] = [
  {
    id: 'bf6-price',
    topic: 'plans',
    icon: 'acqPackage',
    q: 'How much does Battlefield 6 cheat access cost?',
    a: '$35 for 31 days or $150 lifetime on the main Battlefield 6 package. Cloud DMA is $50 lifetime as a separate add-on. HWID Spoofer is $50 for 31 days or $150 lifetime—each product has its own checkout.',
  },
  {
    id: 'bf6-cloud-dma',
    topic: 'setup',
    icon: 'layers',
    q: 'Is Cloud DMA a physical DMA card?',
    a: 'No. It is Hyper-V software on one PC. No card arrives in the mail.',
  },
  {
    id: 'bf6-updates',
    topic: 'products',
    icon: 'shield',
    q: 'Do plans include updates after patches?',
    a: 'Active monthly and lifetime main access includes maintenance updates and loader patches while your license is valid. Updates are not a guarantee of uninterrupted access or detection status.',
  },
  {
    id: 'bf6-checkout',
    topic: 'products',
    icon: 'arrowRight',
    q: 'Where do checkout buttons go?',
    a: 'Checkout links open secure payment for the product you picked—main Battlefield 6 plan, Cloud DMA, or HWID Spoofer.',
  },
  {
    id: 'bf6-hwid',
    topic: 'setup',
    icon: 'sidebarHwid',
    q: 'When do I need the HWID Spoofer?',
    a: 'When a hardware ban locks PC identifiers—not for account-only bans. See the HWID spoofer page for listed compatibility and risks.',
  },
];

/** @deprecated Use SITE_FAQS */
export const FRAGPUNK_FAQS = SITE_FAQS;

export const HOME_FAQS = SITE_FAQS.slice(0, 4);

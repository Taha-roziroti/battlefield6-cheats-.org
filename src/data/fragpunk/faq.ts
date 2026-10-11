import type { SiteFaqItem } from '../faq';

export const FRAGPUNK_FAQS: SiteFaqItem[] = [
  {
    id: 'fp-price',
    topic: 'plans',
    icon: 'acqPackage',
    q: 'How much do FragPunk cheats cost?',
    a: '$35 for 31 days or $150 lifetime on the main cheat. Cloud DMA is $50 lifetime as a separate add-on. HWID Spoofer pricing is on its checkout page.',
  },
  {
    id: 'fp-cloud-dma',
    topic: 'setup',
    icon: 'layers',
    q: 'Is Cloud DMA a physical DMA card?',
    a: 'No. It is Hyper-V software on one PC. No card arrives in the mail.',
  },
  {
    id: 'fp-updates',
    topic: 'products',
    icon: 'shield',
    q: 'Do plans include updates after patches?',
    a: 'Yes. Active monthly and lifetime FragPunk access includes maintenance updates and loader patches as the game changes.',
  },
  {
    id: 'fp-checkout',
    topic: 'products',
    icon: 'arrowRight',
    q: 'Where do checkout buttons go?',
    a: 'Checkout links on this site open secure payment for the product you picked—main FragPunk plan, Cloud DMA, or HWID Spoofer.',
  },
  {
    id: 'fp-hwid',
    topic: 'setup',
    icon: 'sidebarHwid',
    q: 'When do I need the HWID Spoofer?',
    a: 'When a hardware ban locks your PC identifiers—not for account-only bans. See the HWID Spoofer page for the recovery workflow.',
  },
];

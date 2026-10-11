import type { SiteFaqItem } from '../faq';

export const FRAGPUNK_FAQS: SiteFaqItem[] = [
  {
    id: 'fp-price',
    topic: 'plans',
    icon: 'acqPackage',
    q: 'How much do FragPunk cheats cost?',
    a: 'We last saw $35 for 31 days and $150 lifetime on the main cheat. Cloud DMA was $50 lifetime on its own page. Open checkout—numbers change.',
  },
  {
    id: 'fp-cloud-dma',
    topic: 'setup',
    icon: 'layers',
    q: 'Is Cloud DMA a physical DMA card?',
    a: 'Nope. It is Hyper-V software on one PC. No card arrives in the mail.',
  },
  {
    id: 'fp-testing',
    topic: 'safety',
    icon: 'shield',
    q: 'Does this site test FragPunk cheats in-game?',
    a: 'We read the seller pages and write plain-English summaries. We are not claiming secret ranked testing or “undetected” status.',
  },
  {
    id: 'fp-checkout',
    topic: 'products',
    icon: 'arrowRight',
    q: 'Where do checkout links go?',
    a: 'Buttons hit /go/ links that bounce you to the operator checkout page.',
  },
];

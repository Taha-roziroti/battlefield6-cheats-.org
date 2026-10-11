import { FRAGPUNK_ROUTES } from '../../utils/path';

export const FRAGPUNK_NAV = [
  { href: FRAGPUNK_ROUTES.home, label: 'Overview', ariaLabel: 'FragPunk cheats overview' },
  { href: FRAGPUNK_ROUTES.aimbot, label: 'Aimbot', ariaLabel: 'FragPunk aimbot features' },
  { href: FRAGPUNK_ROUTES.esp, label: 'ESP', ariaLabel: 'FragPunk ESP features' },
  { href: FRAGPUNK_ROUTES.pricing, label: 'Pricing', ariaLabel: 'FragPunk cheats price and plans' },
  { href: FRAGPUNK_ROUTES.review, label: 'Review', ariaLabel: 'FragPunk cheats review' },
  { href: FRAGPUNK_ROUTES.cloudDma, label: 'Cloud DMA', ariaLabel: 'FragPunk Cloud DMA requirements' },
  { href: FRAGPUNK_ROUTES.hwidSpoofer, label: 'HWID Spoofer', ariaLabel: 'HWID Spoofer for ban recovery' },
  { href: FRAGPUNK_ROUTES.faq, label: 'FAQ', ariaLabel: 'Frequently asked questions' },
  { href: FRAGPUNK_ROUTES.support, label: 'Support', ariaLabel: 'Contact support' },
] as const;

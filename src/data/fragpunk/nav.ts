import { SITE_ROUTES } from '../../utils/path';

export const SITE_NAV = [
  { href: SITE_ROUTES.home, label: 'Overview', ariaLabel: 'Battlefield 6 cheats overview' },
  { href: SITE_ROUTES.aimbot, label: 'Aimbot', ariaLabel: 'Battlefield 6 aimbot features' },
  { href: SITE_ROUTES.esp, label: 'ESP', ariaLabel: 'Battlefield 6 ESP features' },
  {
    href: SITE_ROUTES.requirements,
    label: 'Requirements',
    ariaLabel: 'Battlefield 6 cheat requirements',
  },
  { href: SITE_ROUTES.cloudDma, label: 'Cloud DMA', ariaLabel: 'Cloud DMA for Battlefield 6' },
  {
    href: SITE_ROUTES.hwidSpoofer,
    label: 'HWID Spoofer',
    ariaLabel: 'Battlefield 6 HWID spoofer',
  },
  { href: SITE_ROUTES.faq, label: 'FAQ', ariaLabel: 'Frequently asked questions' },
  { href: SITE_ROUTES.support, label: 'Support', ariaLabel: 'Contact support' },
] as const;

/** @deprecated Use SITE_NAV */
export const FRAGPUNK_NAV = SITE_NAV;

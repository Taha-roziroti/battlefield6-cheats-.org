/** Listed checkout prices — recheck before publishing updates. */
export const MAIN_PRODUCT_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    priceUsd: 35,
    term: '31 days',
    checkout: 'main' as const,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    priceUsd: 150,
    term: 'Lifetime',
    checkout: 'main' as const,
  },
] as const;

/** @deprecated Use MAIN_PRODUCT_PLANS */
export const FRAGPUNK_MAIN_PLANS = MAIN_PRODUCT_PLANS;

export const CLOUD_DMA_PLAN = {
  name: 'Cloud DMA',
  priceUsd: 50,
  term: 'Lifetime',
  checkout: 'cloudDma' as const,
  note:
    'Hyper-V infrastructure on one gaming PC—not a second tower, USB DMA bridge, or PCIe card. Sold separately from the main Battlefield 6 cheat license.',
} as const;

export const HWID_SPOOFER_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    priceUsd: 50,
    term: '31 days',
    checkout: 'hwidSpoofer' as const,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    priceUsd: 150,
    term: 'Lifetime',
    checkout: 'hwidSpoofer' as const,
  },
] as const;

export const HWID_SPOOFER_PLAN = {
  name: 'HWID Spoofer',
  checkout: 'hwidSpoofer' as const,
  plans: HWID_SPOOFER_PLANS,
  summary:
    'Hardware spoofer with cleaner included. Battlefield 6 is supported alongside EAC, BattlEye, Ricochet, and Vanguard-protected titles in our compatibility list.',
} as const;

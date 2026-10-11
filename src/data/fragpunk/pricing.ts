/** Listed on checkout product pages — recheck before publishing updates. */
export const FRAGPUNK_MAIN_PLANS = [
  {
    id: 'monthly',
    name: '31-day access',
    priceUsd: 35,
    term: '31 days',
    checkout: 'fragpunk' as const,
  },
  {
    id: 'lifetime',
    name: 'Lifetime access',
    priceUsd: 150,
    term: 'Lifetime',
    checkout: 'fragpunk' as const,
  },
] as const;

export const CLOUD_DMA_PLAN = {
  name: 'Cloud DMA (lifetime)',
  priceUsd: 50,
  term: 'Lifetime',
  checkout: 'cloudDma' as const,
  note:
    'Sold apart from the main FragPunk cheat. It is a Hyper-V layer on one PC—not a hardware DMA card you install in a slot.',
} as const;

/** HWID Spoofer — confirm displayed price on checkout; listing may show multiple tiers. */
export const HWID_SPOOFER_PLAN = {
  name: 'HWID Spoofer',
  checkout: 'hwidSpoofer' as const,
  priceNote: 'Pricing is shown on the HWID Spoofer checkout page before you pay.',
  summary:
    'Hardware ban recovery with spoofing tools and cleaner included—covers major anti-cheat stacks listed on the product page.',
} as const;

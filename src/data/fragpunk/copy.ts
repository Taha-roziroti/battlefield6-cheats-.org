import { FRAGPUNK_ROUTES } from '../../utils/path';
import { CLOUD_DMA_PLAN, FRAGPUNK_MAIN_PLANS } from './pricing';

export interface PageCopy {
  lead: string;
  sections: {
    id?: string;
    heading: string;
    paragraphs: string[];
    links?: { href: string; text: string }[];
  }[];
}

const monthly = FRAGPUNK_MAIN_PLANS[0]!;
const lifetime = FRAGPUNK_MAIN_PLANS[1]!;

export const homeCopy: PageCopy = {
  lead:
    'If you are shopping for FragPunk cheats on PC, start here. We break down what the seller actually lists—aim help, ESP-style visuals, prices, and the weird Cloud DMA add-on—so you are not guessing from a wall of marketing bullets.',
  sections: [
    {
      id: 'features-glance',
      heading: 'FragPunk Cheat Features at a Glance',
      paragraphs: [
        'Think of the main package as two buckets: stuff that helps you aim, and stuff that shows you information you would normally miss. Names change between sites, but that is the split you will see on the product page.',
        'Toggles, limits, and “does it work on my build?” details drift whenever the game or loader updates. Treat the checkout page as the live menu—not this summary.',
      ],
      links: [
        { href: FRAGPUNK_ROUTES.aimbot, text: 'Explore FragPunk aimbot features' },
        { href: FRAGPUNK_ROUTES.esp, text: 'See FragPunk ESP options' },
      ],
    },
    {
      id: 'player-esp',
      heading: 'Player ESP and Visual Options',
      paragraphs: [
        'ESP is the part that draws players through walls—boxes, bones, health, distance, whatever the seller turns on for FragPunk. Some configs look busy; others stay minimal. We have not run every combo in a live match, so peek at their screenshots before you expect a specific look.',
      ],
    },
    {
      id: 'aimbot',
      heading: 'Aimbot Settings and Controls',
      paragraphs: [
        'Aim assistance usually comes with knobs: how wide the tool searches (FOV), how fast your view moves onto a target (smoothing), and which buttons turn it on. None of that is universal—read the aimbot page here, then match it to what the seller shows today.',
      ],
    },
    {
      id: 'plans',
      heading: 'Plans, Pricing, and System Requirements',
      paragraphs: [
        `Last time we synced with the product page, main FragPunk access was $${monthly.priceUsd} for ${monthly.term} or $${lifetime.priceUsd} ${lifetime.term.toLowerCase()}. Cloud DMA is its own line item—do not add those numbers together unless you know you need both.`,
        'Windows version, Hyper-V steps, and any anti-cheat notes live on the seller site. Prices move; open checkout once more before you pay.',
      ],
      links: [
        { href: FRAGPUNK_ROUTES.pricing, text: 'Compare FragPunk cheat prices' },
        { href: FRAGPUNK_ROUTES.review, text: 'Read the FragPunk cheats review' },
      ],
    },
  ],
};

export const aimbotCopy: PageCopy = {
  lead:
    'Aimbot is the flashiest word on the box—and the easiest to misunderstand. Here is what the FragPunk listing actually talks about, in plain terms, before you touch sliders in-game.',
  sections: [
    {
      id: 'features-controls',
      heading: 'FragPunk Aimbot Features and Controls',
      paragraphs: [
        'You are not buying a standalone “aimbot license.” It rides along with the main FragPunk cheat. The seller’s page usually mentions turning assistance on/off, picking targets, and dialing how hard it pulls your crosshair.',
        'We have not clocked hours testing every mode in ranked. Use this as a decoder ring for their feature list, then read the current bullets on checkout.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.home, text: 'View all FragPunk cheat features' }],
    },
    {
      id: 'fov-smoothing',
      heading: 'FOV, Smoothing, and Aim Configuration',
      paragraphs: [
        'FOV is basically “how wide is the net?” Wider catches more angles; tighter looks less obvious. Smoothing is the opposite of snap—higher values glide; lower values jerk faster.',
        'If a slider is not on the product page, do not assume it exists in the loader. Ping support or re-read the listing after patches.',
      ],
    },
    {
      id: 'windows',
      heading: 'Supported Windows Versions and Requirements',
      paragraphs: [
        'Build numbers, driver warnings, and Hyper-V requirements are spelled out where you buy—not here. If Cloud DMA is in the picture, that is a second product with its own checklist on our Cloud DMA page.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.cloudDma, text: 'See Cloud DMA requirements and costs' }],
    },
    {
      id: 'pricing',
      heading: 'Aimbot Plans and Pricing',
      paragraphs: [
        'There is no separate “aimbot only” cart. It comes with the main FragPunk plan—monthly or lifetime. Compare those two prices, then confirm the total on the seller checkout.',
      ],
      links: [
        { href: FRAGPUNK_ROUTES.pricing, text: 'Compare FragPunk cheat pricing' },
        { href: FRAGPUNK_ROUTES.review, text: 'Read the FragPunk cheats review' },
      ],
    },
  ],
};

export const espCopy: PageCopy = {
  lead:
    'ESP is why people say “wallhack”—seeing players and info through cover. Here is how the FragPunk seller describes those visuals without pretending we streamed your exact overlay.',
  sections: [
    {
      id: 'player-esp',
      heading: 'FragPunk Player ESP Features',
      paragraphs: [
        'At minimum, ESP means knowing where opponents are when geometry would hide them. Sellers love swapping labels—“wallhack,” “ESP,” “visuals”—but you care about boxes, lines, and text that actually show up in your loader.',
        'We do not host a live FragPunk feed here. Screenshots on the product page are your best preview.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.home, text: 'Explore the main FragPunk cheat offer' }],
    },
    {
      id: 'indicators',
      heading: 'Health Bars, Distance, and Skeleton Indicators',
      paragraphs: [
        'Health bars and distance text save you from guessing whether to push. Skeleton ESP is the wireframe look—handy for spacing, noisy if you turn everything on at once.',
        'Marketing names rarely match menu names one-to-one. Match features by description, not buzzwords.',
      ],
    },
    {
      id: 'terminology',
      heading: 'ESP and Wallhack Terminology Explained',
      paragraphs: [
        'Wallhack = seeing through walls. ESP = wallhack plus extras (health, name, weapon, etc.). Some pages use both words for the same toggle. When in doubt, trust the bullet list on checkout, not the headline adjective.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.aimbot, text: 'Compare aimbot features' }],
    },
    {
      id: 'pricing',
      heading: 'Pricing and Feature Availability',
      paragraphs: [
        'ESP ships with the standard FragPunk subscription or lifetime key. If Cloud DMA is mandatory for your setup, budget for that separately—see pricing and the Cloud DMA write-up.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.pricing, text: 'Review available plans' }],
    },
  ],
};

export const pricingCopy: PageCopy = {
  lead:
    'Nobody likes sticker shock at checkout. These are the dollar amounts we last saw on the FragPunk listing—always peek at the cart again before you pay.',
  sections: [
    {
      id: 'current-plans',
      heading: 'Current FragPunk Cheat Plans',
      paragraphs: [
        `$${monthly.priceUsd} gets you ${monthly.term} on the main cheat.`,
        `$${lifetime.priceUsd} buys ${lifetime.term.toLowerCase()} access to the same package.`,
        'Aimbot and ESP sit inside that bundle; you are not picking them à la carte.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.home, text: 'Explore FragPunk cheat features' }],
    },
    {
      id: 'monthly-vs-lifetime',
      heading: 'Monthly vs. Lifetime Access',
      paragraphs: [
        'Short term is cheaper today; lifetime is one big charge instead of renewals. Which wins depends on how long you play and whether the seller still ships updates when the game patches.',
        'We cannot promise future compatibility—that is between you, the game, and the operator.',
      ],
    },
    {
      id: 'cloud-dma-costs',
      heading: 'Cloud DMA Costs and Separate Components',
      paragraphs: [
        `Cloud DMA was listed at $${CLOUD_DMA_PLAN.priceUsd} lifetime the last time we looked. It is not tucked inside the $${lifetime.priceUsd} FragPunk key.`,
        'It is software Hyper-V stuff on one PC—not a PCIe card you plug in. Mixing that up is how people buy the wrong thing.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.cloudDma, text: 'See Cloud DMA requirements and costs' }],
    },
    {
      id: 'before-checkout',
      heading: 'What to Confirm Before Checkout',
      paragraphs: [
        'Windows build, Hyper-V steps, refund wording, and whether Cloud DMA is required for you—not just “nice to have.”',
        'The total you pay is whatever the seller shows on checkout—not a number on this site.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.review, text: 'Read the product comparison' }],
    },
  ],
};

export const pricingFaqs = [
  {
    q: 'Is Cloud DMA included in the $150 lifetime FragPunk plan?',
    a: 'No—it is its own lifetime product. If the seller says you need Cloud DMA, add that $50 (last listed price) on top, not inside the main cheat cart.',
  },
  {
    q: 'Can prices change after I read this page?',
    a: 'Absolutely. Sales, patches, and operator changes happen. The checkout total wins over any summary on this site.',
  },
];

export const reviewCopy: PageCopy = {
  lead:
    'Honest take: we wrote this from the public product pages and our notes—not from a secret lab account grinding FragPunk all week. Still, if you want a clear-eyed look before spending money, you are in the right place.',
  sections: [
    {
      id: 'included',
      heading: 'What Is Included in the FragPunk Offer?',
      paragraphs: [
        'The package is PC software with aim assistance and ESP-style overlays, delivered through whatever loader the operator runs. We do not host or update the cheat— we explain what they claim to sell.',
        'Performance, bans, and “is it detected?” are unknowns from here. Treat anti-cheat like a real risk and read their terms.',
      ],
    },
    {
      id: 'compare-features',
      heading: 'Comparing Aimbot and ESP Features',
      paragraphs: [
        'Our aimbot page translates FOV and smoothing; the ESP page covers boxes, health, and wallhack jargon. Read both if you are visual versus aim-curious.',
        'Then open checkout and see if today’s bullet list still matches—patches move faster than blog posts.',
      ],
      links: [
        { href: FRAGPUNK_ROUTES.aimbot, text: 'Explore aimbot features' },
        { href: FRAGPUNK_ROUTES.esp, text: 'Explore ESP features' },
      ],
    },
    {
      id: 'pricing-terms',
      heading: 'Pricing, Access Terms, and Dependencies',
      paragraphs: [
        `When we last checked: $${monthly.priceUsd} for ${monthly.term}, $${lifetime.priceUsd} lifetime on the core cheat, plus Cloud DMA if your setup needs it.`,
        'Big gotcha: Cloud DMA is virtualized software on one machine, not a hardware DMA card. Expecting a card in the mail leads to refunds nobody wants.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.pricing, text: 'Compare FragPunk cheat prices' }],
    },
    {
      id: 'requirements-risks',
      heading: 'System Requirements, Limitations, and Risks',
      paragraphs: [
        'Hyper-V, BIOS virtualization, and Windows edition checks matter for Cloud DMA—see that page instead of guessing here.',
        'Using cheats can break game rules and cost accounts. This article informs; it does not tell you to cheat.',
      ],
    },
  ],
};

export const cloudDmaCopy: PageCopy = {
  lead:
    'Cloud DMA sounds like exotic hardware. On this offer it is Hyper-V on your own PC—one machine, extra software, separate bill. Let us unpack that before you enable features you cannot turn off easily.',
  sections: [
    {
      id: 'why-cloud-dma',
      heading: 'Why the FragPunk Offer Lists Cloud DMA',
      paragraphs: [
        'Some setups want an isolated layer between the game and everything else. The seller brands that as Cloud DMA even though nothing ships to your door—it is configuration work on the box you already own.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.home, text: 'View the main FragPunk cheat offer' }],
    },
    {
      id: 'hyper-v',
      heading: 'Understanding the Single-PC Hyper-V Setup',
      paragraphs: [
        'Hyper-V is Microsoft’s hypervisor. Turning it on can nudge boot options, RAM use, and other tools that hate virtualization. Follow their steps line by line; improvising is how people brick an afternoon.',
        'We have not tested your exact motherboard or BIOS—treat their checklist as the authority.',
      ],
    },
    {
      id: 'windows-features',
      heading: 'Windows Features and System Requirements',
      paragraphs: [
        'You will likely need a Windows edition that supports Hyper-V, virtualization enabled in firmware, and enough disk space for whatever image or layer they install.',
        'If the product page skips a step, assume it is unknown—not “probably fine.”',
      ],
    },
    {
      id: 'pricing',
      heading: 'Cloud DMA Pricing and Separate Components',
      paragraphs: [
        `Lifetime Cloud DMA was listed at $${CLOUD_DMA_PLAN.priceUsd} USD—again, separate from the main FragPunk cheat.`,
        CLOUD_DMA_PLAN.note,
      ],
      links: [{ href: FRAGPUNK_ROUTES.pricing, text: 'Compare plans and total costs' }],
    },
    {
      id: 'before-buying',
      heading: 'Questions to Confirm Before Buying',
      paragraphs: [
        'Ask if Cloud DMA is required for FragPunk on your PC, what refunds look like, and whether Hyper-V breaks other software you rely on.',
        'If you wanted a hardware DMA card, stop here—this is not that product.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.review, text: 'Read the full product review' }],
    },
  ],
};

export const cloudDmaFaqs = [
  {
    q: 'Is Cloud DMA a physical DMA card?',
    a: 'No. The listing describes Hyper-V software on a single PC. There is no card in a box.',
  },
  {
    q: 'Do I pay for Cloud DMA and FragPunk together?',
    a: 'They ring up separately unless the seller bundles them in one cart themselves. Budget both if support says you need virtualization.',
  },
];

import { checkoutPath } from '../../config/checkout';
import { FRAGPUNK_ROUTES } from '../../utils/path';
import { CLOUD_DMA_PLAN, FRAGPUNK_MAIN_PLANS, HWID_SPOOFER_PLAN } from './pricing';

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
const mainCheckout = checkoutPath('fragpunk');
const cloudCheckout = checkoutPath('cloudDma');
const hwidCheckout = checkoutPath('hwidSpoofer');

export const homeCopy: PageCopy = {
  lead:
    'FragPunk cheats for PC—aim assistance, ESP-style visuals, clear pricing, and Cloud DMA when your setup needs it. Everything here matches what you get at checkout on this site.',
  sections: [
    {
      id: 'features-glance',
      heading: 'FragPunk Cheat Features at a Glance',
      paragraphs: [
        'The main package covers two buckets: aim assistance and information overlays (ESP). Toggles and menu names may change after updates—we ship loader updates and patch notes as FragPunk evolves.',
        'Start on the feature pages below, then pick monthly or lifetime access when you are ready.',
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
        'ESP draws players through walls—boxes, bones, health, distance, and other indicators you enable in the loader. Configs can stay minimal or busy; screenshots on this site show typical layouts.',
      ],
    },
    {
      id: 'aimbot',
      heading: 'Aimbot Settings and Controls',
      paragraphs: [
        'Aim assistance includes FOV (how wide the tool searches), smoothing (how fast the crosshair moves), and keybinds to turn help on or off. See the aimbot page for how we describe each control.',
      ],
    },
    {
      id: 'plans',
      heading: 'Plans, Pricing, and System Requirements',
      paragraphs: [
        `Main FragPunk access is $${monthly.priceUsd} for ${monthly.term} or $${lifetime.priceUsd} ${lifetime.term.toLowerCase()}. Cloud DMA is a separate $${CLOUD_DMA_PLAN.priceUsd} lifetime add-on when Hyper-V isolation is required.`,
        'Windows build, Hyper-V steps, and anti-cheat notes are in checkout and support guides. Active plans include maintenance updates as the game patches.',
      ],
      links: [
        { href: FRAGPUNK_ROUTES.pricing, text: 'Compare FragPunk cheat prices' },
        { href: mainCheckout, text: 'Get the main plan' },
        { href: FRAGPUNK_ROUTES.review, text: 'Read the FragPunk cheats review' },
      ],
    },
  ],
};

export const aimbotCopy: PageCopy = {
  lead:
    'Aim assistance is included with the main FragPunk plan—not a separate product. Here is how FOV, smoothing, and controls work before you tune them in-game.',
  sections: [
    {
      id: 'features-controls',
      heading: 'FragPunk Aimbot Features and Controls',
      paragraphs: [
        'Turn assistance on or off, pick targets, and dial how strongly the loader helps your crosshair. All of it ships inside the standard FragPunk package with ongoing updates when FragPunk patches.',
      ],
      links: [
        { href: FRAGPUNK_ROUTES.home, text: 'View all FragPunk cheat features' },
        { href: mainCheckout, text: 'Get the main plan' },
      ],
    },
    {
      id: 'fov-smoothing',
      heading: 'FOV, Smoothing, and Aim Configuration',
      paragraphs: [
        'FOV is how wide the search area is—wider catches more angles; tighter looks more natural. Smoothing controls snap versus glide. If a slider is not in your loader yet, check for the latest update in your portal.',
      ],
    },
    {
      id: 'windows',
      heading: 'Supported Windows Versions and Requirements',
      paragraphs: [
        'Build numbers, driver notes, and Hyper-V requirements are listed at checkout and in support docs. If Cloud DMA is part of your setup, read the Cloud DMA page for the extra checklist.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.cloudDma, text: 'See Cloud DMA requirements and costs' }],
    },
    {
      id: 'pricing',
      heading: 'Main plan (aimbot included)',
      paragraphs: [
        `Aimbot and ESP are both in the main plan: $${monthly.priceUsd} for ${monthly.term} or $${lifetime.priceUsd} ${lifetime.term.toLowerCase()}. Pick the term that fits how long you play—lifetime includes long-term update support.`,
      ],
      links: [
        { href: mainCheckout, text: 'Checkout — main FragPunk plan' },
        { href: FRAGPUNK_ROUTES.pricing, text: 'Compare monthly vs lifetime' },
      ],
    },
  ],
};

export const espCopy: PageCopy = {
  lead:
    'ESP (wallhack-style visuals) shows players and fight info through cover. Here is how we describe those overlays for FragPunk—same package as aim assistance.',
  sections: [
    {
      id: 'player-esp',
      heading: 'FragPunk Player ESP Features',
      paragraphs: [
        'At minimum, ESP tells you where opponents are when geometry would hide them. Labels like “wallhack,” “ESP,” and “visuals” often mean the same toggles in the loader.',
      ],
      links: [
        { href: FRAGPUNK_ROUTES.home, text: 'Explore the main FragPunk cheat offer' },
        { href: mainCheckout, text: 'Get the main plan' },
      ],
    },
    {
      id: 'indicators',
      heading: 'Health Bars, Distance, and Skeleton Indicators',
      paragraphs: [
        'Health bars and distance text save you from guessing whether to push. Skeleton ESP is the wireframe look—handy for spacing, noisy if you enable everything at once.',
      ],
    },
    {
      id: 'terminology',
      heading: 'ESP and Wallhack Terminology Explained',
      paragraphs: [
        'Wallhack means seeing through walls. ESP usually adds health, name, weapon, or similar readouts. Match features by what they do, not the marketing headline.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.aimbot, text: 'Compare aimbot features' }],
    },
    {
      id: 'pricing',
      heading: 'Pricing and Feature Availability',
      paragraphs: [
        `ESP ships with the $${monthly.priceUsd} / $${lifetime.priceUsd} main plan. Budget Cloud DMA separately only if your PC needs the Hyper-V layer.`,
      ],
      links: [
        { href: FRAGPUNK_ROUTES.pricing, text: 'Review available plans' },
        { href: mainCheckout, text: 'Checkout — main plan' },
      ],
    },
  ],
};

export const pricingCopy: PageCopy = {
  lead:
    'Listed prices for FragPunk access, Cloud DMA, and our HWID Spoofer—what you see here is what checkout shows for each product.',
  sections: [
    {
      id: 'current-plans',
      heading: 'Current FragPunk Cheat Plans',
      paragraphs: [
        `$${monthly.priceUsd} — ${monthly.term} on the main cheat (aimbot + ESP).`,
        `$${lifetime.priceUsd} — ${lifetime.term.toLowerCase()} access to the same package with ongoing updates when FragPunk patches.`,
      ],
      links: [
        { href: mainCheckout, text: 'Checkout — main FragPunk plan' },
        { href: FRAGPUNK_ROUTES.home, text: 'Explore FragPunk cheat features' },
      ],
    },
    {
      id: 'monthly-vs-lifetime',
      heading: 'Monthly vs. Lifetime Access',
      paragraphs: [
        'Monthly is lower upfront; lifetime is one payment instead of renewals. Both active tiers receive maintenance updates and loader patches as the game changes—we prioritize keeping builds current after updates.',
        'Lifetime is the better fit if you play long-term and want update coverage without renewing every month.',
      ],
    },
    {
      id: 'cloud-dma-costs',
      heading: 'Cloud DMA Costs and Separate Components',
      paragraphs: [
        `Cloud DMA is $${CLOUD_DMA_PLAN.priceUsd} lifetime—separate from the $${lifetime.priceUsd} FragPunk key. ${CLOUD_DMA_PLAN.note}`,
      ],
      links: [
        { href: FRAGPUNK_ROUTES.cloudDma, text: 'See Cloud DMA requirements and costs' },
        { href: cloudCheckout, text: 'Checkout — Cloud DMA' },
      ],
    },
    {
      id: 'hwid-spoofer',
      heading: 'HWID Spoofer',
      paragraphs: [
        `${HWID_SPOOFER_PLAN.name} — ${HWID_SPOOFER_PLAN.summary} ${HWID_SPOOFER_PLAN.priceNote}`,
      ],
      links: [
        { href: FRAGPUNK_ROUTES.hwidSpoofer, text: 'HWID Spoofer guide' },
        { href: hwidCheckout, text: 'Checkout — HWID Spoofer' },
      ],
    },
    {
      id: 'before-checkout',
      heading: 'What to Confirm Before Checkout',
      paragraphs: [
        'Windows build, Hyper-V steps, refund wording, and whether Cloud DMA is required for your PC—not just optional.',
        'Need a hardware ID reset after a ban? See the HWID Spoofer page before you buy the main cheat again on the same machine.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.review, text: 'Read the product comparison' }],
    },
  ],
};

export const pricingFaqs = [
  {
    q: 'Is Cloud DMA included in the $150 lifetime FragPunk plan?',
    a: `No—it is its own $${CLOUD_DMA_PLAN.priceUsd} lifetime product. Add Cloud DMA at checkout only if your setup requires Hyper-V isolation.`,
  },
  {
    q: 'Do plans include updates after game patches?',
    a: 'Yes. Active monthly and lifetime FragPunk access includes maintenance updates and loader patches as FragPunk releases new builds.',
  },
];

export const reviewCopy: PageCopy = {
  lead:
    'A straight look at FragPunk cheats on PC—what the package includes, how pricing breaks down, and where Cloud DMA or HWID recovery fit. Written for buyers who want clarity before checkout.',
  sections: [
    {
      id: 'included',
      heading: 'What Is Included in the FragPunk Offer?',
      paragraphs: [
        'PC software with aim assistance and ESP-style overlays, delivered through our loader and portal. We maintain updates when FragPunk patches so features stay aligned with the current game.',
        'Cheating still carries account and anti-cheat risk—read our FAQ and use conservative settings if you play on a main account.',
      ],
    },
    {
      id: 'compare-features',
      heading: 'Comparing Aimbot and ESP Features',
      paragraphs: [
        'The aimbot page covers FOV and smoothing; the ESP page covers boxes, health, and wallhack terminology. Both ship in one plan.',
      ],
      links: [
        { href: FRAGPUNK_ROUTES.aimbot, text: 'Explore aimbot features' },
        { href: FRAGPUNK_ROUTES.esp, text: 'Explore ESP features' },
        { href: mainCheckout, text: 'Get the main plan' },
      ],
    },
    {
      id: 'pricing-terms',
      heading: 'Pricing, Access Terms, and Dependencies',
      paragraphs: [
        `$${monthly.priceUsd} for ${monthly.term}, $${lifetime.priceUsd} lifetime on the core cheat, plus Cloud DMA or HWID Spoofer only when you need those products.`,
        'Cloud DMA is Hyper-V software on one machine—not a hardware DMA card. HWID Spoofer is for hardware-ban recovery with a included cleaner workflow.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.pricing, text: 'Compare FragPunk cheat prices' }],
    },
    {
      id: 'requirements-risks',
      heading: 'System Requirements, Limitations, and Risks',
      paragraphs: [
        'Hyper-V, BIOS virtualization, and Windows edition checks matter for Cloud DMA—see that page instead of guessing here.',
        'Using cheats can break game rules and cost accounts. This guide informs; you decide what risk to accept.',
      ],
    },
  ],
};

export const cloudDmaCopy: PageCopy = {
  lead:
    'Cloud DMA is Hyper-V isolation on your own PC—one machine, extra software, separate from the main FragPunk key. Read this before you enable virtualization.',
  sections: [
    {
      id: 'why-cloud-dma',
      heading: 'Why the FragPunk Offer Lists Cloud DMA',
      paragraphs: [
        'Some setups need an isolated layer between the game and the rest of Windows. Cloud DMA is that Hyper-V configuration on the PC you already own—nothing ships in a box.',
      ],
      links: [
        { href: FRAGPUNK_ROUTES.home, text: 'View the main FragPunk cheat offer' },
        { href: cloudCheckout, text: 'Checkout — Cloud DMA' },
      ],
    },
    {
      id: 'hyper-v',
      heading: 'Understanding the Single-PC Hyper-V Setup',
      paragraphs: [
        'Hyper-V is Microsoft’s hypervisor. Turning it on can change boot options, RAM use, and other tools that conflict with virtualization. Follow the setup guide step by step.',
      ],
    },
    {
      id: 'windows-features',
      heading: 'Windows Features and System Requirements',
      paragraphs: [
        'You need a Windows edition that supports Hyper-V, virtualization enabled in firmware, and enough disk space for the layer we install.',
      ],
    },
    {
      id: 'pricing',
      heading: 'Cloud DMA Pricing and Separate Components',
      paragraphs: [
        `Lifetime Cloud DMA is $${CLOUD_DMA_PLAN.priceUsd} USD—separate from the main FragPunk cheat. ${CLOUD_DMA_PLAN.note}`,
      ],
      links: [
        { href: FRAGPUNK_ROUTES.pricing, text: 'Compare plans and total costs' },
        { href: cloudCheckout, text: 'Checkout — Cloud DMA' },
      ],
    },
    {
      id: 'before-buying',
      heading: 'Questions to Confirm Before Buying',
      paragraphs: [
        'Confirm whether Cloud DMA is required for FragPunk on your PC, what refunds look like, and whether Hyper-V breaks other software you rely on.',
        'If you wanted a hardware DMA card, this is not that product.',
      ],
      links: [{ href: FRAGPUNK_ROUTES.review, text: 'Read the full product review' }],
    },
  ],
};

export const cloudDmaFaqs = [
  {
    q: 'Is Cloud DMA a physical DMA card?',
    a: 'No. It is Hyper-V software on a single PC. There is no card in a box.',
  },
  {
    q: 'Do I pay for Cloud DMA and FragPunk together?',
    a: 'They are separate checkout items. Add both at checkout if support confirms you need virtualization with the main cheat.',
  },
];

export const hwidSpooferCopy: PageCopy = {
  lead:
    'HWID Spoofer resets hardware identifiers after a hardware ban—disk serials, MAC addresses, GPU-related IDs, and related fingerprints—with a cleaner workflow included. Use it before you buy FragPunk access again on the same machine.',
  sections: [
    {
      id: 'what-it-does',
      heading: 'What the HWID Spoofer Does',
      paragraphs: [
        'An HWID ban ties punishment to your PC, not just the account. Spoofing gives you a fresh hardware fingerprint so protected games can run again after you follow the guide.',
        'Hardware Spoofer and cleanup steps ship together—run spoof and cleanup before launching the title that banned you.',
      ],
      links: [{ href: hwidCheckout, text: 'Checkout — HWID Spoofer' }],
    },
    {
      id: 'supported-titles',
      heading: 'Supported Anti-Cheats and Titles',
      paragraphs: [
        'Built for major stacks including Riot Vanguard (Valorant), Easy Anti-Cheat, BattlEye, Ricochet (Call of Duty), and other listed titles on the product page. Coverage spans FragPunk-related needs and other games on the same PC.',
      ],
    },
    {
      id: 'requirements',
      heading: 'System Requirements',
      paragraphs: [
        'Windows 10 or 11 (64-bit), administrator rights for spoof and cleanup, and stable internet for activation and updates.',
        'Follow the portal guide for HVCI, Core Isolation, TPM, and Secure Boot settings where your title requires them.',
      ],
    },
    {
      id: 'pricing',
      heading: 'HWID Spoofer Access',
      paragraphs: [
        `${HWID_SPOOFER_PLAN.priceNote} ${HWID_SPOOFER_PLAN.summary}`,
      ],
      links: [
        { href: hwidCheckout, text: 'Checkout — HWID Spoofer' },
        { href: FRAGPUNK_ROUTES.pricing, text: 'See all plans' },
        { href: mainCheckout, text: 'Main FragPunk plan' },
      ],
    },
    {
      id: 'workflow',
      heading: 'Typical Recovery Workflow',
      paragraphs: [
        'Create a restore point, run the compatibility scan, spoof identifiers, reboot cold, verify IDs changed, then launch the game or install FragPunk on a clean profile.',
        'Account-only bans need a different path—spoofing targets hardware locks, not Steam or platform account strikes alone.',
      ],
    },
  ],
};

export const hwidSpooferFaqs = [
  {
    q: 'Is a cleaner included?',
    a: 'Yes. Cleanup steps clear leftover traces before you launch again.',
  },
  {
    q: 'Do I need this to use FragPunk cheats?',
    a: 'Only if your PC is hardware-banned or support confirms you need a reset. Otherwise start with the main FragPunk plan.',
  },
];

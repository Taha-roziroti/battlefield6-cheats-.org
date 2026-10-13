import type { Bf6PageKey } from './bf6-pages';
import { screenshotById, type Bf6Screenshot } from './bf6-screenshots';

/** One screenshot per H2 section (section id → shot id). */
const SECTION_SHOT_IDS: Partial<Record<Bf6PageKey, Record<string, string>>> = {
  home: {
    'explore-the-battlefield-6-feature-set': 'carrier-deck-pistol-smoke',
    'windows-compatibility-and-system-requirements': 'silo-assault-rifle-muzzle',
    'find-the-feature-that-fits-your-setup': 'port-smoke-containers',
  },
  aimbot: {
    'set-an-activation-style-that-suits-your-setup': 'scope-tunnel-security-kill',
    'adjust-smoothness-field-of-view-and-distance': 'hangar-deck-ads-sight',
    'choose-the-target-and-bone-options': 'scoped-rifle-container-cave',
  },
  esp: {
    'player-esp-and-bot-esp': 'hangar-bay-damage-overlay',
    'make-the-display-easier-to-read': 'corridor-assault-rifle',
    'esp-and-wallhack-one-related-search-topic': 'stairwell-armor-downed',
  },
  requirements: {
    'core-windows-requirements': 'facility-armor-prompt',
    'hvci-core-isolation-tpm-and-secure-boot': 'tunnel-checkpoint-pistol',
  },
  'cloud-dma': {
    'understanding-the-single-pc-cloud-dma-model': 'cargo-catch-pistol',
    'windows-and-hyper-v-requirements': 'container-yard-puddles',
    'plans-pricing-and-checkout': 'port-smoke-containers',
  },
  'hwid-spoofer': {
    'what-an-hwid-spoofer-does': 'smoky-field-pistol',
    'plans-pricing-and-checkout': 'facility-armor-prompt',
  },
};

/** Optional screenshot beside an H3 block (home feature breakdown). */
const H3_SHOT_IDS: Partial<Record<Bf6PageKey, Record<string, string>>> = {
  home: {
    'aim-controls-you-can-adjust': 'hangar-loot-crate-glow',
    'esp-and-visual-settings': 'wooden-shack-snow-armor',
  },
};

export const PAGE_FUN_FACTS: Partial<Record<Bf6PageKey, string[]>> = {
  home: ['Save/load configs in the manager so you are not rebuilding from scratch every session.', 'Tweak FOV before distance—small view changes feel bigger than they look on paper.'],
  aimbot: ['Set activation style first; everything else hangs off that choice.', 'Bone + visibility checks are easier to tune one at a time.'],
  esp: ['Cap max distance early—less HUD noise in chaotic fights.', 'Team color filters help when multiple squads stack a lane.'],
  requirements: ['HVCI and Secure Boot must match the published checklist.', 'AMD and Intel builds are both listed—match your actual chip.'],
  'cloud-dma': ['Cloud DMA here is a Hyper-V add-on, not a physical DMA card.', 'Host PC needs headroom for the VM layer.'],
  'hwid-spoofer': ['Read the HWID guide before rebuying the main plan after a ban.'],
};

export function shotForSection(page: Bf6PageKey, sectionId: string): Bf6Screenshot | undefined {
  const shotId = SECTION_SHOT_IDS[page]?.[sectionId];
  return shotId ? screenshotById(shotId) : undefined;
}

export function shotForH3(page: Bf6PageKey, h3Id: string): Bf6Screenshot | undefined {
  const shotId = H3_SHOT_IDS[page]?.[h3Id];
  return shotId ? screenshotById(shotId) : undefined;
}

export function funFactsForPage(page: Bf6PageKey): string[] {
  return PAGE_FUN_FACTS[page] ?? [];
}

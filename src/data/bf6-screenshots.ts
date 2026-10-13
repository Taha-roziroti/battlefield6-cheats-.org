import type { Bf6PageKey } from './bf6-pages';

const GAMEPLAY_BASE = '/images/battlefield/gameplay';

export interface Bf6Screenshot {
  id: string;
  /** Raster master path (PNG) — WebP variants use `-{width}.webp`. */
  src: string;
  width: number;
  height: number;
  alt: string;
}

const shots: Record<string, Bf6Screenshot> = {
  'carrier-deck-pistol-smoke': {
    id: 'carrier-deck-pistol-smoke',
    src: `${GAMEPLAY_BASE}/carrier-deck-pistol-smoke.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 first-person view on an aircraft carrier deck with helicopters, smoke, and a pistol in hand.',
  },
  'port-smoke-containers': {
    id: 'port-smoke-containers',
    src: `${GAMEPLAY_BASE}/port-smoke-containers.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 port map with stacked shipping containers, distant smoke plumes, and a bright overcast sky.',
  },
  'silo-assault-rifle-muzzle': {
    id: 'silo-assault-rifle-muzzle',
    src: `${GAMEPLAY_BASE}/silo-assault-rifle-muzzle.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 snow-covered industrial yard with a white fuel silo while firing an assault rifle at a metal wall.',
  },
  'wooden-shack-snow-armor': {
    id: 'wooden-shack-snow-armor',
    src: `${GAMEPLAY_BASE}/wooden-shack-snow-armor.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 interior of a wooden shack opening onto a snowy lane with an on-screen armor pickup prompt.',
  },
  'hangar-loot-crate-glow': {
    id: 'hangar-loot-crate-glow',
    src: `${GAMEPLAY_BASE}/hangar-loot-crate-glow.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 ship interior with a glowing orange loot crate and red-lit stairwell doors.',
  },
  'scope-tunnel-security-kill': {
    id: 'scope-tunnel-security-kill',
    src: `${GAMEPLAY_BASE}/scope-tunnel-security-kill.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 scoped rifle view down a concrete tunnel toward a security checkpoint sign.',
  },
  'hangar-deck-ads-sight': {
    id: 'hangar-deck-ads-sight',
    src: `${GAMEPLAY_BASE}/hangar-deck-ads-sight.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 red-dot sight aimed along a hangar deck corridor marked with stencil signage.',
  },
  'scoped-rifle-container-cave': {
    id: 'scoped-rifle-container-cave',
    src: `${GAMEPLAY_BASE}/scoped-rifle-container-cave.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 cave tunnel scene with a scoped assault rifle pointed at a red shipping container.',
  },
  'hangar-bay-damage-overlay': {
    id: 'hangar-bay-damage-overlay',
    src: `${GAMEPLAY_BASE}/hangar-bay-damage-overlay.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 industrial hangar with a green command container, squad HUD, and damage vignette on screen.',
  },
  'corridor-assault-rifle': {
    id: 'corridor-assault-rifle',
    src: `${GAMEPLAY_BASE}/corridor-assault-rifle.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 tight metal corridor with fluorescent lights and an assault rifle at the ready.',
  },
  'stairwell-armor-downed': {
    id: 'stairwell-armor-downed',
    src: `${GAMEPLAY_BASE}/stairwell-armor-downed.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 dim stairwell leading to a bright exterior bay with armor and revive prompts visible.',
  },
  'facility-armor-prompt': {
    id: 'facility-armor-prompt',
    src: `${GAMEPLAY_BASE}/facility-armor-prompt.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 underground facility room with server racks and an equip-armor interaction prompt.',
  },
  'tunnel-checkpoint-pistol': {
    id: 'tunnel-checkpoint-pistol',
    src: `${GAMEPLAY_BASE}/tunnel-checkpoint-pistol.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 rocky tunnel security lane with a stop sign and pistol aimed toward the checkpoint.',
  },
  'cargo-catch-pistol': {
    id: 'cargo-catch-pistol',
    src: `${GAMEPLAY_BASE}/cargo-catch-pistol.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 shipping-container alley with a catch-the-cargo objective and pistol crosshair.',
  },
  'container-yard-puddles': {
    id: 'container-yard-puddles',
    src: `${GAMEPLAY_BASE}/container-yard-puddles.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 muddy container yard with reflective puddles between orange cargo boxes.',
  },
  'smoky-field-pistol': {
    id: 'smoky-field-pistol',
    src: `${GAMEPLAY_BASE}/smoky-field-pistol.png`,
    width: 3840,
    height: 2160,
    alt: 'Battlefield 6 open battlefield obscured by smoke while holding a pistol near burning debris.',
  },
};

/** Each screenshot appears on exactly one page. */
const PAGE_SCREENSHOT_IDS: Record<Bf6PageKey, string[]> = {
  home: [
    'carrier-deck-pistol-smoke',
    'port-smoke-containers',
    'silo-assault-rifle-muzzle',
    'wooden-shack-snow-armor',
    'hangar-loot-crate-glow',
  ],
  aimbot: ['scope-tunnel-security-kill', 'hangar-deck-ads-sight', 'scoped-rifle-container-cave'],
  esp: ['hangar-bay-damage-overlay', 'corridor-assault-rifle', 'stairwell-armor-downed'],
  requirements: ['facility-armor-prompt', 'tunnel-checkpoint-pistol'],
  'cloud-dma': ['cargo-catch-pistol', 'container-yard-puddles'],
  'hwid-spoofer': ['smoky-field-pistol'],
};

export function screenshotsForPage(page: Bf6PageKey): Bf6Screenshot[] {
  return PAGE_SCREENSHOT_IDS[page].map((id) => shots[id]);
}

export function screenshotById(id: string): Bf6Screenshot | undefined {
  return shots[id];
}

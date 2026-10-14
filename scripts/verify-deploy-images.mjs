/**
 * Fail CI/local build if critical WebP assets are missing or clearly corrupt (<2KB).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const REQUIRED = [
  'public/images/battlefield/site-hero-background-640.webp',
  'public/images/battlefield/site-hero-background-960.webp',
  'public/images/battlefield/site-hero-background.jpg',
  'public/images/battlefield/gameplay/cargo-catch-pistol-640.webp',
  'public/images/battlefield/gameplay/cargo-catch-pistol-960.webp',
  'public/images/battlefield/gameplay/carrier-deck-pistol-smoke-640.webp',
  'public/images/battlefield/gameplay/hangar-loot-crate-glow.png',
  'public/images/battlefield/gameplay/hangar-loot-crate-glow-640.webp',
  'public/images/battlefield/gameplay/wooden-shack-snow-armor.png',
  'public/images/battlefield/gameplay/wooden-shack-snow-armor-640.webp',
];

const MIN_BYTES = 2048;
let failed = 0;

for (const rel of REQUIRED) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error(`Missing required image: ${rel}`);
    failed += 1;
    continue;
  }
  const size = fs.statSync(full).size;
  if (size < MIN_BYTES) {
    console.error(`Corrupt image (${size} bytes): ${rel}`);
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`verify-deploy-images: ${failed} problem(s). Run npm run images:restore`);
  process.exit(1);
}

console.log(`verify-deploy-images: OK (${REQUIRED.length} assets).`);

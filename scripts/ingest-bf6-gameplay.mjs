/**
 * One-time / manual ingest: copy provided gameplay PNGs, upscale masters to 4K width, emit WebP variants.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const assetsDir = [
  path.join(root, 'assets'),
  path.join(
    process.env.USERPROFILE ?? process.env.HOME ?? '',
    '.cursor',
    'projects',
    'd-Websites-battlefield6-cheats-org',
    'assets',
  ),
].find((dir) => dir && fs.existsSync(dir));

const OUTPUT_DIR = path.join(root, 'public', 'images', 'battlefield', 'gameplay');
const TARGET_WIDTH = 3840;
const WEBP_WIDTHS = [480, 640, 960, 1280, 1536, 1920, 2560, 3840];

/** Source asset suffix → canonical basename (no ext). */
const FILES = [
  ['0m49s', 'scoped-rifle-container-cave'],
  ['1m01s', 'scope-tunnel-security-kill'],
  ['1m05s', 'tunnel-checkpoint-pistol'],
  ['1m26s', 'silo-assault-rifle-muzzle'],
  ['1m32s', 'hangar-bay-damage-overlay'],
  ['1m40s', 'corridor-assault-rifle'],
  ['1m59s', 'carrier-deck-pistol-smoke'],
  ['2m09s', 'smoky-field-pistol'],
  ['2m31s', 'facility-armor-prompt'],
  ['2m34s', 'stairwell-armor-downed'],
  ['2m45s', 'hangar-loot-crate-glow'],
  ['3m01s', 'hangar-deck-ads-sight'],
  ['3m25s', 'wooden-shack-snow-armor'],
  ['3m36s', 'container-yard-puddles'],
  ['3m37s', 'cargo-catch-pistol'],
  ['3m41s', 'port-smoke-containers'],
];

function findAsset(marker) {
  if (!assetsDir || !fs.existsSync(assetsDir)) return null;
  const match = fs.readdirSync(assetsDir).find((name) => name.includes(`_${marker}_`));
  return match ? path.join(assetsDir, match) : null;
}

async function processOne(inputPath, baseName) {
  const masterPng = path.join(OUTPUT_DIR, `${baseName}.png`);
  const staging = path.join(OUTPUT_DIR, `.staging-${baseName}.png`);
  fs.copyFileSync(inputPath, staging);
  const pipeline = sharp(staging).resize({ width: TARGET_WIDTH, withoutEnlargement: false });
  const meta = await pipeline.metadata();
  await pipeline.png({ compressionLevel: 9 }).toFile(masterPng);

  const masterWidth = meta.width && meta.width >= TARGET_WIDTH ? meta.width : TARGET_WIDTH;
  const widths = WEBP_WIDTHS.filter((w) => w <= masterWidth);

  for (const width of widths) {
    const out = path.join(OUTPUT_DIR, `${baseName}-${width}.webp`);
    await sharp(masterPng)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 88, effort: 4, smartSubsample: true })
      .toFile(out);
  }

  fs.unlinkSync(staging);
  console.log(`OK ${baseName} (${meta.width ?? '?'}→${TARGET_WIDTH})`);
  return { width: TARGET_WIDTH, height: Math.round((meta.height ?? 373) * (TARGET_WIDTH / (meta.width ?? 663))) };
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const dimensions = {};
for (const [marker, baseName] of FILES) {
  const input = findAsset(marker);
  if (!input) {
    console.warn(`Missing asset for ${marker}`);
    continue;
  }
  dimensions[baseName] = await processOne(input, baseName);
}

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'dimensions.json'),
  JSON.stringify(dimensions, null, 2),
  'utf8',
);

console.log('Gameplay ingest complete.');

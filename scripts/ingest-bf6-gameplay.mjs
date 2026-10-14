/**
 * Ingest gameplay frames from Cursor assets (BF6_*_4K.webp or Indiana *_663x373_*.png).
 * Writes PNG masters at native resolution and WebP variants (no AI / no forced 4K upscale).
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
  if (!assetsDir) return null;
  const files = fs.readdirSync(assetsDir);
  const bf6 = files.find((name) => name.includes(`BF6_${marker}_4K`));
  if (bf6) return path.join(assetsDir, bf6);
  const indiana = files.find(
    (name) => name.includes(`_${marker}_`) && /\.(png|jpe?g|webp)$/i.test(name),
  );
  return indiana ? path.join(assetsDir, indiana) : null;
}

async function processOne(inputPath, baseName) {
  const masterPng = path.join(OUTPUT_DIR, `${baseName}.png`);
  const staging = path.join(OUTPUT_DIR, `.ingest-${baseName}.bin`);
  fs.copyFileSync(inputPath, staging);
  const pipeline = sharp(staging, { failOn: 'none' }).rotate();
  const meta = await pipeline.metadata();
  const masterWidth = meta.width ?? 0;
  const masterHeight = meta.height ?? 0;
  if (!masterWidth || !masterHeight) {
    throw new Error(`No dimensions: ${inputPath}`);
  }

  await pipeline.clone().png({ compressionLevel: 9 }).toFile(masterPng);

  const widths = WEBP_WIDTHS.filter((w) => w <= masterWidth);
  const allowed = new Set(widths.map((w) => `${baseName}-${w}.webp`));
  const prefix = `${baseName}-`;

  for (const width of widths) {
    const out = path.join(OUTPUT_DIR, `${baseName}-${width}.webp`);
    await sharp(masterPng)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 90, effort: 5, smartSubsample: true })
      .toFile(out);
    console.log(`Wrote ${path.relative(root, out)}`);
  }

  for (const existing of fs.readdirSync(OUTPUT_DIR)) {
    if (!existing.startsWith(prefix) || !existing.endsWith('.webp')) continue;
    const widthPart = existing.slice(prefix.length, -'.webp'.length);
    if (!/^\d+$/.test(widthPart)) continue;
    if (allowed.has(existing)) continue;
    fs.unlinkSync(path.join(OUTPUT_DIR, existing));
    console.log(`Removed stale ${existing}`);
  }

  fs.unlinkSync(staging);
  console.log(`OK ${baseName} (${masterWidth}×${masterHeight})`);
  return { width: masterWidth, height: masterHeight };
}

if (!assetsDir) {
  console.error('No assets directory found.');
  process.exit(1);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const dimensions = {};
let missing = 0;
for (const [marker, baseName] of FILES) {
  const input = findAsset(marker);
  if (!input) {
    console.warn(`Missing asset for ${marker} (${baseName})`);
    missing += 1;
    continue;
  }
  dimensions[baseName] = await processOne(input, baseName);
}

if (missing > 0) {
  console.error(`ingest-bf6-gameplay: ${missing} asset(s) missing.`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'dimensions.json'),
  JSON.stringify(dimensions, null, 2),
  'utf8',
);

console.log('Gameplay ingest complete.');

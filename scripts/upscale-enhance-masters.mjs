/**
 * Upscale raster masters to 4K width (3840px) and apply conservative enhancement
 * (sharpen + mild tone). Does not use generative AI — preserves pixels and composition.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const TARGET_WIDTH = 3840;
const BACKUP_ROOT = path.join(root, 'public', 'images', '_masters-backup');

const RASTER_DIRS = [
  'public/images/battlefield/gameplay',
  'public/images/battlefield',
  'public/images/fragpunk',
  'public/images/gameplay',
  'public/images/blog',
];

function isMasterFile(name) {
  return (
    /\.(png|jpe?g)$/i.test(name) &&
    !/-\d+\.webp$/i.test(name) &&
    !name.startsWith('og-') &&
    !name.endsWith('.upscale.tmp') &&
    name !== 'dimensions.json' &&
    !name.endsWith('-4k.jpg')
  );
}

function backupOnce(inputPath, relativeFromPublic) {
  const dest = path.join(BACKUP_ROOT, relativeFromPublic);
  if (fs.existsSync(dest)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(inputPath, dest);
}

async function enhanceMaster(inputPath) {
  const input = sharp(inputPath, { failOn: 'none' }).rotate();
  const meta = await input.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) {
    console.warn(`Skip (no size): ${inputPath}`);
    return;
  }

  let pipeline = input;
  const upscale = width < TARGET_WIDTH;

  if (upscale) {
    pipeline = pipeline.resize({
      width: TARGET_WIDTH,
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    });
  }

  pipeline = pipeline
    .modulate({ brightness: 1.02, saturation: 1.04 })
    .sharpen({ sigma: upscale ? 1.1 : 0.75, m1: 1.05, m2: 0.35, x1: 2, y2: 10, y3: 20 });

  const ext = path.extname(inputPath).toLowerCase();
  const tmp = `${inputPath}.enhance.tmp`;

  if (ext === '.png') {
    await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(tmp);
  }

  fs.renameSync(tmp, inputPath);
  const tag = upscale ? `upscaled ${width}→${TARGET_WIDTH}` : `enhanced ${width}px`;
  console.log(`${tag}: ${path.relative(root, inputPath)}`);
}

async function processDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  for (const file of fs.readdirSync(dir)) {
    if (!isMasterFile(file)) continue;
    const input = path.join(dir, file);
    const rel = path.relative(path.join(root, 'public', 'images'), input);
    backupOnce(input, rel);
    await enhanceMaster(input);
  }
}

fs.mkdirSync(BACKUP_ROOT, { recursive: true });

const dirs = process.argv.slice(2).length ? process.argv.slice(2) : RASTER_DIRS;
for (const dir of dirs) {
  await processDir(dir);
}

console.log('4K upscale + enhancement complete. Run npm run optimize:images to refresh WebP variants.');

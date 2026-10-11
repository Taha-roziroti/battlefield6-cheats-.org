import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const OUTPUT_WIDTHS = [480, 640, 960, 1280, 1536, 1920];
const rasterDirs = [
  'public/images/gameplay',
  'public/images/blog',
  'public/images/fragpunk',
];

const HERO_MASTER_MIN = 1920;
const CONTENT_MASTER_MIN = 1536;

function masterMinWidth(relativeDir, fileName) {
  if (relativeDir.includes('fragpunk') && fileName === 'site-hero-background.jpg') {
    return HERO_MASTER_MIN;
  }
  if (relativeDir.includes('fragpunk')) {
    return CONTENT_MASTER_MIN;
  }
  return 1280;
}

async function ensureMasterWidth(inputPath, minWidth) {
  const meta = await sharp(inputPath).metadata();
  const current = meta.width ?? 0;
  if (current >= minWidth) return current;

  const ext = path.extname(inputPath).toLowerCase();
  const temp = `${inputPath}.upscale.tmp`;

  let pipeline = sharp(inputPath)
    .resize({ width: minWidth, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.65, m1: 0.8, m2: 0.4 });

  if (ext === '.png') {
    await pipeline.png({ compressionLevel: 8 }).toFile(temp);
  } else {
    await pipeline.jpeg({ quality: 92, mozjpeg: true }).toFile(temp);
  }

  fs.renameSync(temp, inputPath);
  console.log(
    `Upscaled ${path.relative(root, inputPath)}: ${current}px → ${minWidth}px`,
  );
  return minWidth;
}

async function optimizeDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const files = fs
    .readdirSync(dir)
    .filter(
      (file) =>
        /\.(png|jpe?g)$/i.test(file) &&
        !/-\d+\.webp$/i.test(file) &&
        !file.startsWith('og-') &&
        !file.endsWith('.upscale.tmp'),
    );

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|jpe?g)$/i, '');
    const minMaster = masterMinWidth(relativeDir, file);
    const masterWidth = await ensureMasterWidth(input, minMaster);

    const widths = OUTPUT_WIDTHS.filter((w) => w <= masterWidth);
    const source = sharp(input);

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      await source
        .clone()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 88, effort: 4, smartSubsample: true })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
    }

    const allowed = new Set(widths.map((w) => `${base}-${w}.webp`));
    const prefix = `${base}-`;
    for (const existing of fs.readdirSync(dir)) {
      if (!existing.startsWith(prefix) || !existing.endsWith('.webp')) continue;
      const widthPart = existing.slice(prefix.length, -'.webp'.length);
      if (!/^\d+$/.test(widthPart)) continue;
      if (allowed.has(existing)) continue;
      fs.unlinkSync(path.join(dir, existing));
      console.log(`Removed stale ${path.relative(root, path.join(dir, existing))}`);
    }
  }
}

const ogSources = [
  { out: 'home.webp', src: 'training-esp-boxes.png' },
  { out: 'aimbot.webp', src: 'training-aimbot-scope.png' },
  { out: 'esp.webp', src: 'match-esp-silhouette.jpg' },
  { out: 'pricing.webp', src: 'training-esp-indicators.png' },
  { out: 'review.webp', src: 'match-dark-corridor.jpg' },
];

async function writeOgImages() {
  const fragDir = path.join(root, 'public/images/fragpunk');
  const ogDir = path.join(fragDir, 'og');
  if (!fs.existsSync(fragDir)) return;
  fs.mkdirSync(ogDir, { recursive: true });

  for (const { out, src } of ogSources) {
    const input = path.join(fragDir, src);
    if (!fs.existsSync(input)) {
      console.warn(`Skip OG ${out}: missing ${src}`);
      continue;
    }
    const output = path.join(ogDir, out);
    await sharp(input)
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .webp({ quality: 88, effort: 4 })
      .toFile(output);
    console.log(`Wrote ${path.relative(root, output)}`);
  }
}

for (const dir of rasterDirs) {
  await optimizeDir(dir);
}

await writeOgImages();

console.log('Image optimization complete.');

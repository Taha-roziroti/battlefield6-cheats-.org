import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const widths = [320, 400, 512, 640, 960];
const rasterDirs = [
  'public/images/gameplay',
  'public/images/blog',
  'public/images/fragpunk',
];

async function optimizeDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const files = fs
    .readdirSync(dir)
    .filter(
      (file) =>
        /\.(png|jpe?g)$/i.test(file) &&
        !/-\d+\.webp$/i.test(file) &&
        !file.startsWith('og-'),
    );

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|jpe?g)$/i, '');

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
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
      .webp({ quality: 85, effort: 4 })
      .toFile(output);
    console.log(`Wrote ${path.relative(root, output)}`);
  }
}

for (const dir of rasterDirs) {
  await optimizeDir(dir);
}

await writeOgImages();

console.log('Image optimization complete.');

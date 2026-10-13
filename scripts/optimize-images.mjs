import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const OUTPUT_WIDTHS = [480, 640, 960, 1280, 1536, 1920, 2560, 3840];
const rasterDirs = [
  'public/images/battlefield/gameplay',
  'public/images/battlefield',
  'public/images/fragpunk',
  'public/images/gameplay',
  'public/images/blog',
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
        !file.startsWith('og-') &&
        !file.endsWith('.upscale.tmp') &&
        file !== 'dimensions.json' &&
        !file.endsWith('-4k.jpg'),
    );

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|jpe?g)$/i, '');
    const source = sharp(input);
    const meta = await source.metadata();
    const masterWidth = meta.width ?? 1280;

    const widths = OUTPUT_WIDTHS.filter((w) => w <= masterWidth);

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      await source
        .clone()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 90, effort: 5, smartSubsample: true })
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

const dirs = process.argv.slice(2).length ? process.argv.slice(2) : rasterDirs;
for (const dir of dirs) {
  await optimizeDir(dir);
}

console.log('Image optimization complete.');

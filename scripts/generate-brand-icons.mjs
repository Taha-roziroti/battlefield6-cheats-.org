import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const sourcePath = path.join(publicDir, 'logo.svg');

if (!fs.existsSync(sourcePath)) {
  console.error('Missing logo source:', sourcePath);
  process.exit(1);
}

const base = await sharp(sourcePath)
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 10, g: 13, b: 16, alpha: 1 },
  })
  .png()
  .toBuffer();

await sharp(base).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16.png'));
await sharp(base).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32.png'));
await sharp(base).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));
await sharp(base).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
await sharp(base).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
await sharp(base).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));

console.log('Brand icons generated from public/logo.svg');

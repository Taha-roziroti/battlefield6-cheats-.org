import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const sourcePath = path.join(publicDir, 'brand', 'fragpunk-logo-source.jpg');

if (!fs.existsSync(sourcePath)) {
  console.error('Missing brand source:', sourcePath);
  process.exit(1);
}

/** Square crop biased toward the horned G mark (readable at 16–32px). */
function gIconExtract(trimmedWidth, trimmedHeight) {
  const size = Math.min(trimmedWidth, trimmedHeight);
  const gCenterX = trimmedWidth * 0.36;
  let left = Math.round(gCenterX - size / 2);
  left = Math.max(0, Math.min(left, trimmedWidth - size));
  return { left, top: 0, width: size, height: size };
}

async function prepareSources() {
  const trimmedBuf = await sharp(sourcePath).trim({ threshold: 15 }).png().toBuffer();
  const trimmed = await sharp(trimmedBuf).metadata();
  const w = trimmed.width ?? 593;
  const h = trimmed.height ?? 269;

  const extract = gIconExtract(w, h);
  const iconSquare = await sharp(trimmedBuf).extract(extract).png().toBuffer();

  const wordmarkSquare = await sharp(trimmedBuf)
    .resize(160, 160, {
      fit: 'contain',
      background: { r: 10, g: 13, b: 16, alpha: 1 },
    })
    .extend({
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      background: { r: 10, g: 13, b: 16, alpha: 1 },
    })
    .png()
    .toBuffer();

  return { iconSquare, wordmarkSquare };
}

const { iconSquare, wordmarkSquare } = await prepareSources();

await sharp(iconSquare).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16.png'));
await sharp(iconSquare).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32.png'));
await sharp(iconSquare).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));
await sharp(wordmarkSquare).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
await sharp(wordmarkSquare).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
await sharp(wordmarkSquare).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));

console.log('Brand icons generated from public/brand/fragpunk-logo-source.jpg');

/**
 * Restore raster masters from public/images/_masters-backup/ (one-time recovery).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const backupRoot = path.join(root, 'public', 'images', '_masters-backup');
const imagesRoot = path.join(root, 'public', 'images');

if (!fs.existsSync(backupRoot)) {
  console.error('No backup folder:', backupRoot);
  process.exit(1);
}

let restored = 0;

function walk(relativeDir) {
  const dir = path.join(backupRoot, relativeDir);
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      walk(rel);
      continue;
    }
    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;
    const src = path.join(backupRoot, rel);
    const dest = path.join(imagesRoot, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    restored += 1;
    console.log(`Restored ${path.relative(root, dest)}`);
  }
}

walk('');

// Hero: keep full-quality 4k copy if present
const hero4k = path.join(imagesRoot, 'battlefield', 'site-hero-background-4k.jpg');
const heroMaster = path.join(imagesRoot, 'battlefield', 'site-hero-background.jpg');
if (fs.existsSync(hero4k) && fs.statSync(hero4k).size > 100_000) {
  fs.copyFileSync(hero4k, heroMaster);
  console.log('Restored public/images/battlefield/site-hero-background.jpg from -4k.jpg');
}

console.log(`Restore complete (${restored} file(s)). Run npm run optimize:images next.`);

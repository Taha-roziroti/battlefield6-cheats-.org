import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

if (!fs.existsSync(dist)) {
  console.error('write-deploy-meta: dist/ missing');
  process.exit(1);
}

fs.writeFileSync(path.join(dist, '.nojekyll'), '');
const sha = process.env.GITHUB_SHA ?? 'local';
const builtAt = new Date().toISOString();
fs.writeFileSync(
  path.join(dist, 'deploy-revision.txt'),
  `commit=${sha}\nbuilt=${builtAt}\n`,
  'utf8',
);

const required = [
  'images/battlefield/site-hero-background-640.webp',
  'images/battlefield/site-hero-background.jpg',
  'images/battlefield/gameplay/cargo-catch-pistol-640.webp',
];

for (const rel of required) {
  const full = path.join(dist, rel);
  if (!fs.existsSync(full)) {
    console.error(`write-deploy-meta: missing in dist: ${rel}`);
    process.exit(1);
  }
  const size = fs.statSync(full).size;
  if (size < 2048) {
    console.error(`write-deploy-meta: corrupt in dist (${size} B): ${rel}`);
    process.exit(1);
  }
}

console.log(`write-deploy-meta: OK (${sha.slice(0, 7)})`);

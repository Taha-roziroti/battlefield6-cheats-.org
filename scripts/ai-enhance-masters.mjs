/**
 * Global AI enhancement (free, local): Real-ESRGAN NCNN Vulkan → 4K masters, then WebP via optimize-images.
 *
 * Uses originals from public/images/_masters-backup/ when present (avoids compounding prior Sharp passes).
 * First run downloads the official Windows/macOS/Linux binary from GitHub (~40MB). Needs Vulkan GPU.
 *
 * Env:
 *   REALESRGAN_BIN — path to realesrgan-ncnn-vulkan executable (optional)
 *   REALESRGAN_MODEL — default realesrgan-x4plus
 *   REALESRGAN_TILE — default 512 (lower if GPU runs out of VRAM)
 *   SKIP_AI_ENHANCE=1 — skip (for CI without GPU)
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { isMasterFile, RASTER_DIRS, TARGET_WIDTH } from './lib/image-masters.mjs';
import { ensureRealEsrgan, runRealEsrgan } from './lib/realesrgan-ncnn.mjs';

const root = process.cwd();
const BACKUP_ROOT = path.join(root, 'public', 'images', '_masters-backup');
const CACHE_PATH = path.join(root, '.tools', 'ai-enhance-cache.json');
const cliArgs = process.argv.slice(2);
const force = cliArgs.includes('--force');

function backupOnce(inputPath, relativeFromPublic) {
  const dest = path.join(BACKUP_ROOT, relativeFromPublic);
  if (fs.existsSync(dest)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(inputPath, dest);
}

function hashFile(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function loadCache() {
  if (!fs.existsSync(CACHE_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

/** @returns {{ prepWidth: number, scale: 2 | 4 }} */
function planUpscale(width) {
  if (width >= TARGET_WIDTH) {
    const half = Math.max(1, Math.round(width / 2));
    return { prepWidth: half, scale: 2 };
  }
  if (width * 4 >= TARGET_WIDTH) return { prepWidth: width, scale: 4 };
  return { prepWidth: width, scale: 2 };
}

async function writeMaster(outputPath, pipeline) {
  const ext = path.extname(outputPath).toLowerCase();
  const tmp = `${outputPath}.ai.tmp`;
  if (ext === '.png') {
    await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(tmp);
  }
  fs.renameSync(tmp, outputPath);
}

async function enhanceOne({ exe, cwd }, masterPath, relKey, cache) {
  const relFromImages = path.relative(path.join(root, 'public', 'images'), masterPath);
  backupOnce(masterPath, relFromImages);

  const sourcePath = path.join(BACKUP_ROOT, relFromImages);
  const inputPath = fs.existsSync(sourcePath) ? sourcePath : masterPath;
  const sourceHash = hashFile(inputPath);
  const cacheKey = `${relKey}:${sourceHash}`;
  if (!force && cache[relKey] === cacheKey) {
    console.log(`Skip (cached): ${path.relative(root, masterPath)}`);
    return;
  }

  const meta = await sharp(inputPath, { failOn: 'none' }).rotate().metadata();
  const width = meta.width ?? 0;
  if (!width) {
    console.warn(`Skip (no size): ${masterPath}`);
    return;
  }

  const { prepWidth, scale } = planUpscale(width);
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bf6-ai-'));
  const prepPath = path.join(tmpDir, 'prep.png');
  const aiOutPath = path.join(tmpDir, 'ai.png');

  try {
    await sharp(inputPath, { failOn: 'none' })
      .rotate()
      .resize({ width: prepWidth, kernel: sharp.kernel.lanczos3 })
      .png()
      .toFile(prepPath);

    await runRealEsrgan({ exe, cwd, input: prepPath, output: aiOutPath, scale });

    let pipeline = sharp(aiOutPath, { failOn: 'none' }).rotate();
    const aiMeta = await pipeline.metadata();
    const aiWidth = aiMeta.width ?? 0;
    if (aiWidth > TARGET_WIDTH) {
      pipeline = pipeline.resize({ width: TARGET_WIDTH, kernel: sharp.kernel.lanczos3 });
    } else if (aiWidth < TARGET_WIDTH) {
      pipeline = pipeline.resize({ width: TARGET_WIDTH, kernel: sharp.kernel.lanczos3 });
    }

    await writeMaster(masterPath, pipeline);
    cache[relKey] = cacheKey;
    console.log(
      `AI ${scale}x → ${TARGET_WIDTH}px: ${path.relative(root, masterPath)} (from ${width}px source)`,
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

async function processDir(relativeDir, ctx, cache) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  for (const file of fs.readdirSync(dir)) {
    if (!isMasterFile(file)) continue;
    const masterPath = path.join(dir, file);
    const relKey = path.relative(root, masterPath).replace(/\\/g, '/');
    await enhanceOne(ctx, masterPath, relKey, cache);
  }
}

if (process.env.SKIP_AI_ENHANCE === '1') {
  console.log('SKIP_AI_ENHANCE=1 — skipping AI enhancement.');
  process.exit(0);
}

const targetDirs = cliArgs.filter((a) => !a.startsWith('--'));
const dirsToRun = targetDirs.length ? targetDirs : RASTER_DIRS;

fs.mkdirSync(BACKUP_ROOT, { recursive: true });
const { exe, cwd } = await ensureRealEsrgan(root);
const cache = loadCache();

for (const dir of dirsToRun) {
  await processDir(dir, { exe, cwd }, cache);
}

saveCache(cache);
console.log('AI enhancement complete. Run npm run optimize:images to refresh WebP variants.');

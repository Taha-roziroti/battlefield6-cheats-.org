/**
 * Free local AI upscale via Real-ESRGAN NCNN Vulkan (xinntao/Real-ESRGAN release binaries).
 * Requires a Vulkan-capable GPU. No cloud API.
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';

const execFileAsync = promisify(execFile);

const RELEASE_TAG = 'v0.2.5.0';
const ASSET_BY_PLATFORM = {
  win32: 'realesrgan-ncnn-vulkan-20220424-windows.zip',
  linux: 'realesrgan-ncnn-vulkan-20220424-ubuntu.zip',
  darwin: 'realesrgan-ncnn-vulkan-20220424-macos.zip',
};

const DEFAULT_MODEL = 'realesrgan-x4plus';

function toolRoot(root) {
  return path.join(root, '.tools', 'realesrgan-ncnn-vulkan');
}

function findExecutable(dir) {
  const names =
    process.platform === 'win32'
      ? ['realesrgan-ncnn-vulkan.exe', 'realesrgan-ncnn-vulkan']
      : ['realesrgan-ncnn-vulkan', 'realesrgan-ncnn-vulkan.exe'];

  for (const name of names) {
    const direct = path.join(dir, name);
    if (fs.existsSync(direct)) return direct;
  }

  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (names.includes(entry.name)) return full;
    }
  }
  return null;
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function extractZip(zipPath, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  if (process.platform === 'win32') {
    const ps = `Expand-Archive -LiteralPath '${zipPath.replace(/'/g, "''")}' -DestinationPath '${destDir.replace(/'/g, "''")}' -Force`;
    await execFileAsync('powershell.exe', ['-NoProfile', '-Command', ps]);
    return;
  }
  try {
    await execFileAsync('unzip', ['-o', zipPath, '-d', destDir]);
  } catch {
    await execFileAsync('tar', ['-xf', zipPath, '-C', destDir]);
  }
}

/**
 * @returns {{ exe: string, cwd: string }}
 */
export async function ensureRealEsrgan(root) {
  const envBin = process.env.REALESRGAN_BIN;
  if (envBin && fs.existsSync(envBin)) {
    return { exe: envBin, cwd: path.dirname(envBin) };
  }

  const installRoot = toolRoot(root);
  if (fs.existsSync(installRoot)) {
    const existing = findExecutable(installRoot);
    if (existing) {
      return { exe: existing, cwd: path.dirname(existing) };
    }
  }

  const asset = ASSET_BY_PLATFORM[process.platform];
  if (!asset) {
    throw new Error(
      `Unsupported platform ${process.platform}. Set REALESRGAN_BIN to a local realesrgan-ncnn-vulkan binary.`,
    );
  }

  const url = `https://github.com/xinntao/Real-ESRGAN/releases/download/${RELEASE_TAG}/${asset}`;
  const zipPath = path.join(installRoot, asset);
  fs.mkdirSync(installRoot, { recursive: true });

  console.log(`Downloading Real-ESRGAN NCNN Vulkan (${RELEASE_TAG})…`);
  await download(url, zipPath);
  await extractZip(zipPath, installRoot);
  fs.unlinkSync(zipPath);

  const exe = findExecutable(installRoot);
  if (!exe) {
    throw new Error('Real-ESRGAN binary not found after extract. Set REALESRGAN_BIN manually.');
  }
  console.log(`Real-ESRGAN ready: ${exe}`);
  return { exe, cwd: path.dirname(exe) };
}

/**
 * @param {object} opts
 * @param {string} opts.exe
 * @param {string} opts.cwd
 * @param {string} opts.input
 * @param {string} opts.output
 * @param {2 | 4} opts.scale
 */
export async function runRealEsrgan({ exe, cwd, input, output, scale }) {
  const tile = process.env.REALESRGAN_TILE ?? '512';
  const model = process.env.REALESRGAN_MODEL ?? DEFAULT_MODEL;
  const args = [
    '-i',
    input,
    '-o',
    output,
    '-n',
    model,
    '-s',
    String(scale),
    '-f',
    'png',
    '-t',
    tile,
  ];

  await execFileAsync(exe, args, { cwd, maxBuffer: 64 * 1024 * 1024 });
  if (!fs.existsSync(output)) {
    throw new Error(`Real-ESRGAN produced no output: ${output}`);
  }
}

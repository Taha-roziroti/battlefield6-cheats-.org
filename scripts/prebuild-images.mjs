/**
 * Local builds may refresh WebPs; CI uses committed variants (faster, avoids OOM on 4K masters).
 */
import { execSync } from 'node:child_process';

if (process.env.CI === 'true') {
  console.log('prebuild-images: CI=true — skipping optimize-images (using committed WebPs).');
} else {
  execSync('node scripts/optimize-images.mjs', { stdio: 'inherit' });
}

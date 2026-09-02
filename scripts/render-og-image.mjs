import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const svgPath = join(root, 'public', 'og-image.svg');
const pngPath = join(root, 'public', 'og-image.png');

const svgBuffer = await readFile(svgPath);

await sharp(svgBuffer)
  .resize(1200, 630, {
    fit: 'contain',
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  })
  .png()
  .toFile(pngPath);

console.log(`✓ Rendered og-image.png (1200x630) from og-image.svg`);

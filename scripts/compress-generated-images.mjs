import sharp from 'sharp';
import { readdir, unlink } from 'node:fs/promises';
import { join, resolve, extname, basename } from 'node:path';

const dir = resolve(import.meta.dirname, '..', 'public', 'images', 'generated');
const files = (await readdir(dir)).filter((f) => extname(f).toLowerCase() === '.png');

for (const file of files) {
  const src = join(dir, file);
  const dest = join(dir, `${basename(file, extname(file))}.jpg`);
  await sharp(src).jpeg({ quality: 82, mozjpeg: true }).toFile(dest);
  await unlink(src);
  console.log(`compressed ${file} -> ${basename(dest)}`);
}

#!/usr/bin/env node

/**
 * Crop product images to remove the Menchly app sidebar and status tooltips
 * Preserves originals in public/images/product/raw/
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public/images/product');
const rawDir = join(publicDir, 'raw');

// Ensure raw directory exists
if (!existsSync(rawDir)) {
  mkdirSync(rawDir, { recursive: true });
}

const images = [
  // Newer captures (sidebar only)
  { file: 'overview.png', leftCrop: 162, bottomCrop: 0 },
  { file: 'prompts.png', leftCrop: 162, bottomCrop: 0 },
  { file: 'mentions.png', leftCrop: 162, bottomCrop: 0 },
  { file: 'citations.png', leftCrop: 162, bottomCrop: 0 },
  { file: 'ai-traffic.png', leftCrop: 162, bottomCrop: 0 },
  
  // Older captures (sidebar + tooltip at bottom)
  { file: 'sentiment.png', leftCrop: 162, bottomCrop: 25 },
  { file: 'competitors.png', leftCrop: 162, bottomCrop: 25 },
  { file: 'ai-crawlers.png', leftCrop: 162, bottomCrop: 25 }
];

console.log('Cropping product images...\n');

for (const { file, leftCrop, bottomCrop } of images) {
  const srcPath = join(publicDir, file);
  const rawPath = join(rawDir, file);
  
  if (!existsSync(srcPath)) {
    console.log(`⚠️  ${file} not found, skipping`);
    continue;
  }
  
  // Back up original if not already backed up
  if (!existsSync(rawPath)) {
    copyFileSync(srcPath, rawPath);
    console.log(`📦 Backed up ${file} → raw/${file}`);
  }
  
  try {
    // Get dimensions
    const getDims = execSync(`sips -g pixelWidth -g pixelHeight "${rawPath}" | grep -E 'pixelWidth|pixelHeight' | awk '{print $2}'`, { encoding: 'utf-8' });
    const [width, height] = getDims.trim().split('\n').map(Number);
    
    if (!width || !height) {
      console.log(`❌ Could not read dimensions for ${file}`);
      continue;
    }
    
    const newWidth = width - leftCrop;
    const newHeight = height - bottomCrop;
    
    // Crop: --cropOffset Y X means top-left corner, then width height
    const cropCmd = `sips --cropOffset 0 ${leftCrop} --cropToHeightWidth ${newHeight} ${newWidth} "${rawPath}" --out "${srcPath}"`;
    execSync(cropCmd, { stdio: 'pipe' });
    
    console.log(`✂️  Cropped ${file}: ${width}×${height} → ${newWidth}×${newHeight}`);
  } catch (err) {
    console.log(`❌ Failed to crop ${file}:`, err.message);
  }
}

console.log('\n✅ Done! Originals preserved in public/images/product/raw/');

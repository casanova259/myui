// optimize-images.mjs
// Run with: node optimize-images.mjs
// Requires: npm install sharp
//
// Resizes every source image down to a sane max width before compressing,
// so you're not shipping 4000px+ source files for a 1920px-wide hero.

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'public/f1Scroll-optimized');        // adjust to your actual folder
const OUT_DIR = path.join(__dirname, 'public/f1Scroll-optimized-optimized');

// Per-file overrides: anything not listed falls back to DEFAULT_MAX_WIDTH.
// Set these based on where the image actually renders:
//   - hero backgrounds / full-bleed images -> 1920
//   - project grid thumbnails -> 1200 (or even 800, they're small cells)
//   - about section images -> match the rendered width (~1000-1200)
const MAX_WIDTH_OVERRIDES = {
    '1.jpg': 1400,
    '14.jpg': 1100,   // About section image, rendered at ~1000px wide
    '9.jpg': 1200,
    '10.jpg': 1200,
    '12.jpg': 1200,
    '13.jpg': 1200,
};

const DEFAULT_MAX_WIDTH = 1920;
const JPEG_QUALITY = 80;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(SRC_DIR).filter((f) => /\.(jpe?g|png)$/i.test(f));

async function run() {
    for (const file of files) {
        const inputPath = path.join(SRC_DIR, file);
        const baseName = path.parse(file).name;
        const outputPath = path.join(OUT_DIR, `${baseName}.jpg`); // normalize PNGs to JPEG too

        const maxWidth = MAX_WIDTH_OVERRIDES[file] || DEFAULT_MAX_WIDTH;

        const before = fs.statSync(inputPath).size;

        await sharp(inputPath)
            .resize({ width: maxWidth, withoutEnlargement: true })
            .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
            .toFile(outputPath);

        const after = fs.statSync(outputPath).size;
        const savedPct = (100 - (after / before) * 100).toFixed(1);

        console.log(
            `${file} -> ${baseName}.jpg | ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (-${savedPct}%)`
        );
    }

    console.log('\nDone. Review /public/f1Scroll-optimized-optimized, then swap it in for /public/f1Scroll-optimized.');
    console.log('If you serve via next/image, also consider converting to AVIF/WebP with .webp()/.avif() instead of .jpeg().');
}

run();

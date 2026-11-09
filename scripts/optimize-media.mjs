// Generates responsive AVIF + WebP variants for every image in media-src/.
// Usage: node scripts/optimize-media.mjs [inputDir=media-src] [outputDir=media-dist]
// Output keeps folder structure: media-src/projects/seastar/hero.jpg ->
//   media-dist/projects/seastar/hero-640.avif, hero-640.webp, hero-1280.avif ...
// Upload media-dist/ to your R2 bucket afterwards (see README).
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const [, , inDir = 'media-src', outDir = 'media-dist'] = process.argv;
const WIDTHS = [640, 1000, 1500, 1920];
const EXT = /\.(jpe?g|png|webp|tiff?)$/i;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXT.test(entry.name)) yield full;
  }
}

for await (const file of walk(inDir)) {
  const rel = path.relative(inDir, file);
  const base = rel.replace(EXT, '');
  const target = path.join(outDir, path.dirname(rel));
  await mkdir(target, { recursive: true });
  const img = sharp(file).rotate(); // respects EXIF orientation
  const { width } = await img.metadata();
  const widths = WIDTHS.filter((w) => w <= width);
  if (!widths.length) widths.push(width);
  for (const w of widths) {
    const name = path.join(outDir, `${base}-${w}`);
    await img.clone().resize({ width: w }).avif({ quality: 55 }).toFile(`${name}.avif`);
    await img.clone().resize({ width: w }).webp({ quality: 78 }).toFile(`${name}.webp`);
  }
  const meta = await sharp(file).rotate().metadata();
  console.log(`${rel} -> widths [${widths.join(', ')}]  (intrinsic ${meta.width}x${meta.height})`);
}

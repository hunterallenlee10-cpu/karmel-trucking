// Converts every job photo in public/images/raw to webp (quality 80) at
// 480, 828 and 1200 wide. Never upscales: if the source is narrower than a
// bucket, that bucket is written at the source width.
//
// Output: public/images/<name>-<bucket>.webp  (e.g. 01-hero-...-828.webp)
// Also writes lib/image-manifest.json with each photo's real size, so
// next/image can reserve the right aspect ratio.
//
// Run: npm run images

import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const RAW = path.join(ROOT, "public/images/raw");
const OUT = path.join(ROOT, "public/images");
const BUCKETS = [480, 828, 1200];

// Brand reference files are not displayed on the site.
const SKIP = /^00-/;

const files = (await readdir(RAW)).filter((f) => /\.(jpe?g|png)$/i.test(f) && !SKIP.test(f)).sort();
await mkdir(OUT, { recursive: true });

const manifest = {};
for (const file of files) {
  const name = file.replace(/\.(jpe?g|png)$/i, "");
  const src = path.join(RAW, file);
  // .rotate() applies EXIF orientation so phone shots stay upright.
  const meta = await sharp(src).rotate().metadata();
  const width = meta.autoOrient?.width ?? meta.width;
  const height = meta.autoOrient?.height ?? meta.height;
  manifest[name] = { width, height };

  for (const bucket of BUCKETS) {
    const w = Math.min(bucket, width);
    await sharp(src)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, `${name}-${bucket}.webp`));
  }
  console.log(`✓ ${name} (${width}×${height})`);
}

await writeFile(path.join(ROOT, "lib/image-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${files.length} photos → ${files.length * BUCKETS.length} webp files`);

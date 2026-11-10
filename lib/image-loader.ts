// next/image custom loader. `src` is a photo base path like
// "/images/01-hero-two-cat-excavators-land-clearing-site". Each photo exists
// as -480, -828 and -1200 webp (built by scripts/optimize-images.mjs).
const BUCKETS = [480, 828, 1200];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/images/") || src.endsWith(".png") || src.endsWith(".svg")) return src;
  const bucket = BUCKETS.find((b) => b >= width) ?? 1200;
  return `${src}-${bucket}.webp`;
}

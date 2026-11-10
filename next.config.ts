import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tailwind v4 runs as a Turbopack CSS loader (Next 16 default bundler).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Photos are pre-optimized by scripts/optimize-images.mjs into three
    // webp widths. The custom loader maps each srcset width to the nearest
    // pre-built file, so no runtime image optimization is needed.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 828, 1200],
    imageSizes: [240],
  },
};

export default nextConfig;

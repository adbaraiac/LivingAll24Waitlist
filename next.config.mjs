/** @type {import('next').NextConfig} */

// For GitHub Pages "project" sites the app is served from
// https://<user>.github.io/<repo>, so it needs a basePath.
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH="/<repo>". Empty or "/" means
// the site is served from the root (custom domain / user site). Trailing
// slashes are stripped because Next.js rejects them.
// Keep this normalization in sync with `basePath` in src/config/site.ts.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

const nextConfig = {
  // Produce a fully static site in ./out that can be hosted on GitHub Pages,
  // S3, Netlify, Vercel, or any static host.
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // next/image optimization is unavailable on a static export.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;

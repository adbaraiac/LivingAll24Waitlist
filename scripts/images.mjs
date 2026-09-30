// Renders the PNG versions of the share image and app icon from their SVG
// sources in /public. Social platforms (iMessage, X, Facebook, Instagram)
// don't render SVG link previews, and iOS needs a PNG home-screen icon.
//
// Run after editing public/og.svg or public/favicon.svg:  npm run images
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const pub = (f) => fileURLToPath(new URL(`../public/${f}`, import.meta.url));

await sharp(pub("og.svg"), { density: 144 })
  .resize(1200, 630)
  .png()
  .toFile(pub("og.png"));

await sharp(pub("favicon.svg"), { density: 400 })
  .resize(180, 180)
  .png()
  .toFile(pub("apple-touch-icon.png"));

console.log("Wrote public/og.png and public/apple-touch-icon.png");

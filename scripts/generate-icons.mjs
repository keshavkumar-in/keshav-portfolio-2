/**
 * Generates every favicon and app icon from one vector source.
 *
 *   node scripts/generate-icons.mjs
 *
 * Run this only when the mark changes; the output is committed to public/.
 *
 * The K is drawn as explicit paths rather than an SVG <text> element on
 * purpose. A <text> element resolves against fonts installed on whatever
 * machine rasterises it, so Archivo missing would silently substitute a
 * different letterform — and the icons would differ between machines.
 */
import { Buffer } from "node:buffer";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public"
);

const INK = "#0D0D0C";
const VOLT = "#D6FF3F";

/**
 * Geometry, on a 64×64 grid.
 *
 * Stem spans x 15–25, cap height y 12–52. Both arms leave the stem at 45°
 * and are 10 units thick, matching the stem, so the mark reads as one even
 * weight. The whole letter spans x 15–49, centred on the 64-unit canvas.
 */
const MARK_PATHS = `
    <rect x="15" y="12" width="10" height="40"/>
    <path d="M25 36 L49 12 L35 12 L25 22 Z"/>
    <path d="M25 28 L49 52 L35 52 L25 42 Z"/>`;

/** @param {{ bg?: string, fg?: string }} [opts] */
function markSvg({ bg = VOLT, fg = INK } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="${bg}"/>
  <g fill="${fg}">${MARK_PATHS}
  </g>
</svg>
`;
}

/**
 * Wraps PNG payloads in an ICO container.
 *
 * sharp cannot write ICO, and the format is simple enough not to warrant a
 * dependency: a 6-byte header, one 16-byte directory entry per image, then
 * the payloads. PNG-encoded entries are valid ICO and are understood by every
 * browser still worth supporting.
 *
 * @param {{ size: number, data: Buffer }[]} images
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];

  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // 0 encodes 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([
    header,
    ...entries,
    ...images.map((image) => image.data),
  ]);
}

const png = (svg, size) =>
  sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });

  const svg = markSvg();
  const write = (name, data) => writeFile(path.join(PUBLIC_DIR, name), data);

  await write("favicon.svg", svg);

  const sizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "apple-touch-icon.png": 180,
    "android-chrome-192x192.png": 192,
    "android-chrome-512x512.png": 512,
  };

  for (const [name, size] of Object.entries(sizes)) {
    await write(name, await png(svg, size));
  }

  await write(
    "favicon.ico",
    buildIco([
      { size: 16, data: await png(svg, 16) },
      { size: 32, data: await png(svg, 32) },
      { size: 48, data: await png(svg, 48) },
    ])
  );

  console.log(
    ["favicon.svg", ...Object.keys(sizes), "favicon.ico"]
      .map((name) => `  wrote public/${name}`)
      .join("\n")
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

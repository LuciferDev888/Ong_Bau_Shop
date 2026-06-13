/**
 * Remove baked-in checkerboard transparency pattern from PNGs.
 *
 * The checkerboard consists of alternating #FFFFFF (white) and #C0C0C0 (light gray) squares.
 * Any pixel that closely matches either of these two colors is set to fully transparent.
 * Pixels near the product edge get a soft alpha fade to avoid harsh cutouts.
 */
import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";

const SRC_DIR = join(process.cwd(), "public", "images", "transparent_background");
const TOLERANCE = 38; // color distance tolerance for checkerboard detection

function isCheckerboard(r, g, b) {
  // White square: (255, 255, 255)
  const dWhite = Math.abs(r - 255) + Math.abs(g - 255) + Math.abs(b - 255);
  // Gray square: (192, 192, 192)  — typical checkerboard gray
  const dGray = Math.abs(r - 192) + Math.abs(g - 192) + Math.abs(b - 192);
  // Light gray variant: (204, 204, 204)
  const dLightGray = Math.abs(r - 204) + Math.abs(g - 204) + Math.abs(b - 204);

  return Math.min(dWhite, dGray, dLightGray) <= TOLERANCE;
}

async function processImage(filePath) {
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Get raw RGBA pixel buffer
  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  console.log(`  Processing: ${filePath} (${width}x${height})`);

  // Pass 1: Mark checkerboard pixels as transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (isCheckerboard(r, g, b)) {
      data[i + 3] = 0; // set alpha to 0
    }
  }

  // Pass 2: Soften edges — for semi-transparent border pixels near the product
  // This creates a smoother edge transition
  const alphaBuffer = Buffer.from(data);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const currentAlpha = alphaBuffer[idx + 3];

      if (currentAlpha === 255) {
        // Check if this opaque pixel is adjacent to a transparent one
        const neighbors = [
          ((y - 1) * width + x) * 4,
          ((y + 1) * width + x) * 4,
          (y * width + (x - 1)) * 4,
          (y * width + (x + 1)) * 4,
        ];

        let transparentNeighbors = 0;
        for (const nIdx of neighbors) {
          if (alphaBuffer[nIdx + 3] === 0) transparentNeighbors++;
        }

        // If surrounded by mostly transparent pixels, soften this edge pixel
        if (transparentNeighbors >= 3) {
          data[idx + 3] = 60; // very soft edge
        } else if (transparentNeighbors >= 2) {
          data[idx + 3] = 160; // semi-soft edge
        }
      }
    }
  }

  // Write the result
  await sharp(data, { raw: { width, height, channels: 4 } })
    .png({ quality: 90 })
    .toFile(filePath.replace(".png", "_clean.png"));

  console.log(`  ✓ Saved: ${filePath.replace(".png", "_clean.png")}`);
}

async function main() {
  console.log("=== Removing checkerboard from transparent_background PNGs ===\n");

  const files = await readdir(SRC_DIR);
  const pngFiles = files.filter((f) => f.endsWith(".png") && !f.includes("_clean"));

  for (const file of pngFiles) {
    await processImage(join(SRC_DIR, file));
  }

  console.log("\n=== Done! Renaming clean files to replace originals ===\n");

  // Replace originals with clean versions
  for (const file of pngFiles) {
    const original = join(SRC_DIR, file);
    const clean = join(SRC_DIR, file.replace(".png", "_clean.png"));
    const backup = join(SRC_DIR, file.replace(".png", "_original.png"));

    const fs = await import("fs/promises");
    await fs.rename(original, backup);
    await fs.rename(clean, original);
    console.log(`  ${file}: original → backup, clean → active`);
  }

  console.log("\n✓ All images now have true alpha transparency!");
}

main().catch(console.error);

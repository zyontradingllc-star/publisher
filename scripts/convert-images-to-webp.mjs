import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const QUALITY = 90;
const KEEP = new Set([
  path.normalize("public/favicon.png"),
  path.normalize("public/apple-icon.png"),
]);

const rasterExt = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

async function convertFile(inputPath) {
  const normalized = path.normalize(inputPath);
  if (KEEP.has(normalized)) return { skipped: true, reason: "keep" };

  const ext = path.extname(inputPath).toLowerCase();
  if (!rasterExt.has(ext)) return { skipped: true, reason: "not-raster" };

  const outputPath = inputPath.replace(/\.(jpe?g|png)$/i, ".webp");
  const before = fs.statSync(inputPath).size;

  const image = sharp(inputPath, { failOn: "none" });
  const meta = await image.metadata();

  await image
    .webp({
      quality: QUALITY,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outputPath);

  const after = fs.statSync(outputPath).size;

  return {
    skipped: false,
    inputPath,
    outputPath,
    width: meta.width,
    height: meta.height,
    before,
    after,
  };
}

async function main() {
  const files = walk(PUBLIC_DIR);
  const results = [];
  let saved = 0;
  let converted = 0;

  for (const file of files) {
    const result = await convertFile(file);
    if (!result.skipped) {
      converted += 1;
      saved += Math.max(0, result.before - result.after);
      results.push(result);
      console.log(
        `✓ ${path.relative(PUBLIC_DIR, result.inputPath)} → ${path.relative(PUBLIC_DIR, result.outputPath)} (${result.width}x${result.height}, ${(result.before / 1024).toFixed(1)}KB → ${(result.after / 1024).toFixed(1)}KB)`,
      );
    }
  }

  console.log(`\nConverted ${converted} images. Approx saved: ${(saved / 1024 / 1024).toFixed(2)} MB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

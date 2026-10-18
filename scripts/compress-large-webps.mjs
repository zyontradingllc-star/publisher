import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const OUT_DIR = "tmp-webp";
const MAX_BYTES = 100 * 1024;
const MAX_WIDTH = 1400;
const QUALITY = 72;

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

async function compressFile(inputPath) {
  if (!inputPath.toLowerCase().endsWith(".webp")) return;
  const before = fs.statSync(inputPath).size;
  if (before <= MAX_BYTES) return;

  const rel = path.relative(PUBLIC_DIR, inputPath);
  const outPath = path.join(OUT_DIR, rel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const image = sharp(inputPath, { failOn: "none" });
  const meta = await image.metadata();
  let pipeline = image.rotate();
  if ((meta.width || 0) > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: QUALITY, effort: 6 }).toFile(outPath);
  const after = fs.statSync(outPath).size;
  if (after >= before) {
    fs.unlinkSync(outPath);
    return;
  }
  console.log(`${rel} ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
}

async function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  const files = walk(PUBLIC_DIR);
  for (const file of files) {
    await compressFile(file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

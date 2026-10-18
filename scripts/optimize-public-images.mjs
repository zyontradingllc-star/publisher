import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const OUT_DIR = "tmp-webp";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function ruleFor(rel) {
  const file = rel.replaceAll("\\", "/");
  if (file === "logo-authors-pilot.webp") return { maxW: 200, quality: 82 };
  if (file.startsWith("payments/")) return { maxW: 560, quality: 80 };
  if (file.startsWith("retailers/")) return { maxW: 300, quality: 80 };
  if (
    file.startsWith("covers-that-sell/") ||
    file.startsWith("covers-in-motion/") ||
    file.startsWith("books/") ||
    file.startsWith("amazon-books/") ||
    file.startsWith("publishing-work/")
  ) {
    return { maxW: 640, quality: 68 };
  }
  if (file === "author-website-branding.webp") return { maxW: 1024, quality: 70 };
  return { maxW: 1200, quality: 72 };
}

async function optimizeFile(inputPath) {
  if (!inputPath.toLowerCase().endsWith(".webp")) return null;
  const rel = path.relative(PUBLIC_DIR, inputPath);
  const { maxW, quality } = ruleFor(rel);
  const before = fs.statSync(inputPath).size;
  const outPath = path.join(OUT_DIR, rel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const image = sharp(inputPath, { failOn: "none" });
  const meta = await image.metadata();
  let pipeline = image.rotate();
  if ((meta.width || 0) > maxW) {
    pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
  }

  await pipeline.webp({ quality, effort: 6, smartSubsample: true }).toFile(outPath);
  const after = fs.statSync(outPath).size;
  if (after >= before * 0.97) {
    fs.unlinkSync(outPath);
    return null;
  }
  return { rel, before, after };
}

async function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  const files = walk(PUBLIC_DIR);
  const saved = [];
  for (const file of files) {
    const result = await optimizeFile(file);
    if (result) {
      saved.push(result);
      console.log(
        `${result.rel} ${(result.before / 1024).toFixed(0)}KB -> ${(result.after / 1024).toFixed(0)}KB`,
      );
    }
  }
  const total = saved.reduce((sum, item) => sum + (item.before - item.after), 0);
  console.log(`\nOptimized ${saved.length} images. Saved ${(total / 1024).toFixed(0)}KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

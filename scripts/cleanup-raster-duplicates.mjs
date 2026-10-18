import fs from "fs";
import path from "path";

const PUBLIC_DIR = "public";
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

let removed = 0;
let saved = 0;

for (const file of walk(PUBLIC_DIR)) {
  const normalized = path.normalize(file);
  if (KEEP.has(normalized)) continue;

  const ext = path.extname(file).toLowerCase();
  if (!rasterExt.has(ext)) continue;

  const webp = file.replace(/\.(jpe?g|png)$/i, ".webp");
  if (!fs.existsSync(webp)) continue;

  const size = fs.statSync(file).size;
  fs.unlinkSync(file);
  removed += 1;
  saved += size;
  console.log(`removed ${path.relative(PUBLIC_DIR, file)}`);
}

console.log(`\nRemoved ${removed} duplicate raster files. Saved ${(saved / 1024 / 1024).toFixed(2)} MB`);

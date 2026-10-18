import sharp from "sharp";
import fs from "fs";

const src = process.argv[2] || "scripts/logo-authors-pilot-src.png";

function isRemovable(r, g, b, a) {
  if (a < 40) return true;
  // leftover forest-green backdrop (not the richer greens inside the lockup)
  if (g >= r && g >= b && r < 55 && g < 75 && b < 55 && r + g + b < 175) {
    return true;
  }
  // jagged white / light-gray cutout fringe
  if (
    r > 200 &&
    g > 200 &&
    b > 200 &&
    Math.abs(r - g) < 28 &&
    Math.abs(g - b) < 28
  ) {
    return true;
  }
  return false;
}

async function knockOutBackdrop(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const visited = new Uint8Array(w * h);
  const queue = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const idx = y * w + x;
    if (visited[idx]) return;
    const i = idx * 4;
    if (!isRemovable(data[i], data[i + 1], data[i + 2], data[i + 3])) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  while (queue.length) {
    const idx = queue.pop();
    const x = idx % w;
    const y = (idx - x) / w;
    const i = idx * 4;
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 0;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] < 16) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);

  return sharp(data, {
    raw: { width: w, height: h, channels: 4 },
  }).extract({
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  });
}

const transparentBg = { r: 0, g: 0, b: 0, alpha: 0 };

async function main() {
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source logo: ${src}`);
  }

  const base = await knockOutBackdrop(src);
  const meta = await base.clone().metadata();
  console.log("cropped", meta.width, "x", meta.height);

  const webpBuf = await base
    .clone()
    .webp({ quality: 92, alphaQuality: 100 })
    .toBuffer();
  fs.writeFileSync("public/logo-authors-pilot.webp", webpBuf);
  fs.writeFileSync("public/logo.webp", webpBuf);

  await base
    .clone()
    .resize(512, 512, { fit: "contain", background: transparentBg })
    .png()
    .toFile("src/app/icon.png");
  await base
    .clone()
    .resize(180, 180, { fit: "contain", background: transparentBg })
    .png()
    .toFile("src/app/apple-icon.png");
  await fs.promises.copyFile("src/app/apple-icon.png", "public/apple-icon.png");
  await base
    .clone()
    .resize(192, 192, { fit: "contain", background: transparentBg })
    .png()
    .toFile("public/favicon.png");

  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

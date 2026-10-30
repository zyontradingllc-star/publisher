import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = "public/sales-channels";

/** Extra official / brand CDN URLs when scrape quality is weak */
const upgrades = {
  amazon:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/256px-Amazon_logo.svg.png",
  amazon_icon:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/128px-Amazon_icon.svg.png",
  kobo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Kobo_Logo.svg/256px-Kobo_Logo.svg.png",
  bookshop:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Bookshop.org_logo.svg/256px-Bookshop.org_logo.svg.png",
  google_play:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/256px-Google_Play_Store_badge_EN.svg.png",
  google_play_icon:
    "https://www.gstatic.com/android/market_images/web/play_prism_hlock_2x.png",
  waterstones:
    "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Waterstones_logo.svg/256px-Waterstones_logo.svg.png",
  lulu: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Lulu.com_logo.svg/256px-Lulu.com_logo.svg.png",
  shopify:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/256px-Shopify_logo_2018.svg.png",
  apple_books:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Apple_Books_icon_%28macOS_Big_Sur%29.svg/128px-Apple_Books_icon_%28macOS_Big_Sur%29.svg.png",
  indiebound:
    "https://www.indiebound.org/sites/all/themes/indiebound/apple-touch-icon.png",
};

const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function tryUpgrade(id, urls) {
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": ua, Accept: "image/*" },
        redirect: "follow",
      });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 400) continue;
      if (buf[0] === 0x3c && !buf.includes(Buffer.from("<svg"))) continue;
      await sharp(buf)
        .resize(128, 128, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .png()
        .toFile(path.join(dir, `${id}.png`));
      console.log("UPGRADE", id, buf.length, url.slice(0, 80));
      return true;
    } catch (e) {
      console.log("skip", id, e.message?.slice(0, 60));
    }
  }
  return false;
}

const files = fs.readdirSync(dir);
const byId = new Map();
for (const f of files) {
  const id = f.replace(/\.[^.]+$/, "");
  byId.set(id, f);
}

for (const [id, file] of byId) {
  const upgradeUrls = [];
  if (id === "amazon") upgradeUrls.push(upgrades.amazon_icon, upgrades.amazon);
  if (id === "kobo") upgradeUrls.push(upgrades.kobo);
  if (id === "bookshop") upgradeUrls.push(upgrades.bookshop);
  if (id === "google_play")
    upgradeUrls.push(upgrades.google_play_icon, upgrades.google_play);
  if (id === "waterstones") upgradeUrls.push(upgrades.waterstones);
  if (id === "lulu") upgradeUrls.push(upgrades.lulu);
  if (id === "shopify") upgradeUrls.push(upgrades.shopify);
  if (id === "apple_books") upgradeUrls.push(upgrades.apple_books);
  if (id === "indiebound") upgradeUrls.push(upgrades.indiebound);

  if (upgradeUrls.length) {
    const ok = await tryUpgrade(id, upgradeUrls);
    if (ok) {
      if (file !== `${id}.png`) fs.unlinkSync(path.join(dir, file));
      continue;
    }
  }

  const src = path.join(dir, file);
  try {
    await sharp(src)
      .resize(128, 128, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toFile(path.join(dir, `${id}.tmp.png`));
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith(`${id}.`) && !f.endsWith(".tmp.png")) {
        fs.unlinkSync(path.join(dir, f));
      }
    }
    fs.renameSync(path.join(dir, `${id}.tmp.png`), path.join(dir, `${id}.png`));
    console.log("NORM", id);
  } catch (e) {
    console.log("FAIL", id, e.message);
  }
}

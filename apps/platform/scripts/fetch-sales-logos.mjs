import fs from "fs";
import path from "path";

const dir = "public/sales-channels";
fs.mkdirSync(dir, { recursive: true });

const sites = [
  ["amazon", "https://www.amazon.com/", "https://www.amazon.com/favicon.ico"],
  [
    "barnes_noble",
    "https://www.barnesandnoble.com/",
    "https://www.barnesandnoble.com/favicon.ico",
  ],
  [
    "apple_books",
    "https://www.apple.com/apple-books/",
    "https://www.apple.com/apple-touch-icon.png",
  ],
  [
    "google_play",
    "https://play.google.com/store/books",
    "https://www.gstatic.com/android/market_images/web/favicon_v3.ico",
  ],
  ["kobo", "https://www.kobo.com/", "https://www.kobo.com/favicon.ico"],
  ["audible", "https://www.audible.com/", "https://www.audible.com/favicon.ico"],
  ["bookshop", "https://bookshop.org/", "https://bookshop.org/favicon.ico"],
  [
    "ingramspark",
    "https://www.ingramspark.com/",
    "https://www.ingramspark.com/favicon.ico",
  ],
  [
    "draft2digital",
    "https://www.draft2digital.com/",
    "https://www.draft2digital.com/favicon.ico",
  ],
  [
    "smashwords",
    "https://www.smashwords.com/",
    "https://www.smashwords.com/favicon.ico",
  ],
  ["lulu", "https://www.lulu.com/", "https://www.lulu.com/favicon.ico"],
  ["blurb", "https://www.blurb.com/", "https://www.blurb.com/favicon.ico"],
  ["walmart", "https://www.walmart.com/", "https://www.walmart.com/favicon.ico"],
  ["target", "https://www.target.com/", "https://www.target.com/favicon.ico"],
  [
    "waterstones",
    "https://www.waterstones.com/",
    "https://www.waterstones.com/favicon.ico",
  ],
  [
    "indiebound",
    "https://www.indiebound.org/",
    "https://www.indiebound.org/favicon.ico",
  ],
  [
    "flipkart",
    "https://www.flipkart.com/",
    "https://www.flipkart.com/favicon.ico",
  ],
  ["gumroad", "https://gumroad.com/", "https://gumroad.com/favicon.ico"],
  [
    "shopify",
    "https://www.shopify.com/",
    "https://cdn.shopify.com/shopify-marketing_assets/static/shopify-favicon.png",
  ],
];

const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function absUrl(base, href) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

async function fetchBuf(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": ua,
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(String(res.status));
  const buf = Buffer.from(await res.arrayBuffer());
  const ct = (res.headers.get("content-type") || "").toLowerCase();
  return { buf, ct, finalUrl: res.url };
}

function extFor(buf, ct, url) {
  if (buf[0] === 0x89 && buf[1] === 0x50) return "png";
  if (buf[0] === 0xff && buf[1] === 0xd8) return "jpg";
  if (buf[0] === 0x00 && buf[1] === 0x00 && buf[2] === 0x01) return "ico";
  if (buf.slice(0, 4).toString() === "RIFF") return "webp";
  if (buf.includes(Buffer.from("<svg")) || ct.includes("svg")) return "svg";
  if (ct.includes("png")) return "png";
  if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("icon")) return "ico";
  if (url.includes(".png")) return "png";
  if (url.includes(".svg")) return "svg";
  if (url.includes(".ico")) return "ico";
  if (url.includes(".jpg") || url.includes(".jpeg")) return "jpg";
  return "bin";
}

async function iconsFromHtml(pageUrl) {
  const res = await fetch(pageUrl, {
    headers: { "User-Agent": ua, Accept: "text/html" },
    redirect: "follow",
  });
  if (!res.ok) return [];
  const html = await res.text();
  const base = res.url;
  const found = [];
  const re = /<link[^>]+>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const relM = tag.match(/rel=["']([^"']*)["']/i);
    if (!relM) continue;
    const rel = relM[1].toLowerCase();
    if (!rel.includes("icon") && !rel.includes("apple-touch")) continue;
    const hrefM = tag.match(/href=["']([^"']+)["']/i);
    if (!hrefM) continue;
    const u = absUrl(base, hrefM[1]);
    if (u) found.push(u);
  }
  const og =
    html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  if (og) {
    const u = absUrl(base, og[1]);
    if (u) found.push(u);
  }
  // Prefer apple-touch / larger icons first
  found.sort((a, b) => {
    const score = (u) =>
      (u.includes("apple-touch") ? 100 : 0) +
      (u.includes("192") ? 50 : 0) +
      (u.includes("180") ? 40 : 0) +
      (u.includes("32") ? -10 : 0);
    return score(b) - score(a);
  });
  return [...new Set(found)];
}

for (const [id, page, fallback] of sites) {
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith(`${id}.`)) fs.unlinkSync(path.join(dir, f));
  }
  let candidates = [];
  try {
    candidates = await iconsFromHtml(page);
  } catch {
    /* ignore */
  }
  candidates.push(fallback);
  candidates.push(
    `https://www.google.com/s2/favicons?domain=${new URL(page).hostname}&sz=128`
  );

  let saved = false;
  for (const url of candidates) {
    try {
      const { buf, ct, finalUrl } = await fetchBuf(url);
      if (buf.length < 200) continue;
      const ext = extFor(buf, ct, finalUrl);
      if (ext === "bin") continue;
      if (buf[0] === 0x3c && ext !== "svg") continue;
      if (buf.length > 400000) continue;
      const out = path.join(dir, `${id}.${ext}`);
      fs.writeFileSync(out, buf);
      console.log("OK", id, ext, buf.length, finalUrl.slice(0, 100));
      saved = true;
      break;
    } catch {
      /* try next */
    }
  }
  if (!saved) console.log("FAIL", id);
}

import { readFileSync } from "fs";
import { MongoClient, ObjectId } from "mongodb";

function loadEnv() {
  const raw = readFileSync(".env.local", "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}

loadEnv();

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
const app = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001").replace(
  /\/$/,
  ""
);

const client = new MongoClient(uri);
await client.connect();
const db = client.db();

function summarizeMedia(doc) {
  if (!doc) return null;
  return {
    id: String(doc._id),
    filename: doc.filename,
    url: doc.url,
    mimeType: doc.mimeType,
    sizes: doc.sizes
      ? Object.fromEntries(
          Object.entries(doc.sizes).map(([k, v]) => [
            k,
            v && typeof v === "object" ? { url: v.url, filename: v.filename } : v,
          ])
        )
      : null,
  };
}

const books = await db
  .collection("books")
  .find({ status: "published" })
  .project({
    title: 1,
    slug: 1,
    cover: 1,
    author: 1,
  })
  .limit(10)
  .toArray();

console.log("=== PUBLISHED BOOKS ===");
for (const b of books) {
  let coverDoc = null;
  if (b.cover) {
    const id = typeof b.cover === "object" ? b.cover : b.cover;
    try {
      coverDoc = await db.collection("media").findOne({
        _id: typeof id === "string" ? new ObjectId(id) : id,
      });
    } catch {
      coverDoc = await db.collection("media").findOne({ _id: id });
    }
  }
  console.log(
    JSON.stringify(
      {
        title: b.title,
        slug: b.slug,
        coverRef: b.cover,
        coverMedia: summarizeMedia(coverDoc),
        resolvedLocal: coverDoc
          ? `${app}${coverDoc.url || `/api/media/file/${coverDoc.filename}`}`
          : null,
      },
      null,
      2
    )
  );
}

const authors = await db
  .collection("authors")
  .find({
    $or: [{ approvalStatus: "APPROVED" }, { isPublic: true }],
  })
  .project({
    displayName: 1,
    slug: 1,
    avatar: 1,
    avatarPath: 1,
    banner: 1,
    bannerPath: 1,
  })
  .limit(10)
  .toArray();

console.log("=== AUTHORS ===");
for (const a of authors) {
  let avatarDoc = null;
  if (a.avatar) {
    const id = typeof a.avatar === "object" ? a.avatar : a.avatar;
    try {
      avatarDoc = await db.collection("media").findOne({
        _id: typeof id === "string" ? new ObjectId(id) : id,
      });
    } catch {
      avatarDoc = await db.collection("media").findOne({ _id: id });
    }
  }
  console.log(
    JSON.stringify(
      {
        name: a.displayName,
        slug: a.slug,
        avatarRef: a.avatar,
        avatarPath: a.avatarPath,
        bannerRef: a.banner,
        bannerPath: a.bannerPath,
        avatarMedia: summarizeMedia(avatarDoc),
      },
      null,
      2
    )
  );
}

const mediaCount = await db.collection("media").countDocuments();
const recentMedia = await db
  .collection("media")
  .find({})
  .sort({ createdAt: -1 })
  .project({ filename: 1, url: 1, mimeType: 1, alt: 1, createdAt: 1 })
  .limit(8)
  .toArray();

console.log("=== MEDIA COUNT ===", mediaCount);
console.log(
  "=== RECENT MEDIA ===",
  JSON.stringify(
    recentMedia.map((m) => ({
      id: String(m._id),
      filename: m.filename,
      url: m.url,
      mimeType: m.mimeType,
      alt: m.alt,
    })),
    null,
    2
  )
);

await client.close();

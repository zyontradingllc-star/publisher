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

const client = new MongoClient(process.env.MONGODB_URI || process.env.DATABASE_URL);
await client.connect();
const db = client.db();

const book = await db.collection("books").findOne({ slug: "warrior-day-1db64c0" });
console.log("book.cover type", typeof book.cover, book.cover);

const coverId =
  typeof book.cover === "object" && book.cover?.$oid
    ? book.cover.$oid
    : book.cover;
const media = await db.collection("media").findOne({
  _id:
    typeof coverId === "string" ? new ObjectId(coverId) : coverId,
});

console.log("media.url", media?.url);
console.log("media.filename", media?.filename);

// Simulate map with ID-only (broken) vs filename
console.log("BAD_BY_ID", `/api/media/file/${coverId}`);
console.log("GOOD_BY_FILE", media?.url?.replace(/\/$/, "") || `/api/media/file/${media?.filename}`);

const author = await db.collection("authors").findOne({
  _id:
    typeof book.author === "string"
      ? new ObjectId(book.author)
      : book.author,
});
console.log("author", {
  name: author?.displayName,
  slug: author?.slug,
  avatar: author?.avatar,
});

await client.close();

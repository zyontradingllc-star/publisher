import { readFileSync } from "fs";
import { MongoClient } from "mongodb";

function loadEnv() {
  try {
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
  } catch {
    // ignore
  }
}

loadEnv();

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
if (!uri) {
  console.error("NO_DB");
  process.exit(1);
}

const STATIC_PLUS_BLOGS = 156;

const client = new MongoClient(uri);
await client.connect();
const db = client.db();

const publicAuthors = await db.collection("authors").countDocuments({
  $or: [{ approvalStatus: "APPROVED" }, { isPublic: true }],
  slug: { $exists: true, $nin: [null, ""] },
});

const publishedBooks = await db.collection("books").countDocuments({
  status: "published",
  slug: { $exists: true, $nin: [null, ""] },
});

console.log(
  JSON.stringify(
    {
      publicAuthors,
      publishedBooks,
      sitemapXml_staticPlusBlogs: STATIC_PLUS_BLOGS,
      sitemapXml_withDynamic: STATIC_PLUS_BLOGS + publicAuthors + publishedBooks,
      sitemapAppXml_fixed: 156,
    },
    null,
    2
  )
);

await client.close();

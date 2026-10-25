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
const app = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001").replace(
  /\/$/,
  ""
);

if (!uri) {
  console.error("NO_DB");
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db();

const authors = await db
  .collection("authors")
  .find({
    $or: [{ approvalStatus: "APPROVED" }, { isPublic: true }],
    slug: { $exists: true, $nin: [null, ""] },
  })
  .project({ displayName: 1, slug: 1, email: 1, approvalStatus: 1, isPublic: 1 })
  .limit(30)
  .toArray();

const books = await db
  .collection("books")
  .find({ status: "published" })
  .project({ title: 1, slug: 1, author: 1 })
  .limit(30)
  .toArray();

console.log("APP_URL", app);
console.log("--- AUTHORS ---");
for (const a of authors) {
  console.log(
    `${a.displayName || a.email || "Author"} | ${app}/authors/${a.slug}/`
  );
}
console.log("--- BOOKS ---");
for (const b of books) {
  console.log(`${b.title} | ${app}/books/${b.slug}/`);
}
if (!authors.length && !books.length) {
  console.log("NONE_FOUND");
}

await client.close();

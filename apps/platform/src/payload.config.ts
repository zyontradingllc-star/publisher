import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Authors } from "./collections/Authors";
import { BookSubmissions } from "./collections/BookSubmissions";
import { Books } from "./collections/Books";
import { LinkClicks } from "./collections/LinkClicks";
import { Media } from "./collections/Media";
import { SaleLinks } from "./collections/SaleLinks";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(
        dirname,
        "app/(payload)/cms/importMap.js"
      ),
    },
    meta: {
      titleSuffix: " · Authors Pilot CMS",
    },
  },
  // Avoid clash with existing Firebase admin UI at /admin
  routes: {
    admin: "/cms",
  },
  collections: [
    Users,
    Media,
    BookSubmissions,
    Authors,
    Books,
    SaleLinks,
    LinkClicks,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE-ME-IN-ENV",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || process.env.MONGODB_URI || "",
  }),
  sharp,
});

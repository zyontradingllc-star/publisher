/**
 * One-off: reset CMS admin password against Railway Mongo (public TCP proxy).
 *   railway run -s authorspilot-platform -- npx tsx scripts/reset-cms-admin-password.ts
 */
import { randomBytes } from "node:crypto";

const PUBLIC_MONGO = "reseau.proxy.rlwy.net:26015";
const INTERNAL_MONGO = "mongodb.railway.internal:27017";

for (const key of ["DATABASE_URL", "MONGODB_URI", "MONGO_URL"] as const) {
  const v = process.env[key];
  if (v?.includes(INTERNAL_MONGO)) {
    process.env[key] = v.replace(INTERNAL_MONGO, PUBLIC_MONGO);
  }
}

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    process.env.MONGODB_URI || process.env.MONGO_URL || "";
}

async function main() {
  const { getPayload } = await import("payload");
  const { default: config } = await import("../src/payload.config");

  const email = process.env.CMS_ADMIN_EMAIL || "info@authorspilot.com";
  const newPass =
    process.env.CMS_NEW_PASSWORD ||
    randomBytes(15).toString("base64url").slice(0, 20);

  const payload = await getPayload({ config });
  const found = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  });

  if (!found.docs[0]) {
    console.error("NO_USER");
    process.exit(1);
  }

  await payload.update({
    collection: "users",
    id: found.docs[0].id,
    data: { password: newPass },
    overrideAccess: true,
  });

  const login = await payload.login({
    collection: "users",
    data: { email, password: newPass },
  });

  if (!login.user) {
    console.error("RESET_FAIL");
    process.exit(1);
  }

  console.log("RESET_OK");
  console.log(`email=${email}`);
  console.log(`password=${newPass}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

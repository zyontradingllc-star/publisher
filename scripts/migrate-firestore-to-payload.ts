/**
 * Migrate Firestore → Payload (Mongo) by stable `legacyId`.
 *
 * Dry-run by default (no writes). Pass `--apply` to upsert.
 *
 *   npm run migrate:firestore
 *   npm run migrate:firestore -- --apply
 *   npm run migrate:firestore --prefix apps/platform
 *
 * Idempotent: safe to run twice; upserts match on `legacyId`.
 *
 * legacyId shapes:
 *   fs:profiles:{uid}
 *   fs:books:{bookId}
 *   fs:drafts:{draftId}          (optional top-level drafts collection)
 *   fs:books:{bookId}:sales_links:{linkId}
 *
 * Run via apps/platform so Payload path aliases and .env.local resolve.
 */

import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLATFORM = path.join(ROOT, "apps", "platform");
const requireFromPlatform = createRequire(
  path.join(PLATFORM, "package.json")
);

const { cert, getApps, initializeApp } = requireFromPlatform(
  "firebase-admin/app"
) as typeof import("firebase-admin/app");
const { getFirestore } = requireFromPlatform(
  "firebase-admin/firestore"
) as typeof import("firebase-admin/firestore");
const { getPayload } = requireFromPlatform("payload") as typeof import("payload");

type Firestore = ReturnType<typeof getFirestore>;
type Payload = Awaited<ReturnType<typeof getPayload>>;

const APPLY = process.argv.includes("--apply");

type Counts = Record<string, number>;
type UpsertKind = "create" | "update" | "dry-create" | "dry-update";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function isHttpsUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:";
  } catch {
    return false;
  }
}

function mapBookStatus(raw: unknown): "draft" | "published" | "unpublished" {
  const s = String(raw ?? "draft");
  if (s === "published") return "published";
  if (s === "unpublished") return "unpublished";
  return "draft";
}

function mapApproval(
  rawStatus: unknown,
  isPublic?: unknown
): "PENDING" | "APPROVED" | "REJECTED" {
  const s = String(rawStatus ?? "");
  if (s === "published" || isPublic === true) return "APPROVED";
  if (s === "rejected") return "REJECTED";
  return "PENDING";
}

function mapLinkType(raw: unknown): string {
  const allowed = new Set([
    "author_website",
    "amazon",
    "facebook",
    "instagram",
    "whatsapp",
    "other",
  ]);
  const v = String(raw ?? "other");
  return allowed.has(v) ? v : "other";
}

function initFirestore(): Firestore {
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(
    /\\n/g,
    "\n"
  );
  if (
    !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !privateKey
  ) {
    throw new Error(
      "Missing Firebase Admin env (NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY)."
    );
  }
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
  }
  return getFirestore();
}

async function countWithLegacyId(
  payload: Payload,
  collection: "authors" | "books" | "sale-links"
): Promise<number> {
  const res = await payload.find({
    collection,
    where: { legacyId: { exists: true } },
    limit: 0,
    overrideAccess: true,
  });
  return res.totalDocs ?? 0;
}

async function findByLegacyId(
  payload: Payload,
  collection: "authors" | "books" | "sale-links",
  legacyId: string
) {
  const found = await payload.find({
    collection,
    where: { legacyId: { equals: legacyId } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  return found.docs[0] ?? null;
}

async function upsertByLegacyId(
  payload: Payload,
  collection: "authors" | "books" | "sale-links",
  legacyId: string,
  data: Record<string, unknown>,
  apply: boolean
): Promise<{ kind: UpsertKind; id?: string }> {
  const existing = await findByLegacyId(payload, collection, legacyId);

  if (!apply) {
    return {
      kind: existing ? "dry-update" : "dry-create",
      id: existing ? String(existing.id) : undefined,
    };
  }

  if (existing) {
    const updated = await payload.update({
      collection,
      id: existing.id,
      data: { ...data, legacyId },
      overrideAccess: true,
    });
    return { kind: "update", id: String(updated.id) };
  }

  const created = await payload.create({
    collection,
    data: { ...data, legacyId },
    overrideAccess: true,
  });
  return { kind: "create", id: String(created.id) };
}

function bump(
  ops: Counts,
  prefix: "authors" | "books" | "sale_links",
  kind: UpsertKind
) {
  if (kind.includes("create")) ops[`${prefix}_create`] += 1;
  else ops[`${prefix}_update`] += 1;
}

function dryAuthorId(uid: string) {
  return `__dry__:authors:${uid}`;
}

async function ensureAuthor(
  payload: Payload,
  authorUid: string,
  displayName: string,
  apply: boolean,
  ops: Counts,
  cache: Map<string, string>
): Promise<string | undefined> {
  const cached = cache.get(authorUid);
  if (cached) return cached;

  const legacyId = `fs:profiles:${authorUid}`;
  const existing = await findByLegacyId(payload, "authors", legacyId);
  if (!existing) {
    const byFirebase = await payload.find({
      collection: "authors",
      where: { firebaseUid: { equals: authorUid } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    if (byFirebase.docs[0]) {
      // Attach legacyId on apply; dry-run counts as update of existing row.
      const id = String(byFirebase.docs[0].id);
      if (apply) {
        await payload.update({
          collection: "authors",
          id,
          data: {
            legacyId,
            firebaseUid: authorUid,
            displayName: displayName || "Author",
          },
          overrideAccess: true,
        });
        bump(ops, "authors", "update");
      } else {
        bump(ops, "authors", "dry-update");
      }
      cache.set(authorUid, id);
      return id;
    }
  }

  const result = await upsertByLegacyId(
    payload,
    "authors",
    legacyId,
    {
      displayName: displayName || "Author",
      email: `${authorUid}@users.noreply.authorspilot.local`,
      firebaseUid: authorUid,
      slug: `author-${authorUid.slice(0, 8)}`,
      approvalStatus: "PENDING",
    },
    apply
  );
  bump(ops, "authors", result.kind);
  const id = result.id ?? (apply ? undefined : dryAuthorId(authorUid));
  if (id) cache.set(authorUid, id);
  return id;
}

async function main() {
  console.log("");
  console.log("Firestore → Payload migration");
  console.log(
    `Mode: ${APPLY ? "APPLY (writes enabled)" : "DRY-RUN (no writes)"}`
  );
  console.log("");

  if (!process.env.DATABASE_URL && !process.env.MONGODB_URI) {
    throw new Error("Missing DATABASE_URL (or MONGODB_URI) for Payload.");
  }
  if (!process.env.PAYLOAD_SECRET) {
    console.warn(
      "PAYLOAD_SECRET is unset; using payload.config fallback (set it for real runs)."
    );
  }

  const db = initFirestore();

  // Resolves via apps/platform tsconfig paths (@payload-config, @/*).
  const payloadConfig = (await import("@payload-config")).default;
  const payload = await getPayload({ config: payloadConfig });

  const firestoreCounts: Counts = {
    profiles: 0,
    books: 0,
    drafts: 0,
    sales_links: 0,
  };
  const ops: Counts = {
    authors_create: 0,
    authors_update: 0,
    books_create: 0,
    books_update: 0,
    sale_links_create: 0,
    sale_links_update: 0,
    sale_links_skipped: 0,
    books_skipped: 0,
  };

  const before = {
    authors: await countWithLegacyId(payload, "authors"),
    books: await countWithLegacyId(payload, "books"),
    "sale-links": await countWithLegacyId(payload, "sale-links"),
  };

  console.log("Payload counts BEFORE (docs with legacyId):");
  console.table(before);

  const authorIdByFirebaseUid = new Map<string, string>();

  async function safeCollectionGet(name: string) {
    try {
      return await db.collection(name).get();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // NOT_FOUND = Firestore DB not created / empty project — treat as 0 docs.
      if (/NOT_FOUND|5 NOT_FOUND/i.test(msg)) {
        console.warn(
          `[warn] Firestore "${name}" unavailable (${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}): treating as empty. ${msg.slice(0, 120)}`
        );
        return null;
      }
      throw new Error(
        `Firestore read failed for "${name}" (project=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}). ${msg}`
      );
    }
  }

  // --- profiles → authors ---
  const profilesSnap = await safeCollectionGet("profiles");
  firestoreCounts.profiles = profilesSnap?.size ?? 0;

  for (const doc of profilesSnap?.docs ?? []) {
    const d = doc.data();
    const uid = doc.id;
    const legacyId = `fs:profiles:${uid}`;
    const emailRaw = String(d.email ?? "").trim().toLowerCase();
    const email =
      emailRaw || `${uid}@users.noreply.authorspilot.local`;
    const displayName =
      String(d.display_name ?? "").trim() ||
      email.split("@")[0] ||
      "Author";
    const slugFromProfile = String(d.slug ?? "").trim();
    const slug =
      slugFromProfile ||
      `${slugify(displayName) || "author"}-${uid.slice(0, 6)}`;

    const result = await upsertByLegacyId(
      payload,
      "authors",
      legacyId,
      {
        displayName,
        email,
        firebaseUid: uid,
        slug,
        bio: d.bio ? String(d.bio) : undefined,
        approvalStatus:
          d.is_public === true || d.role === "admin" ? "APPROVED" : "PENDING",
      },
      APPLY
    );
    bump(ops, "authors", result.kind);
    const id = result.id ?? (APPLY ? undefined : dryAuthorId(uid));
    if (id) authorIdByFirebaseUid.set(uid, id);
  }

  // --- optional top-level drafts collection ---
  const draftsSnap = await safeCollectionGet("drafts");
  if (draftsSnap) {
    firestoreCounts.drafts = draftsSnap.size;
    for (const doc of draftsSnap.docs) {
      const d = doc.data();
      const authorUid = String(d.author_id ?? d.authorId ?? "");
      const authorPayloadId = authorUid
        ? await ensureAuthor(
            payload,
            authorUid,
            String(d.author_display_name ?? "Author"),
            APPLY,
            ops,
            authorIdByFirebaseUid
          )
        : undefined;

      if (!authorPayloadId) {
        console.warn(`[skip draft ${doc.id}] no author mapping`);
        ops.books_skipped += 1;
        continue;
      }

      const title = String(d.title ?? "Untitled draft");
      const result = await upsertByLegacyId(
        payload,
        "books",
        `fs:drafts:${doc.id}`,
        {
          title,
          slug: `${slugify(title) || "draft"}-${doc.id.slice(0, 8)}`,
          subtitle: d.subtitle ? String(d.subtitle) : undefined,
          description: d.description ? String(d.description) : undefined,
          language: String(d.language ?? "en"),
          author: authorPayloadId,
          status: "draft",
          approvalStatus: "PENDING",
        },
        APPLY
      );
      bump(ops, "books", result.kind);
    }
  }

  // --- books + nested sales_links ---
  const booksSnap = await safeCollectionGet("books");
  firestoreCounts.books = booksSnap?.size ?? 0;

  for (const doc of booksSnap?.docs ?? []) {
    const d = doc.data();
    const legacyId = `fs:books:${doc.id}`;
    const authorUid = String(d.author_id ?? "");
    const authorPayloadId = authorUid
      ? await ensureAuthor(
          payload,
          authorUid,
          String(d.author_display_name ?? "Author"),
          APPLY,
          ops,
          authorIdByFirebaseUid
        )
      : undefined;

    if (!authorPayloadId) {
      console.warn(`[skip book ${doc.id}] missing author mapping`);
      ops.books_skipped += 1;
      continue;
    }

    const title = String(d.title ?? "Untitled");
    const status = mapBookStatus(d.status);
    const baseSlug = slugify(String(d.slug ?? title)) || "book";
    const uniqueSlug = `${baseSlug}-${doc.id.slice(0, 8)}`;

    const bookResult = await upsertByLegacyId(
      payload,
      "books",
      legacyId,
      {
        title,
        slug: uniqueSlug,
        subtitle: d.subtitle ? String(d.subtitle) : undefined,
        description: d.description ? String(d.description) : undefined,
        language: String(d.language ?? "en"),
        author: authorPayloadId,
        status,
        approvalStatus: mapApproval(d.status, d.is_public),
        rejectionReason: d.rejection_reason
          ? String(d.rejection_reason)
          : undefined,
        publishedAt:
          status === "published"
            ? d.published_at
              ? String(d.published_at)
              : new Date().toISOString()
            : undefined,
      },
      APPLY
    );
    bump(ops, "books", bookResult.kind);

    const bookPayloadId = bookResult.id;

    const linksSnap = await db
      .collection("books")
      .doc(doc.id)
      .collection("sales_links")
      .get();
    firestoreCounts.sales_links += linksSnap.size;

    for (const linkDoc of linksSnap.docs) {
      const link = linkDoc.data();
      const url = String(link.url ?? "").trim();
      const linkLegacy = `fs:books:${doc.id}:sales_links:${linkDoc.id}`;

      if (!isHttpsUrl(url)) {
        ops.sale_links_skipped += 1;
        console.warn(
          `[skip sale-link ${linkLegacy}] not https: ${url.slice(0, 80)}`
        );
        continue;
      }

      if (!bookPayloadId) {
        // Dry-run before first apply: book not in Payload yet
        if (!APPLY) {
          ops.sale_links_create += 1;
        } else {
          ops.sale_links_skipped += 1;
        }
        continue;
      }

      const linkResult = await upsertByLegacyId(
        payload,
        "sale-links",
        linkLegacy,
        {
          book: bookPayloadId,
          label: String(link.label ?? "Store link"),
          targetUrl: url,
          isActive: link.is_active !== false,
          linkType: mapLinkType(link.link_type),
          isPrimary: Boolean(link.is_primary),
          displayOrder: Number(link.display_order ?? 0),
        },
        APPLY
      );
      bump(ops, "sale_links", linkResult.kind);
    }
  }

  const after = {
    authors: await countWithLegacyId(payload, "authors"),
    books: await countWithLegacyId(payload, "books"),
    "sale-links": await countWithLegacyId(payload, "sale-links"),
  };

  console.log("");
  console.log("Firestore source counts:");
  console.table(firestoreCounts);
  console.log("Upsert operations:");
  console.table(ops);
  console.log(
    `Payload counts AFTER (docs with legacyId)${APPLY ? "" : " [unchanged in dry-run]"}:`
  );
  console.table(after);
  console.log("");
  if (!APPLY) {
    console.log("Dry-run only. Re-run with --apply to write.");
  } else {
    console.log("Apply complete. Safe to re-run (idempotent via legacyId).");
  }
  console.log("");

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

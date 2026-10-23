import type { Access, PayloadRequest } from "payload";

/** Payload CMS user (logged into /cms) = admin. */
export function isPayloadAdmin(req: PayloadRequest): boolean {
  return Boolean(req.user);
}

/** Firebase UID attached via Local API `context: { firebaseUid }` after ID token verify. */
export function firebaseUidFromReq(req: PayloadRequest): string | undefined {
  const uid = req.context?.firebaseUid;
  return typeof uid === "string" && uid.trim() ? uid.trim() : undefined;
}

/** Admins: all. Authors (via context.firebaseUid): only own author row. */
export const authorSelfOrAdmin: Access = ({ req }) => {
  if (isPayloadAdmin(req)) return true;
  const uid = firebaseUidFromReq(req);
  if (!uid) return false;
  return { firebaseUid: { equals: uid } };
};

/** Admins: all. Authors: books whose author.firebaseUid matches context. */
export const bookOwnerOrAdmin: Access = async ({ req }) => {
  if (isPayloadAdmin(req)) return true;
  const uid = firebaseUidFromReq(req);
  if (!uid) return false;

  const authors = await req.payload.find({
    collection: "authors",
    where: { firebaseUid: { equals: uid } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const authorId = authors.docs[0]?.id;
  if (!authorId) return false;
  return { author: { equals: authorId } };
};

/** Admins: all. Authors: sale links on books they own. */
export const saleLinkOwnerOrAdmin: Access = async ({ req }) => {
  if (isPayloadAdmin(req)) return true;
  const uid = firebaseUidFromReq(req);
  if (!uid) return false;

  const authors = await req.payload.find({
    collection: "authors",
    where: { firebaseUid: { equals: uid } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const authorId = authors.docs[0]?.id;
  if (!authorId) return false;

  const books = await req.payload.find({
    collection: "books",
    where: { author: { equals: authorId } },
    limit: 200,
    depth: 0,
    overrideAccess: true,
  });
  const bookIds = books.docs.map((b) => b.id);
  if (bookIds.length === 0) return false;
  return { book: { in: bookIds } };
};

export const adminOnly: Access = ({ req }) => isPayloadAdmin(req);

/** Field-level: only CMS admins may change approval fields. */
export const adminOnlyField = {
  update: ({ req }: { req: PayloadRequest }) => isPayloadAdmin(req),
};

export const APPROVAL_STATUS_OPTIONS = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
] as const;

export type ApprovalStatus = (typeof APPROVAL_STATUS_OPTIONS)[number]["value"];

export function httpsOnlyUrl(value: unknown): true | string {
  if (typeof value !== "string" || !value.trim()) {
    return "URL is required";
  }
  try {
    const u = new URL(value.trim());
    if (u.protocol !== "https:") {
      return "Only https:// URLs are allowed";
    }
    return true;
  } catch {
    return "Enter a valid https:// URL";
  }
}

/** Optional https URL — empty/null is allowed. */
export function optionalHttpsUrl(value: unknown): true | string {
  if (value == null || value === "") return true;
  return httpsOnlyUrl(value);
}

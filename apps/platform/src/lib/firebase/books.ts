import { adminDb, adminStorage } from "@/lib/firebase/admin";
import { usePayloadData } from "@/lib/data/flags";
import { firebasePublicUrl } from "@/lib/firebase/storage-url";
import { slugify } from "@/lib/utils";
import type { Book, BookStatus, SalesLink } from "@/types/database";
import { randomUUID } from "crypto";

export { firebasePublicUrl };

function mapBook(id: string, data: Record<string, unknown>): Book {
  return {
    id,
    author_id: String(data.author_id ?? ""),
    title: String(data.title ?? ""),
    subtitle: (data.subtitle as string | null) ?? null,
    slug: String(data.slug ?? id),
    description: String(data.description ?? ""),
    author_display_name: String(data.author_display_name ?? ""),
    genre_id: (data.genre_id as string | null) ?? null,
    language: String(data.language ?? "en"),
    publication_date: (data.publication_date as string | null) ?? null,
    cover_path: (data.cover_path as string | null) ?? null,
    manuscript_path: (data.manuscript_path as string | null) ?? null,
    manuscript_filename: (data.manuscript_filename as string | null) ?? null,
    manuscript_mime: (data.manuscript_mime as string | null) ?? null,
    manuscript_size_bytes: (data.manuscript_size_bytes as number | null) ?? null,
    status: (data.status as BookStatus) ?? "draft",
    rights_confirmed: Boolean(data.rights_confirmed),
    content_policy_accepted: Boolean(data.content_policy_accepted),
    primary_sales_link_id: (data.primary_sales_link_id as string | null) ?? null,
    admin_notes: (data.admin_notes as string | null) ?? null,
    rejection_reason: (data.rejection_reason as string | null) ?? null,
    changes_requested_reason:
      (data.changes_requested_reason as string | null) ?? null,
    published_at: (data.published_at as string | null) ?? null,
    submitted_at: (data.submitted_at as string | null) ?? null,
    is_public: Boolean(data.is_public),
    created_at: (data.created_at as string) ?? new Date().toISOString(),
    updated_at: (data.updated_at as string) ?? new Date().toISOString(),
  };
}

export async function createBookDraft(opts: {
  authorId: string;
  title: string;
  subtitle?: string | null;
  description: string;
  authorDisplayName: string;
  genreId?: string | null;
  language?: string;
}): Promise<Book> {
  if (usePayloadData()) {
    const { createBookDraftPayload } = await import(
      "@/lib/data/books-payload"
    );
    return createBookDraftPayload(opts);
  }

  const db = adminDb();
  if (!db) throw new Error("Firestore is not configured");

  const id = randomUUID();
  const now = new Date().toISOString();
  const slug = `${slugify(opts.title) || "book"}-${id.slice(0, 8)}`;

  const doc: Omit<Book, "id"> = {
    author_id: opts.authorId,
    title: opts.title,
    subtitle: opts.subtitle ?? null,
    slug,
    description: opts.description,
    author_display_name: opts.authorDisplayName,
    genre_id: opts.genreId ?? null,
    language: opts.language ?? "en",
    publication_date: null,
    cover_path: null,
    manuscript_path: null,
    manuscript_filename: null,
    manuscript_mime: null,
    manuscript_size_bytes: null,
    status: "draft",
    rights_confirmed: false,
    content_policy_accepted: false,
    primary_sales_link_id: null,
    admin_notes: null,
    rejection_reason: null,
    changes_requested_reason: null,
    published_at: null,
    submitted_at: null,
    is_public: false,
    created_at: now,
    updated_at: now,
  };

  await db.collection("books").doc(id).set(doc);
  return { id, ...doc };
}

export async function getBooksByAuthor(authorId: string): Promise<Book[]> {
  if (usePayloadData()) {
    const { getBooksByAuthorPayload } = await import(
      "@/lib/data/books-payload"
    );
    return getBooksByAuthorPayload(authorId);
  }

  const db = adminDb();
  if (!db) return [];
  const snap = await db
    .collection("books")
    .where("author_id", "==", authorId)
    .get();
  const books = snap.docs.map((d) =>
    mapBook(d.id, d.data() as Record<string, unknown>)
  );
  return books.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export async function getBookForAuthor(
  authorId: string,
  bookId: string
): Promise<Book | null> {
  if (usePayloadData()) {
    const { getBookForAuthorPayload } = await import(
      "@/lib/data/books-payload"
    );
    return getBookForAuthorPayload(authorId, bookId);
  }

  const db = adminDb();
  if (!db) return null;
  const snap = await db.collection("books").doc(bookId).get();
  if (!snap.exists) return null;
  const book = mapBook(snap.id, snap.data() as Record<string, unknown>);
  if (book.author_id !== authorId) return null;
  return book;
}

export async function updateBook(
  bookId: string,
  patch: Partial<Book>
): Promise<void> {
  if (usePayloadData()) {
    const { updateBookPayload } = await import("@/lib/data/books-payload");
    return updateBookPayload(bookId, patch);
  }

  const db = adminDb();
  if (!db) throw new Error("Firestore is not configured");
  const { id: _id, ...rest } = patch;
  await db
    .collection("books")
    .doc(bookId)
    .set({ ...rest, updated_at: new Date().toISOString() }, { merge: true });
}

export async function setSalesLinks(
  bookId: string,
  links: Omit<
    SalesLink,
    "id" | "book_id" | "click_count" | "created_at" | "updated_at"
  >[]
) {
  if (usePayloadData()) {
    const { setSalesLinksPayload } = await import("@/lib/data/books-payload");
    return setSalesLinksPayload(bookId, links);
  }

  const db = adminDb();
  if (!db) throw new Error("Firestore is not configured");
  const batch = db.batch();
  const col = db.collection("books").doc(bookId).collection("sales_links");
  const existing = await col.get();
  existing.docs.forEach((d) => batch.delete(d.ref));
  const now = new Date().toISOString();
  links.forEach((link, i) => {
    const ref = col.doc();
    batch.set(ref, {
      ...link,
      book_id: bookId,
      click_count: 0,
      created_at: now,
      updated_at: now,
      display_order: link.display_order ?? i,
    });
  });
  await batch.commit();
}

/** Firebase Storage only — not gated by USE_PAYLOAD_DATA. */
export async function uploadAuthorFile(opts: {
  authorId: string;
  bookId: string;
  kind: "cover" | "manuscript" | "avatar";
  file: File;
}): Promise<string> {
  const storage = adminStorage();
  if (!storage) throw new Error("Firebase Storage is not configured");

  const bucket = storage.bucket();
  const ext = opts.file.name.split(".").pop() || "bin";
  const path =
    opts.kind === "avatar"
      ? `avatars/${opts.authorId}/${Date.now()}.${ext}`
      : `books/${opts.authorId}/${opts.bookId}/${opts.kind}-${Date.now()}.${ext}`;

  const buffer = Buffer.from(await opts.file.arrayBuffer());
  const file = bucket.file(path);
  await file.save(buffer, {
    contentType: opts.file.type || "application/octet-stream",
    metadata: { cacheControl: "public,max-age=31536000" },
  });
  await file.makePublic().catch(() => undefined);

  return path;
}

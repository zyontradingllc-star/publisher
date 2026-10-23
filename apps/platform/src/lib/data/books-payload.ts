import { getPayloadClient } from "@/lib/payload";
import { resolvePayloadAuthorId } from "@/lib/data/profiles-payload";
import { firebasePublicUrl } from "@/lib/firebase/storage-url";
import { slugify } from "@/lib/utils";
import type { Book, BookStatus, SalesLink } from "@/types/database";

type BookDoc = {
  id: string | number;
  title?: string | null;
  subtitle?: string | null;
  slug?: string | null;
  description?: string | null;
  language?: string | null;
  status?: string | null;
  approvalStatus?: string | null;
  rejectionReason?: string | null;
  coverPath?: string | null;
  manuscriptPath?: string | null;
  manuscriptFilename?: string | null;
  manuscriptMime?: string | null;
  manuscriptSizeBytes?: number | null;
  rightsConfirmed?: boolean | null;
  contentPolicyAccepted?: boolean | null;
  publishedAt?: string | null;
  submittedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  author?:
    | string
    | number
    | {
        id?: string | number;
        firebaseUid?: string | null;
        displayName?: string | null;
      }
    | null;
  cover?:
    | string
    | number
    | { url?: string | null; id?: string | number }
    | null;
};

function mapStatus(raw: unknown): BookStatus {
  const s = String(raw ?? "draft");
  if (s === "published") return "published";
  if (s === "unpublished") return "unpublished";
  // Payload only has draft|published|unpublished; treat non-published as draft
  // but preserve pending_review intent via approvalStatus when present.
  return "draft";
}

function coverFromDoc(doc: BookDoc): string | null {
  if (doc.cover && typeof doc.cover === "object") {
    return (
      doc.cover.url ||
      (doc.cover.id ? `/api/media/file/${doc.cover.id}` : null)
    );
  }
  if (doc.cover) return `/api/media/file/${doc.cover}`;
  return firebasePublicUrl(doc.coverPath) || doc.coverPath || null;
}

function authorUidFromDoc(doc: BookDoc): string {
  if (doc.author && typeof doc.author === "object") {
    return String(doc.author.firebaseUid || doc.author.id || "");
  }
  return String(doc.author ?? "");
}

function authorDisplayFromDoc(doc: BookDoc): string {
  if (doc.author && typeof doc.author === "object") {
    return String(doc.author.displayName || "Author");
  }
  return "Author";
}

function mapBookDoc(doc: BookDoc, authorFirebaseUid?: string): Book {
  const status = mapStatus(doc.status);
  const approval = String(doc.approvalStatus ?? "");
  let bookStatus: BookStatus = status;
  if (status === "draft" && approval === "PENDING" && doc.submittedAt) {
    bookStatus = "pending_review";
  }
  if (approval === "REJECTED") bookStatus = "rejected";

  return {
    id: String(doc.id),
    author_id: authorFirebaseUid || authorUidFromDoc(doc),
    title: doc.title || "Untitled",
    subtitle: doc.subtitle || null,
    slug: doc.slug || String(doc.id),
    description: doc.description || "",
    author_display_name: authorDisplayFromDoc(doc),
    genre_id: null,
    language: doc.language || "en",
    publication_date: null,
    cover_path: coverFromDoc(doc),
    manuscript_path: doc.manuscriptPath || null,
    manuscript_filename: doc.manuscriptFilename || null,
    manuscript_mime: doc.manuscriptMime || null,
    manuscript_size_bytes: doc.manuscriptSizeBytes ?? null,
    status: bookStatus,
    rights_confirmed: Boolean(doc.rightsConfirmed),
    content_policy_accepted: Boolean(doc.contentPolicyAccepted),
    primary_sales_link_id: null,
    admin_notes: null,
    rejection_reason: doc.rejectionReason || null,
    changes_requested_reason: null,
    published_at: doc.publishedAt || null,
    submitted_at: doc.submittedAt || null,
    is_public: status === "published" && approval !== "REJECTED",
    created_at: doc.createdAt || new Date().toISOString(),
    updated_at: doc.updatedAt || doc.createdAt || new Date().toISOString(),
  };
}

export async function createBookDraftPayload(opts: {
  authorId: string;
  title: string;
  subtitle?: string | null;
  description: string;
  authorDisplayName: string;
  genreId?: string | null;
  language?: string;
}): Promise<Book> {
  const payload = await getPayloadClient();
  let authorPayloadId = await resolvePayloadAuthorId(opts.authorId);
  if (!authorPayloadId) {
    const { createAuthorProfilePayload } = await import(
      "@/lib/data/profiles-payload"
    );
    await createAuthorProfilePayload({
      uid: opts.authorId,
      email: `${opts.authorId}@users.noreply.authorspilot.local`,
      displayName: opts.authorDisplayName || "Author",
    });
    authorPayloadId = await resolvePayloadAuthorId(opts.authorId);
  }
  if (!authorPayloadId) {
    throw new Error("Could not resolve Payload author for book draft.");
  }

  const created = await payload.create({
    collection: "books",
    data: {
      title: opts.title,
      subtitle: opts.subtitle || undefined,
      slug: `${slugify(opts.title) || "book"}-${Date.now().toString(36).slice(-6)}`,
      description: opts.description || undefined,
      language: opts.language || "en",
      author: authorPayloadId,
      status: "draft",
      approvalStatus: "PENDING",
      rightsConfirmed: false,
      contentPolicyAccepted: false,
    },
    overrideAccess: true,
  });

  return mapBookDoc(created as BookDoc, opts.authorId);
}

export async function getBooksByAuthorPayload(
  authorId: string
): Promise<Book[]> {
  const payload = await getPayloadClient();
  const authorPayloadId = await resolvePayloadAuthorId(authorId);
  if (!authorPayloadId) return [];

  const result = await payload.find({
    collection: "books",
    where: { author: { equals: authorPayloadId } },
    depth: 1,
    limit: 100,
    sort: "-updatedAt",
    overrideAccess: true,
  });

  return result.docs.map((d) => mapBookDoc(d as BookDoc, authorId));
}

export async function getBookForAuthorPayload(
  authorId: string,
  bookId: string
): Promise<Book | null> {
  const payload = await getPayloadClient();
  const authorPayloadId = await resolvePayloadAuthorId(authorId);
  if (!authorPayloadId) return null;

  try {
    const doc = await payload.findByID({
      collection: "books",
      id: bookId,
      depth: 1,
      overrideAccess: true,
    });
    const authorRef =
      doc.author && typeof doc.author === "object" && "id" in doc.author
        ? String((doc.author as { id: string | number }).id)
        : String(doc.author);
    if (authorRef !== authorPayloadId) return null;
    return mapBookDoc(doc as BookDoc, authorId);
  } catch {
    return null;
  }
}

function payloadStatusFromBookStatus(
  status: BookStatus | string | undefined
): "draft" | "published" | "unpublished" {
  if (status === "published") return "published";
  if (status === "unpublished") return "unpublished";
  return "draft";
}

export async function updateBookPayload(
  bookId: string,
  patch: Partial<Book>
): Promise<void> {
  const payload = await getPayloadClient();
  const data: Record<string, unknown> = {};

  if (patch.title !== undefined) data.title = patch.title;
  if (patch.subtitle !== undefined) data.subtitle = patch.subtitle;
  if (patch.slug !== undefined) data.slug = patch.slug;
  if (patch.description !== undefined) data.description = patch.description;
  if (patch.language !== undefined) data.language = patch.language;
  if (patch.status !== undefined) {
    data.status = payloadStatusFromBookStatus(patch.status);
    if (patch.status === "pending_review") {
      data.status = "draft";
      data.approvalStatus = "PENDING";
      data.submittedAt = patch.submitted_at || new Date().toISOString();
    }
    if (patch.status === "rejected") {
      data.approvalStatus = "REJECTED";
    }
    if (patch.status === "published") {
      data.approvalStatus = "APPROVED";
      data.publishedAt = patch.published_at || new Date().toISOString();
    }
  }
  if (patch.cover_path !== undefined) data.coverPath = patch.cover_path;
  if (patch.manuscript_path !== undefined)
    data.manuscriptPath = patch.manuscript_path;
  if (patch.manuscript_filename !== undefined)
    data.manuscriptFilename = patch.manuscript_filename;
  if (patch.manuscript_mime !== undefined)
    data.manuscriptMime = patch.manuscript_mime;
  if (patch.manuscript_size_bytes !== undefined)
    data.manuscriptSizeBytes = patch.manuscript_size_bytes;
  if (patch.rights_confirmed !== undefined)
    data.rightsConfirmed = patch.rights_confirmed;
  if (patch.content_policy_accepted !== undefined)
    data.contentPolicyAccepted = patch.content_policy_accepted;
  if (patch.rejection_reason !== undefined)
    data.rejectionReason = patch.rejection_reason;
  if (patch.submitted_at !== undefined) data.submittedAt = patch.submitted_at;
  if (patch.published_at !== undefined) data.publishedAt = patch.published_at;

  if (Object.keys(data).length === 0) return;

  await payload.update({
    collection: "books",
    id: bookId,
    data,
    overrideAccess: true,
  });
}

export async function setSalesLinksPayload(
  bookId: string,
  links: Omit<
    SalesLink,
    "id" | "book_id" | "click_count" | "created_at" | "updated_at"
  >[]
): Promise<void> {
  const payload = await getPayloadClient();

  const existing = await payload.find({
    collection: "sale-links",
    where: { book: { equals: bookId } },
    limit: 200,
    depth: 0,
    overrideAccess: true,
  });
  for (const doc of existing.docs) {
    await payload.delete({
      collection: "sale-links",
      id: doc.id,
      overrideAccess: true,
    });
  }

  for (let i = 0; i < links.length; i++) {
    const link = links[i]!;
    const url = String(link.url || "").trim();
    if (!url.startsWith("https://")) continue;
    await payload.create({
      collection: "sale-links",
      data: {
        book: bookId,
        label: link.label || "Store link",
        targetUrl: url,
        isActive: link.is_active !== false,
        linkType: link.link_type || "other",
        isPrimary: Boolean(link.is_primary),
        displayOrder: link.display_order ?? i,
      },
      overrideAccess: true,
    });
  }
}

export async function getSalesLinksForBookPayload(
  bookId: string
): Promise<SalesLink[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "sale-links",
    where: { book: { equals: bookId } },
    limit: 50,
    sort: "displayOrder",
    overrideAccess: true,
  });
  return result.docs.map((d) => {
    const doc = d as {
      id: string | number;
      label?: string | null;
      targetUrl?: string | null;
      isActive?: boolean | null;
      linkType?: string | null;
      isPrimary?: boolean | null;
      displayOrder?: number | null;
      createdAt?: string;
      updatedAt?: string;
    };
    return {
      id: String(doc.id),
      book_id: bookId,
      link_type: (doc.linkType as SalesLink["link_type"]) || "other",
      label: doc.label || "Store link",
      url: doc.targetUrl || "",
      is_active: doc.isActive !== false,
      is_primary: Boolean(doc.isPrimary),
      display_order: Number(doc.displayOrder ?? 0),
      click_count: 0,
      created_at: doc.createdAt || new Date().toISOString(),
      updated_at: doc.updatedAt || new Date().toISOString(),
    };
  });
}

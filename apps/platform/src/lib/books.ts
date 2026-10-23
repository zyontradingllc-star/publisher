import type { Where } from "payload";
import type { Book, BookWithRelations, Genre, Profile, SalesLink } from "@/types/database";
import { isPayloadConfigured, getPayloadClient } from "@/lib/payload";
import { mapPayloadAuthor, mapPayloadBook } from "@/lib/payload/map-public";
import { slugify } from "@/lib/utils";

export async function getPublishedBooks(opts?: {
  q?: string;
  genre?: string;
  language?: string;
  sort?: "title" | "newest";
  page?: number;
  pageSize?: number;
}) {
  if (isPayloadConfigured()) {
    try {
      const payload = await getPayloadClient();
      const page = opts?.page && opts.page > 0 ? opts.page : 1;
      const limit = opts?.pageSize && opts.pageSize > 0 ? opts.pageSize : 24;
      const and: Where[] = [{ status: { equals: "published" } }];
      if (opts?.q?.trim()) {
        and.push({ title: { contains: opts.q.trim() } });
      }
      if (opts?.language?.trim()) {
        and.push({ language: { equals: opts.language.trim() } });
      }
      const result = await payload.find({
        collection: "books",
        where: { and },
        depth: 1,
        page,
        limit,
        sort: opts?.sort === "title" ? "title" : "-publishedAt",
        overrideAccess: true,
      });
      return {
        books: result.docs.map((d) => mapPayloadBook(d as never)),
        count: result.totalDocs,
        error: null as string | null,
      };
    } catch (err) {
      return {
        books: [] as BookWithRelations[],
        count: 0,
        error: err instanceof Error ? err.message : "Could not load books",
      };
    }
  }

  return {
    books: [] as BookWithRelations[],
    count: 0,
    error: null as string | null,
  };
}

export async function getBookBySlug(slug: string) {
  if (isPayloadConfigured()) {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: "books",
        where: {
          and: [
            { slug: { equals: slug } },
            { status: { equals: "published" } },
          ],
        },
        depth: 1,
        limit: 1,
        overrideAccess: true,
      });
      const doc = result.docs[0];
      if (!doc) {
        return { book: null as BookWithRelations | null, error: null as string | null };
      }
      const book = mapPayloadBook(doc as never);
      try {
        const { getSalesLinksForBookPayload } = await import(
          "@/lib/data/books-payload"
        );
        book.sales_links = await getSalesLinksForBookPayload(String(doc.id));
      } catch {
        book.sales_links = [];
      }
      return { book, error: null as string | null };
    } catch (err) {
      return {
        book: null as BookWithRelations | null,
        error: err instanceof Error ? err.message : "Could not load book",
      };
    }
  }
  return { book: null as BookWithRelations | null, error: null as string | null };
}

export async function getAuthorBooks(authorId: string, excludeBookId?: string) {
  if (!isPayloadConfigured() || !authorId) return [] as BookWithRelations[];
  try {
    const payload = await getPayloadClient();
    const and: Where[] = [
      { status: { equals: "published" } },
      { author: { equals: authorId } },
    ];
    if (excludeBookId) {
      and.push({ id: { not_equals: excludeBookId } });
    }
    const result = await payload.find({
      collection: "books",
      where: { and },
      depth: 1,
      limit: 24,
      overrideAccess: true,
    });
    return result.docs.map((d) => mapPayloadBook(d as never));
  } catch {
    return [];
  }
}

export async function getPublicAuthors(opts?: {
  q?: string;
  page?: number;
  pageSize?: number;
}) {
  if (isPayloadConfigured()) {
    try {
      const payload = await getPayloadClient();
      const page = opts?.page && opts.page > 0 ? opts.page : 1;
      const limit = opts?.pageSize && opts.pageSize > 0 ? opts.pageSize : 24;
      const q = opts?.q?.trim();
      const where: Where | undefined = q
        ? {
            or: [
              { displayName: { contains: q } },
              { email: { contains: q } },
            ],
          }
        : undefined;
      const result = await payload.find({
        collection: "authors",
        where,
        page,
        limit,
        sort: "displayName",
        depth: 1,
        overrideAccess: true,
      });
      return {
        authors: result.docs.map((d) => mapPayloadAuthor(d as never)),
        count: result.totalDocs,
        error: null as string | null,
      };
    } catch (err) {
      return {
        authors: [] as Profile[],
        count: 0,
        error: err instanceof Error ? err.message : "Could not load authors",
      };
    }
  }
  return {
    authors: [] as Profile[],
    count: 0,
    error: null as string | null,
  };
}

export async function getAuthorBySlug(slug: string) {
  if (isPayloadConfigured()) {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: "authors",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
        overrideAccess: true,
      });
      const doc = result.docs[0];
      return {
        author: doc ? mapPayloadAuthor(doc as never) : null,
        error: null as string | null,
      };
    } catch (err) {
      return {
        author: null as Profile | null,
        error: err instanceof Error ? err.message : "Could not load author",
      };
    }
  }
  return { author: null as Profile | null, error: null as string | null };
}

const FALLBACK_GENRES: Genre[] = [
  { id: "fiction", slug: "fiction", name: "Fiction", description: null, sort_order: 1, created_at: "" },
  { id: "non-fiction", slug: "non-fiction", name: "Non-Fiction", description: null, sort_order: 2, created_at: "" },
  { id: "romance", slug: "romance", name: "Romance", description: null, sort_order: 3, created_at: "" },
  { id: "mystery-thriller", slug: "mystery-thriller", name: "Mystery & Thriller", description: null, sort_order: 4, created_at: "" },
  { id: "fantasy", slug: "fantasy", name: "Fantasy", description: null, sort_order: 5, created_at: "" },
  { id: "other", slug: "other", name: "Other", description: null, sort_order: 99, created_at: "" },
];

export async function getGenres(): Promise<Genre[]> {
  return FALLBACK_GENRES;
}

export async function getGenreBySlug(slug: string) {
  return FALLBACK_GENRES.find((g) => g.slug === slug) ?? null;
}

function mapSubmissionStatus(
  status: string | null | undefined
): Book["status"] {
  switch (status) {
    case "approved":
      return "published";
    case "changes_requested":
      return "changes_requested";
    case "rejected":
      return "rejected";
    case "under_review":
    case "pending":
    default:
      return "pending_review";
  }
}

/** Author dashboard listings from Payload submissions (+ Firebase when logged in). */
export async function getMyBooks(
  authorId: string,
  authorEmail?: string | null
): Promise<Book[]> {
  const books: Book[] = [];
  const seen = new Set<string>();

  if (isPayloadConfigured() && authorEmail) {
    try {
      const payload = await getPayloadClient();
      const email = authorEmail.trim().toLowerCase();
      const result = await payload.find({
        collection: "book-submissions",
        where: { "author.email": { equals: email } },
        sort: "-createdAt",
        limit: 50,
        depth: 1,
        overrideAccess: true,
      });

      for (const doc of result.docs) {
        const d = doc as {
          id: string | number;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
          language?: string | null;
          status?: string | null;
          cover?: string | number | { url?: string | null; id?: string | number } | null;
          author?: { firstName?: string; lastName?: string } | null;
          createdAt?: string;
          updatedAt?: string;
          approvedBook?:
            | string
            | number
            | { id?: string | number; slug?: string | null }
            | null;
        };
        const id = String(d.id);
        if (seen.has(id)) continue;
        seen.add(id);

        const cover =
          d.cover && typeof d.cover === "object"
            ? d.cover.url ||
              (d.cover.id ? `/api/media/file/${d.cover.id}` : null)
            : d.cover
              ? `/api/media/file/${d.cover}`
              : null;
        const authorName =
          `${d.author?.firstName || ""} ${d.author?.lastName || ""}`.trim() ||
          "Author";
        const approvedSlug =
          d.approvedBook && typeof d.approvedBook === "object"
            ? d.approvedBook.slug || null
            : null;

        books.push({
          id,
          author_id: authorId,
          title: d.title || "Untitled",
          subtitle: d.subtitle || null,
          slug:
            approvedSlug ||
            `${slugify(d.title || "book")}-${String(d.id).slice(-6)}`,
          description: d.description || "",
          author_display_name: authorName,
          genre_id: null,
          language: d.language || "en",
          publication_date: null,
          cover_path: cover,
          manuscript_path: null,
          manuscript_filename: null,
          manuscript_mime: null,
          manuscript_size_bytes: null,
          status: mapSubmissionStatus(d.status),
          rights_confirmed: true,
          content_policy_accepted: true,
          primary_sales_link_id: null,
          admin_notes: null,
          rejection_reason: null,
          changes_requested_reason: null,
          published_at: d.status === "approved" ? d.updatedAt || null : null,
          submitted_at: d.createdAt || null,
          is_public: d.status === "approved",
          created_at: d.createdAt || new Date().toISOString(),
          updated_at: d.updatedAt || d.createdAt || new Date().toISOString(),
        });
      }
    } catch {
      // fall through
    }
  }

  if (authorId && authorId !== "lead-session") {
    try {
      const { usePayloadData } = await import("@/lib/data/flags");
      const { isFirebaseConfigured } = await import("@/lib/firebase/config");
      if (usePayloadData() || isFirebaseConfigured()) {
        const { getBooksByAuthor } = await import("@/lib/firebase/books");
        for (const book of await getBooksByAuthor(authorId)) {
          if (seen.has(book.id)) continue;
          seen.add(book.id);
          books.push(book);
        }
      }
    } catch {
      // ignore
    }
  }

  return books;
}

export async function getMyBook(authorId: string, bookId: string) {
  if (!authorId || authorId === "lead-session") {
    return { book: null, error: null as string | null };
  }
  try {
    const { usePayloadData } = await import("@/lib/data/flags");
    const { isFirebaseConfigured } = await import("@/lib/firebase/config");
    if (!usePayloadData() && !isFirebaseConfigured()) {
      return { book: null, error: null as string | null };
    }
    const { getBookForAuthor } = await import("@/lib/firebase/books");
    const book = await getBookForAuthor(authorId, bookId);
    if (!book) {
      return { book: null, error: null as string | null };
    }
    let sales_links: SalesLink[] = [];
    if (usePayloadData()) {
      const { getSalesLinksForBookPayload } = await import(
        "@/lib/data/books-payload"
      );
      sales_links = await getSalesLinksForBookPayload(bookId);
    }
    return {
      book: { ...book, sales_links } as BookWithRelations,
      error: null as string | null,
    };
  } catch (err) {
    return {
      book: null,
      error: err instanceof Error ? err.message : "Could not load book",
    };
  }
}

export function activeSalesLinks(links: SalesLink[] | undefined | null): SalesLink[] {
  return (links ?? [])
    .filter((l) => l.is_active)
    .sort((a, b) => {
      if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
      return a.display_order - b.display_order;
    });
}

export function primarySalesLink(links: SalesLink[] | undefined | null): SalesLink | null {
  return activeSalesLinks(links)[0] ?? null;
}

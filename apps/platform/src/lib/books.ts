import type { Book, BookWithRelations, Genre, Profile, SalesLink } from "@/types/database";

export async function getPublishedBooks(_opts?: {
  q?: string;
  genre?: string;
  language?: string;
  sort?: "title" | "newest";
  page?: number;
  pageSize?: number;
}) {
  return {
    books: [] as BookWithRelations[],
    count: 0,
    error: null as string | null,
  };
}

export async function getBookBySlug(_slug: string) {
  return { book: null as BookWithRelations | null, error: null as string | null };
}

export async function getAuthorBooks(_authorId: string, _excludeBookId?: string) {
  return [] as BookWithRelations[];
}

export async function getPublicAuthors(_opts?: {
  q?: string;
  page?: number;
  pageSize?: number;
}) {
  return {
    authors: [] as Profile[],
    count: 0,
    error: null as string | null,
  };
}

export async function getAuthorBySlug(_slug: string) {
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

export async function getMyBooks(authorId: string): Promise<Book[]> {
  if (!authorId || authorId === "lead-session") return [];
  try {
    const { isFirebaseConfigured } = await import("@/lib/firebase/config");
    if (isFirebaseConfigured()) {
      const { getBooksByAuthor } = await import("@/lib/firebase/books");
      return getBooksByAuthor(authorId);
    }
    return [];
  } catch {
    return [];
  }
}

export async function getMyBook(authorId: string, bookId: string) {
  if (!authorId || authorId === "lead-session") {
    return { book: null, error: null as string | null };
  }
  try {
    const { isFirebaseConfigured } = await import("@/lib/firebase/config");
    if (!isFirebaseConfigured()) {
      return { book: null, error: null as string | null };
    }
    const { getBookForAuthor } = await import("@/lib/firebase/books");
    const book = await getBookForAuthor(authorId, bookId);
    return { book: book as BookWithRelations | null, error: null as string | null };
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
  const active = activeSalesLinks(links);
  return active.find((l) => l.is_primary) ?? active[0] ?? null;
}

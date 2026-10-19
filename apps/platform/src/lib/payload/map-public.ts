import type { BookWithRelations, Profile } from "@/types/database";

type PayloadMedia = {
  id?: string | number;
  url?: string | null;
  sizes?: {
    cover?: { url?: string | null };
    thumbnail?: { url?: string | null };
  } | null;
};

type PayloadAuthor = {
  id: string | number;
  displayName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  slug?: string | null;
  bio?: string | null;
  avatar?: string | number | PayloadMedia | null;
  createdAt?: string;
  updatedAt?: string;
};

type PayloadBook = {
  id: string | number;
  title?: string | null;
  slug?: string | null;
  subtitle?: string | null;
  description?: string | null;
  language?: string | null;
  status?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  author?: string | number | PayloadAuthor | null;
  cover?: string | number | PayloadMedia | null;
};

function mediaUrl(
  media: string | number | PayloadMedia | null | undefined,
  prefer: "cover" | "thumbnail" | "original" = "original"
): string | null {
  if (!media) return null;
  if (typeof media === "object") {
    if (prefer === "cover") {
      // Prefer original for crisp covers; thumbnail is only a small derivative.
      return (
        media.url ||
        media.sizes?.cover?.url ||
        media.sizes?.thumbnail?.url ||
        (media.id ? `/api/media/file/${media.id}` : null)
      );
    }
    if (prefer === "thumbnail") {
      return (
        media.sizes?.thumbnail?.url ||
        media.url ||
        (media.id ? `/api/media/file/${media.id}` : null)
      );
    }
    return media.url || (media.id ? `/api/media/file/${media.id}` : null);
  }
  return `/api/media/file/${media}`;
}

export function mapPayloadAuthor(doc: PayloadAuthor): Profile {
  const name =
    doc.displayName ||
    `${doc.firstName || ""} ${doc.lastName || ""}`.trim() ||
    "Author";
  return {
    id: String(doc.id),
    role: "author",
    email: doc.email || null,
    display_name: name,
    slug: doc.slug || null,
    bio: doc.bio || null,
    avatar_path: mediaUrl(doc.avatar, "thumbnail"),
    website_url: null,
    has_author_website: false,
    social_facebook: null,
    social_instagram: null,
    social_twitter: null,
    social_linkedin: null,
    social_whatsapp: null,
    social_tiktok: null,
    is_public: true,
    profile_complete: true,
    created_at: doc.createdAt || new Date().toISOString(),
    updated_at: doc.updatedAt || new Date().toISOString(),
  };
}

export function mapPayloadBook(doc: PayloadBook): BookWithRelations {
  const authorDoc =
    doc.author && typeof doc.author === "object" ? doc.author : null;
  const authorName =
    authorDoc
      ? authorDoc.displayName ||
        `${authorDoc.firstName || ""} ${authorDoc.lastName || ""}`.trim()
      : "Author";

  const status =
    doc.status === "published"
      ? "published"
      : doc.status === "unpublished"
        ? "unpublished"
        : "draft";

  return {
    id: String(doc.id),
    author_id: authorDoc ? String(authorDoc.id) : String(doc.author ?? ""),
    title: doc.title || "Untitled",
    slug: doc.slug || String(doc.id),
    subtitle: doc.subtitle || null,
    description: doc.description || "",
    author_display_name: authorName || "Author",
    genre_id: null,
    language: doc.language || "en",
    publication_date: null,
    cover_path: mediaUrl(doc.cover, "cover"),
    manuscript_path: null,
    manuscript_filename: null,
    manuscript_mime: null,
    manuscript_size_bytes: null,
    status,
    rights_confirmed: true,
    content_policy_accepted: true,
    primary_sales_link_id: null,
    admin_notes: null,
    rejection_reason: null,
    changes_requested_reason: null,
    published_at: doc.publishedAt || null,
    submitted_at: null,
    is_public: status === "published",
    created_at: doc.createdAt || new Date().toISOString(),
    updated_at: doc.updatedAt || new Date().toISOString(),
    sales_links: [],
    profiles: authorDoc
      ? {
          id: String(authorDoc.id),
          display_name: authorName || "Author",
          slug: authorDoc.slug || null,
          website_url: null,
          has_author_website: false,
          avatar_path: mediaUrl(authorDoc.avatar, "thumbnail"),
        }
      : null,
  };
}

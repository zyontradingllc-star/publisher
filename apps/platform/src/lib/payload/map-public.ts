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
  firebaseUid?: string | null;
  role?: string | null;
  displayName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  slug?: string | null;
  bio?: string | null;
  avatar?: string | number | PayloadMedia | null;
  avatarPath?: string | null;
  banner?: string | number | PayloadMedia | null;
  bannerPath?: string | null;
  websiteUrl?: string | null;
  hasAuthorWebsite?: boolean | null;
  socialFacebook?: string | null;
  socialInstagram?: string | null;
  socialTwitter?: string | null;
  socialLinkedin?: string | null;
  socialWhatsapp?: string | null;
  socialTiktok?: string | null;
  socialReddit?: string | null;
  socialYoutube?: string | null;
  socialPinterest?: string | null;
  isPublic?: boolean | null;
  profileComplete?: boolean | null;
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

function stripTrailingSlash(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.length > 1 && url.endsWith("/") ? url.replace(/\/+$/, "") : url;
}

function mediaUrl(
  media: string | number | PayloadMedia | null | undefined,
  prefer: "cover" | "thumbnail" | "original" = "original"
): string | null {
  if (!media) return null;
  if (typeof media === "object") {
    // Prefer filename-based Payload URLs (not document id — id routes 404/308).
    const byFilename = media.url
      ? media.url
      : media.id
        ? null
        : null;
    if (prefer === "cover") {
      return stripTrailingSlash(
        byFilename ||
          media.sizes?.cover?.url ||
          media.sizes?.thumbnail?.url ||
          null
      );
    }
    if (prefer === "thumbnail") {
      return stripTrailingSlash(
        media.sizes?.thumbnail?.url || byFilename || null
      );
    }
    return stripTrailingSlash(byFilename);
  }
  // Bare id without populated media — cannot resolve filename here.
  return null;
}

export function mapPayloadAuthor(doc: PayloadAuthor): Profile {
  const name =
    doc.displayName ||
    `${doc.firstName || ""} ${doc.lastName || ""}`.trim() ||
    "Author";
  return {
    id: String(doc.firebaseUid || doc.id),
    role: doc.role === "admin" ? "admin" : "author",
    email: doc.email || null,
    display_name: name,
    slug: doc.slug || null,
    bio: doc.bio || null,
    avatar_path:
      mediaUrl(doc.avatar, "thumbnail") || doc.avatarPath || null,
    banner_path:
      mediaUrl(doc.banner, "original") || doc.bannerPath || null,
    website_url: doc.websiteUrl || null,
    has_author_website: Boolean(doc.hasAuthorWebsite),
    social_facebook: doc.socialFacebook || null,
    social_instagram: doc.socialInstagram || null,
    social_twitter: doc.socialTwitter || null,
    social_linkedin: doc.socialLinkedin || null,
    social_whatsapp: doc.socialWhatsapp || null,
    social_tiktok: doc.socialTiktok || null,
    social_reddit: doc.socialReddit || null,
    social_youtube: doc.socialYoutube || null,
    social_pinterest: doc.socialPinterest || null,
    is_public: doc.isPublic !== false,
    profile_complete: Boolean(doc.profileComplete),
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
          website_url: authorDoc.websiteUrl || null,
          has_author_website: Boolean(authorDoc.hasAuthorWebsite),
          avatar_path:
            mediaUrl(authorDoc.avatar, "original") ||
            mediaUrl(authorDoc.avatar, "thumbnail") ||
            authorDoc.avatarPath ||
            null,
          banner_path:
            mediaUrl(authorDoc.banner, "original") ||
            authorDoc.bannerPath ||
            null,
          social_facebook: authorDoc.socialFacebook || null,
          social_instagram: authorDoc.socialInstagram || null,
          social_twitter: authorDoc.socialTwitter || null,
          social_linkedin: authorDoc.socialLinkedin || null,
          social_whatsapp: authorDoc.socialWhatsapp || null,
          social_tiktok: authorDoc.socialTiktok || null,
          social_reddit: authorDoc.socialReddit || null,
          social_youtube: authorDoc.socialYoutube || null,
          social_pinterest: authorDoc.socialPinterest || null,
        }
      : null,
  };
}

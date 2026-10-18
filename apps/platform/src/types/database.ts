export type UserRole = "author" | "admin";

export type BookStatus =
  | "draft"
  | "pending_review"
  | "changes_requested"
  | "published"
  | "rejected"
  | "unpublished";

export type SalesLinkType =
  | "author_website"
  | "amazon"
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "other";

export type ReportStatus = "open" | "reviewing" | "resolved" | "dismissed";

export type Profile = {
  id: string;
  role: UserRole;
  email: string | null;
  display_name: string | null;
  slug: string | null;
  bio: string | null;
  avatar_path: string | null;
  website_url: string | null;
  has_author_website: boolean;
  social_facebook: string | null;
  social_instagram: string | null;
  social_twitter: string | null;
  social_linkedin: string | null;
  social_whatsapp: string | null;
  /** Preferred; falls back to social_whatsapp until migration applied */
  social_tiktok?: string | null;
  is_public: boolean;
  profile_complete: boolean;
  created_at: string;
  updated_at: string;
};

export type Genre = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  created_at: string;
};

export type Book = {
  id: string;
  author_id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  description: string;
  author_display_name: string;
  genre_id: string | null;
  language: string;
  publication_date: string | null;
  cover_path: string | null;
  manuscript_path: string | null;
  manuscript_filename: string | null;
  manuscript_mime: string | null;
  manuscript_size_bytes: number | null;
  status: BookStatus;
  rights_confirmed: boolean;
  content_policy_accepted: boolean;
  primary_sales_link_id: string | null;
  admin_notes: string | null;
  rejection_reason: string | null;
  changes_requested_reason: string | null;
  published_at: string | null;
  submitted_at: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type SalesLink = {
  id: string;
  book_id: string;
  link_type: SalesLinkType;
  label: string;
  url: string;
  is_active: boolean;
  is_primary: boolean;
  display_order: number;
  click_count: number;
  created_at: string;
  updated_at: string;
};

export type BookWithRelations = Book & {
  genre?: Genre | null;
  sales_links?: SalesLink[];
  profiles?: Pick<
    Profile,
    "id" | "display_name" | "slug" | "website_url" | "has_author_website" | "avatar_path"
  > | null;
};

export type BookStatusEvent = {
  id: string;
  book_id: string;
  actor_id: string | null;
  from_status: BookStatus | null;
  to_status: BookStatus;
  note: string | null;
  created_at: string;
};

export type ContentReport = {
  id: string;
  book_id: string;
  reporter_email: string | null;
  reporter_user_id: string | null;
  reason: string;
  details: string | null;
  status: ReportStatus;
  admin_notes: string | null;
  resolved_by: string | null;
  resolved_at: string | null;
  created_at: string;
};

export const BOOK_STATUS_LABELS: Record<BookStatus, string> = {
  draft: "Draft",
  pending_review: "Pending Review",
  changes_requested: "Changes Requested",
  published: "Published",
  rejected: "Rejected",
  unpublished: "Unpublished",
};

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "pt", label: "Portuguese" },
  { code: "it", label: "Italian" },
  { code: "hi", label: "Hindi" },
  { code: "ar", label: "Arabic" },
  { code: "zh", label: "Chinese" },
  { code: "ja", label: "Japanese" },
  { code: "other", label: "Other" },
] as const;

export const SALES_LINK_TYPES: { value: SalesLinkType; label: string }[] = [
  { value: "author_website", label: "Author Website / Store" },
  { value: "amazon", label: "Amazon / Kindle" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "other", label: "Other Retailer" },
];

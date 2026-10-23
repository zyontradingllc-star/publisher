import { z } from "zod";

const httpUrl = z
  .string()
  .trim()
  .url("Enter a valid URL")
  .refine(
    (v) => v.startsWith("http://") || v.startsWith("https://"),
    "URL must start with http:// or https://"
  );

const optionalHttpUrl = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  httpUrl.optional()
);

const signupPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password is too long")
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/[0-9]/, "Include a number")
  .regex(/[^A-Za-z0-9\s]/, "Include a symbol")
  .refine((v) => !/\s/.test(v), "Cannot contain spaces");

export const signupSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email"),
    confirmEmail: z.string().trim().email("Confirm your email"),
    password: signupPassword,
    confirmPassword: z.string().optional(),
    displayName: z
      .string()
      .trim()
      .min(2, "Display name must be at least 2 characters")
      .max(80, "Display name is too long")
      .optional(),
  })
  .refine((data) => data.email.toLowerCase() === data.confirmEmail.toLowerCase(), {
    message: "Email addresses do not match",
    path: ["confirmEmail"],
  })
  .refine(
    (data) =>
      !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  display_name: z
    .string()
    .trim()
    .min(2, "Display name must be at least 2 characters")
    .max(80),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  bio: z.string().trim().max(2000).optional().or(z.literal("")),
  website_url: optionalHttpUrl,
  has_author_website: z.boolean(),
  social_facebook: optionalHttpUrl,
  social_instagram: optionalHttpUrl,
  social_twitter: optionalHttpUrl,
  social_linkedin: optionalHttpUrl,
  social_tiktok: optionalHttpUrl,
  is_public: z.boolean(),
});

export const salesLinkSchema = z.object({
  link_type: z.enum([
    "author_website",
    "amazon",
    "facebook",
    "instagram",
    "whatsapp",
    "other",
  ]),
  label: z.string().trim().min(1).max(80),
  url: httpUrl,
  is_active: z.boolean().default(true),
  is_primary: z.boolean().default(false),
  display_order: z.number().int().min(0).default(0),
});

export const bookDraftSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  subtitle: z.string().trim().max(200).optional().or(z.literal("")),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  description: z.string().trim().max(10000).optional().or(z.literal("")),
  author_display_name: z.string().trim().min(1).max(120),
  genre_id: z.string().uuid().optional().or(z.literal("")),
  language: z.string().trim().min(2).max(20),
  publication_date: z.string().optional().or(z.literal("")),
});

export const bookSubmitSchema = bookDraftSchema.extend({
  description: z
    .string()
    .trim()
    .min(40, "Description must be at least 40 characters")
    .max(10000),
  genre_id: z.string().uuid("Select a genre"),
  rights_confirmed: z.literal(true, {
    message: "You must confirm rights ownership",
  }),
  content_policy_accepted: z.literal(true, {
    message: "You must accept the content policy",
  }),
  cover_path: z.string().min(1, "Cover image is required before submission"),
});

export const reportSchema = z.object({
  book_id: z.string().uuid(),
  reason: z.string().trim().min(3).max(120),
  details: z.string().trim().max(2000).optional().or(z.literal("")),
  reporter_email: z.string().trim().email().optional().or(z.literal("")),
});

export const adminReviewSchema = z.object({
  book_id: z.string().uuid(),
  action: z.enum(["approve", "request_changes", "reject", "unpublish"]),
  note: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const COVER_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const MANUSCRIPT_MIME_TYPES = [
  "application/pdf",
  "application/epub+zip",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
] as const;

export const COVER_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
export const MANUSCRIPT_EXTENSIONS = [".pdf", ".epub", ".docx", ".doc"];

export function maxCoverBytes(): number {
  return Number(process.env.MAX_COVER_BYTES ?? 5_242_880);
}

export function maxManuscriptBytes(): number {
  return Number(process.env.MAX_MANUSCRIPT_BYTES ?? 26_214_400);
}

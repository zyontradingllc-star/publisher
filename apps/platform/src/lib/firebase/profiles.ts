import { adminDb } from "@/lib/firebase/admin";
import { slugify } from "@/lib/utils";
import type { Profile } from "@/types/database";

function mapProfile(id: string, data: Record<string, unknown>): Profile {
  return {
    id,
    role: (data.role as Profile["role"]) ?? "author",
    email: (data.email as string | null) ?? null,
    display_name: (data.display_name as string | null) ?? null,
    slug: (data.slug as string | null) ?? null,
    bio: (data.bio as string | null) ?? null,
    avatar_path: (data.avatar_path as string | null) ?? null,
    website_url: (data.website_url as string | null) ?? null,
    has_author_website: Boolean(data.has_author_website),
    social_facebook: (data.social_facebook as string | null) ?? null,
    social_instagram: (data.social_instagram as string | null) ?? null,
    social_twitter: (data.social_twitter as string | null) ?? null,
    social_linkedin: (data.social_linkedin as string | null) ?? null,
    social_whatsapp: (data.social_whatsapp as string | null) ?? null,
    social_tiktok: (data.social_tiktok as string | null) ?? null,
    is_public: Boolean(data.is_public),
    profile_complete: Boolean(data.profile_complete),
    created_at: (data.created_at as string) ?? new Date().toISOString(),
    updated_at: (data.updated_at as string) ?? new Date().toISOString(),
  };
}

export async function createAuthorProfile(opts: {
  uid: string;
  email: string;
  displayName: string;
}): Promise<Profile> {
  const db = adminDb();
  if (!db) throw new Error("Firestore is not configured");

  const now = new Date().toISOString();
  const baseSlug = slugify(opts.displayName) || "author";
  const slug = `${baseSlug}-${opts.uid.slice(0, 6)}`;

  const doc: Omit<Profile, "id"> = {
    role: "author",
    email: opts.email,
    display_name: opts.displayName,
    slug,
    bio: null,
    avatar_path: null,
    website_url: null,
    has_author_website: false,
    social_facebook: null,
    social_instagram: null,
    social_twitter: null,
    social_linkedin: null,
    social_whatsapp: null,
    social_tiktok: null,
    is_public: false,
    profile_complete: false,
    created_at: now,
    updated_at: now,
  };

  await db.collection("profiles").doc(opts.uid).set(doc);
  return { id: opts.uid, ...doc };
}

export async function getProfileById(uid: string): Promise<Profile | null> {
  const db = adminDb();
  if (!db) return null;
  const snap = await db.collection("profiles").doc(uid).get();
  if (!snap.exists) return null;
  return mapProfile(snap.id, snap.data() as Record<string, unknown>);
}

export async function updateProfile(
  uid: string,
  patch: Partial<Profile>
): Promise<Profile | null> {
  const db = adminDb();
  if (!db) return null;
  const { id: _id, ...rest } = patch;
  await db
    .collection("profiles")
    .doc(uid)
    .set({ ...rest, updated_at: new Date().toISOString() }, { merge: true });
  return getProfileById(uid);
}

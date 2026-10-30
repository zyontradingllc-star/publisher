import { getPayloadClient } from "@/lib/payload";
import { slugify } from "@/lib/utils";
import { firebasePublicUrl } from "@/lib/firebase/storage-url";
import type { Profile } from "@/types/database";

type AuthorDoc = {
  id: string | number;
  firebaseUid?: string | null;
  role?: string | null;
  email?: string | null;
  displayName?: string | null;
  slug?: string | null;
  bio?: string | null;
  avatarPath?: string | null;
  avatar?:
    | string
    | number
    | {
        url?: string | null;
        id?: string | number;
        filename?: string | null;
      }
    | null;
  bannerPath?: string | null;
  banner?:
    | string
    | number
    | {
        url?: string | null;
        id?: string | number;
        filename?: string | null;
      }
    | null;
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
  approvalStatus?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

function mediaUrlFromRelation(
  rel:
    | string
    | number
    | { url?: string | null; id?: string | number; filename?: string | null }
    | null
    | undefined,
  legacyPath?: string | null
): string | null {
  const strip = (u: string | null | undefined) =>
    u && u.length > 1 && u.endsWith("/") ? u.replace(/\/+$/, "") : u || null;

  if (rel && typeof rel === "object") {
    if (rel.url) return strip(rel.url);
    if (rel.filename) return strip(`/api/media/file/${rel.filename}`);
    // Bare id without url/filename cannot be served by Payload file route
    return null;
  }
  if (typeof rel === "string" && rel.includes(".")) {
    return strip(`/api/media/file/${rel}`);
  }
  return firebasePublicUrl(legacyPath) || legacyPath || null;
}

function avatarFromDoc(doc: AuthorDoc): string | null {
  return mediaUrlFromRelation(doc.avatar, doc.avatarPath);
}

function bannerFromDoc(doc: AuthorDoc): string | null {
  return mediaUrlFromRelation(doc.banner, doc.bannerPath);
}

function mapAuthorToProfile(doc: AuthorDoc): Profile {
  const uid = String(doc.firebaseUid || doc.id);
  return {
    id: uid,
    role: doc.role === "admin" ? "admin" : "author",
    email: doc.email || null,
    display_name: doc.displayName || null,
    slug: doc.slug || null,
    bio: doc.bio || null,
    avatar_path: avatarFromDoc(doc),
    banner_path: bannerFromDoc(doc),
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
    is_public:
      doc.isPublic === true || doc.approvalStatus === "APPROVED",
    profile_complete: Boolean(doc.profileComplete),
    created_at: doc.createdAt || new Date().toISOString(),
    updated_at: doc.updatedAt || new Date().toISOString(),
  };
}

async function findAuthorByFirebaseUid(uid: string) {
  const payload = await getPayloadClient();
  const found = await payload.find({
    collection: "authors",
    where: { firebaseUid: { equals: uid } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  });
  return (found.docs[0] as AuthorDoc | undefined) ?? null;
}

export async function createAuthorProfilePayload(opts: {
  uid: string;
  email: string;
  displayName: string;
}): Promise<Profile> {
  const payload = await getPayloadClient();
  const existing = await findAuthorByFirebaseUid(opts.uid);
  if (existing) {
    const updated = await payload.update({
      collection: "authors",
      id: existing.id,
      data: {
        email: opts.email.trim().toLowerCase(),
        displayName: opts.displayName,
        firebaseUid: opts.uid,
      },
      overrideAccess: true,
    });
    return mapAuthorToProfile(updated as AuthorDoc);
  }

  const byEmail = await payload.find({
    collection: "authors",
    where: { email: { equals: opts.email.trim().toLowerCase() } },
    limit: 1,
    overrideAccess: true,
  });
  if (byEmail.docs[0]) {
    const linked = await payload.update({
      collection: "authors",
      id: byEmail.docs[0].id,
      data: {
        firebaseUid: opts.uid,
        displayName: opts.displayName,
      },
      overrideAccess: true,
    });
    return mapAuthorToProfile(linked as AuthorDoc);
  }

  const baseSlug = slugify(opts.displayName) || "author";
  const created = await payload.create({
    collection: "authors",
    data: {
      displayName: opts.displayName,
      email: opts.email.trim().toLowerCase(),
      firebaseUid: opts.uid,
      slug: `${baseSlug}-${opts.uid.slice(0, 6)}`,
      role: "author",
      approvalStatus: "PENDING",
      isPublic: false,
      profileComplete: false,
    },
    overrideAccess: true,
  });
  return mapAuthorToProfile(created as AuthorDoc);
}

export async function getProfileByIdPayload(
  uid: string
): Promise<Profile | null> {
  const doc = await findAuthorByFirebaseUid(uid);
  return doc ? mapAuthorToProfile(doc) : null;
}

export async function updateProfilePayload(
  uid: string,
  patch: Partial<Profile>
): Promise<Profile | null> {
  const payload = await getPayloadClient();
  let doc = await findAuthorByFirebaseUid(uid);
  if (!doc) {
    // Ensure row exists if Auth user has no author yet
    if (!patch.email && !patch.display_name) return null;
    await createAuthorProfilePayload({
      uid,
      email: patch.email || `${uid}@users.noreply.authorspilot.local`,
      displayName: patch.display_name || "Author",
    });
    doc = await findAuthorByFirebaseUid(uid);
    if (!doc) return null;
  }

  const data: Record<string, unknown> = {};
  if (patch.display_name !== undefined) data.displayName = patch.display_name;
  if (patch.email !== undefined && patch.email)
    data.email = patch.email.trim().toLowerCase();
  if (patch.slug !== undefined) data.slug = patch.slug;
  if (patch.bio !== undefined) data.bio = patch.bio;
  if (patch.website_url !== undefined) data.websiteUrl = patch.website_url;
  if (patch.has_author_website !== undefined)
    data.hasAuthorWebsite = patch.has_author_website;
  if (patch.social_facebook !== undefined)
    data.socialFacebook = patch.social_facebook;
  if (patch.social_instagram !== undefined)
    data.socialInstagram = patch.social_instagram;
  if (patch.social_twitter !== undefined)
    data.socialTwitter = patch.social_twitter;
  if (patch.social_linkedin !== undefined)
    data.socialLinkedin = patch.social_linkedin;
  if (patch.social_whatsapp !== undefined)
    data.socialWhatsapp = patch.social_whatsapp;
  if (patch.social_tiktok !== undefined)
    data.socialTiktok = patch.social_tiktok;
  if (patch.social_reddit !== undefined)
    data.socialReddit = patch.social_reddit;
  if (patch.social_youtube !== undefined)
    data.socialYoutube = patch.social_youtube;
  if (patch.social_pinterest !== undefined)
    data.socialPinterest = patch.social_pinterest;
  if (patch.is_public !== undefined) {
    data.isPublic = patch.is_public;
    if (patch.is_public) data.approvalStatus = "APPROVED";
  }
  if (patch.profile_complete !== undefined)
    data.profileComplete = patch.profile_complete;
  if (patch.avatar_path !== undefined) data.avatarPath = patch.avatar_path;
  if (patch.banner_path !== undefined) data.bannerPath = patch.banner_path;
  if (patch.role !== undefined) data.role = patch.role;

  const updated = await payload.update({
    collection: "authors",
    id: doc.id,
    data,
    overrideAccess: true,
  });
  return mapAuthorToProfile(updated as AuthorDoc);
}

export async function resolvePayloadAuthorId(
  firebaseUid: string
): Promise<string | null> {
  const doc = await findAuthorByFirebaseUid(firebaseUid);
  return doc ? String(doc.id) : null;
}

function pathFromMediaDoc(media: {
  url?: string | null;
  filename?: string | null;
  id?: string | number;
}): string | null {
  return mediaUrlFromRelation(media, null);
}

/** Upload avatar to Payload Media and attach it to the author row (public profile source of truth). */
export async function uploadAvatarPayload(
  uid: string,
  file: File
): Promise<Profile> {
  const payload = await getPayloadClient();
  let doc = await findAuthorByFirebaseUid(uid);
  if (!doc) {
    throw new Error("Author profile not found. Save your profile details first.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const uniqueName = `avatar-${String(doc.id).slice(-8)}-${Date.now()}.webp`;
  const media = (await payload.create({
    collection: "media",
    data: {
      alt: `${doc.displayName || "Author"} profile photo`,
    },
    file: {
      data: bytes,
      mimetype: file.type || "image/webp",
      name: uniqueName,
      size: bytes.length,
    },
    overrideAccess: true,
  })) as {
    id: string | number;
    url?: string | null;
    filename?: string | null;
  };

  const mediaPath = pathFromMediaDoc(media);

  const updated = await payload.update({
    collection: "authors",
    id: doc.id,
    data: {
      avatar: media.id,
      // Prefer Media relation over legacy Firebase path
      avatarPath: null,
      // Keep public profile in sync with dashboard media
      isPublic: true,
    },
    overrideAccess: true,
    depth: 1,
  });

  const profile = mapAuthorToProfile(updated as AuthorDoc);
  if (!profile.avatar_path && mediaPath) {
    profile.avatar_path = mediaPath;
  }
  return profile;
}

/** Upload cover banner to Payload Media and attach it to the author row (public profile source of truth). */
export async function uploadBannerPayload(
  uid: string,
  file: File
): Promise<Profile> {
  const payload = await getPayloadClient();
  const doc = await findAuthorByFirebaseUid(uid);
  if (!doc) {
    throw new Error("Author profile not found. Save your profile details first.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const uniqueName = `banner-${String(doc.id).slice(-8)}-${Date.now()}.webp`;
  const media = (await payload.create({
    collection: "media",
    data: {
      alt: `${doc.displayName || "Author"} cover banner`,
    },
    file: {
      data: bytes,
      mimetype: file.type || "image/webp",
      name: uniqueName,
      size: bytes.length,
    },
    overrideAccess: true,
  })) as {
    id: string | number;
    url?: string | null;
    filename?: string | null;
  };

  const mediaPath = pathFromMediaDoc(media);

  const updated = await payload.update({
    collection: "authors",
    id: doc.id,
    data: {
      banner: media.id,
      bannerPath: null,
      isPublic: true,
    },
    overrideAccess: true,
    depth: 1,
  });

  const profile = mapAuthorToProfile(updated as AuthorDoc);
  if (!profile.banner_path && mediaPath) {
    profile.banner_path = mediaPath;
  }
  return profile;
}

/** Published book slugs for an author (for cache revalidation after media upload). */
export async function listPublishedBookSlugsForAuthor(
  firebaseUid: string
): Promise<string[]> {
  const doc = await findAuthorByFirebaseUid(firebaseUid);
  if (!doc) return [];
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "books",
    where: {
      and: [
        { author: { equals: doc.id } },
        { status: { equals: "published" } },
      ],
    },
    limit: 50,
    depth: 0,
    overrideAccess: true,
  });
  return result.docs
    .map((b) => (b as { slug?: string | null }).slug)
    .filter((s): s is string => Boolean(s));
}

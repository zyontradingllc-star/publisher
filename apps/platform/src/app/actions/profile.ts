"use server";

import { revalidatePath } from "next/cache";
import { isLeadOnlySession, requireProfile } from "@/lib/auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { updateProfile } from "@/lib/firebase/profiles";
import { uploadAuthorFile } from "@/lib/firebase/books";
import { dropInfoToInbox } from "@/lib/notify-inbox";
import { setAuthorLeadCookie, getAuthorLead } from "@/lib/lead-session";
import { profileSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import type { ActionState } from "@/app/actions/auth";

function friendlyNetworkError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (/fetch failed|Failed to fetch|NetworkError|ECONNREFUSED/i.test(msg)) {
    return "Account database is not connected yet. Your details were emailed to no-reply@authorspilot.com instead.";
  }
  if (
    /bucket does not exist|No such object|storage\.googleapis|code":\s*404/i.test(
      msg
    )
  ) {
    return "Photo storage is not set up yet. Please try again in a moment, or contact support if this continues.";
  }
  // Avoid dumping raw Google/Firebase JSON into the UI
  if (msg.trimStart().startsWith("{") && /"error"\s*:/.test(msg)) {
    return "Could not upload the photo. Please try a smaller JPEG or PNG.";
  }
  return msg;
}

export async function updateProfileAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/profile");

  const parsed = profileSchema.safeParse({
    display_name: formData.get("display_name"),
    slug: slugify(String(formData.get("slug") || "")),
    bio: formData.get("bio") || "",
    website_url: formData.get("website_url") || "",
    has_author_website: formData.get("has_author_website") === "yes",
    social_facebook: formData.get("social_facebook") || "",
    social_instagram: formData.get("social_instagram") || "",
    social_twitter: formData.get("social_twitter") || "",
    social_linkedin: formData.get("social_linkedin") || "",
    social_tiktok: formData.get("social_tiktok") || "",
    social_reddit: formData.get("social_reddit") || "",
    is_public: formData.get("is_public") !== "false",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = parsed.data;
  if (data.has_author_website && !data.website_url) {
    return {
      ok: false,
      message: "Please add your website URL, or select No.",
      fieldErrors: {
        website_url: ["Website URL is required when you select Yes"],
      },
    };
  }

  const profileComplete = Boolean(
    data.display_name && data.slug && (data.bio?.length ?? 0) > 20
  );

  const { usePayloadData } = await import("@/lib/data/flags");
  const leadOnly =
    (await isLeadOnlySession()) ||
    (!usePayloadData() && !isFirebaseConfigured()) ||
    profile.id === "lead-session";

  if (leadOnly) {
    const inbox = await dropInfoToInbox({
      subject: `Author profile update - ${data.display_name}`,
      lines: [
        "Author profile (dashboard)",
        "",
        `Email: ${profile.email ?? "-"}`,
        `Display name: ${data.display_name}`,
        `Public slug: /authors/${data.slug}`,
        `Bio: ${data.bio || "-"}`,
        `Has website: ${data.has_author_website ? "yes" : "no"}`,
        `Website: ${data.website_url ?? "-"}`,
        `Facebook: ${data.social_facebook ?? "-"}`,
        `Instagram: ${data.social_instagram ?? "-"}`,
        `X: ${data.social_twitter ?? "-"}`,
        `LinkedIn: ${data.social_linkedin ?? "-"}`,
        `TikTok: ${data.social_tiktok ?? "-"}`,
        `Reddit: ${data.social_reddit ?? "-"}`,
        `Public: ${data.is_public ? "yes" : "no"}`,
        `Profile complete: ${profileComplete ? "yes" : "no"}`,
        "",
        `Submitted at: ${new Date().toISOString()}`,
      ],
    });

    const existing = await getAuthorLead();
    if (existing) {
      await setAuthorLeadCookie({
        ...existing,
        displayName: data.display_name,
      });
    }

    revalidatePath("/dashboard/profile");
    return { ok: true, message: "Profile saved" };
  }

  try {
    await updateProfile(profile.id, {
      display_name: data.display_name,
      slug: data.slug,
      bio: data.bio || null,
      website_url: data.has_author_website ? data.website_url ?? null : null,
      has_author_website: data.has_author_website,
      social_facebook: data.social_facebook ?? null,
      social_instagram: data.social_instagram ?? null,
      social_twitter: data.social_twitter ?? null,
      social_linkedin: data.social_linkedin ?? null,
      social_tiktok: data.social_tiktok ?? null,
      social_reddit: data.social_reddit ?? null,
      is_public: data.is_public,
      profile_complete: profileComplete,
    });

    revalidatePath("/dashboard/profile");
    revalidatePath(`/authors/${data.slug}`);
    return { ok: true, message: "Profile saved" };
  } catch (err) {
    await dropInfoToInbox({
      subject: `Author profile update - ${data.display_name}`,
      lines: [
        "Author profile (fallback after DB error)",
        `Email: ${profile.email ?? "-"}`,
        `Display name: ${data.display_name}`,
        `Slug: ${data.slug}`,
        `Bio: ${data.bio || "-"}`,
        `Error: ${err instanceof Error ? err.message : "unknown"}`,
      ],
    });
    return { ok: false, message: friendlyNetworkError(err) };
  }
}

export async function uploadAvatarAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard/profile");
  const raw = formData.get("avatar") as File | null;
  if (!raw || raw.size === 0) {
    return { ok: false, message: "Choose an image file." };
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(raw.type)) {
    return { ok: false, message: "Avatar must be JPEG, PNG, GIF, or WebP." };
  }
  if (raw.size > 5_242_880) {
    return { ok: false, message: "Avatar must be 5 MB or smaller." };
  }

  let file: File;
  try {
    const { fileToWebp } = await import("@/lib/image-webp");
    file = await fileToWebp(raw, {
      maxWidth: 800,
      maxHeight: 800,
      quality: 82,
      basename: "avatar",
    });
  } catch {
    return {
      ok: false,
      message: "Could not convert the image. Try a different JPEG or PNG.",
    };
  }

  const { usePayloadData: usePayloadForAvatar } = await import(
    "@/lib/data/flags"
  );
  const leadOnly =
    (await isLeadOnlySession()) ||
    (!usePayloadForAvatar() && !isFirebaseConfigured()) ||
    profile.id === "lead-session";

  if (leadOnly) {
    const inbox = await dropInfoToInbox({
      subject: `Avatar upload - ${profile.display_name ?? profile.email}`,
      lines: [
        "Author avatar selected (storage not connected yet)",
        "",
        `Email: ${profile.email ?? "-"}`,
        `File name: ${file.name}`,
        `File type: ${file.type}`,
        `File size: ${Math.round(file.size / 1024)} KB`,
        "",
        "Connect Payload media / storage to store avatars permanently.",
      ],
    });
    return {
      ok: true,
      message: inbox.ok
        ? `Avatar info emailed (${file.name}). Connect storage to keep the photo.`
        : "Avatar noted for this session.",
    };
  }

  try {
    if (usePayloadForAvatar()) {
      const { uploadAvatarPayload } = await import(
        "@/lib/data/profiles-payload"
      );
      const { avatarUrl } = await import("@/lib/utils");
      const updated = await uploadAvatarPayload(profile.id, file);
      revalidatePath("/dashboard/profile");
      revalidatePath("/dashboard");
      if (profile.slug) revalidatePath(`/authors/${profile.slug}`);
      const resolved = avatarUrl(updated.avatar_path);
      return {
        ok: true,
        message: "Avatar updated.",
        url: resolved
          ? `${resolved}${resolved.includes("?") ? "&" : "?"}v=${Date.now()}`
          : undefined,
      };
    }

    const path = await uploadAuthorFile({
      authorId: profile.id,
      bookId: "profile",
      kind: "avatar",
      file,
    });
    await updateProfile(profile.id, { avatar_path: path });
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");
    const { avatarUrl } = await import("@/lib/utils");
    const resolved = avatarUrl(path);
    return {
      ok: true,
      message: "Avatar updated.",
      url: resolved
        ? `${resolved}${resolved.includes("?") ? "&" : "?"}v=${Date.now()}`
        : undefined,
    };
  } catch (err) {
    return { ok: false, message: friendlyNetworkError(err) };
  }
}

export async function uploadBannerAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const profile = await requireProfile("/dashboard");
  const raw = formData.get("banner") as File | null;
  if (!raw || raw.size === 0) {
    return { ok: false, message: "Choose an image file." };
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(raw.type)) {
    return { ok: false, message: "Banner must be JPEG, PNG, GIF, or WebP." };
  }
  if (raw.size > 8_388_608) {
    return { ok: false, message: "Banner must be 8 MB or smaller." };
  }

  let file: File;
  try {
    const { fileToWebp } = await import("@/lib/image-webp");
    file = await fileToWebp(raw, {
      maxWidth: 2400,
      maxHeight: 900,
      quality: 80,
      basename: "banner",
    });
  } catch {
    return {
      ok: false,
      message: "Could not convert the image. Try a different JPEG or PNG.",
    };
  }

  const { usePayloadData: usePayloadForBanner } = await import(
    "@/lib/data/flags"
  );
  const leadOnly =
    (await isLeadOnlySession()) ||
    (!usePayloadForBanner() && !isFirebaseConfigured()) ||
    profile.id === "lead-session";

  if (leadOnly) {
    const inbox = await dropInfoToInbox({
      subject: `Banner upload - ${profile.display_name ?? profile.email}`,
      lines: [
        "Author cover banner selected (storage not connected yet)",
        "",
        `Email: ${profile.email ?? "-"}`,
        `File name: ${file.name}`,
        `File type: ${file.type}`,
        `File size: ${Math.round(file.size / 1024)} KB`,
        "",
        "Connect Payload media / storage to store banners permanently.",
      ],
    });
    return {
      ok: true,
      message: inbox.ok
        ? `Banner info emailed (${file.name}). Connect storage to keep the image.`
        : "Banner noted for this session.",
    };
  }

  try {
    if (usePayloadForBanner()) {
      const { uploadBannerPayload } = await import(
        "@/lib/data/profiles-payload"
      );
      const { bannerUrl } = await import("@/lib/utils");
      const updated = await uploadBannerPayload(profile.id, file);
      revalidatePath("/dashboard");
      revalidatePath("/dashboard/profile");
      if (profile.slug) revalidatePath(`/authors/${profile.slug}`);
      const resolved = bannerUrl(updated.banner_path);
      return {
        ok: true,
        message: "Cover photo updated.",
        url: resolved
          ? `${resolved}${resolved.includes("?") ? "&" : "?"}v=${Date.now()}`
          : undefined,
      };
    }

    const path = await uploadAuthorFile({
      authorId: profile.id,
      bookId: "profile",
      kind: "avatar",
      file,
    });
    await updateProfile(profile.id, { banner_path: path });
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");
    const { bannerUrl } = await import("@/lib/utils");
    const resolved = bannerUrl(path);
    return {
      ok: true,
      message: "Cover photo updated.",
      url: resolved
        ? `${resolved}${resolved.includes("?") ? "&" : "?"}v=${Date.now()}`
        : undefined,
    };
  } catch (err) {
    return { ok: false, message: friendlyNetworkError(err) };
  }
}

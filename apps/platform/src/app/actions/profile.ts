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

  const leadOnly =
    (await isLeadOnlySession()) ||
    !isFirebaseConfigured() ||
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
  const file = formData.get("avatar") as File | null;
  if (!file || file.size === 0) {
    return { ok: false, message: "Choose an image file." };
  }

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    return { ok: false, message: "Avatar must be JPEG, PNG, or WebP." };
  }
  if (file.size > 2_097_152) {
    return { ok: false, message: "Avatar must be 2 MB or smaller." };
  }

  const leadOnly =
    (await isLeadOnlySession()) ||
    !isFirebaseConfigured() ||
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
        "Connect Firebase Storage to store avatars permanently.",
      ],
    });
    return {
      ok: true,
      message: inbox.ok
        ? `Avatar info emailed (${file.name}). Connect Firebase to store the photo.`
        : "Avatar noted for this session.",
    };
  }

  try {
    const path = await uploadAuthorFile({
      authorId: profile.id,
      bookId: "profile",
      kind: "avatar",
      file,
    });
    await updateProfile(profile.id, { avatar_path: path });
    revalidatePath("/dashboard/profile");
    return { ok: true, message: "Avatar updated." };
  } catch (err) {
    return { ok: false, message: friendlyNetworkError(err) };
  }
}

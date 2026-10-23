"use server";

import { getSessionUser } from "@/lib/auth";
import { AUTHOR_WEBSITE_DESIGN_URL, isSafeHttpUrl } from "@/lib/utils";

/** Record a public book page view. Analytics store removed with Supabase. */
export async function recordBookViewAction(_bookId: string) {
  return { ok: false as const };
}

/** Record a public author profile view. */
export async function recordAuthorViewAction(_profileId: string) {
  return { ok: false as const };
}

/** Track Website Design CTA click, then return the external URL to open. */
export async function recordWebsiteDesignCtaClickAction(formData: FormData) {
  void formData;
  void (await getSessionUser());

  if (!isSafeHttpUrl(AUTHOR_WEBSITE_DESIGN_URL)) {
    return { ok: false as const, url: null };
  }
  return { ok: true as const, url: AUTHOR_WEBSITE_DESIGN_URL };
}

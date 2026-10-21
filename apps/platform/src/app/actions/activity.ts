"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth";
import { AUTHOR_WEBSITE_DESIGN_URL, isSafeHttpUrl } from "@/lib/utils";

function referrerHost(raw: string | null): string | null {
  if (!raw) return null;
  try {
    return new URL(raw).host.slice(0, 120);
  } catch {
    return null;
  }
}

/** Record a public book page view. Not a sale. */
export async function recordBookViewAction(bookId: string) {
  if (!bookId) return { ok: false as const };
  // Skip when Supabase is unset - avoids multi-second failed network attempts
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { ok: false as const };
  }
  try {
    const h = await headers();
    const supabase = await createClient();
    const { error } = await supabase.from("book_views").insert({
      book_id: bookId,
      referrer_host: referrerHost(h.get("referer")),
    });
    if (error) {
      console.info("[activity] book_view skipped:", error.message);
      return { ok: false as const };
    }
    return { ok: true as const };
  } catch (err) {
    console.info(
      "[activity] book_view error:",
      err instanceof Error ? err.message : "unknown"
    );
    return { ok: false as const };
  }
}

/** Record a public author profile view. */
export async function recordAuthorViewAction(profileId: string) {
  if (!profileId) return { ok: false as const };
  try {
    const h = await headers();
    const supabase = await createClient();
    const { error } = await supabase.from("author_profile_views").insert({
      profile_id: profileId,
      referrer_host: referrerHost(h.get("referer")),
    });
    if (error) {
      console.info("[activity] author_view skipped:", error.message);
      return { ok: false as const };
    }
    return { ok: true as const };
  } catch {
    return { ok: false as const };
  }
}

/** Track Website Design CTA click, then return the external URL to open. */
export async function recordWebsiteDesignCtaClickAction(formData: FormData) {
  const sourcePath = String(formData.get("source_path") || "").slice(0, 200);
  const bookId = String(formData.get("book_id") || "") || null;
  const user = await getSessionUser();

  try {
    const supabase = await createClient();
    await supabase.from("cta_clicks").insert({
      cta_kind: "author_website_design",
      profile_id: user?.id ?? null,
      book_id: bookId,
      source_path: sourcePath || null,
    });
  } catch (err) {
    console.info(
      "[activity] cta_click error:",
      err instanceof Error ? err.message : "unknown"
    );
  }

  // Always return the known safe marketing URL - never trust client-supplied destinations.
  if (!isSafeHttpUrl(AUTHOR_WEBSITE_DESIGN_URL)) {
    return { ok: false as const, url: null };
  }
  return { ok: true as const, url: AUTHOR_WEBSITE_DESIGN_URL };
}

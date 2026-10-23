import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/firebase/constants";
import { publicRedirect } from "@/lib/public-origin";

/**
 * Share / CTA entry for the publish form.
 * Logged in → open book form. Otherwise → signup first (then form).
 */
export async function GET(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const formPath = "/dashboard/books/new";

  if (hasSession) {
    return publicRedirect(request, formPath);
  }

  return publicRedirect(
    request,
    `/signup?next=${encodeURIComponent(formPath)}&google=1`
  );
}

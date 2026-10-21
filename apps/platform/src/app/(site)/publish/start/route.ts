import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/firebase/constants";
import { LEAD_COOKIE, type AuthorLead } from "@/lib/lead-session";
import { publicRedirect } from "@/lib/public-origin";

/**
 * CTA entry - sets a guest lead cookie, then opens the 3-step Publish Book form.
 */
export async function GET(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const hasLead = Boolean(request.cookies.get(LEAD_COOKIE)?.value);

  const response = publicRedirect(request, "/dashboard/books/new");

  if (!hasSession && !hasLead) {
    const lead: AuthorLead = {
      email: "pending@authorspilot.guest",
      displayName: "Author",
      createdAt: new Date().toISOString(),
    };
    response.cookies.set(LEAD_COOKIE, JSON.stringify(lead), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

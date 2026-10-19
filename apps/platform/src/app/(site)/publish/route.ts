import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/firebase/constants";
import { LEAD_COOKIE, type AuthorLead } from "@/lib/lead-session";
import { publicRedirect } from "@/lib/public-origin";

/**
 * Public entry — no signup. Sets a guest lead cookie (Route Handler),
 * then opens the existing 3-step Publish Book flow.
 * Uses public origin so a :3000→:3001 rewrite stays on one URL.
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

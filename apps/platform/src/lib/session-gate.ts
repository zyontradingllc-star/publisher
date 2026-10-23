import { NextResponse, type NextRequest } from "next/server";
import { LEAD_COOKIE } from "@/lib/lead-session";
import { SESSION_COOKIE } from "@/lib/firebase/constants";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { publicRedirect } from "@/lib/public-origin";

/**
 * Edge-safe gate: Firebase session cookie presence + lead cookie.
 * Full session verification happens in Node (getCurrentProfile / requireProfile).
 */
export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Payload CMS admin + API - do not apply Firebase/lead gates
  if (pathname.startsWith("/cms") || pathname.startsWith("/api")) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  const hasLead = Boolean(request.cookies.get(LEAD_COOKIE)?.value);
  const hasFirebaseSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const firebaseOn = isFirebaseConfigured();

  // Publish wizard: always signup first (no guest lead bypass)
  if (pathname.startsWith("/dashboard/books/new") && !hasFirebaseSession) {
    return publicRedirect(
      request,
      `/signup?next=${encodeURIComponent(pathname)}&google=1`
    );
  }

  if ((isDashboard || isAdmin) && !hasFirebaseSession && !hasLead) {
    const loginPath = firebaseOn ? "/login" : "/signup";
    return publicRedirect(
      request,
      `${loginPath}?next=${encodeURIComponent(pathname)}`
    );
  }

  if (isAdmin && !hasFirebaseSession) {
    return publicRedirect(request, "/dashboard");
  }

  if (
    hasFirebaseSession &&
    (pathname === "/login" ||
      pathname === "/signup" ||
      pathname.startsWith("/signup/"))
  ) {
    // Signup CTA → publish form; login → dashboard
    const dest =
      pathname === "/signup" || pathname.startsWith("/signup/")
        ? "/dashboard/books/new"
        : "/dashboard";
    return publicRedirect(request, dest);
  }

  return response;
}

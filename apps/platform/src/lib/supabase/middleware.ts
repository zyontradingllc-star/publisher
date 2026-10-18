import { NextResponse, type NextRequest } from "next/server";
import { LEAD_COOKIE } from "@/lib/lead-session";
import { SESSION_COOKIE } from "@/lib/firebase/constants";
import { isFirebaseConfigured } from "@/lib/firebase/config";

/**
 * Edge-safe gate: Firebase session cookie presence + lead cookie.
 * Full session verification happens in Node (getCurrentProfile / requireProfile).
 */
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  const pathname = request.nextUrl.pathname;
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  const hasLead = Boolean(request.cookies.get(LEAD_COOKIE)?.value);
  const hasFirebaseSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const firebaseOn = isFirebaseConfigured();

  if ((isDashboard || isAdmin) && !hasFirebaseSession && !hasLead) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = firebaseOn ? "/login" : "/signup";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAdmin && !hasFirebaseSession) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  if (
    hasFirebaseSession &&
    (pathname === "/login" ||
      pathname === "/signup" ||
      pathname.startsWith("/signup/"))
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

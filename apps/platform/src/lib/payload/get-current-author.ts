import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE } from "@/lib/firebase/constants";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";
import { slugify } from "@/lib/utils";

export type CurrentAuthor = {
  id: string;
  firebaseUid: string;
  email: string;
  displayName: string;
  slug: string;
  approvalStatus: string;
};

function uniqueSlug(base: string, suffix: string) {
  const root = slugify(base) || "author";
  return `${root}-${suffix.slice(0, 8)}`;
}

function mapAuthor(doc: {
  id: string | number;
  firebaseUid?: string | null;
  email?: string | null;
  displayName?: string | null;
  slug?: string | null;
  approvalStatus?: string | null;
}): CurrentAuthor {
  return {
    id: String(doc.id),
    firebaseUid: String(doc.firebaseUid ?? ""),
    email: String(doc.email ?? ""),
    displayName: String(doc.displayName ?? "Author"),
    slug: String(doc.slug ?? ""),
    approvalStatus: String(doc.approvalStatus ?? "PENDING"),
  };
}

/**
 * Verify Firebase Auth (Bearer ID token or session cookie), then load/create
 * the Payload `authors` row linked by `firebaseUid`.
 * Never trusts a client-sent author id.
 */
export async function getCurrentAuthor(
  request: Request
): Promise<CurrentAuthor | null> {
  if (!isFirebaseConfigured() || !isPayloadConfigured()) return null;

  const auth = adminAuth();
  if (!auth) return null;

  let uid: string | null = null;
  let email: string | null = null;
  let displayName: string | null = null;

  const authorization = request.headers.get("authorization");
  if (authorization?.toLowerCase().startsWith("bearer ")) {
    const idToken = authorization.slice(7).trim();
    if (!idToken) return null;
    try {
      const decoded = await auth.verifyIdToken(idToken, true);
      uid = decoded.uid;
      email = decoded.email ?? null;
      displayName =
        typeof decoded.name === "string" && decoded.name.trim()
          ? decoded.name.trim()
          : null;
    } catch {
      return null;
    }
  } else {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const match = cookieHeader.match(
      new RegExp(
        `(?:^|;\\s*)${SESSION_COOKIE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`
      )
    );
    const session = match?.[1] ? decodeURIComponent(match[1]) : null;
    if (!session) return null;
    try {
      const decoded = await auth.verifySessionCookie(session, true);
      uid = decoded.uid;
      email = decoded.email ?? null;
    } catch {
      return null;
    }
  }

  if (!uid) return null;

  const payload = await getPayloadClient();

  const byUid = await payload.find({
    collection: "authors",
    where: { firebaseUid: { equals: uid } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  if (byUid.docs[0]) {
    return mapAuthor(byUid.docs[0] as Parameters<typeof mapAuthor>[0]);
  }

  const normalizedEmail = email?.trim().toLowerCase() || null;
  if (normalizedEmail) {
    const byEmail = await payload.find({
      collection: "authors",
      where: { email: { equals: normalizedEmail } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    if (byEmail.docs[0]) {
      const linked = await payload.update({
        collection: "authors",
        id: byEmail.docs[0].id,
        data: { firebaseUid: uid },
        overrideAccess: true,
      });
      return mapAuthor(linked as Parameters<typeof mapAuthor>[0]);
    }
  }

  const name =
    displayName ||
    (normalizedEmail ? normalizedEmail.split("@")[0] : null) ||
    "Author";
  const authorEmail =
    normalizedEmail || `${uid}@users.noreply.authorspilot.local`;

  const created = await payload.create({
    collection: "authors",
    data: {
      displayName: name,
      email: authorEmail,
      firebaseUid: uid,
      slug: uniqueSlug(name, uid),
      approvalStatus: "PENDING",
    },
    overrideAccess: true,
  });

  return mapAuthor(created as Parameters<typeof mapAuthor>[0]);
}

/**
 * Same as getCurrentAuthor, but builds a Request from Next.js cookies/headers
 * (for Server Actions / RSC where no Request is passed).
 */
export async function getCurrentAuthorFromSession(): Promise<CurrentAuthor | null> {
  const h = await headers();
  const jar = await cookies();
  const session = jar.get(SESSION_COOKIE)?.value;
  const headersInit = new Headers();
  const authorization = h.get("authorization");
  if (authorization) headersInit.set("authorization", authorization);
  if (session) {
    headersInit.set("cookie", `${SESSION_COOKIE}=${encodeURIComponent(session)}`);
  }
  return getCurrentAuthor(
    new Request("http://local/session", { headers: headersInit })
  );
}

export async function requireCurrentAuthor(
  request: Request
): Promise<CurrentAuthor | NextResponse> {
  const author = await getCurrentAuthor(request);
  if (!author) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized. Sign in and retry." },
      { status: 401 }
    );
  }
  return author;
}

export function isCurrentAuthor(
  value: CurrentAuthor | NextResponse
): value is CurrentAuthor {
  return !(value instanceof NextResponse);
}

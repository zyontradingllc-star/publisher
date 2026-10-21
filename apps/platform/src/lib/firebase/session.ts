import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { SESSION_COOKIE } from "@/lib/firebase/constants";

export { SESSION_COOKIE };

/** 5 days in ms - Firebase session cookie max is 14 days */
const SESSION_EXPIRES_MS = 60 * 60 * 24 * 5 * 1000;

export async function createSessionCookie(idToken: string) {
  const auth = adminAuth();
  if (!auth) throw new Error("Firebase Admin is not configured");

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRES_MS,
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_EXPIRES_MS / 1000,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSessionUser() {
  if (!isFirebaseConfigured()) return null;
  const auth = adminAuth();
  if (!auth) return null;

  const store = await cookies();
  const session = store.get(SESSION_COOKIE)?.value;
  if (!session) return null;

  try {
    const decoded = await auth.verifySessionCookie(session, true);
    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
    };
  } catch {
    return null;
  }
}

/**
 * Exchange email/password for an ID token via Identity Toolkit,
 * then mint a server session cookie.
 */
export async function signInWithPassword(email: string, password: string) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) throw new Error("Missing NEXT_PUBLIC_FIREBASE_API_KEY");

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      signal: AbortSignal.timeout(8000),
    }
  );

  const data = (await res.json()) as {
    idToken?: string;
    localId?: string;
    email?: string;
    error?: { message?: string };
  };

  if (!res.ok || !data.idToken) {
    const msg = data.error?.message ?? "INVALID_PASSWORD";
    if (msg.includes("INVALID_PASSWORD") || msg.includes("INVALID_LOGIN")) {
      throw new Error("Wrong email or password.");
    }
    if (msg.includes("EMAIL_NOT_FOUND") || msg.includes("USER_DISABLED")) {
      throw new Error("Wrong email or password.");
    }
    throw new Error(msg.replace(/_/g, " ").toLowerCase());
  }

  await createSessionCookie(data.idToken);
  return { uid: data.localId!, email: data.email ?? email };
}

export async function sendPasswordResetEmail(email: string) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) throw new Error("Missing NEXT_PUBLIC_FIREBASE_API_KEY");

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email,
      }),
      signal: AbortSignal.timeout(8000),
    }
  );

  const data = (await res.json()) as { error?: { message?: string } };
  if (!res.ok) {
    // Do not reveal whether the email exists
    console.warn("[firebase] reset email:", data.error?.message);
  }
}

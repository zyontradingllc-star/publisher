"use server";

import { redirect } from "next/navigation";
import { dropInfoToInbox } from "@/lib/notify-inbox";
import { setAuthorLeadCookie, clearAuthorLeadCookie } from "@/lib/lead-session";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { adminAuth } from "@/lib/firebase/admin";
import {
  clearSessionCookie,
  createSessionFromIdToken,
  sendPasswordResetEmail,
  signInWithPassword,
} from "@/lib/firebase/session";
import {
  createAuthorProfile,
  getProfileById,
} from "@/lib/firebase/profiles";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/lib/validations";
import { getAppUrl } from "@/lib/env";
import { verifyTurnstileToken } from "@/lib/turnstile";

export type ActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

/**
 * Signup As Author (Firebase):
 * 1) Notify no-reply inbox (never password)
 * 2) Create Firebase Auth user + Firestore profile
 * 3) Sign in + session cookie → dashboard
 */
export async function signupAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawName = String(formData.get("displayName") || "").trim();
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    confirmEmail: formData.get("confirmEmail"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword") || undefined,
    displayName: rawName || undefined,
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

  const { email, password } = parsed.data;
  const displayName =
    parsed.data.displayName ||
    email.split("@")[0]?.replace(/[._+-]+/g, " ").trim() ||
    "Author";

  const inbox = await dropInfoToInbox({
    subject: `Signup As Author - ${displayName}`,
    lines: [
      "New author signup (Authors Pilot platform)",
      "",
      `Display name: ${displayName}`,
      `Email: ${email}`,
      `Submitted at: ${new Date().toISOString()}`,
      "",
      "Password is not included in this email.",
      "Auth backend: Firebase",
    ],
  });

  if (!inbox.ok) {
    console.warn("[signup] inbox drop failed:", inbox.error);
  }

  if (!isFirebaseConfigured()) {
    await setAuthorLeadCookie({
      email,
      displayName,
      createdAt: new Date().toISOString(),
    });
    redirect("/dashboard/books/new");
  }

  try {
    const auth = adminAuth();
    if (!auth) {
      await setAuthorLeadCookie({
        email,
        displayName,
        createdAt: new Date().toISOString(),
      });
      redirect("/dashboard/books/new");
    }

    let uid: string;
    try {
      const user = await auth.createUser({
        email,
        password,
        displayName,
        emailVerified: false,
      });
      uid = user.uid;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      if (/email.*already|EMAIL_EXISTS/i.test(message)) {
        return {
          ok: false,
          message: "An account with this email already exists. Please log in.",
        };
      }
      throw err;
    }

    await createAuthorProfile({ uid, email, displayName });
    await signInWithPassword(email, password);
    await clearAuthorLeadCookie().catch(() => undefined);
    const next = String(formData.get("next") || "/dashboard/books/new");
    redirect(next.startsWith("/") ? next : "/dashboard/books/new");
  } catch (err) {
    // NEXT_REDIRECT is thrown by redirect() - rethrow
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      String((err as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    const message = err instanceof Error ? err.message : "Signup failed";
    console.warn("[signup] firebase error:", message);
    await setAuthorLeadCookie({
      email,
      displayName,
      createdAt: new Date().toISOString(),
    });
    redirect("/dashboard/books/new");
  }
}

/**
 * Continue with Google: optional Cloudflare Turnstile → verify ID token →
 * ensure author profile → session → next (default publish form for new authors).
 */
export async function continueWithGoogleAction(
  idToken: string,
  nextPath = "/dashboard",
  turnstileToken?: string | null
): Promise<ActionState> {
  if (!idToken || typeof idToken !== "string") {
    return { ok: false, message: "Google sign-in did not return a token." };
  }

  if (!isFirebaseConfigured()) {
    return {
      ok: false,
      message:
        "Google sign-in needs Firebase. Enable Google in Authentication → Sign-in method.",
    };
  }

  // Signup passes turnstileToken (string|null). Login omits it — skip captcha.
  if (turnstileToken !== undefined) {
    const captcha = await verifyTurnstileToken(turnstileToken);
    if (!captcha.success) {
      return {
        ok: false,
        message: captcha.message || "Security check failed.",
      };
    }
  }

  try {
    const session = await createSessionFromIdToken(idToken);
    if (!session.email) {
      return {
        ok: false,
        message: "Your Google account has no email. Use another account.",
      };
    }

    const displayName =
      session.name?.trim() || session.email.split("@")[0] || "Author";

    const existing = await getProfileById(session.uid);
    const isNew = !existing;

    if (isNew) {
      await createAuthorProfile({
        uid: session.uid,
        email: session.email,
        displayName,
      });
      const inbox = await dropInfoToInbox({
        subject: `Signup As Author (Google) - ${displayName}`,
        lines: [
          "New author signup via Google (Authors Pilot platform)",
          "",
          `Display name: ${displayName}`,
          `Email: ${session.email}`,
          `Firebase UID: ${session.uid}`,
          `Submitted at: ${new Date().toISOString()}`,
          "",
          "Auth backend: Firebase Google",
        ],
      });
      if (!inbox.ok) {
        console.warn("[google-signup] inbox drop failed:", inbox.error);
      }
    }

    await clearAuthorLeadCookie().catch(() => undefined);

    const safeNext = nextPath.startsWith("/") ? nextPath : "/dashboard";
    // New authors always land on the publish form; returning users honor nextPath
    // (signup CTA passes /dashboard/books/new so the form opens with Google name/email).
    redirect(isNew || safeNext === "/dashboard/books/new" ? "/dashboard/books/new" : safeNext);
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      String((err as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    console.warn(
      "[google-continue]",
      err instanceof Error ? err.message : err
    );
    return {
      ok: false,
      message:
        err instanceof Error
          ? err.message
          : "Google sign-in failed. Please try again.",
    };
  }
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please enter a valid email and password.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  if (!isFirebaseConfigured()) {
    return {
      ok: false,
      message:
        "Account login needs Firebase. Add Firebase env keys, or use Signup As Author (temporary session).",
    };
  }

  try {
    await signInWithPassword(parsed.data.email, parsed.data.password);
    await clearAuthorLeadCookie().catch(() => undefined);
    const next = String(formData.get("next") || "/dashboard");
    redirect(next.startsWith("/") ? next : "/dashboard");
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      String((err as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "Wrong email or password.",
    };
  }
}

export async function logoutAction() {
  await clearSessionCookie().catch(() => undefined);
  await clearAuthorLeadCookie().catch(() => undefined);
  redirect("/");
}

export async function forgotPasswordAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return { ok: false, message: "Enter a valid email address." };
  }

  if (!isFirebaseConfigured()) {
    return {
      ok: false,
      message:
        "Password reset is unavailable until Firebase Auth is configured.",
    };
  }

  try {
    await sendPasswordResetEmail(parsed.data.email);
  } catch (err) {
    console.warn(
      "[forgot-password]",
      err instanceof Error ? err.message : err
    );
  }

  return {
    ok: true,
    message:
      "If an account exists for that email, a password reset link was sent to your inbox (from Firebase / no-reply). Check spam if you do not see it.",
  };
}

export async function resetPasswordAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Firebase sends users to its hosted reset page by default.
  // Custom oobCode flow can be added later; for now guide them to login.
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
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

  const oobCode = String(formData.get("oobCode") || "");
  if (!oobCode) {
    return {
      ok: false,
      message:
        "Open the reset link from your email to set a new password, then log in.",
    };
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    return { ok: false, message: "Firebase is not configured." };
  }

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oobCode,
        newPassword: parsed.data.password,
      }),
      signal: AbortSignal.timeout(8000),
    }
  );

  const data = (await res.json()) as { error?: { message?: string } };
  if (!res.ok) {
    return {
      ok: false,
      message: data.error?.message?.replace(/_/g, " ") || "Reset failed.",
    };
  }

  redirect("/login?password=updated");
}

/** Continue URL shown in Firebase console / emails */
export async function getPasswordResetContinueUrl() {
  return `${getAppUrl()}/reset-password`;
}

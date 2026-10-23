"use client";

import { useRef, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { continueWithGoogleAction } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import {
  Turnstile,
  isTurnstileEnabled,
  type TurnstileHandle,
} from "@/components/forms/Turnstile";
import {
  getFirebaseAuth,
  isFirebaseClientConfigured,
} from "@/lib/firebase/client";

const PUBLISH_FORM_PATH = "/dashboard/books/new";

function GoogleIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/**
 * Signup: Cloudflare Turnstile (when configured) → Google verify →
 * publish form with name/email from the Google account.
 */
export function SignupGoogleFlow() {
  const turnstileRequired = isTurnstileEnabled();
  const turnstileRef = useRef<TurnstileHandle>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isFirebaseClientConfigured()) {
    return (
      <Alert variant="error">
        Google signup needs Firebase config. Add public Firebase keys, then
        enable Google in Authentication → Sign-in method.
      </Alert>
    );
  }

  const canContinue = !turnstileRequired || Boolean(turnstileToken);

  async function onSignup() {
    setError(null);
    if (turnstileRequired && !turnstileToken) {
      setError("Complete the Cloudflare security check first.");
      return;
    }
    setPending(true);
    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      provider.addScope("email");
      provider.addScope("profile");
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const state = await continueWithGoogleAction(
        idToken,
        PUBLISH_FORM_PATH,
        turnstileToken
      );
      if (state && !state.ok) {
        setError(state.message || "Google sign-in failed.");
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch (err) {
      const code =
        err && typeof err === "object" && "code" in err
          ? String((err as { code?: string }).code)
          : "";
      if (
        code === "auth/popup-closed-by-user" ||
        code === "auth/cancelled-popup-request"
      ) {
        setError(null);
      } else if (code === "auth/popup-blocked") {
        setError("Pop-up blocked. Allow pop-ups for this site and try again.");
      } else {
        setError(
          err instanceof Error ? err.message : "Google sign-in failed."
        );
      }
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="card-surface space-y-5">
      <div>
        <h1 className="heading-display text-2xl">Signup</h1>
        <p className="mt-2 text-sm text-forest-muted">
          Verify with Google. Cloudflare checks you are human, then your name
          and email open on the book form.
        </p>
      </div>

      {error ? <Alert variant="error">{error}</Alert> : null}

      {turnstileRequired ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-forest-muted">
            Security check
          </p>
          <Turnstile
            ref={turnstileRef}
            action="signup"
            onChange={setTurnstileToken}
          />
        </div>
      ) : null}

      <Button
        type="button"
        className="w-full normal-case tracking-normal"
        disabled={pending || !canContinue}
        onClick={onSignup}
      >
        <GoogleIcon />
        {pending ? "Verifying…" : "Continue with Google"}
      </Button>

      {!canContinue ? (
        <p className="text-center text-xs text-forest-muted">
          Complete the check above, then continue with Google.
        </p>
      ) : (
        <p className="text-center text-xs text-forest-muted">
          Next: book details form — name &amp; email filled from Google.
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { continueWithGoogleAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import {
  getFirebaseAuth,
  isFirebaseClientConfigured,
} from "@/lib/firebase/client";

const PUBLISH_FORM = "/dashboard/books/new";

type SignupCtaProps = {
  className?: string;
  label?: string;
};

/**
 * Nav Signup: opens Google account picker, then /dashboard/books/new
 * with name/email from Google. Falls back to /signup if Firebase missing.
 */
export function SignupCta({
  className = "",
  label = "Signup",
}: SignupCtaProps) {
  const [pending, setPending] = useState(false);

  if (!isFirebaseClientConfigured()) {
    return (
      <Button href="/signup" className={className}>
        {label}
      </Button>
    );
  }

  async function onClick() {
    setPending(true);
    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      provider.addScope("email");
      provider.addScope("profile");
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const state = await continueWithGoogleAction(idToken, PUBLISH_FORM);
      if (state && !state.ok) {
        window.location.href = "/signup";
      }
    } catch (err) {
      const code =
        err && typeof err === "object" && "code" in err
          ? String((err as { code?: string }).code)
          : "";
      if (
        code !== "auth/popup-closed-by-user" &&
        code !== "auth/cancelled-popup-request"
      ) {
        window.location.href = "/signup";
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      type="button"
      className={className}
      disabled={pending}
      onClick={onClick}
    >
      {pending ? "…" : label}
    </Button>
  );
}

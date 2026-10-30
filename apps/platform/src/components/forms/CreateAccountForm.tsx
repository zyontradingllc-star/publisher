"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { continueWithGoogleAction, signupAction } from "@/app/actions/auth";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import {
  getFirebaseAuth,
  isFirebaseClientConfigured,
} from "@/lib/firebase/client";
import { MARKETING_URL, platformPublicPath } from "@/lib/utils";

const initialState: ActionState = { ok: true };
const PUBLISH_FORM = "/dashboard/books/new";

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

function RuleRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li
      className={`flex items-center gap-2 text-sm ${
        ok ? "text-green-700" : "text-forest-muted"
      }`}
    >
      <span aria-hidden className="w-4 text-center font-bold">
        {ok ? "✓" : "×"}
      </span>
      {label}
    </li>
  );
}

export function CreateAccountForm() {
  const searchParams = useSearchParams();
  const autoGoogle = searchParams.get("google") === "1";
  const nextFromQuery = searchParams.get("next");
  const afterAuthPath =
    nextFromQuery && nextFromQuery.startsWith("/")
      ? nextFromQuery
      : PUBLISH_FORM;
  const autoStarted = useRef(false);
  const [state, formAction, pending] = useActionState(signupAction, initialState);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [googlePending, setGooglePending] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const rules = useMemo(
    () => ({
      min8: password.length >= 8,
      caseMix: /[a-z]/.test(password) && /[A-Z]/.test(password),
      numSymbol: /[0-9]/.test(password) && /[^A-Za-z0-9\s]/.test(password),
      noSpaces: password.length > 0 && !/\s/.test(password),
    }),
    [password]
  );

  const emailsMatch =
    email.trim().length > 0 &&
    confirmEmail.trim().length > 0 &&
    email.trim().toLowerCase() === confirmEmail.trim().toLowerCase();

  const passwordOk =
    rules.min8 && rules.caseMix && rules.numSymbol && rules.noSpaces;

  async function onGoogle() {
    setGoogleError(null);
    if (!isFirebaseClientConfigured()) {
      setGoogleError("Firebase is not configured for Google sign-in.");
      return;
    }
    setGooglePending(true);
    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      provider.addScope("email");
      provider.addScope("profile");
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const next = await continueWithGoogleAction(idToken, afterAuthPath);
      if (next && !next.ok) {
        setGoogleError(next.message || "Google sign-in failed.");
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
        setGoogleError(null);
      } else if (code === "auth/popup-blocked") {
        setGoogleError("Pop-up blocked. Allow pop-ups and try again.");
      } else {
        setGoogleError(
          err instanceof Error ? err.message : "Google sign-in failed."
        );
      }
    } finally {
      setGooglePending(false);
    }
  }

  useEffect(() => {
    if (!autoGoogle || autoStarted.current || !isFirebaseClientConfigured()) {
      return;
    }
    autoStarted.current = true;
    void onGoogle();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-shot on ?google=1
  }, [autoGoogle]);

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col items-center text-center">
        <Link href="/publish/" className="inline-flex flex-col items-center gap-2">
          <span className="relative block h-14 w-14 overflow-hidden rounded-full border border-sand bg-ivory">
            <Image
              src={platformPublicPath("/logo-authors-pilot.webp")}
              alt="Authors Pilot"
              width={72}
              height={72}
              className="h-full w-full object-cover"
              priority
              unoptimized
            />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-[#273E2B]">
            Authors Pilot
          </span>
        </Link>
      </div>

      <div className="rounded-none border border-sand bg-white px-6 py-8 shadow-soft sm:px-8">
        <h1 className="text-center font-sans text-2xl font-bold text-ink">
          Create Account
        </h1>
        <p className="mt-2 text-center text-sm text-forest-muted">
          Continue with Google to open your book form — name and email fill in
          automatically.
        </p>

        {(state.message && !state.ok) || googleError ? (
          <Alert variant="error" className="mt-4">
            {googleError || state.message}
          </Alert>
        ) : null}

        {isFirebaseClientConfigured() ? (
          <div className="mt-6">
            <Button
              type="button"
              className="w-full normal-case tracking-normal"
              disabled={googlePending}
              onClick={onGoogle}
            >
              <GoogleIcon />
              {googlePending ? "Opening Google…" : "Continue with Google"}
            </Button>
          </div>
        ) : null}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <div className="w-full border-t border-sand" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-forest-muted">or</span>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="next" value={afterAuthPath} />

          <div>
            <label htmlFor="email" className="label-field">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input-field rounded-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {state.fieldErrors?.email?.[0] ? (
              <p className="error-text">{state.fieldErrors.email[0]}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="confirmEmail" className="label-field">
              Confirm email address
            </label>
            <input
              id="confirmEmail"
              name="confirmEmail"
              type="email"
              autoComplete="email"
              required
              className="input-field rounded-none"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            {state.fieldErrors?.confirmEmail?.[0] ? (
              <p className="error-text">{state.fieldErrors.confirmEmail[0]}</p>
            ) : email && confirmEmail && !emailsMatch ? (
              <p className="error-text">Email addresses do not match</p>
            ) : null}
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="password" className="label-field mb-0">
                Password
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-coral hover:underline"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              className="input-field mt-1 rounded-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {state.fieldErrors?.password?.[0] ? (
              <p className="error-text">{state.fieldErrors.password[0]}</p>
            ) : null}
            <ul className="mt-3 space-y-1" aria-live="polite">
              <RuleRow ok={rules.min8} label="8 character minimum" />
              <RuleRow ok={rules.caseMix} label="Capital and lowercase letter" />
              <RuleRow ok={rules.numSymbol} label="Number and symbol" />
              <RuleRow ok={rules.noSpaces} label="Cannot contain spaces" />
            </ul>
          </div>

          <p className="text-xs leading-relaxed text-forest-muted">
            By clicking &quot;Continue&quot; you agree to our{" "}
            <a
              href={`${MARKETING_URL}/terms/`}
              className="underline hover:text-ink"
            >
              Terms of Use
            </a>{" "}
            and{" "}
            <a
              href={`${MARKETING_URL}/privacy/`}
              className="underline hover:text-ink"
            >
              Privacy Policy
            </a>
            .
          </p>

          <Button
            type="submit"
            className="w-full"
            disabled={pending || !emailsMatch || !passwordOk}
          >
            {pending ? "Please wait…" : "Continue"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-charcoal">
          Have an account?{" "}
          <Link href="/login/" className="font-semibold underline hover:text-coral">
            Sign In
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-forest-muted">
        <a
          href={`${MARKETING_URL}/terms/`}
          className="underline hover:text-ink"
        >
          Terms of Use
        </a>
        <span className="mx-2">·</span>
        <a
          href={`${MARKETING_URL}/privacy/`}
          className="underline hover:text-ink"
        >
          Privacy Policy
        </a>
      </p>
      <p className="mt-2 text-center text-xs text-forest-muted">
        This site uses Firebase for secure sign-in.
      </p>
    </div>
  );
}

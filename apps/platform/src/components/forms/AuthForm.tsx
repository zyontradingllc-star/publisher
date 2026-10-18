"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export type AuthFormMode = "login" | "signup" | "forgot" | "reset";

type AuthFormProps = {
  mode: AuthFormMode;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  nextPath?: string;
  hiddenFields?: Record<string, string>;
};

const initialState: ActionState = { ok: true };

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="error-text">{messages[0]}</p>;
}

export function AuthForm({
  mode,
  action,
  nextPath = "/dashboard",
  hiddenFields,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  const titles: Record<AuthFormMode, string> = {
    login: "Log in to your account",
    signup: "Signup As Author",
    forgot: "Reset your password",
    reset: "Choose a new password",
  };

  return (
    <div className="card-surface">
      <h1 className="heading-display text-2xl">{titles[mode]}</h1>
      <p className="mt-2 text-sm text-forest-muted">
        {mode === "login" && "Access your dashboard to manage book listings."}
        {mode === "signup" &&
          "Free during launch. You keep 100% of royalties from sales on your own channels."}
        {mode === "forgot" &&
          "Enter the email you used to sign up. We will send reset instructions if an account exists."}
        {mode === "reset" && "Use at least 8 characters for your new password."}
      </p>

      {state.message ? (
        <Alert
          variant={state.ok ? "success" : "error"}
          className="mt-4"
        >
          {state.message}
        </Alert>
      ) : null}

      <form action={formAction} className="mt-6 space-y-4">
        {mode === "login" ? (
          <input type="hidden" name="next" value={nextPath} />
        ) : null}
        {hiddenFields
          ? Object.entries(hiddenFields).map(([name, value]) => (
              <input key={name} type="hidden" name={name} value={value} />
            ))
          : null}

        {mode === "signup" ? (
          <div>
            <label htmlFor="displayName" className="label-field">
              Display name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              autoComplete="name"
              required
              className="input-field"
              placeholder="Jane Author"
            />
            <FieldError messages={state.fieldErrors?.displayName} />
          </div>
        ) : null}

        {mode !== "reset" ? (
          <div>
            <label htmlFor="email" className="label-field">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input-field"
              placeholder="you@example.com"
            />
            <FieldError messages={state.fieldErrors?.email} />
          </div>
        ) : null}

        {mode === "login" || mode === "signup" || mode === "reset" ? (
          <>
            <div>
              <label htmlFor="password" className="label-field">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === "login"
                    ? "current-password"
                    : mode === "signup"
                      ? "new-password"
                      : "new-password"
                }
                required
                minLength={8}
                className="input-field"
              />
              <FieldError messages={state.fieldErrors?.password} />
            </div>
            {mode === "signup" || mode === "reset" ? (
              <div>
                <label htmlFor="confirmPassword" className="label-field">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="input-field"
                />
                <FieldError messages={state.fieldErrors?.confirmPassword} />
              </div>
            ) : null}
          </>
        ) : null}

        <Button type="submit" disabled={pending} className="w-full">
          {pending
            ? "Please wait…"
            : mode === "login"
              ? "Log in"
              : mode === "signup"
                ? "Create Account"
                : mode === "forgot"
                  ? "Send reset link"
                  : "Update password"}
        </Button>
      </form>

      <div className="mt-6 space-y-2 text-center text-sm text-charcoal">
        {mode === "login" ? (
          <>
            <p>
              <Link href="/forgot-password" className="font-semibold text-coral hover:underline">
                Forgot password?
              </Link>
            </p>
            <p>
              New here?{" "}
              <Link href="/signup" className="font-semibold text-coral hover:underline">
                Signup As Author
              </Link>
            </p>
          </>
        ) : null}
        {mode === "signup" ? (
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-coral hover:underline">
              Log in
            </Link>
          </p>
        ) : null}
        {mode === "forgot" ? (
          <p>
            <Link href="/login" className="font-semibold text-coral hover:underline">
              Back to log in
            </Link>
          </p>
        ) : null}
        {mode === "reset" ? (
          <p>
            <Link href="/login" className="font-semibold text-coral hover:underline">
              Log in with new password
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}

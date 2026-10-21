import type { Metadata } from "next";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Verify email",
};

type PageProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const { email } = await searchParams;
  const displayEmail = email ? decodeURIComponent(email) : null;

  return (
    <div className="card-surface text-center">
      <h1 className="heading-display text-2xl">Check your inbox</h1>
      <Alert variant="info" className="mt-4 text-left">
        {displayEmail ? (
          <p>
            We sent a confirmation link to{" "}
            <span className="font-semibold">{displayEmail}</span>. Click the link in that email to
            verify your address, then log in to finish setting up your author profile.
          </p>
        ) : (
          <p>
            If you just signed up, check your email for a confirmation link before logging in. Some
            inboxes filter automated mail - check spam or promotions if you do not see it within a
            few minutes.
          </p>
        )}
      </Alert>
      <p className="mt-4 text-sm text-forest-muted">
        Did not receive the email? Wait a few minutes, confirm the address you used at sign-up, or
        try signing up again with the same email.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button href="/login">Log in</Button>
        <Button href="/signup" variant="ghost">
          Back to sign up
        </Button>
      </div>
      <p className="mt-6 text-xs text-forest-muted">
        Need help?{" "}
        <Link href="/contact" className="font-semibold text-coral hover:underline">
          Contact us
        </Link>
      </p>
    </div>
  );
}

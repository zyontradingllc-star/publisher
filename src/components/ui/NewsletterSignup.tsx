"use client";

import { FormEvent, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { submitToInbox } from "@/lib/email/client-submit";

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!emailOk.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");
    setSending(true);

    const result = await submitToInbox({
      name: "Newsletter signup",
      email: email.trim(),
      _subject: "Newsletter Signup",
      _replyto: email.trim(),
      message: `New newsletter signup: ${email.trim()}`,
    });

    setSending(false);

    if (!result.success) {
      setError(result.message || "Could not sign up right now. Please try again.");
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="bg-cream py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] bg-cta-wash px-6 py-14 text-center sm:px-10 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#A7C4AB]/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#A7C4AB]/20 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <span className="badge-pill">
                <svg
                  viewBox="0 0 20 20"
                  className="h-3 w-3"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M10 1.2 12.1 7l6.2.5-4.8 3.9 1.5 6-5-3.2-5 3.2 1.5-6L1.7 7.5 7.9 7 10 1.2z" />
                </svg>
                Signup Today
              </span>

              <p className="mt-5 heading-section text-white">
                Claim Your Discount &amp; Publishing Tips
              </p>
              <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/75 sm:text-base">
                Join our newsletter for exclusive author discounts, cover-design
                secrets and best-seller strategies, straight to your inbox.
              </p>

              {submitted ? (
                <p
                  className="mt-8 font-sans text-sm font-medium text-[#273E2B]"
                  role="status"
                >
                  You&apos;re in. Watch your inbox for the next dispatch.
                </p>
              ) : (
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="mx-auto mt-8 flex max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 font-sans text-sm text-white outline-none placeholder:text-white/50 focus:border-[#A7C4AB]/60 focus:ring-2 focus:ring-[#A7C4AB]/30"
                  />
                  <Button type="submit" className="shrink-0" disabled={sending}>
                    {sending ? "Sending…" : "Sign Up"}
                  </Button>
                </form>
              )}

              {error && (
                <p className="mt-3 font-sans text-xs text-[#273E2B]">{error}</p>
              )}

              {!submitted && (
                <p className="mt-4 font-sans text-xs text-white/55">
                  No spam, ever. Unsubscribe anytime.
                </p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

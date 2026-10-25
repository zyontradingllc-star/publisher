"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  /** Compact hero card (layout mock) vs bottom strip form */
  variant?: "hero" | "strip";
};

export function BlogNewsletterCard({ variant = "hero" }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!emailOk.test(email.trim())) {
      setError("Enter a valid email.");
      return;
    }
    setError("");
    setDone(true);
  }

  if (variant === "strip") {
    return (
      <div className="overflow-hidden rounded-2xl bg-cta-wash px-5 py-6 text-white sm:px-8 sm:py-7">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <div
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] font-display text-xl font-bold text-ink md:flex"
              aria-hidden
            >
              ✦
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg font-bold">
                Want more teardowns like this?
              </p>
              <p className="mt-1 text-sm text-white/70">
                Weekly launch tips for indie authors — one email, no spam.
              </p>
            </div>
          </div>
          {done ? (
            <p className="text-sm font-semibold text-[#F2C14D]">
              You&apos;re on the list.{" "}
              <a href="/signup/" className="underline underline-offset-2">
                Create your free page →
              </a>
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex w-full min-w-0 flex-col gap-2 sm:flex-row md:w-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="h-11 min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/45 outline-none focus:border-[#F2C14D]/50 md:w-[260px]"
                autoComplete="email"
                required
              />
              <Button type="submit" className="shrink-0 !py-2.5">
                Subscribe
              </Button>
            </form>
          )}
        </div>
        {error ? <p className="mt-2 text-sm text-red-200">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-sand bg-gradient-to-br from-[#F3F4F6] via-[#E8EAED] to-[#D1D5DB] p-6 shadow-soft sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-8 h-[120px] w-[120px] rounded-full bg-white/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-6 h-[90px] w-[90px] rounded-full bg-ink/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-6 h-8 w-8 rounded-full bg-white/60"
      />
      <div className="relative flex items-center justify-between gap-3">
        <h2 className="font-display text-base font-bold text-ink sm:text-lg">
          Get the Launch Checklist
        </h2>
        <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Free PDF
        </span>
      </div>
      <p className="relative mt-2 text-sm leading-relaxed text-charcoal">
        Join authors getting weekly teardowns plus one proven launch template.
      </p>

      {done ? (
        <p className="relative mt-5 text-sm font-semibold text-coral">
          You&apos;re on the list.{" "}
          <a href="/signup/" className="underline underline-offset-2">
            Create your free author page →
          </a>
        </p>
      ) : (
        <form onSubmit={onSubmit} className="relative mt-5 space-y-3">
          <label className="sr-only" htmlFor="blog-newsletter-email">
            Email
          </label>
          <input
            id="blog-newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="input-field h-12 border-sand bg-white/80"
            autoComplete="email"
            required
          />
          {error ? <p className="error-text">{error}</p> : null}
          <Button type="submit" className="w-full">
            Send me the checklist
          </Button>
          <p className="text-center text-[11px] text-forest-muted">
            Free forever · No credit card
          </p>
        </form>
      )}
    </div>
  );
}

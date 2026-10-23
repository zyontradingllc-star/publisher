"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import {
  Turnstile,
  isTurnstileEnabled,
  type TurnstileHandle,
} from "@/components/forms/Turnstile";
import { brand, contact } from "@/content/site";
import { submitToInbox } from "@/lib/email/client-submit";

const details = [
  {
    label: "Email us",
    value: brand.email,
    href: `mailto:${brand.email}`,
    icon: "mail" as const,
  },
  {
    label: "Consult online",
    value: "Video consultation available",
    icon: "globe" as const,
  },
  {
    label: "We reply",
    value: "Within one business day",
    icon: "clock" as const,
  },
];

type FormState = {
  name: string;
  email: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  service: "",
  message: "",
};

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (!emailOk.test(values.email.trim())) {
    errors.email = "Please enter a valid email.";
  }
  if (!values.service) {
    errors.service = "Select a service.";
  }
  return errors;
}

function DetailIcon({ icon }: { icon: (typeof details)[number]["icon"] }) {
  const className = "h-5 w-5 text-[#E08A2A]";
  if (icon === "mail") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path strokeLinecap="round" d="m5 8 7 5 7-5" />
      </svg>
    );
  }
  if (icon === "globe") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M3 12h18M12 3c2.5 3 3.8 6 3.8 9s-1.3 6-3.8 9c-2.5-3-3.8-6-3.8-9s1.3-6 3.8-9z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" d="M12 7.5V12l3 2" />
    </svg>
  );
}

type AuthorConsultationProps = {
  /** Use as the page hero (h1 + tighter banner spacing). */
  asHero?: boolean;
};

export function AuthorConsultation({ asHero = false }: AuthorConsultationProps) {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const turnstileRequired = isTurnstileEnabled();
  const Heading = asHero ? "h1" : "p";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitError(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (turnstileRequired && !turnstileToken) {
      setSubmitError("Please complete the security check.");
      return;
    }

    setSending(true);
    setSubmitError(null);

    const message = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Service: ${values.service}`,
      "",
      "Message:",
      values.message || "(not provided)",
    ].join("\n");

    const result = await submitToInbox({
      name: values.name.trim(),
      email: values.email.trim(),
      service: values.service,
      _subject: `Free Consultation - ${values.service || "Authors Pilot"}`,
      _replyto: values.email.trim(),
      message,
      ...(turnstileToken ? { captchaToken: turnstileToken } : {}),
    });

    setSending(false);
    turnstileRef.current?.reset();
    setTurnstileToken(null);

    if (!result.success) {
      setSubmitError(
        result.message || `Could not send right now. Email us at ${brand.email}.`,
      );
      return;
    }

    setSubmitted(true);
    setValues(initial);
  }

  const fieldClass =
    "mt-1 w-full rounded-lg border border-sand bg-ivory px-3 py-2 text-sm text-ink outline-none transition focus:border-[#273E2B] focus:ring-2 focus:ring-[#273E2B]/25";
  const labelClass = "block font-sans text-xs font-medium text-ink sm:text-sm";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <section
      id="consultation"
      className={
        asHero
          ? "relative overflow-hidden bg-warm-wash py-8 sm:py-12 lg:py-14"
          : "bg-warm-wash py-16 sm:py-20"
      }
    >
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8">
        <FadeIn>
          <span className="badge-pill">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
              <path d="M4 16 7.5 8l4.5 5 4.5-5L21 16H4z" />
              <path d="M6 16h12v2.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.5V16z" />
            </svg>
            Free Author Consultation
          </span>

          <Heading className="mt-5 heading-section lg:text-[2.55rem]">
            Start Your Publishing Journey With{" "}
            <span className="text-[#E08A2A]">Confidence</span>
          </Heading>

          <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-charcoal sm:text-base">
            Book a free, no-pressure consultation with a publishing strategist.
            We&apos;ll review your goals, recommend the right path and answer every
            question - whether you&apos;re polishing a manuscript or just dreaming up
            your first cover.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {details.map((item) => {
              const inner = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#A7C4AB]/20">
                    <DetailIcon icon={item.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#E08A2A]">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block font-sans text-sm font-medium text-ink">
                      {item.value}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-start gap-3 rounded-2xl border border-sand bg-white px-4 py-3.5 transition hover:border-[#273E2B]/40"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-start gap-3 rounded-2xl border border-sand bg-white px-4 py-3.5">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="rounded-2xl border border-sand bg-white p-4 shadow-soft sm:p-5">
            <div className="flex items-start gap-2.5">
              <span className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
                <Image
                  src="/logo-authors-pilot.webp?v=2"
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain object-left"
                />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  Book A Free Author Consultation
                </h3>
                <p className="mt-0.5 font-sans text-xs text-charcoal">
                  We reply within one business day.
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="mt-8 rounded-xl border border-sand bg-ivory p-6 text-center" role="status">
                <h4 className="font-display text-xl font-semibold text-ink">
                  Consultation booked
                </h4>
                <p className="mt-2 font-sans text-sm text-charcoal">
                  Thanks - we&apos;ll be in touch soon with next steps.
                </p>
                <button
                  type="button"
                  className="mt-5 font-sans text-sm font-semibold text-[#E08A2A]"
                  onClick={() => setSubmitted(false)}
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-4 space-y-2.5">
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="consult-name" className={labelClass}>
                      Full Name *
                    </label>
                    <input
                      id="consult-name"
                      name="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Full Name"
                      className={fieldClass}
                      autoComplete="name"
                      required
                    />
                    {errors.name && <p className={errorClass}>{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="consult-email" className={labelClass}>
                      Email Address *
                    </label>
                    <input
                      id="consult-email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="Email Address"
                      className={fieldClass}
                      autoComplete="email"
                      required
                    />
                    {errors.email && <p className={errorClass}>{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="consult-service" className={labelClass}>
                    Select a Service *
                  </label>
                  <select
                    id="consult-service"
                    name="service"
                    value={values.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={fieldClass}
                    required
                  >
                    <option value="">Choose a service…</option>
                    {contact.form.creating.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className={errorClass}>{errors.service}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="consult-message" className={labelClass}>
                    Tell Us About Your Book
                  </label>
                  <textarea
                    id="consult-message"
                    name="message"
                    rows={2}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Genre, page count, and what you need help with…"
                    className={`${fieldClass} resize-y`}
                  />
                </div>

                <Turnstile
                  ref={turnstileRef}
                  action="contact"
                  onChange={setTurnstileToken}
                  className="pt-1"
                />

                {submitError && <p className={errorClass}>{submitError}</p>}
                <div className="flex w-full pt-1 [&_button]:w-full [&_div]:w-full">
                  <Button
                    type="submit"
                    disabled={
                      sending || (turnstileRequired && !turnstileToken)
                    }
                  >
                    {sending ? "Sending…" : "Book My Free Consultation"}
                  </Button>
                </div>

                <p className="flex items-center justify-center gap-2 text-center font-sans text-xs text-charcoal">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <rect x="5" y="11" width="14" height="9" rx="1.5" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  100% confidential. We never share your details.
                </p>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { brand, contact } from "@/content/site";
import { submitToInbox } from "@/lib/email/client-submit";

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
const contactEmailLabel = "info@authorspilot.com";

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


export function QuoteForm({
  title = "Get Your Free Quote",
  subtitle = "Tell us about your book - we’ll reply within one business day.",
  submitLabel = "Free Consultation",
}: {
  title?: string;
  subtitle?: string;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

    setSending(true);
    setSubmitError(null);

    const message = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Service: ${values.service}`,
      "",
      "About the book:",
      values.message || "(not provided)",
    ].join("\n");

    const result = await submitToInbox({
      name: values.name.trim(),
      email: values.email.trim(),
      service: values.service,
      _subject: `Free Quote Request - ${values.service || "Authors Pilot"}`,
      _replyto: values.email.trim(),
      message,
    });

    setSending(false);

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
  const labelClass = "block font-sans text-xs font-medium text-ink";
  const errorClass = "mt-1 text-xs text-[#273E2B]";

  return (
    <div className="rounded-2xl border border-sand bg-white p-5 shadow-soft sm:p-6">
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-1 font-sans text-sm text-charcoal">{subtitle}</p>
      <p className="mt-2 font-sans text-sm text-charcoal">
        Or email us at{" "}
        <a
          href={`mailto:${brand.email}`}
          className="font-semibold text-[#273E2B] underline-offset-2 hover:underline"
        >
          {contactEmailLabel}
        </a>
      </p>

      {submitted ? (
        <div className="mt-6 rounded-xl border border-sand bg-ivory p-5 text-center" role="status">
          <h4 className="font-display text-lg font-semibold text-ink">Quote requested</h4>
          <p className="mt-2 font-sans text-sm text-charcoal">
            Thanks - we’ll be in touch within one business day. You can also reach us at{" "}
            <a
              href={`mailto:${brand.email}`}
              className="font-semibold text-[#273E2B] underline-offset-2 hover:underline"
            >
              {contactEmailLabel}
            </a>
            .
          </p>
          <button
            type="button"
            className="mt-4 font-sans text-sm font-semibold text-[#273E2B]"
            onClick={() => setSubmitted(false)}
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3">
          <div>
            <label htmlFor="quote-name" className={labelClass}>
              Full Name *
            </label>
            <input
              id="quote-name"
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
            <label htmlFor="quote-email" className={labelClass}>
              Email Address *
            </label>
            <input
              id="quote-email"
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
          <div>
            <label htmlFor="quote-service" className={labelClass}>
              Select a Service *
            </label>
            <select
              id="quote-service"
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
            {errors.service && <p className={errorClass}>{errors.service}</p>}
          </div>
          <div>
            <label htmlFor="quote-message" className={labelClass}>
              Tell us about your book
            </label>
            <textarea
              id="quote-message"
              name="message"
              rows={3}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Genre, page count, and what you need help with…"
              className={`${fieldClass} resize-y`}
            />
          </div>
          {submitError && <p className={errorClass}>{submitError}</p>}
          <div className="flex w-full pt-1 [&_button]:w-full [&_div]:w-full">
            <Button type="submit" disabled={sending}>
              {sending ? "Sending…" : submitLabel}
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
  );
}

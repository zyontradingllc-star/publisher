"use client";

import { FormEvent, useState } from "react";
import { contact } from "@/content/site";
import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  email: string;
  creating: string;
  alreadyHave: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  creating: "",
  alreadyHave: "",
  message: "",
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email.";
  }
  if (!values.creating) {
    errors.creating = "Select what you're creating.";
  }
  if (!values.alreadyHave) {
    errors.alreadyHave = "Select what you already have.";
  }
  if (!values.message.trim() || values.message.trim().length < 20) {
    errors.message = "Tell us a bit more about your project (at least 20 characters).";
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
    setValues(initial);
  }

  if (submitted) {
    return (
      <div
        className="rounded-soft border border-sand bg-cream p-8 text-center"
        role="status"
      >
        <h3 className="font-display text-2xl font-semibold text-ink">
          Project received
        </h3>
        <p className="mt-3 text-charcoal">
          Thanks for sharing your idea. We&apos;ll take it from here and reply soon.
        </p>
        <button
          type="button"
          className="mt-6 text-[20px] font-medium text-coral hover:text-coral-soft"
          onClick={() => setSubmitted(false)}
        >
          Send another project
        </button>
      </div>
    );
  }

  const fieldClass =
    "mt-1.5 w-full rounded-soft border border-sand bg-ivory px-4 py-3 text-sm text-ink outline-none ring-coral transition focus:border-coral focus:ring-2";
  const labelClass = "block text-sm font-medium text-ink";
  const errorClass = "mt-1.5 text-xs text-coral-soft";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            className={fieldClass}
            autoComplete="name"
            required
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Where should we send your response?"
            className={fieldClass}
            autoComplete="email"
            required
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="creating" className={labelClass}>
          What Are You Creating?
        </label>
        <select
          id="creating"
          name="creating"
          value={values.creating}
          onChange={(e) => update("creating", e.target.value)}
          className={fieldClass}
          required
        >
          <option value="">Select one</option>
          {contact.form.creating.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.creating && <p className={errorClass}>{errors.creating}</p>}
      </div>

      <div>
        <label htmlFor="alreadyHave" className={labelClass}>
          What Do You Already Have?
        </label>
        <select
          id="alreadyHave"
          name="alreadyHave"
          value={values.alreadyHave}
          onChange={(e) => update("alreadyHave", e.target.value)}
          className={fieldClass}
          required
        >
          <option value="">Select one</option>
          {contact.form.alreadyHave.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.alreadyHave && (
          <p className={errorClass}>{errors.alreadyHave}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell Us About Your Project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Share your idea, goals, audience, timeline, and anything else that would help us understand your project."
          className={`${fieldClass} resize-y`}
          required
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Send My Project
      </Button>
      <p className="text-sm text-charcoal">{contact.hero.reassurance}</p>
    </form>
  );
}

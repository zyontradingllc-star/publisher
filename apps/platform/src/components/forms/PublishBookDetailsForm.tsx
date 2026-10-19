"use client";

import { useActionState, useMemo, useState } from "react";
import { savePublishDetailsAction } from "@/app/actions/publish-book";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import type { Genre } from "@/types/database";
import { LANGUAGES } from "@/types/database";
import { slugify } from "@/lib/utils";

const initialState: ActionState = { ok: false };

const KEYWORD_COUNT = 7;

type Props = {
  genres: Genre[];
  defaultAuthorName?: string;
  authorEmail?: string | null;
};

export function PublishBookDetailsForm({
  genres,
  defaultAuthorName = "",
  authorEmail = "",
}: Props) {
  const [state, formAction, pending] = useActionState(
    savePublishDetailsAction,
    initialState
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const nameParts = defaultAuthorName.trim().split(/\s+/);
  const defaultFirst =
    defaultAuthorName.trim().toLowerCase() === "author" ? "" : (nameParts[0] ?? "");
  const defaultLast =
    defaultAuthorName.trim().toLowerCase() === "author"
      ? ""
      : nameParts.slice(1).join(" ") || "";
  const defaultEmail =
    authorEmail && !authorEmail.endsWith("@authorspilot.guest")
      ? authorEmail
      : "";

  const remaining = Math.max(0, 4000 - description.length);
  const slugHint = useMemo(() => slugify(title), [title]);

  return (
    <div className="space-y-6">
      {/* Stepper — KDP-style */}
      <nav
        aria-label="Publish progress"
        className="flex flex-wrap gap-2 border-b border-sand pb-4 sm:gap-6"
      >
        <Step n={1} label="Book Details" status="current" />
        <Step n={2} label="Book Content" status="upcoming" />
        <Step n={3} label="Sales Links" status="upcoming" />
      </nav>

      {state.message ? (
        <Alert variant={state.ok ? "success" : "error"}>{state.message}</Alert>
      ) : null}

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="slug" value={slugHint} />

        <Section title="Language">
          <select
            name="language"
            className="input-field max-w-md"
            defaultValue="en"
            required
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </Section>

        <Section title="Book title">
          <div className="space-y-4">
            <div>
              <label className="label-field" htmlFor="title">
                Book title <span className="text-red-600">*</span>
              </label>
              <input
                id="title"
                name="title"
                className="input-field"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your book title"
              />
            </div>
            <div>
              <label className="label-field" htmlFor="subtitle">
                Subtitle <span className="font-normal text-forest-muted">(optional)</span>
              </label>
              <input
                id="subtitle"
                name="subtitle"
                className="input-field"
                placeholder="Enter a subtitle"
              />
            </div>
            {slugHint ? (
              <p className="help-text">Public listing URL: /books/{slugHint}</p>
            ) : null}
          </div>
        </Section>

        <Section title="Series">
          <p className="mb-3 text-sm text-forest-muted">
            If this book is part of a series, add the series name (optional).
          </p>
          <input
            name="series_name"
            className="input-field max-w-md"
            placeholder="Series name"
          />
        </Section>

        <Section title="Edition number">
          <p className="mb-3 text-sm text-forest-muted">
            Optional. Use for revised editions (e.g. 2).
          </p>
          <input
            name="edition_number"
            className="input-field max-w-xs"
            placeholder="Edition number"
          />
        </Section>

        <Section title="Author">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field" htmlFor="author_first">
                First name <span className="text-red-600">*</span>
              </label>
              <input
                id="author_first"
                name="author_first"
                className="input-field"
                required
                defaultValue={defaultFirst}
              />
            </div>
            <div>
              <label className="label-field" htmlFor="author_last">
                Last name <span className="text-red-600">*</span>
              </label>
              <input
                id="author_last"
                name="author_last"
                className="input-field"
                required
                defaultValue={defaultLast}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label-field" htmlFor="author_email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="author_email"
                name="author_email"
                type="email"
                className="input-field max-w-md"
                required
                defaultValue={defaultEmail}
                placeholder="you@example.com"
              />
              <p className="mt-1.5 text-xs text-forest-muted">
                We use this to follow up after review — no account signup required.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Contributors">
          <p className="mb-3 text-sm text-forest-muted">
            Optional. Add editors, illustrators, or co-authors.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <select name="contributor_role" className="input-field" defaultValue="editor">
              <option value="author">Author</option>
              <option value="editor">Editor</option>
              <option value="illustrator">Illustrator</option>
              <option value="translator">Translator</option>
              <option value="other">Other</option>
            </select>
            <input
              name="contributor_first"
              className="input-field"
              placeholder="First name"
            />
            <input
              name="contributor_last"
              className="input-field"
              placeholder="Last name"
            />
          </div>
        </Section>

        <Section title="Description">
          <p className="mb-3 text-sm text-forest-muted">
            Readers see this on your book listing. Aim for a clear, compelling
            summary (max 4,000 characters).
          </p>
          <textarea
            name="description"
            rows={10}
            className="input-field font-sans"
            required
            minLength={40}
            maxLength={4000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your book…"
          />
          <p className="mt-2 text-right text-xs text-forest-muted">
            {remaining} characters remaining
          </p>
        </Section>

        <Section title="Publishing rights">
          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-sand p-3 hover:bg-ivory/60">
              <input
                type="radio"
                name="publishing_rights"
                value="own_copyright"
                defaultChecked
                className="mt-1"
                required
              />
              <span className="text-sm text-charcoal">
                I own the copyright and I hold the necessary publishing rights.
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-sand p-3 hover:bg-ivory/60">
              <input
                type="radio"
                name="publishing_rights"
                value="public_domain"
                className="mt-1"
              />
              <span className="text-sm text-charcoal">
                This is a public domain work.
              </span>
            </label>
          </div>
        </Section>

        <Section title="Primary audience">
          <fieldset className="space-y-4">
            <div>
              <p className="label-field">
                Does this book contain sexually explicit images or titles?
              </p>
              <div className="mt-2 flex gap-6">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="explicit_content" value="yes" />
                  Yes
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="explicit_content"
                    value="no"
                    defaultChecked
                  />
                  No
                </label>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-field" htmlFor="age_min">
                  Reading age — minimum{" "}
                  <span className="font-normal text-forest-muted">(optional)</span>
                </label>
                <select id="age_min" name="age_min" className="input-field" defaultValue="">
                  <option value="">Select</option>
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-field" htmlFor="age_max">
                  Reading age — maximum{" "}
                  <span className="font-normal text-forest-muted">(optional)</span>
                </label>
                <select id="age_max" name="age_max" className="input-field" defaultValue="">
                  <option value="">Select</option>
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
        </Section>

        <Section title="Primary sales channel">
          <p className="mb-3 text-sm text-forest-muted">
            Authors Pilot sends readers to your chosen external store — we do
            not checkout or take royalties.
          </p>
          <select
            name="primary_marketplace"
            className="input-field max-w-md"
            defaultValue="author_website"
          >
            <option value="author_website">Author website / own store</option>
            <option value="amazon">Amazon / Kindle</option>
            <option value="other">Other retailer</option>
          </select>
        </Section>

        <Section title="Categories">
          <label className="label-field" htmlFor="genre_id">
            Primary category / genre <span className="text-red-600">*</span>
          </label>
          <select
            id="genre_id"
            name="genre_id"
            className="input-field max-w-md"
            required
            defaultValue=""
          >
            <option value="">Select a category</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </Section>

        <Section title="Keywords">
          <p className="mb-3 text-sm text-forest-muted">
            Up to {KEYWORD_COUNT} keywords or short phrases to help readers find
            your book (optional).
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: KEYWORD_COUNT }, (_, i) => (
              <input
                key={i}
                name={`keyword_${i + 1}`}
                className="input-field"
                placeholder={`Keyword ${i + 1}`}
                maxLength={50}
              />
            ))}
          </div>
        </Section>

        <Section title="Content policy">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="content_policy_accepted"
              value="on"
              required
              className="mt-1"
            />
            <span className="text-sm text-charcoal">
              I agree this listing follows the Authors Pilot content and
              community policy.
            </span>
          </label>
        </Section>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-sand pt-6">
          <button
            type="submit"
            name="intent"
            value="draft"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-full border border-sand bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:border-coral/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save as Draft"}
          </button>
          <button
            type="submit"
            name="intent"
            value="continue"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-cta transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E08A2A] disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save and Continue"}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-sand bg-white p-5 shadow-soft sm:p-6">
      <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Step({
  n,
  label,
  status,
}: {
  n: number;
  label: string;
  status: "current" | "complete" | "upcoming";
}) {
  const styles =
    status === "current"
      ? "border-coral bg-[#F0F5F1] text-ink"
      : status === "complete"
        ? "border-green-600 bg-green-50 text-green-900"
        : "border-sand bg-white text-forest-muted";

  return (
    <div
      className={`flex min-w-[9rem] flex-1 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold ${styles}`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          status === "complete"
            ? "bg-green-600 text-white"
            : status === "current"
              ? "bg-coral text-white"
              : "bg-sand text-charcoal"
        }`}
      >
        {status === "complete" ? "✓" : n}
      </span>
      <span>
        {label}
        <span className="mt-0.5 block text-[10px] font-normal uppercase tracking-wide">
          {status === "current"
            ? "In progress"
            : status === "complete"
              ? "Complete"
              : "Not started"}
        </span>
      </span>
    </div>
  );
}

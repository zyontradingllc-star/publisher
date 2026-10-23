"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { savePublishDetailsAction } from "@/app/actions/publish-book";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import type { Genre } from "@/types/database";
import { LANGUAGES } from "@/types/database";
import { slugify } from "@/lib/utils";

const initialState: ActionState = { ok: false };

const KEYWORD_COUNT = 5;

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
  const [submitIntent, setSubmitIntent] = useState<"draft" | "continue" | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!pending) setSubmitIntent(null);
  }, [pending]);

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
    <div className="space-y-4">
      <nav
        aria-label="Publish progress"
        className="flex flex-wrap gap-2 border-b border-sand pb-3 sm:gap-4"
      >
        <Step n={1} label="Book Details" status="current" />
        <Step n={2} label="Book Content" status="upcoming" />
        <Step n={3} label="Sales Links" status="upcoming" />
      </nav>

      {state.message ? (
        <Alert variant={state.ok ? "success" : "error"}>{state.message}</Alert>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="slug" value={slugHint} />

          <Section title="Title & language">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
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
                {slugHint ? (
                  <p className="mt-1 text-xs text-forest-muted">
                    Listing URL: /books/{slugHint}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="label-field" htmlFor="subtitle">
                  Subtitle{" "}
                  <span className="font-normal text-forest-muted">(optional)</span>
                </label>
                <input
                  id="subtitle"
                  name="subtitle"
                  className="input-field"
                  placeholder="Subtitle"
                />
              </div>
              <div>
                <label className="label-field" htmlFor="language">
                  Language <span className="text-red-600">*</span>
                </label>
                <select
                  id="language"
                  name="language"
                  className="input-field"
                  defaultValue="en"
                  required
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-field" htmlFor="series_name">
                  Series{" "}
                  <span className="font-normal text-forest-muted">(optional)</span>
                </label>
                <input
                  id="series_name"
                  name="series_name"
                  className="input-field"
                  placeholder="Series name"
                />
              </div>
              <div>
                <label className="label-field" htmlFor="edition_number">
                  Edition{" "}
                  <span className="font-normal text-forest-muted">(optional)</span>
                </label>
                <input
                  id="edition_number"
                  name="edition_number"
                  className="input-field"
                  placeholder="e.g. 2"
                />
              </div>
            </div>
          </Section>

          <Section title="Author">
            <div className="grid gap-3 sm:grid-cols-2">
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
                  className="input-field"
                  required
                  defaultValue={defaultEmail}
                  placeholder="you@example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-forest-muted">
                  Contributor (optional)
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <select
                    name="contributor_role"
                    className="input-field"
                    defaultValue="editor"
                  >
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
              </div>
            </div>
          </Section>

          <Section title="Description">
            <textarea
              name="description"
              rows={5}
              className="input-field font-sans"
              required
              minLength={40}
              maxLength={4000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Clear summary readers will see on your listing…"
            />
            <p className="mt-1.5 text-right text-xs text-forest-muted">
              {remaining} characters left
            </p>
          </Section>

          <Section title="Category & rights">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label-field" htmlFor="genre_id">
                  Genre <span className="text-red-600">*</span>
                </label>
                <select
                  id="genre_id"
                  name="genre_id"
                  className="input-field"
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
              </div>
              <div>
                <label className="label-field" htmlFor="primary_marketplace">
                  Primary sales channel
                </label>
                <select
                  id="primary_marketplace"
                  name="primary_marketplace"
                  className="input-field"
                  defaultValue="author_website"
                >
                  <option value="author_website">Author website / own store</option>
                  <option value="amazon">Amazon / Kindle</option>
                  <option value="other">Other retailer</option>
                </select>
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-sand px-3 py-2 text-sm hover:bg-ivory/60">
                  <input
                    type="radio"
                    name="publishing_rights"
                    value="own_copyright"
                    defaultChecked
                    className="mt-0.5"
                    required
                  />
                  I own the copyright and publishing rights
                </label>
                <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-sand px-3 py-2 text-sm hover:bg-ivory/60">
                  <input
                    type="radio"
                    name="publishing_rights"
                    value="public_domain"
                    className="mt-0.5"
                  />
                  Public domain work
                </label>
              </div>
              <div className="sm:col-span-2">
                <p className="label-field">Explicit content?</p>
                <div className="mt-1.5 flex gap-5 text-sm">
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name="explicit_content" value="yes" />
                    Yes
                  </label>
                  <label className="inline-flex items-center gap-2">
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
              <div>
                <label className="label-field" htmlFor="age_min">
                  Reading age min{" "}
                  <span className="font-normal text-forest-muted">(opt.)</span>
                </label>
                <select
                  id="age_min"
                  name="age_min"
                  className="input-field"
                  defaultValue=""
                >
                  <option value="">-</option>
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-field" htmlFor="age_max">
                  Reading age max{" "}
                  <span className="font-normal text-forest-muted">(opt.)</span>
                </label>
                <select
                  id="age_max"
                  name="age_max"
                  className="input-field"
                  defaultValue=""
                >
                  <option value="">-</option>
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          <Section title="Keywords">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                name="content_policy_accepted"
                value="on"
                required
                className="mt-0.5"
              />
              <span>
                I agree this listing follows the Authors Pilot content and
                community policy.
              </span>
            </label>
          </Section>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-sand pt-4">
            <button
              type="submit"
              name="intent"
              value="draft"
              disabled={pending}
              onClick={() => setSubmitIntent("draft")}
              className="inline-flex items-center justify-center rounded-none border border-sand bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink transition hover:border-coral/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral disabled:opacity-60"
            >
              {pending && submitIntent === "draft" ? "Saving…" : "Save as Draft"}
            </button>
            <button
              type="submit"
              name="intent"
              value="continue"
              disabled={pending}
              onClick={() => setSubmitIntent("continue")}
              className="inline-flex items-center justify-center gap-2 rounded-none bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink shadow-cta transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E08A2A] disabled:opacity-60"
            >
              {pending && submitIntent === "continue"
                ? "Saving…"
                : "Save and Continue"}
            </button>
          </div>
        </form>

        <aside className="space-y-3 lg:sticky lg:top-24">
          <TipCard title="What readers see">
            Title, cover, description, and your purchase links appear on the
            public listing after approval.
          </TipCard>
          <TipCard title="You keep 100%">
            Authors Pilot does not checkout or take a royalty cut - sales stay
            on your website or retailer.
          </TipCard>
          <TipCard title="Next up">
            Step 2 adds cover, profile picture, and manuscript. Step 3 adds
            sales links, then Pending Review.
          </TipCard>
        </aside>
      </div>
    </div>
  );
}

function TipCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-sand bg-ivory/70 p-4 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-charcoal">{children}</p>
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
    <section className="rounded-2xl border border-sand bg-white p-4 shadow-soft sm:p-5">
      <h2 className="font-display text-base font-bold text-ink">{title}</h2>
      <div className="mt-3">{children}</div>
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
      className={`flex min-w-[8rem] flex-1 items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-semibold ${styles}`}
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
      <span className="truncate">{label}</span>
    </div>
  );
}

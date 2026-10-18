"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { savePublishContentAction } from "@/app/actions/publish-book";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";

const initialState: ActionState = { ok: false };

type Props = {
  bookId?: string | null;
  bookTitle?: string;
  leadMode?: boolean;
};

export function PublishBookContentForm({
  bookId,
  bookTitle = "Your book",
  leadMode = false,
}: Props) {
  const [state, formAction, pending] = useActionState(
    savePublishContentAction,
    initialState
  );
  const [manuscriptName, setManuscriptName] = useState<string | null>(null);
  const [coverName, setCoverName] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {state.message ? (
        <Alert variant={state.ok ? "success" : "error"}>{state.message}</Alert>
      ) : null}

      {leadMode ? (
        <Alert variant="info">
          Your book details were sent to{" "}
          <strong>no-reply@authorspilot.com</strong>. Selected file names and
          content answers are emailed on save. Cloud storage unlocks fully when
          Supabase is connected.
        </Alert>
      ) : null}

      <form action={formAction} className="space-y-5" encType="multipart/form-data">
        {bookId ? <input type="hidden" name="book_id" value={bookId} /> : null}
        <input type="hidden" name="book_title" value={bookTitle} />

        {/* Manuscript */}
        <Section title="Manuscript">
          <p className="mb-4 text-sm text-forest-muted">
            Upload your manuscript for private admin review (PDF, EPUB, or DOCX).
            This file is never sold through Authors Pilot — readers buy on your
            own website or retailer.
          </p>
          <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink shadow-cta">
            Upload manuscript
            <input
              type="file"
              name="manuscript"
              accept=".pdf,.epub,.doc,.docx,application/pdf,application/epub+zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setManuscriptName(f ? f.name : null);
              }}
            />
          </label>
          {manuscriptName ? (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
              <p className="font-semibold">
                Manuscript &quot;{manuscriptName}&quot; selected
              </p>
              <p className="mt-1 text-xs">
                It will be sent with this step (private review only).
              </p>
            </div>
          ) : (
            <p className="mt-3 text-xs text-forest-muted">No manuscript selected yet.</p>
          )}

          <div className="mt-6 border-t border-sand pt-5">
            <p className="label-field">Digital Rights Management (DRM)</p>
            <p className="mb-3 text-sm text-forest-muted">
              DRM is controlled by your sales channel (Amazon, your store, etc.).
              Authors Pilot listings only link out — we do not wrap your files.
            </p>
            <div className="space-y-2 rounded-xl border border-sand bg-ivory/40 p-4">
              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="radio"
                  name="drm"
                  value="yes"
                  className="mt-1"
                />
                Yes — I will apply DRM on my sales channel where available
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="radio"
                  name="drm"
                  value="no"
                  defaultChecked
                  className="mt-1"
                />
                No — do not apply DRM (or not applicable)
              </label>
            </div>
          </div>
        </Section>

        {/* Cover */}
        <Section title="eBook cover">
          <p className="mb-4 text-sm text-forest-muted">
            Upload a cover you already have (JPEG, PNG, or WebP recommended).
            Required before final submission for review.
          </p>
          <div className="rounded-xl border border-sand bg-ivory/40 p-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="radio"
                name="cover_source"
                value="upload"
                defaultChecked
                className="mt-1"
              />
              <span>Upload a cover you already have</span>
            </label>
            <div className="mt-4 flex flex-wrap items-start gap-4 pl-7">
              {coverPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-40 w-28 rounded-md object-cover shadow-book"
                />
              ) : (
                <div className="flex h-40 w-28 items-center justify-center rounded-md bg-sand text-xs text-forest-muted">
                  Preview
                </div>
              )}
              <div>
                <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink shadow-cta">
                  Upload your cover file
                  <input
                    type="file"
                    name="cover"
                    accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      setCoverName(f ? f.name : null);
                      if (f) {
                        const url = URL.createObjectURL(f);
                        setCoverPreview(url);
                      } else {
                        setCoverPreview(null);
                      }
                    }}
                  />
                </label>
                {coverName ? (
                  <div className="mt-3 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-900">
                    Cover &quot;{coverName}&quot; selected
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Section>

        {/* AI disclosure */}
        <Section title="AI-generated content">
          <p className="mb-3 text-sm text-forest-muted">
            Tell us if AI tools helped create text, images, or translations in
            this book. This is for transparency — it does not block publishing
            on Authors Pilot by itself.
          </p>
          <div className="space-y-2 rounded-xl border border-sand bg-ivory/40 p-4">
            <p className="mb-2 text-sm font-semibold text-ink">
              Did you use AI tools in creating texts, images, and/or translations?
            </p>
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="radio" name="ai_used" value="yes" />
              Yes
            </label>
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="radio" name="ai_used" value="no" defaultChecked />
              No
            </label>
          </div>
        </Section>

        {/* Preview */}
        <Section title="eBook preview">
          <p className="mb-3 text-sm text-forest-muted">
            Online previewer will be available after manuscript processing is
            connected. For now, review your files locally before continuing.
          </p>
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
            Tip: Open your PDF/EPUB on your device to check formatting before
            you submit for review.
          </div>
          <button
            type="button"
            disabled
            className="mt-4 rounded-full border border-sand bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-forest-muted opacity-70"
          >
            Launch Previewer (coming soon)
          </button>
        </Section>

        {/* ISBN */}
        <Section title="eBook ISBN">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field" htmlFor="isbn">
                ISBN <span className="font-normal text-forest-muted">(optional)</span>
              </label>
              <input id="isbn" name="isbn" className="input-field" placeholder="ISBN" />
            </div>
            <div>
              <label className="label-field" htmlFor="publisher">
                Publisher{" "}
                <span className="font-normal text-forest-muted">(optional)</span>
              </label>
              <input
                id="publisher"
                name="publisher"
                className="input-field"
                placeholder="Publisher name"
              />
            </div>
          </div>
        </Section>

        {/* Accessibility */}
        <Section title="Accessibility features">
          <p className="mb-3 text-sm text-forest-muted">
            These details help readers understand image accessibility on your
            listing.
          </p>
          <p className="mb-2 text-sm font-semibold text-ink">
            Are your images accessible?
          </p>
          <div className="space-y-2 rounded-xl border border-sand bg-ivory/40 p-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="radio"
                name="image_accessibility"
                value="unknown"
                className="mt-1"
              />
              I don&apos;t know / not sure
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="radio"
                name="image_accessibility"
                value="none"
                defaultChecked
                className="mt-1"
              />
              None of the informative images have descriptions
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="radio"
                name="image_accessibility"
                value="some"
                className="mt-1"
              />
              Some informative images have descriptions
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="radio"
                name="image_accessibility"
                value="all"
                className="mt-1"
              />
              All informative images have descriptions
            </label>
          </div>
        </Section>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-6">
          <Link
            href="/dashboard/books/new"
            className="inline-flex items-center rounded-full border border-sand bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:border-coral/40"
          >
            ← Back to Details
          </Link>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              name="intent"
              value="draft"
              disabled={pending}
              className="rounded-full border border-sand bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:border-coral/40 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save as Draft"}
            </button>
            <button
              type="submit"
              name="intent"
              value="continue"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-cta hover:brightness-105 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save and Continue"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <p className="text-right text-xs text-forest-muted">
          Next step: Sales Links
        </p>
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

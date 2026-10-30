"use client";

import { useState } from "react";

/** Shared Book Content fields (manuscript, cover, AI, ISBN, accessibility). */
export function PublishBookContentFields() {
  const [manuscriptName, setManuscriptName] = useState<string | null>(null);
  const [coverName, setCoverName] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  return (
    <>
      <Section title="Manuscript">
        <p className="mb-4 text-sm text-forest-muted">
          Upload your manuscript for private admin review (PDF, EPUB, or DOCX).
          Required to continue. This file is never sold through Authors Pilot —
          readers buy on your own website or retailer.
        </p>
        <label className="inline-flex cursor-pointer items-center justify-center rounded-none bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink shadow-cta">
          Upload manuscript
          <input
            type="file"
            name="manuscript"
            required
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
          <p className="mt-3 text-xs font-semibold text-red-600">
            Manuscript required — upload to continue.
          </p>
        )}

        <div className="mt-6 border-t border-sand pt-5">
          <p className="label-field">Digital Rights Management (DRM)</p>
          <p className="mb-3 text-sm text-forest-muted">
            DRM is controlled by your sales channel (Amazon, your store, etc.).
            Authors Pilot listings only link out - we do not wrap your files.
          </p>
          <div className="space-y-2 rounded-xl border border-sand bg-ivory/40 p-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input type="radio" name="drm" value="yes" className="mt-1" />
              Yes - I will apply DRM on my sales channel where available
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="radio"
                name="drm"
                value="no"
                defaultChecked
                className="mt-1"
              />
              No - do not apply DRM (or not applicable)
            </label>
          </div>
        </div>
      </Section>

      <Section title="eBook cover">
        <div className="grid gap-5 sm:grid-cols-2 sm:items-start">
          <div className="flex justify-center sm:justify-start">
            {coverPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverPreview}
                alt="Cover preview"
                className="aspect-[2/3] w-full max-w-[220px] rounded-md object-cover shadow-book"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full max-w-[220px] items-center justify-center rounded-md bg-sand text-sm text-forest-muted">
                Cover preview
              </div>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-sm text-forest-muted">
              Upload a cover you already have (JPEG, PNG, or WebP recommended).
              Required to continue.
            </p>
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
            <label className="inline-flex cursor-pointer items-center justify-center rounded-none bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink shadow-cta">
              Upload Book Cover
              <input
                type="file"
                name="cover"
                required
                accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  setCoverName(f ? f.name : null);
                  if (f) {
                    setCoverPreview(URL.createObjectURL(f));
                  } else {
                    setCoverPreview(null);
                  }
                }}
              />
            </label>
            {coverName ? (
              <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-900">
                Cover &quot;{coverName}&quot; selected
              </div>
            ) : (
              <p className="text-xs font-semibold text-red-600">
                Cover required — upload to continue.
              </p>
            )}
          </div>
        </div>
      </Section>

      <section className="rounded-2xl border border-sand bg-white p-5 shadow-soft sm:p-6">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Accessibility features
            </h2>
            <p className="mt-2 text-sm text-forest-muted">
              Are your images accessible?
            </p>
            <div className="mt-4 space-y-2 rounded-xl border border-sand bg-ivory/40 p-4">
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
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              AI-generated content
            </h2>
            <p className="mt-2 text-sm text-forest-muted">
              Did AI tools help create text, images, or translations? For
              transparency only — does not block publishing.
            </p>
            <div className="mt-4 space-y-2 rounded-xl border border-sand bg-ivory/40 p-4">
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input type="radio" name="ai_used" value="yes" />
                Yes
              </label>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input type="radio" name="ai_used" value="no" defaultChecked />
                No
              </label>
            </div>
          </div>
        </div>
      </section>

      <Section title="eBook ISBN">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field" htmlFor="isbn">
              ISBN{" "}
              <span className="font-normal text-forest-muted">(optional)</span>
            </label>
            <input
              id="isbn"
              name="isbn"
              className="input-field"
              placeholder="ISBN"
            />
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
    </>
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

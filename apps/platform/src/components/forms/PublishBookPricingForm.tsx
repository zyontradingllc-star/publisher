"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { savePublishPricingAction } from "@/app/actions/publish-book";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { MARKETING_URL } from "@/lib/utils";

const initialState: ActionState = { ok: false };

const AUTHOR_WEBSITE_HREF = `${MARKETING_URL}/author-website-design-agency-usa/`;

const MARKETPLACES = [
  { id: "author_website", label: "Author website / own store" },
  { id: "amazon_com", label: "Amazon.com" },
  { id: "amazon_uk", label: "Amazon.co.uk" },
  { id: "amazon_in", label: "Amazon.in" },
  { id: "amazon_de", label: "Amazon.de" },
  { id: "amazon_ca", label: "Amazon.ca" },
  { id: "other", label: "Other retailer" },
  { id: "all", label: "Select All" },
];

type Props = {
  bookId?: string | null;
  bookTitle?: string;
};

export function PublishBookPricingForm({
  bookId,
  bookTitle = "Your book",
}: Props) {
  const [state, formAction, pending] = useActionState(
    savePublishPricingAction,
    initialState
  );
  const [submitIntent, setSubmitIntent] = useState<"draft" | "publish" | null>(
    null
  );
  const [hasAuthorWebsite, setHasAuthorWebsite] = useState<"yes" | "no">("yes");

  useEffect(() => {
    if (!pending) setSubmitIntent(null);
  }, [pending]);

  return (
    <div className="space-y-6">
      {state.message ? (
        <Alert variant={state.ok ? "success" : "error"}>{state.message}</Alert>
      ) : null}

      <Alert variant="info">
        <p className="font-semibold">You keep 100% of book earnings</p>
        <p className="mt-1">
          Authors Pilot does not checkout, hold funds, or take a royalty cut.
          Prices and links below are for your listing and external stores only.
          Clicks are not confirmed sales.
        </p>
      </Alert>

      <form action={formAction} className="space-y-5">
        {bookId ? <input type="hidden" name="book_id" value={bookId} /> : null}
        <input type="hidden" name="book_title" value={bookTitle} />

        <Section title="Authors Pilot Enrollment">
          <p className="mb-3 text-sm text-forest-muted">
            Optional. List your book in the Authors Pilot public catalog so
            readers can discover it and click through to your sales channels.
          </p>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-sand bg-ivory/40 p-4 text-sm">
            <input
              type="checkbox"
              name="catalog_enroll"
              value="on"
              defaultChecked
              className="mt-1"
            />
            <span>
              Enroll my book in Authors Pilot (public catalog after approval).
            </span>
          </label>
        </Section>

        <Section title="Territories">
          <p className="mb-3 text-sm text-forest-muted">
            Where do you hold distribution rights for this listing?
          </p>
          <div className="space-y-2 rounded-xl border border-sand bg-ivory/40 p-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="radio"
                name="territories"
                value="worldwide"
                defaultChecked
                className="mt-1"
              />
              All territories (worldwide rights)
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="radio"
                name="territories"
                value="individual"
                className="mt-1"
              />
              Individual territories (I will manage rights myself)
            </label>
          </div>
        </Section>

        <Section title="Primary marketplace / sales channel">
          <p className="mb-3 text-sm text-forest-muted">
            Where should the main purchase button send readers?
          </p>
          <select
            name="primary_marketplace"
            className="input-field max-w-md"
            defaultValue="author_website"
          >
            {MARKETPLACES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </Section>

        <Section title="Purchase links">
          <p className="mb-4 text-sm text-forest-muted">
            Add the external URLs where readers can buy. Authors Pilot redirects
            only - payment happens on those sites.
          </p>
          <div className="space-y-4">
            <fieldset className="space-y-3">
              <legend className="label-field mb-2">
                Do you have an author website?
              </legend>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="has_author_website"
                  value="yes"
                  checked={hasAuthorWebsite === "yes"}
                  onChange={() => setHasAuthorWebsite("yes")}
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="has_author_website"
                  value="no"
                  checked={hasAuthorWebsite === "no"}
                  onChange={() => setHasAuthorWebsite("no")}
                />
                No
              </label>
            </fieldset>

            {hasAuthorWebsite === "yes" ? (
              <div>
                <label className="label-field" htmlFor="link_author">
                  Author website / store URL
                </label>
                <input
                  id="link_author"
                  name="link_author_website"
                  type="url"
                  className="input-field"
                  placeholder="https://yourstore.com/book"
                />
              </div>
            ) : (
              <div
                className="space-y-3 rounded-none border border-sand bg-ivory/80 p-4"
                role="region"
                aria-label="Author website suggestion"
              >
                <p className="text-sm text-charcoal">
                  A professional author site helps readers find your books and
                  brand.
                </p>
                <Button href={AUTHOR_WEBSITE_HREF} external>
                  Interested in Author Website?
                </Button>
              </div>
            )}

            <div>
              <label className="label-field" htmlFor="link_amazon">
                Amazon / Kindle URL
              </label>
              <input
                id="link_amazon"
                name="link_amazon"
                type="url"
                className="input-field"
                placeholder="https://www.amazon.com/dp/..."
              />
            </div>
            <div>
              <label className="label-field" htmlFor="link_other">
                Other retailer URL
              </label>
              <input
                id="link_other"
                name="link_other"
                type="url"
                className="input-field"
                placeholder="https://..."
              />
            </div>
          </div>
        </Section>

        <Section title="Terms &amp; Conditions">
          <p className="mb-4 text-sm text-forest-muted">
            After you publish, our team reviews the listing. Approved books
            appear in the catalog. Unapproved books stay private.
          </p>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-sand bg-ivory/40 p-4 text-sm">
            <input
              type="checkbox"
              name="terms_accepted"
              value="on"
              required
              className="mt-1"
            />
            <span>
              I confirm I have the rights to distribute this book, the sales
              links are accurate, and I agree to the Authors Pilot{" "}
              <Link href="/terms" className="font-semibold text-coral underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/community-policy"
                className="font-semibold text-coral underline"
              >
                Community Policy
              </Link>
              .
            </span>
          </label>
        </Section>

        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-950">
          <p className="font-semibold">Before you publish</p>
          <p className="mt-1">
            Make sure your purchase links work. If you are not ready, click{" "}
            <strong>Save as Draft</strong> and finish later. Completing profile
            details helps readers trust your listing.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand bg-ivory/50 px-2 py-5 sm:px-4">
          <Link
            href="/dashboard/books/new/content"
            className="inline-flex items-center rounded-none border border-sand bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:border-coral/40"
          >
            ← Back to Content
          </Link>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              name="intent"
              value="draft"
              disabled={pending}
              onClick={() => setSubmitIntent("draft")}
              className="rounded-none border border-sand bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:border-coral/40 disabled:opacity-60"
            >
              {pending && submitIntent === "draft" ? "Saving…" : "Save as Draft"}
            </button>
            <button
              type="submit"
              name="intent"
              value="publish"
              disabled={pending}
              onClick={() => setSubmitIntent("publish")}
              className="inline-flex items-center gap-2 rounded-none bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-cta hover:brightness-105 disabled:opacity-60"
            >
              {pending && submitIntent === "publish"
                ? "Publishing…"
                : "Publish Your Book"}
            </button>
          </div>
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

"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { savePublishPricingAction } from "@/app/actions/publish-book";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { PlatformLogoPicker } from "@/components/forms/PlatformLogoPicker";
import {
  Turnstile,
  isTurnstileEnabled,
} from "@/components/forms/Turnstile";
import { getPlatformById } from "@/lib/sales-channels";
import { MARKETING_URL } from "@/lib/utils";

const initialState: ActionState = { ok: false };

const AUTHOR_WEBSITE_HREF = `${MARKETING_URL}/author-website-design-agency-usa/`;

const SUPPORT_SERVICE_LINKS = [
  {
    label: "eBook Writing & Publishing",
    href: `${MARKETING_URL}/book-writing-services-for-authors/`,
  },
  {
    label: "Ghostwriting",
    href: `${MARKETING_URL}/ghostwriting-services-for-authors/`,
  },
  {
    label: "Book Editing & Proofreading",
    href: `${MARKETING_URL}/professional-book-editing-services/`,
  },
  {
    label: "Book Formatting",
    href: `${MARKETING_URL}/book-formatting-services-for-authors/`,
  },
  {
    label: "Book Cover Design",
    href: `${MARKETING_URL}/book-cover-design-services/`,
  },
  {
    label: "eBook Cover Designing",
    href: `${MARKETING_URL}/book-cover-design-services/`,
  },
  {
    label: "Book Illustration",
    href: `${MARKETING_URL}/book-cover-design-services/`,
  },
  {
    label: "Book Publishing",
    href: `${MARKETING_URL}/book-publishing-services-for-authors/`,
  },
  {
    label: "Self Publishing",
    href: `${MARKETING_URL}/self-publishing-services-for-authors/`,
  },
  {
    label: "Global Publishing",
    href: `${MARKETING_URL}/amazon-kdp-publishing-services/`,
  },
  {
    label: "Children Book Publishing",
    href: `${MARKETING_URL}/book-publishing-services-for-authors/`,
  },
  {
    label: "Book Marketing",
    href: `${MARKETING_URL}/book-marketing-services-for-authors/`,
  },
  {
    label: "Author Website Development",
    href: `${MARKETING_URL}/author-website-design-agency-usa/`,
  },
  {
    label: "Audiobook Production",
    href: `${MARKETING_URL}/audiobook-production-services-for-authors/`,
  },
] as const;

type StoreLinkRow = {
  key: string;
  channelId: string;
  label: string;
  placeholder: string;
  url: string;
};

let linkKeySeq = 0;
function nextLinkKey() {
  linkKeySeq += 1;
  return `link-${Date.now()}-${linkKeySeq}`;
}

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
  const [hasAuthorWebsite, setHasAuthorWebsite] = useState<
    "yes" | "no" | "planning"
  >("yes");
  /** Only rows added by logo click or + — not all stores at once */
  const [storeLinks, setStoreLinks] = useState<StoreLinkRow[]>([]);
  const turnstileRequired = isTurnstileEnabled();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    if (!pending) setSubmitIntent(null);
  }, [pending]);

  const canSubmit = !turnstileRequired || Boolean(turnstileToken);

  const selectedChannelIds = storeLinks.map((row) => row.channelId);

  function addStoreFromLogo(channelId: string) {
    const platform = getPlatformById(channelId);
    if (!platform) return;
    setStoreLinks((prev) => {
      if (prev.some((row) => row.channelId === channelId)) return prev;
      return [
        ...prev,
        {
          key: nextLinkKey(),
          channelId: platform.id,
          label: platform.label,
          placeholder: platform.urlPlaceholder ?? "https://...",
          url: "",
        },
      ];
    });
  }

  function addExtraLink() {
    setStoreLinks((prev) => [
      ...prev,
      {
        key: nextLinkKey(),
        channelId: `other_${prev.length + 1}`,
        label: "Other retailer",
        placeholder: "https://...",
        url: "",
      },
    ]);
  }

  function updateStoreUrl(key: string, url: string) {
    setStoreLinks((prev) =>
      prev.map((row) => (row.key === key ? { ...row, url } : row))
    );
  }

  function removeStoreLink(key: string) {
    setStoreLinks((prev) => prev.filter((row) => row.key !== key));
  }

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

        <Section title="Purchase links">
          <p className="mb-4 text-sm text-forest-muted">
            Add the external URLs where readers can buy. Authors Pilot redirects
            only - payment happens on those sites.
          </p>
          <div className="space-y-4">
            <div>
              <p className="label-field mb-2">Click to Add Sales Channel</p>
              <PlatformLogoPicker
                selected={selectedChannelIds}
                onAdd={addStoreFromLogo}
              />
            </div>

            <fieldset className="space-y-3 border-t border-sand pt-4">
              <legend className="label-field mb-2">
                Do you have an author website?
              </legend>
              <div className="flex flex-wrap gap-5 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="has_author_website"
                    value="yes"
                    checked={hasAuthorWebsite === "yes"}
                    onChange={() => setHasAuthorWebsite("yes")}
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="has_author_website"
                    value="no"
                    checked={hasAuthorWebsite === "no"}
                    onChange={() => setHasAuthorWebsite("no")}
                  />
                  No
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="has_author_website"
                    value="planning"
                    checked={hasAuthorWebsite === "planning"}
                    onChange={() => setHasAuthorWebsite("planning")}
                  />
                  Planning
                </label>
              </div>
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
                  {hasAuthorWebsite === "planning"
                    ? "Planning a site? A professional author website helps readers find your books and brand."
                    : "A professional author site helps readers find your books and brand."}
                </p>
                <Button href={AUTHOR_WEBSITE_HREF} external>
                  Interested in Author Website?
                </Button>
              </div>
            )}

            <div className="space-y-3 border-t border-sand pt-4">
              <p className="label-field">Store purchase URLs</p>
              {storeLinks.length === 0 ? (
                <p className="text-sm text-forest-muted">
                  Click a store logo above to add a URL field. Use + for more.
                </p>
              ) : (
                <div className="space-y-3">
                  {storeLinks.map((row) => (
                    <div key={row.key} className="flex items-end gap-2">
                      <div className="min-w-0 flex-1">
                        <label
                          className="label-field"
                          htmlFor={`link_row_${row.key}`}
                        >
                          {row.label} URL
                        </label>
                        <input
                          id={`link_row_${row.key}`}
                          name={
                            row.channelId.startsWith("other")
                              ? `link_channel_other__${row.key}`
                              : `link_channel_${row.channelId}`
                          }
                          type="url"
                          className="input-field"
                          placeholder={row.placeholder}
                          value={row.url}
                          onChange={(e) =>
                            updateStoreUrl(row.key, e.target.value)
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStoreLink(row.key)}
                        className="mb-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-sand bg-white text-lg font-bold text-forest-muted hover:border-coral/40 hover:text-ink"
                        aria-label={`Remove ${row.label} link`}
                      >
                        ×
                      </button>
                      <button
                        type="button"
                        onClick={addExtraLink}
                        className="mb-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-sand bg-white text-lg font-bold text-ink hover:border-coral/40"
                        aria-label="Add another purchase link"
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={addExtraLink}
                className="inline-flex items-center gap-1.5 rounded-none border border-sand bg-white px-3 py-2 text-sm font-bold text-ink hover:border-coral/40"
              >
                <span aria-hidden className="text-base leading-none">
                  +
                </span>
                Add another link
              </button>
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
              <a
                href={`${MARKETING_URL}/terms/`}
                className="font-semibold text-coral underline"
              >
                Terms
              </a>{" "}
              and{" "}
              <Link
                href="/community-policy/"
                className="font-semibold text-coral underline"
              >
                Community Policy
              </Link>
              .
            </span>
          </label>
        </Section>

        <div className="space-y-4 border-t border-sand bg-ivory/50 px-2 py-5 sm:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/dashboard/books/new"
              className="inline-flex items-center rounded-none border border-sand bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:border-coral/40"
            >
              ← Back to Details
            </Link>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                name="intent"
                value="draft"
                disabled={pending || !canSubmit}
                onClick={() => setSubmitIntent("draft")}
                className="rounded-none border border-sand bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:border-coral/40 disabled:opacity-60"
              >
                {pending && submitIntent === "draft"
                  ? "Saving…"
                  : "Save as Draft"}
              </button>
              <button
                type="submit"
                name="intent"
                value="publish"
                disabled={pending || !canSubmit}
                onClick={() => setSubmitIntent("publish")}
                className="inline-flex items-center gap-2 rounded-none bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-cta hover:brightness-105 disabled:opacity-60"
              >
                {pending && submitIntent === "publish"
                  ? "Publishing…"
                  : "Publish Purchase Link"}
              </button>
            </div>
          </div>

          {turnstileRequired ? (
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="hidden"
                name="turnstile_token"
                value={turnstileToken ?? ""}
                readOnly
              />
              <Turnstile
                action="publish"
                onChange={setTurnstileToken}
                className="max-w-sm shrink-0"
              />
              {turnstileToken ? (
                <p className="text-sm font-semibold text-green-700">
                  Verified — you can publish.
                </p>
              ) : (
                <p className="text-xs text-forest-muted">
                  Complete the Cloudflare check before publishing.
                </p>
              )}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-950">
          <p className="font-semibold">Before you publish</p>
          <p className="mt-1">
            Make sure your purchase links work. If you are not ready, click{" "}
            <strong>Save as Draft</strong> and finish later. Completing profile
            details helps readers trust your listing.
          </p>
        </div>

        <section
          className="rounded-2xl border border-[#F2C14D]/60 p-5 shadow-soft sm:p-6"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 35%, #F2C14D 0%, #F7D978 28%, #FFF8E7 62%, #FFFDF6 100%)",
          }}
        >
          <h2 className="font-display text-lg font-bold text-ink">
            Support and Services
          </h2>
          <p className="mt-2 mb-4 text-sm text-ink/70">
            Need help finishing your book or author page? Explore our services.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {SUPPORT_SERVICE_LINKS.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 rounded-xl border border-[#E08A2A]/25 bg-white/80 px-4 py-3 text-sm font-semibold text-ink shadow-sm backdrop-blur-sm transition hover:border-[#E08A2A]/50 hover:bg-white"
                >
                  <span>{item.label}</span>
                  <span aria-hidden className="text-ink/50">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
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

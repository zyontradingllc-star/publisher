"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { savePublishDetailsAction } from "@/app/actions/publish-book";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { LANGUAGES } from "@/types/database";
import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  getCountryByCode,
} from "@/lib/countries";
import {
  BOOK_CATEGORY_DIRECTORY,
  productTypeForCategory,
} from "@/lib/book-categories";
import {
  DEFAULT_PRODUCT_TYPE,
  PRODUCT_TYPES,
  type ProductTypeId,
} from "@/lib/product-types";
import { slugify } from "@/lib/utils";
import { PublishBookContentFields } from "@/components/forms/PublishBookContentFields";

const initialState: ActionState = { ok: false };

/** Sidebar tips from AuthorsPilot CRO / social content. */
const PUBLISH_TIP_CARDS = [
  {
    title: "More than a listing",
    body: "You've written your book. Give readers one simple place to discover it—with an author page and one link to your store or retailer.",
    image: "/publish-tips/1.webp",
    imageAlt: "Professional book publishing showcase",
  },
  {
    title: "Help readers find you",
    body: "Your book may be on Amazon or your site—but are readers discovering it? Stop scattered links. Build one shareable discovery page.",
    image: "/publish-tips/2.webp",
    imageAlt: "Self-publishing platform for authors",
  },
  {
    title: "One shareable link",
    body: "Bring your author profile and books together. Share on social, in your email signature, or with readers—direct them to Amazon or your website.",
    image: "/publish-tips/3.webp",
    imageAlt: "Author building a publishing business",
  },
  {
    title: "You keep 100%",
    body: "No Authors Pilot checkout and no commission on book sales. Link to your retailers; outbound clicks help you see reader interest.",
    image: "/publish-tips/4.webp",
    imageAlt: "Author website and branding tips",
  },
] as const;

type Props = {
  defaultAuthorName?: string;
  authorEmail?: string | null;
};

export function PublishBookDetailsForm({
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
  const [productType, setProductType] =
    useState<ProductTypeId>(DEFAULT_PRODUCT_TYPE);
  const [browseCategory, setBrowseCategory] = useState("");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const continueBtnRef = useRef<HTMLButtonElement>(null);

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

  const slugHint = useMemo(() => slugify(title), [title]);
  const selectedProduct =
    PRODUCT_TYPES.find((t) => t.id === productType) ?? PRODUCT_TYPES[0];
  const typeLabel = browseCategory.trim() || selectedProduct.title;
  const titleLabel = `${typeLabel} title`;
  const titlePlaceholder = `Enter your ${typeLabel.toLowerCase()} title`;

  return (
    <form
      action={formAction}
      className="space-y-4"
      encType="multipart/form-data"
    >
      <input type="hidden" name="slug" value={slugHint} />
      <input type="hidden" name="product_type" value={productType} />

      <nav
        aria-label="Publish progress"
        className="flex flex-wrap gap-2 border-b border-sand pb-3 sm:gap-4"
      >
        <Step n={1} label="Book Details" status="current" />
        <Step n={2} label="Sales Links" status="upcoming" />
      </nav>

      <Section title="Select a eBook Type">
        <div className="rounded-xl border border-sand bg-white p-4 sm:p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {BOOK_CATEGORY_DIRECTORY.map((column, colIndex) => (
              <div key={`col-${colIndex}`} className="space-y-6">
                {column.map((block) => (
                  <div key={`${colIndex}-${block.heading}`}>
                    <h3 className="border-b border-sand pb-2 font-sans text-sm font-bold text-ink">
                      {block.heading}
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {block.items.map((item) => {
                        const selected = browseCategory === item;
                        return (
                          <li key={`${block.heading}-${item}`}>
                            <button
                              type="button"
                              onClick={() => {
                                setBrowseCategory(item);
                                const mapped = productTypeForCategory(item);
                                setProductType(mapped ?? "ebook");
                                window.requestAnimationFrame(() => {
                                  const el = document.getElementById("title");
                                  el?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                  });
                                  el?.focus();
                                });
                              }}
                              className={`block w-full text-left text-sm transition ${
                                selected
                                  ? "font-semibold text-[#273E2B]"
                                  : "text-charcoal hover:text-[#273E2B] hover:underline hover:underline-offset-2"
                              }`}
                            >
                              {item}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {state.message ? (
        <Alert variant={state.ok ? "success" : "error"}>{state.message}</Alert>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
        <div className="space-y-4">
          <Section title="Title & language">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label-field" htmlFor="title">
                  {titleLabel} <span className="text-red-600">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  className="input-field"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={titlePlaceholder}
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
                <label className="label-field" htmlFor="country">
                  Country <span className="text-red-600">*</span>
                </label>
                <CountrySelect value={country} onChange={setCountry} />
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
              <div className="sm:col-span-2">
                <label className="label-field" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="input-field font-sans"
                  placeholder="Short summary for your listing"
                />
              </div>
            </div>
          </Section>

          <PublishBookContentFields />

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
              {defaultEmail ? (
                <input type="hidden" name="author_email" value={defaultEmail} />
              ) : null}
            </div>
          </Section>

          <input type="hidden" name="publishing_rights" value="own_copyright" />
          <input type="hidden" name="explicit_content" value="no" />
          <input type="hidden" name="content_policy_accepted" value="on" />

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
              ref={continueBtnRef}
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
        </div>

        <aside className="space-y-3 lg:sticky lg:top-24">
          {PUBLISH_TIP_CARDS.map((card) => (
            <TipCard
              key={card.title}
              title={card.title}
              image={card.image}
              imageAlt={card.imageAlt}
            >
              {card.body}
            </TipCard>
          ))}
        </aside>
      </div>
    </form>
  );
}

function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const selected = getCountryByCode(value);

  return (
    <div className="relative flex items-center gap-2">
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 z-10 flex h-5 w-7 items-center justify-center overflow-hidden rounded-sm border border-sand bg-ivory shadow-sm"
      >
        {selected ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://flagcdn.com/w40/${selected.code.toLowerCase()}.png`}
            alt=""
            width={28}
            height={20}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-xs text-forest-muted">?</span>
        )}
      </span>
      <select
        id="country"
        name="country"
        className="input-field pl-12"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select a country</option>
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function TipCard({
  title,
  children,
  image,
  imageAlt = "",
}: {
  title: string;
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-sand bg-[#EDEDED] shadow-soft">
      {image ? (
        <div className="relative aspect-[16/9] w-full bg-sand/40">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="240px"
            className="object-cover object-center"
          />
        </div>
      ) : null}
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink">
          {title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal">{children}</p>
      </div>
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

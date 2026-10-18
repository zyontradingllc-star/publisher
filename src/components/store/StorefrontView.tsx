"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PainPointWarning } from "@/components/publish/PainPointWarning";
import { loadPublishDraft } from "@/lib/publish/storage";
import { slugifyTitle } from "@/lib/publish/slugify";
import { emptyPublishDraft, type PublishDraft } from "@/lib/publish/types";

export function StorefrontView({ slug }: { slug: string }) {
  const [draft, setDraft] = useState<PublishDraft | null>(null);

  useEffect(() => {
    const stored = loadPublishDraft();
    if (stored.title && slugifyTitle(stored.title) === slug) {
      setDraft(stored);
      return;
    }
    setDraft({
      ...emptyPublishDraft(),
      title: slug.replace(/-/g, " "),
      firstName: "Independent",
      lastName: "Author",
      description:
        "This live storefront is generated from the book title. Complete the three-step wizard to load your full metadata, keywords, and cover.",
      keywords: ["independent author", "bookstore"],
      activated: false,
    });
  }, [slug]);

  if (!draft) {
    return <div className="mx-auto max-w-4xl px-4 py-20 font-sans text-sm text-charcoal">Loading storefront…</div>;
  }

  const author = `${draft.firstName} ${draft.lastName}`.trim() || "Authors Pilot author";
  const buyHref =
    draft.monetization === "external" && draft.externalUrl
      ? draft.externalUrl
      : "/contact-author-website-design-agency";

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <p className="badge-pill">LIVE storefront</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="relative mx-auto aspect-[2/3] w-56 overflow-hidden rounded-2xl bg-ivory shadow-book ring-1 ring-sand lg:w-full">
          <Image
            src="/covers-that-sell/cover-1.webp"
            alt={`${draft.title} cover`}
            fill
            sizes="280px"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="heading-hero capitalize">{draft.title}</h1>
          {draft.subtitle && (
            <p className="mt-3 font-display text-xl text-charcoal">{draft.subtitle}</p>
          )}
          <p className="mt-3 font-sans text-sm font-semibold text-ink">By {author}</p>
          <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
            {draft.description}
          </p>
          {draft.keywords.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {draft.keywords.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-ivory px-3 py-1 font-sans text-xs font-semibold text-ink"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8">
            <Button href={buyHref}>Buy this book</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <PainPointWarning />
      </div>
      <p className="mt-6 font-sans text-sm text-charcoal">
        Need to edit details?{" "}
        <Link href="/publish/?step=1" className="font-semibold text-[#E08A2A] hover:underline">
          Return to the wizard
        </Link>
        .
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Copyright",
};

export default function CopyrightPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">Copyright (draft)</h1>
      <p className="mt-4 text-sm text-forest-muted">
        Draft notice for review — not legal advice. This page describes how we handle copyright
        concerns on Authors Pilot.
      </p>

      <div className="mt-8 space-y-6 text-charcoal leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Author ownership</h2>
          <p className="mt-2">
            Authors retain ownership of their books, covers, and listing text. By publishing on
            Authors Pilot, you grant us a limited license to display that material on the platform
            for discovery purposes.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Reporting infringement</h2>
          <p className="mt-2">
            If you believe a listing infringes your copyright, use the report form on the book page
            or email{" "}
            <a href="mailto:support@authorspilot.com" className="text-coral hover:underline">
              support@authorspilot.com
            </a>{" "}
            with:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
            <li>Identification of the copyrighted work</li>
            <li>URL of the listing on Authors Pilot</li>
            <li>Your contact information and a good-faith statement</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Repeat infringement</h2>
          <p className="mt-2">
            We may remove listings or suspend accounts when valid infringement reports are confirmed
            or when authors repeatedly violate rights requirements in our{" "}
            <Link href="/author-guidelines" className="text-coral hover:underline">
              author guidelines
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

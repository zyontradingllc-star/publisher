import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Author Guidelines",
};

export default function AuthorGuidelinesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">Author guidelines</h1>
      <p className="mt-4 text-sm text-forest-muted">
        Draft for author review - not legal advice. These guidelines explain what we expect before a
        listing is approved.
      </p>

      <div className="mt-8 space-y-6 text-charcoal leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-ink">Rights and authenticity</h2>
          <p className="mt-2">
            You must own or control the rights to list the book and its cover art. Do not upload
            content you do not have permission to publish. Confirm rights ownership when submitting
            for review.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-ink">Accurate listings</h2>
          <p className="mt-2">
            Titles, descriptions, genres, and author names should match the work readers will find at
            your purchase links. Misleading metadata may result in rejection or removal.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-ink">Purchase links</h2>
          <p className="mt-2">
            All purchase URLs must use http or https and should lead to a legitimate store, author
            site, or contact channel. Authors Pilot never processes payments for book sales on this
            platform.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-ink">Content standards</h2>
          <p className="mt-2">
            Listings must comply with our{" "}
            <Link href="/community-policy" className="font-semibold text-coral hover:underline">
              community policy
            </Link>
            . Illegal content, hate speech, harassment, or spam will not be approved.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-ink">Review decisions</h2>
          <p className="mt-2">
            We may request changes, reject a submission, or unpublish a live listing if it violates
            these guidelines or receives valid reports. Authors can update drafts and resubmit when
            changes are requested.
          </p>
        </section>
      </div>
    </article>
  );
}

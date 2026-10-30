import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Policy",
};

export default function CommunityPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">Community policy (draft)</h1>
      <p className="mt-4 text-sm text-forest-muted">
        Draft standards for public listings and reader reports - not legal advice.
      </p>

      <div className="mt-8 space-y-6 text-charcoal leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Respectful catalog</h2>
          <p className="mt-2">
            Public book and author pages should be suitable for a general audience unless clearly
            marked otherwise in the description. Hate speech, harassment, threats, or content that
            promotes illegal activity is not allowed.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">No deceptive listings</h2>
          <p className="mt-2">
            Do not impersonate other authors, misrepresent affiliations, or use misleading purchase
            links. Descriptions should reflect the actual book offered at your outbound URLs.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Concerns</h2>
          <p className="mt-2">
            Rights holders and readers can contact us about listings that may violate these
            standards. We may unpublish content, request edits, or suspend accounts. See also our{" "}
            <Link href="/copyright/" className="text-coral hover:underline">
              copyright page
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Enforcement</h2>
          <p className="mt-2">
            We apply these rules in good faith during launch. Severe or repeated violations may result
            in permanent removal from the platform.
          </p>
        </section>
      </div>
    </article>
  );
}

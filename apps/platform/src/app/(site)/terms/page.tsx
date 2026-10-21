import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">Terms of service (draft)</h1>
      <p className="mt-4 text-sm text-forest-muted">
        Draft terms for review - not legal advice. By using Authors Pilot you agree to these
        general conditions once finalized.
      </p>

      <div className="mt-8 space-y-6 text-charcoal leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Platform role</h2>
          <p className="mt-2">
            Authors Pilot provides listing and discovery tools. We are not a party to book purchases
            made on external websites or retailers. Purchase buttons redirect readers away from
            Authors Pilot.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Author responsibilities</h2>
          <p className="mt-2">
            You represent that you have rights to list your content, that your listings are accurate,
            and that you comply with our{" "}
            <Link href="/author-guidelines" className="text-coral hover:underline">
              author guidelines
            </Link>{" "}
            and{" "}
            <Link href="/community-policy" className="text-coral hover:underline">
              community policy
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Acceptable use</h2>
          <p className="mt-2">
            Do not misuse the platform, attempt unauthorized access, or upload malware. We may suspend
            accounts that violate these terms or applicable law.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Disclaimer</h2>
          <p className="mt-2">
            The platform is provided as-is during launch. We do not guarantee uninterrupted service
            or specific review timelines.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Contact</h2>
          <p className="mt-2">
            Questions about these terms:{" "}
            <a href="mailto:support@authorspilot.com" className="text-coral hover:underline">
              support@authorspilot.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

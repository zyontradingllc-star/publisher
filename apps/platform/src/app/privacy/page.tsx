import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">Privacy policy (draft)</h1>
      <p className="mt-4 text-sm text-forest-muted">
        This draft describes how Authors Pilot may handle information. It is provided for review and
        does not constitute legal advice or a final compliance document.
      </p>

      <div className="mt-8 space-y-6 text-charcoal leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Information we collect</h2>
          <p className="mt-2">
            When you create an account, we collect email address, display name, and profile details
            you choose to provide. When you submit books, we store listing metadata, cover images,
            and privately uploaded manuscripts for review. We may log outbound purchase link clicks
            for analytics.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">How we use information</h2>
          <p className="mt-2">
            We use account data to authenticate you, operate the dashboard, review submissions, and
            display public author and book pages. We may send transactional email related to account
            security and review status.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Service providers</h2>
          <p className="mt-2">
            We use third-party infrastructure such as hosting and database providers (for example
            Supabase) to operate the platform. Those providers process data on our behalf under their
            own terms.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Your choices</h2>
          <p className="mt-2">
            You can update profile information in the dashboard. To request account deletion or data
            questions, contact{" "}
            <a href="mailto:support@authorspilot.com" className="text-coral hover:underline">
              support@authorspilot.com
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Updates</h2>
          <p className="mt-2">
            We may revise this draft as the product matures. Material changes should be posted on
            this page with an updated effective date before they apply.
          </p>
        </section>
      </div>
    </article>
  );
}

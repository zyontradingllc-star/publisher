import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PricingNotice } from "@/components/PricingNotice";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">Pricing</h1>
      <p className="mt-4 text-sm text-forest-muted">
        Draft pricing overview — not a binding offer. We will announce changes before any paid plans
        take effect.
      </p>

      <div className="mt-8 space-y-6">
        <section className="card-surface">
          <h2 className="font-display text-xl font-bold text-ink">Free access during launch</h2>
          <p className="mt-3 text-charcoal">
            Authors can create an account, submit book listings for review, and maintain public
            profiles at no charge while we are in launch. There are no listing fees during this
            period.
          </p>
        </section>

        <section className="card-surface">
          <h2 className="font-display text-xl font-bold text-ink">Paid plans coming soon</h2>
          <p className="mt-3 text-charcoal">
            We may introduce optional subscription or platform plans in the future. When we do, we
            will publish clear terms and give existing authors advance notice. We are not quoting
            specific prices here until those plans are finalized.
          </p>
        </section>

        <section className="card-surface">
          <h2 className="font-display text-xl font-bold text-ink">Book royalties</h2>
          <p className="mt-3 text-charcoal">
            Authors keep 100% of book royalties from sales on their own websites and external
            retailers. Authors Pilot does not take a commission on those sales. Platform fees, if
            introduced later, would apply to use of Authors Pilot services — not to redirecting readers
            to your checkout elsewhere.
          </p>
        </section>
      </div>

      <div className="mt-8">
        <PricingNotice />
      </div>

      <div className="mt-8">
        <Button href="/signup">Start Publishing Free</Button>
      </div>
    </article>
  );
}

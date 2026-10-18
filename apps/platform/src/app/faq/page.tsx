import type { Metadata } from "next";
import Link from "next/link";
import { PricingNotice } from "@/components/PricingNotice";

export const metadata: Metadata = {
  title: "FAQ",
};

const FAQ_ITEMS = [
  {
    q: "Is Authors Pilot a bookstore?",
    a: "No. We display book listings and link readers to external purchase URLs you provide. Checkout happens on those sites, not on Authors Pilot.",
  },
  {
    q: "Do you take a percentage of my book sales?",
    a: "No. You keep 100% of book royalties from sales on your own channels. Future platform subscription fees, if any, would be separate from your book sales.",
  },
  {
    q: "What does it cost to join?",
    a: "Author access is free during launch. Paid plans may be introduced later with advance notice.",
  },
  {
    q: "Do I need my own website?",
    a: "No. You can link to Amazon or other retailers. An author website is optional but recommended for direct sales.",
  },
  {
    q: "How long does review take?",
    a: "Timing varies with volume. You will see status updates in your dashboard and receive email when possible.",
  },
  {
    q: "Can readers buy books inside Authors Pilot?",
    a: "No. Purchase buttons record an outbound click for analytics, then send the reader to your external URL.",
  },
  {
    q: "How do I report a listing?",
    a: "Use the report form on any book detail page. Our team reviews reports against the community policy.",
  },
];

export default function FaqPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">Frequently asked questions</h1>
      <div className="mt-8">
        <PricingNotice />
      </div>
      <dl className="mt-10 space-y-6">
        {FAQ_ITEMS.map((item) => (
          <div key={item.q} className="card-surface">
            <dt className="font-display text-lg font-bold text-ink">{item.q}</dt>
            <dd className="mt-2 text-charcoal">{item.a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 text-charcoal">
        Still need help?{" "}
        <Link href="/contact" className="font-semibold text-coral hover:underline">
          Contact us
        </Link>{" "}
        or read{" "}
        <Link href="/how-publishing-works" className="font-semibold text-coral hover:underline">
          how publishing works
        </Link>
        .
      </p>
    </article>
  );
}

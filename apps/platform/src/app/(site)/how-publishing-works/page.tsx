import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PricingNotice } from "@/components/PricingNotice";

export const metadata: Metadata = {
  title: "How Publishing Works",
};

export default function HowPublishingWorksPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">How publishing works</h1>
      <p className="mt-4 text-charcoal">
        Authors Pilot helps you publish a professional listing and send interested readers to where
        you already sell. After approval, each author gets a separate public page link.
      </p>

      <ol className="mt-10 space-y-8">
        {[
          {
            title: "Share your author story",
            body: "Once approved, you receive a dedicated public page — a separate link for your profile and books, in a simple blog-style layout.",
          },
          {
            title: "Submit your book listing",
            body: "Enter title, description, genre, language, and cover. Add the external links where readers can buy or learn more.",
          },
          {
            title: "We review for quality",
            body: "Our team checks listings against author guidelines and community policy. We may approve, request changes, or reject with a reason.",
          },
          {
            title: "Go live — readers click out to buy",
            body: "Your page and listings appear publicly. Purchases happen on your website, Amazon, or other channels you choose — not on Authors Pilot.",
          },
        ].map((step, i) => (
          <li key={step.title} className="border-l-4 border-coral/40 pl-5">
            <p className="text-xs font-bold uppercase tracking-wide text-coral">Step {i + 1}</p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink">{step.title}</h2>
            <p className="mt-2 text-charcoal">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <PricingNotice />
      </div>

      <div className="mt-8">
        <Button href="/publish">Submit Your Book</Button>
      </div>
    </article>
  );
}

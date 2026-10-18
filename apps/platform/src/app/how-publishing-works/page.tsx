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
        you already sell. Here is the typical flow from sign-up to live listing.
      </p>

      <ol className="mt-10 space-y-8">
        {[
          {
            title: "Sign up and verify your email",
            body: "Create a free author account during launch. Confirm your email address so you can access the dashboard.",
          },
          {
            title: "Complete your public profile",
            body: "Add your display name, slug, optional bio, website, and social links. Readers see this on your author page.",
          },
          {
            title: "Create a book draft",
            body: "Enter title, description, genre, language, and upload a cover. Manuscript upload is stored privately for review — it is not sold through Authors Pilot.",
          },
          {
            title: "Add external purchase links",
            body: "Every live listing needs at least one http(s) URL where readers can buy or learn more. Mark a primary link for the main call-to-action on your book page.",
          },
          {
            title: "Submit for review",
            body: "Our team checks listings against author guidelines and community policy. We may approve, request changes, or reject with a reason.",
          },
          {
            title: "Go live and track outbound clicks",
            body: "Published listings appear in the catalog. When readers click purchase buttons, they leave Authors Pilot for your external URL. Click counts are analytics only — not confirmed sales or revenue.",
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
        <Button href="/signup">Start Publishing Free</Button>
      </div>
    </article>
  );
}

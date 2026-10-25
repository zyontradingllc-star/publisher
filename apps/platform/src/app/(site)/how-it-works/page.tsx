import type { Metadata } from "next";
import { AeoAnswer } from "@/components/seo/AeoAnswer";
import {
  JsonLd,
  faqPageSchema,
  organizationSchema,
} from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { APP_ORIGIN, buildAppMetadata } from "@/lib/seo";
import { LAUNCH_FAQS } from "@/lib/seo-content";

export const metadata: Metadata = buildAppMetadata({
  title: "How Authors Pilot Works | Free Author Page & Universal Book Link",
  description:
    "How a free author page and one link to sell your book everywhere works: submit once, link Amazon or your website, keep 100% royalties, track clicks.",
  path: "/how-it-works/",
});

const STEPS = [
  {
    question: "How do I get a free author page with an Amazon link?",
    answer:
      "Sign up, complete your profile, and submit each book with cover details plus Amazon or website buy links. After approval you receive a branded public author page and one shareable URL readers can open from social, email, or ads.",
  },
  {
    question: "How does one link to sell a book everywhere work?",
    answer:
      "Your shareable Authors Pilot link opens your author page. From there, purchase buttons send readers to Amazon, your site, or other stores you chose. You keep one branded destination instead of juggling separate store URLs in every post.",
  },
  {
    question: "Where do sales and royalties happen?",
    answer:
      "Purchases complete on Amazon or your website—not inside Authors Pilot. We never take a sales commission. You keep the royalties those channels pay, which is why authors call us a keep 100% book royalties platform.",
  },
  LAUNCH_FAQS[2],
  LAUNCH_FAQS[3],
] as const;

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(APP_ORIGIN),
          faqPageSchema([...STEPS]),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">
          How it works
        </p>
        <h1 className="mt-3 heading-section">
          Free author page. One link. 100% royalties.
        </h1>
        <p className="mt-4 text-charcoal leading-relaxed">
          Authors Pilot is an independent publishing platform: list your books,
          share one branded link, and send buyers to Amazon or your own site—with
          click tracking and no commission.
        </p>

        <div className="mt-10">
          {STEPS.map((item) => (
            <AeoAnswer
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/signup?google=1">Get your free author page</Button>
          <Button href="/faq/" variant="ghost">
            Read the FAQ
          </Button>
        </div>
      </article>
    </>
  );
}

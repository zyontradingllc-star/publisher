import type { Metadata } from "next";
import Link from "next/link";
import { AeoAnswer } from "@/components/seo/AeoAnswer";
import {
  JsonLd,
  faqPageSchema,
  organizationSchema,
} from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { APP_ORIGIN, buildAppMetadata } from "@/lib/seo";
import { LAUNCH_FAQS } from "@/lib/seo-content";

export const metadata: Metadata = buildAppMetadata({
  title: "FAQ | Free Author Page, Royalties & Universal Book Links",
  description:
    "FAQ for Authors Pilot: 100% royalties, Books2Read differences, universal book links, Amazon + website links, and free launch access.",
  path: "/faq/",
});

/** Extra FAQs beyond the five launch FAQs (still in HTML via Accordion). */
const MORE_FAQS = [
  {
    question: "What is Authors Pilot?",
    answer:
      "Authors Pilot is an independent publishing and discovery platform. Authors get a free author page, one shareable link, and outbound click tracking while sending readers to Amazon or their own website—with no commission on sales.",
  },
  {
    question: "Is Authors Pilot a bookstore?",
    answer:
      "No. We do not run checkout for book purchases. Listings connect readers to your Amazon, website, or other store links. Optional professional services (covers, websites, marketing) are separate from book royalties.",
  },
  {
    question: "How is this different from Geniuslink or 1link.st?",
    answer:
      "Those tools focus on smart redirects. Authors Pilot adds a branded author page and book listings so readers see your brand before they click out—plus click analytics and a free launch plan for indie authors.",
  },
] as const;

export default function FaqPage() {
  const allForSchema = [...LAUNCH_FAQS, ...MORE_FAQS];

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(APP_ORIGIN),
          faqPageSchema(allForSchema),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="heading-section">Frequently asked questions</h1>
        <p className="mt-4 text-charcoal">
          Straight answers about royalties, Books2Read alternatives, and how
          your universal book link works on Authors Pilot.
        </p>

        <div className="mt-10">
          {LAUNCH_FAQS.map((item) => (
            <AeoAnswer
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold text-ink">
          More about the platform
        </h2>
        <div className="mt-6">
          <Accordion
            items={MORE_FAQS.map((f) => ({
              question: f.question,
              answer: f.answer,
            }))}
            defaultOpen={0}
          />
        </div>

        <p className="mt-10 text-sm text-forest-muted">
          Compare us:{" "}
          <Link href="/vs-books2read/" className="font-semibold text-coral hover:underline">
            vs Books2Read
          </Link>
          {" · "}
          <Link href="/vs-booklinker/" className="font-semibold text-coral hover:underline">
            vs Booklinker
          </Link>
          {" · "}
          <Link href="/how-it-works/" className="font-semibold text-coral hover:underline">
            How it works
          </Link>
        </p>

        <div className="mt-8">
          <Button href="/signup?google=1">Create your free author page</Button>
        </div>
      </div>
    </>
  );
}

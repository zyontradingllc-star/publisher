import type { Metadata } from "next";
import { AeoAnswer } from "@/components/seo/AeoAnswer";
import {
  JsonLd,
  faqPageSchema,
  organizationSchema,
} from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { APP_ORIGIN, buildAppMetadata } from "@/lib/seo";
import { LAUNCH_FAQS, VS_BOOKLINKER_POINTS } from "@/lib/seo-content";

export const metadata: Metadata = buildAppMetadata({
  title: "Authors Pilot vs Booklinker | Free Booklinker Alternative",
  description:
    "Looking for a Booklinker alternative free for authors? Authors Pilot adds a branded author page, click analytics, Amazon + website links, and 100% royalties—no commission.",
  path: "/vs-booklinker/",
});

const AEO = [
  {
    question: "Is Authors Pilot a free Booklinker alternative?",
    answer:
      "Yes during launch. You get a free author page and one shareable book link without paying a platform fee to list. Unlike link-only tools, you also get branding and outbound click tracking while keeping 100% of royalties on Amazon and your website.",
  },
  LAUNCH_FAQS[0],
  LAUNCH_FAQS[3],
  LAUNCH_FAQS[2],
] as const;

export default function VsBooklinkerPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(APP_ORIGIN),
          faqPageSchema([...AEO]),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">
          Comparison
        </p>
        <h1 className="mt-3 heading-section">
          Authors Pilot vs Booklinker
        </h1>
        <p className="mt-4 text-charcoal leading-relaxed">
          Booklinker, Geniuslink, and similar tools excel at geo-aware short
          links. Authors Pilot is a keep 100% book royalties platform that pairs
          a universal book link with a branded author page—so readers meet your
          brand before they click out to buy.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-ink">
          Why authors pick Authors Pilot over Booklinker
        </h2>
        <ul className="mt-6 space-y-4">
          {VS_BOOKLINKER_POINTS.map((item) => (
            <li
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-[#E08A2A]/25 bg-gradient-to-br from-[#F2C14D] via-[#F5D06A] to-[#E08A2A] p-5 shadow-soft"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-5 h-16 w-16 rounded-full bg-white/40"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-5 left-6 h-12 w-12 rounded-full bg-ink/10"
              />
              <p className="relative font-display text-lg font-bold text-ink">
                {item.title}
              </p>
              <p className="relative mt-2 text-sm text-ink/75">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          {AEO.map((item) => (
            <AeoAnswer
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/signup?google=1">Get a free author page</Button>
          <Button href="/vs-books2read/" variant="ghost">
            Compare vs Books2Read
          </Button>
        </div>
      </article>
    </>
  );
}

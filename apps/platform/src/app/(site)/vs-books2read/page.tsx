import type { Metadata } from "next";
import { AeoAnswer } from "@/components/seo/AeoAnswer";
import {
  JsonLd,
  faqPageSchema,
  organizationSchema,
} from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { APP_ORIGIN, buildAppMetadata } from "@/lib/seo";
import { LAUNCH_FAQS, VS_BOOKS2READ_POINTS } from "@/lib/seo-content";

export const metadata: Metadata = buildAppMetadata({
  title: "Authors Pilot vs Books2Read | Free Author Page Alternative",
  description:
    "Comparing Authors Pilot and Books2Read (Draft2Digital): branded author page, click analytics, 100% royalties, and a universal book link without Draft2Digital lock-in.",
  path: "/vs-books2read/",
});

const AEO = [
  LAUNCH_FAQS[1],
  LAUNCH_FAQS[0],
  {
    question: "Do I need Draft2Digital to use a universal book link?",
    answer:
      "No. Authors Pilot gives you a universal book link without Draft2Digital. Add Amazon or website URLs yourself, publish a branded author page, and share one link—without joining a distributor first or giving up control of your storefronts.",
  },
  LAUNCH_FAQS[4],
] as const;

export default function VsBooks2ReadPage() {
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
          Authors Pilot vs Books2Read
        </h1>
        <p className="mt-4 text-charcoal leading-relaxed">
          Books2Read (from Draft2Digital) is strong at multi-store link menus.
          Authors Pilot is built for authors who want a branded page, click
          tracking, and 100% royalties with no commission—and a free launch
          alternative that does not require Draft2Digital first.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-ink">
          Why authors choose Authors Pilot over Books2Read
        </h2>
        <ul className="mt-6 space-y-4">
          {VS_BOOKS2READ_POINTS.map((item) => (
            <li
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC] p-5 shadow-soft"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-5 h-16 w-16 rounded-full bg-white/50"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-5 left-6 h-12 w-12 rounded-full bg-sky-700/10"
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
          <Button href="/signup?google=1">Try Authors Pilot free</Button>
          <Button href="/vs-booklinker/" variant="ghost">
            Compare vs Booklinker
          </Button>
        </div>
      </article>
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { ServicePageHero } from "@/components/services/ServicePageHero";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import {
  audiobookProductionCta,
  audiobookProductionSections,
  brandMessages,
  journeyPageHero,
  serviceRelatedLinks,
} from "@/content/site";

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#273E2B] text-white">
      <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" aria-hidden>
        <path
          d="M5 10.5 8.2 13.5 15 6.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const itemDescriptions: Record<string, string> = {
  "Audiobook Production":
    "End-to-end production that turns your finished manuscript into a polished listening experience.",
  "Professional Narration":
    "Human narration matched to your genre, tone, and audience for a natural, engaging performance.",
  "Voice Selection":
    "Choose the right voice for your story-warm, authoritative, dramatic, or conversational.",
  "Audio Editing & Mastering":
    "Clean edits, balanced levels, and mastering ready for Audible, Apple Books, and more.",
  "Audiobook Cover":
    "A square audiobook cover designed to stand out in streaming and marketplace thumbnails.",
  "Publishing Preparation":
    "File packaging and platform-ready prep so your audiobook is ready for distribution.",
};

const distributionTabs: Record<
  string,
  { title: string; description: string; points: string[] }
> = {
  Audible: {
    title: "Audible",
    description:
      "Prepare your audiobook for Audible’s global marketplace-where millions of listeners discover and binge new titles every day.",
    points: [
      "ACX-ready audio specs",
      "Retail sample chapter guidance",
      "Marketplace listing preparation",
    ],
  },
  Amazon: {
    title: "Amazon",
    description:
      "Get your audiobook ready for Amazon’s listening ecosystem so print, eBook, and audio can work together as one author brand.",
    points: [
      "Amazon audiobook listing support",
      "Metadata alignment with your book",
      "Cross-format discoverability prep",
    ],
  },
  "Apple Books": {
    title: "Apple Books",
    description:
      "Reach Apple’s audiobook audience with files and packaging prepared for Apple Books distribution standards.",
    points: [
      "Apple Books audio requirements",
      "Cover & artwork sizing guidance",
      "Catalog-ready file preparation",
    ],
  },
  Spotify: {
    title: "Spotify",
    description:
      "Help your audiobook reach Spotify listeners who already stream podcasts, music, and spoken-word content every day.",
    points: [
      "Streaming-ready audio delivery",
      "Listener-first metadata prep",
      "Modern audio catalog positioning",
    ],
  },
  "Audiobook Retailers": {
    title: "Audiobook Retailers",
    description:
      "Expand beyond the big names-prepare your title for additional audiobook retailers and specialty listening stores.",
    points: [
      "Multi-retailer file packaging",
      "Platform requirement checklists",
      "Broader marketplace reach",
    ],
  },
  "Library & Distribution Networks": {
    title: "Library & Distribution Networks",
    description:
      "Position your audiobook for library systems and wider distribution networks that help independent titles get discovered.",
    points: [
      "Library catalog preparation",
      "Distributor-ready packaging",
      "Long-tail discovery support",
    ],
  },
};

function StickyScrollSection({
  section,
}: {
  section: (typeof audiobookProductionSections)[0];
}) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start lg:py-20">
            <FadeIn>
              <span className="badge-pill">
                {section.eyebrow}
              </span>
              <h2 className="mt-5 heading-section">
                {section.heading}
              </h2>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-charcoal sm:text-lg">
                {section.body}
              </p>
              <p className="mt-8 font-sans text-sm font-bold uppercase tracking-[0.12em] text-ink">
                {section.listTitle}
              </p>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-5 pb-16 pt-4 lg:gap-8 lg:pb-28 lg:pt-20">
            {section.items.map((item, i) => (
              <FadeIn key={item} delay={i * 0.05}>
                <article className="min-h-[11rem] rounded-[1.5rem] border border-sand bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-[#273E2B]/30 hover:shadow-lift sm:min-h-[13rem] sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#273E2B] font-sans text-sm font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                        {item}
                      </h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                        {itemDescriptions[item] ??
                          "Professional support tailored to your audiobook project."}
                      </p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TabbedDistributionSection({
  section,
}: {
  section: (typeof audiobookProductionSections)[number];
}) {
  const [active, setActive] = useState(section.items[0] ?? "Audible");
  const feature = distributionTabs[active] ?? {
    title: active,
    description: "Distribution support for your audiobook release.",
    points: [] as string[],
  };

  return (
    <section className="bg-ivory py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-pill">
              {section.eyebrow}
            </span>
            <h2 className="mt-5 heading-section">
              {section.heading}
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-charcoal sm:text-lg">
              {section.body}
            </p>
            <p className="mt-8 font-sans text-sm font-bold uppercase tracking-[0.12em] text-ink">
              {section.listTitle}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-sand bg-white shadow-soft">
            <div
              role="tablist"
              aria-label="Distribution platforms"
              className="flex gap-1 overflow-x-auto border-b border-sand bg-[#F8FAF8] px-2 py-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-4"
            >
              {section.items.map((item) => {
                const isActive = active === item;
                return (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(item)}
                    className={`shrink-0 rounded-full px-3.5 py-2 font-sans text-xs font-semibold transition sm:text-sm ${
                      isActive
                        ? "bg-[#273E2B] text-white shadow-soft"
                        : "bg-transparent text-charcoal hover:bg-white hover:text-ink"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" className="px-6 py-8 sm:px-10 sm:py-10">
              <div className="mx-auto grid max-w-4xl items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                <div>
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
                    Featured platform
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-4 font-sans text-base leading-relaxed text-charcoal sm:text-lg">
                    {feature.description}
                  </p>
                </div>
                <ul className="space-y-3 rounded-2xl bg-ivory p-5 sm:p-6">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <Check />
                      <span className="font-sans text-sm text-ink sm:text-base">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function AudiobookProductionView() {
  const related = serviceRelatedLinks["audiobook-production"] ?? [];
  const stickySection = audiobookProductionSections[0];
  const distributionSection = audiobookProductionSections[1];
  const restSections = audiobookProductionSections.slice(2, 3);

  return (
    <>
      <ServicePageHero title={journeyPageHero.audiobooks.h1} />

      <StickyScrollSection section={stickySection} />

      <TabbedDistributionSection section={distributionSection} />

      {restSections.map((section, index) => (
        <section
          key={section.id}
          className={index % 2 === 0 ? "bg-cream py-14 sm:py-16" : "bg-ivory py-14 sm:py-16"}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="mx-auto max-w-3xl">
                <span className="badge-pill">
                  {section.eyebrow}
                </span>
                <p className="mt-5 heading-section">
                  {section.heading}
                </p>
                <p className="mt-4 font-sans text-base leading-relaxed text-charcoal sm:text-lg">
                  {section.body}
                </p>

                {section.pipeline && (
                  <>
                    <p className="mt-8 font-sans text-sm font-bold uppercase tracking-[0.12em] text-ink">
                      {section.listTitle}
                    </p>
                    <p className="mt-4 overflow-x-auto font-sans text-xs font-bold uppercase tracking-[0.08em] text-[#273E2B] sm:text-sm">
                      {section.pipeline}
                    </p>
                  </>
                )}

                {section.items.length > 0 && (
                  <>
                    <p className="mt-8 font-sans text-sm font-bold uppercase tracking-[0.12em] text-ink">
                      {section.listTitle}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check />
                          <span className="font-sans text-sm text-ink sm:text-base">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {"closingPrompt" in section && section.closingPrompt && (
                  <p className="mt-8 font-display text-xl font-semibold text-ink sm:text-2xl">
                    {section.closingPrompt}
                  </p>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      <section className="bg-cta-wash py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <Button href={audiobookProductionCta.href}>
              {audiobookProductionCta.label}
            </Button>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative aspect-[1600/500] w-full overflow-hidden rounded-2xl shadow-soft">
              <Image
                src="/services/audiobook-faq-banner.webp"
                alt="Audio Book - Authors Pilot audiobook services"
                fill
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover object-center"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ServiceFaqSection slug="audiobook" className="mt-0" />
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Continue the journey
              </p>
              <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                {brandMessages.short}
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-full border border-sand px-4 py-2 font-sans text-sm font-medium text-ink transition hover:border-coral hover:text-[#E08A2A]"
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}

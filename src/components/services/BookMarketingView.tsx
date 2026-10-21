"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { ServicePageHero } from "@/components/services/ServicePageHero";
import {
  bookMarketingCta,
  bookMarketingSections,
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

const brandItemDescriptions: Record<string, string> = {
  "Social Media Promotion":
    "Platform-ready posts, reels, and author branding that help the right readers find your book.",
  "Email & Launch Campaigns":
    "Pre-launch sequences, launch-week emails, and list-building so publication day is not a one-day spike.",
  "Reviews & Influencer Outreach":
    "Advance reader copies, review requests, and influencer outreach that build social proof.",
};

const contentItemMeta: Record<
  string,
  { blurb: string; span: string; tone: string; image?: string }
> = {
  "Book Promotion Posts": {
    blurb: "Launch-ready posts that spotlight your book, offer, and reader benefits.",
    span: "sm:col-span-2 sm:row-span-2",
    tone: "bg-[#273E2B] text-white",
    image: "/services/market-bento.webp",
  },
  "Reels & Short Videos": {
    blurb: "Short-form video ideas built for Instagram, TikTok, and YouTube Shorts.",
    span: "sm:col-span-1",
    tone: "bg-white text-ink",
  },
  "Quotes & Storytelling Posts": {
    blurb: "Shareable quote graphics and story snippets that grow engagement.",
    span: "sm:col-span-1",
    tone: "bg-[#A7C4AB]/40 text-ink",
  },
  "Educational & Behind-the-Scenes Content": {
    blurb: "Authority-building posts that teach, show process, and build trust.",
    span: "sm:col-span-2",
    tone: "bg-white text-ink",
  },
  "Reader Engagement Content": {
    blurb: "Polls, prompts, and community posts that turn followers into readers.",
    span: "sm:col-span-1",
    tone: "bg-[#E08A2A]/15 text-ink",
  },
};

function StickyBrandSection({
  section,
}: {
  section: (typeof bookMarketingSections)[0];
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
                        {brandItemDescriptions[item] ??
                          "Professional support tailored to your author brand."}
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

function BentoContentSection({
  section,
}: {
  section: (typeof bookMarketingSections)[number];
}) {
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

        <div className="mt-8 grid auto-rows-[minmax(8.5rem,auto)] gap-3 sm:grid-cols-3 sm:gap-4">
          {section.items.map((item, i) => {
            const meta = contentItemMeta[item] ?? {
              blurb: "Content designed to grow your author audience.",
              span: "sm:col-span-1",
              tone: "bg-white text-ink",
            };
            const isDark = meta.tone.includes("bg-[#273E2B]");
            const hasImage = Boolean(meta.image);

            return (
              <FadeIn key={item} delay={i * 0.06} className={meta.span}>
                <article
                  className={`relative flex h-full min-h-[11rem] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-sand p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:min-h-[13rem] sm:p-6 ${
                    hasImage ? "text-white" : meta.tone
                  }`}
                >
                  {hasImage && (
                    <>
                      <Image
                        src={meta.image!}
                        alt={item}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
                    </>
                  )}

                  <div className="relative z-10">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full font-sans text-xs font-bold ${
                        isDark || hasImage
                          ? "bg-white/15 text-white"
                          : "bg-[#273E2B] text-white"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`mt-4 font-display text-lg font-semibold leading-snug sm:text-xl ${
                        isDark || hasImage ? "text-white" : "text-ink"
                      }`}
                    >
                      {item}
                    </h3>
                  </div>
                  <p
                    className={`relative z-10 mt-3 font-sans text-sm leading-relaxed ${
                      isDark || hasImage ? "text-white/85" : "text-charcoal"
                    }`}
                  >
                    {meta.blurb}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const strategyTabs: Record<
  string,
  { title: string; description: string; points: string[] }
> = {
  "Content Strategy": {
    title: "Content Strategy",
    description:
      "Plan a consistent content system around your book themes, reader needs, and author goals-so every post has a purpose.",
    points: [
      "Monthly content calendar",
      "Pillar topics from your book",
      "Post formats for growth & sales",
    ],
  },
  "Platform-Specific Planning": {
    title: "Platform-Specific Planning",
    description:
      "Adapt your message for Instagram, Facebook, TikTok, LinkedIn, and more-because each platform rewards different content.",
    points: [
      "Platform-fit content formats",
      "Audience-first messaging",
      "Profile & posting cadence guidance",
    ],
  },
  "Hashtag & Keyword Strategy": {
    title: "Hashtag & Keyword Strategy",
    description:
      "Use discoverable hashtags and keywords so the right readers can find your book, brand, and author content organically.",
    points: [
      "Niche hashtag research",
      "Searchable keywords for captions",
      "Discoverability-focused tagging",
    ],
  },
  "Engagement Strategy": {
    title: "Engagement Strategy",
    description:
      "Turn attention into community with prompts, replies, and conversation systems that keep readers coming back.",
    points: [
      "Comment & DM response flow",
      "Community prompts & CTAs",
      "Follower-to-reader conversion tips",
    ],
  },
  "Book Launch Campaigns": {
    title: "Book Launch Campaigns",
    description:
      "Build launch momentum with a campaign plan that creates anticipation before release and visibility after publication.",
    points: [
      "Pre-launch teaser sequence",
      "Launch-week content plan",
      "Post-launch momentum posts",
    ],
  },
};

function TabbedStrategySection({
  section,
}: {
  section: (typeof bookMarketingSections)[number];
}) {
  const [active, setActive] = useState(section.items[0] ?? "Content Strategy");
  const feature = strategyTabs[active] ?? {
    title: active,
    description: "Strategy support for growing your author audience.",
    points: [] as string[],
  };

  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-pill">
              {section.eyebrow}
            </span>
            <p className="mt-5 heading-section">
              {section.heading}
            </p>
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
              aria-label="Audience growth strategy"
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
                    Featured strategy
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

export function BookMarketingView() {
  const related = serviceRelatedLinks["book-marketing"] ?? [];
  const stickySection = bookMarketingSections[0];
  const bentoSection = bookMarketingSections[1];
  const tabbedSection = bookMarketingSections[2];
  const closingSection = bookMarketingSections[3];

  return (
    <>
      <ServicePageHero title={journeyPageHero.promote.h1} />

      <StickyBrandSection section={stickySection} />

      <BentoContentSection section={bentoSection} />

      <TabbedStrategySection section={tabbedSection} />

      <section className="bg-ivory py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <span className="badge-pill">
                {closingSection.eyebrow}
              </span>
              <p className="mt-5 heading-section">
                {closingSection.heading}
              </p>
              <p className="mt-4 font-sans text-base leading-relaxed text-charcoal sm:text-lg">
                {closingSection.body}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cta-wash py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <Button href={bookMarketingCta.href}>{bookMarketingCta.label}</Button>
          </FadeIn>
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

"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ForgeNumbers } from "@/components/ui/ForgeNumbers";
import { BestSellerCta } from "@/components/ui/BestSellerCta";
import { GoogleReviews } from "@/components/ui/GoogleReviews";

const whoPoints = [
  "A decade designing best-selling covers across every genre",
  "Dedicated strategist + designer + editor on every project",
  "Print-ready, eBook and audiobook files under one roof",
  "A supportive publishing community behind every author",
];

const values = [
  {
    title: "Author-First, Always",
    body: "You keep 100% of your rights and royalties. Every decision we make starts with what's best for you and your book.",
  },
  {
    title: "Covers That Sell",
    body: "Design isn't decoration - it's your storefront. We obsess over the craft that wins the click and the buy.",
  },
  {
    title: "One Coordinated Team",
    body: "Strategist, designer, editor and marketer working in concert, so nothing falls through the cracks.",
  },
  {
    title: "Radical Transparency",
    body: "Clear timelines, honest pricing and no hidden fees. You always know exactly where your project stands.",
  },
  {
    title: "Craft Over Volume",
    body: "We're a boutique studio, not a mill. Every project gets senior attention and genuine care.",
  },
  {
    title: "Results You Can Measure",
    body: "Best-seller ranks, glowing reviews and royalties - we define success the same way you do.",
  },
];

const steps = [
  {
    number: "01",
    title: "Order Placement",
    body: "Tell us about your book, genre and vision. We match you with a dedicated publishing strategist within 24 hours.",
  },
  {
    number: "02",
    title: "Sparking Inspiration",
    body: "Mood boards, concept sketches and competitor analysis ignite a cover direction built to sell in your category.",
  },
  {
    number: "03",
    title: "Writing & Editing",
    body: "Our editors and designers refine every word and pixel - manuscript polished, cover concepts rendered in 3D.",
  },
  {
    number: "04",
    title: "Proofreading & Publishing",
    body: "Final proofs, print-ready and eBook files, and a guided launch across Amazon and global retailers.",
  },
];

const visionPoints = [
  "Trend-forward design that ages gracefully on the shelf",
  "Data-backed marketing that compounds month over month",
  "Global distribution to 40,000+ retail & library channels",
  "Lifetime author support - your success never expires",
];

const coverStrip = [
  "/books/book1.webp",
  "/books/book2.webp",
  "/books/book5.webp",
];

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

export function AboutView() {
  return (
    <>
      <section className="relative overflow-hidden bg-warm-wash pb-16 pt-8 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs text-charcoal">
            <Link href="/book-publishing-author-website-design-agency" className="hover:text-[#E08A2A]">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">About</span>
          </p>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <FadeIn>
              <span className="badge-pill">
                Our Story
              </span>
              <h1 className="mt-5 heading-hero sm:text-[3.2rem] lg:text-[3.5rem]">
                About AuthorsPilot - Your{" "}
                <span className="text-[#E08A2A]">Publishing Partner</span>
              </h1>
              <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-charcoal sm:text-lg">
                Authors Pilot began with a simple belief: every author deserves a
                publishing experience worthy of the story they carry. Ten years
                and 500+ books later, that belief still leads everything we do.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <Button href="/contact-author-website-design-agency">Work With Us</Button>
                <Button href="#who-we-are" variant="ghost">
                  Learn More →
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-charcoal">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex text-[#E08A2A]" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                        <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
                      </svg>
                    ))}
                  </span>
                  4.9/5 average rating
                </span>
                <span>100% rights stay yours</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <QuoteForm />
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="who-we-are" className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <FadeIn>
            <div className="relative">
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src="/about-banner-author.webp"
                  alt="Authors Pilot - author at a book signing"
                  fill
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="image-ken-burns object-cover object-center"
                />
              </div>
              <div className="mt-4 flex justify-center gap-3">
                {coverStrip.map((src) => (
                  <div
                    key={src}
                    className="relative h-24 w-16 overflow-hidden rounded-md shadow-book ring-1 ring-sand sm:h-28 sm:w-[4.5rem]"
                  >
                    <Image src={src} alt="Authors Pilot published book cover" fill sizes="72px" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <span className="badge-pill">
              Who We Are
            </span>
            <h2 className="mt-4 heading-section">Our Story</h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              What started as a two-person cover-design studio has grown into a
              full-service publishing house, yet we&apos;ve kept the boutique
              soul. We still treat every manuscript like it&apos;s the only one
              that matters, because to its author, it is. Our designers, editors
              and marketers have helped first-time writers become category
              best-sellers and seasoned authors reinvent their brands.
            </p>
            <ul className="mt-6 space-y-3">
              {whoPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check />
                  <span className="font-sans text-sm text-ink">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact-author-website-design-agency">Get In Touch</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <ForgeNumbers />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">
                What We Stand For
              </span>
              <h2 className="mt-4 heading-section">Our Mission</h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-charcoal sm:text-base">
                Six principles guide every cover we design and every book we publish.
              </p>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.04}>
                <article className="h-full rounded-2xl border border-sand bg-white p-6 shadow-soft">
                  <span className="font-display text-2xl font-semibold text-[#E08A2A]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                    {value.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-wash py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">
                How We Work
              </span>
              <h2 className="mt-4 heading-section">Why We Work With Authors</h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-charcoal sm:text-base">
                A proven four-step process that keeps you informed, in control
                and on schedule.
              </p>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.05}>
                <article className="h-full rounded-2xl border border-sand bg-white p-6">
                  <p className="font-display text-3xl font-semibold text-[#E08A2A]">
                    {step.number}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                    {step.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <FadeIn>
            <span className="badge-pill">
              Our Vision
            </span>
            <h2 className="mt-4 heading-section">Meet the Team</h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              We believe independent authors will define the next era of
              publishing, and we&apos;re building the studio to power them. From
              trend-forward design to data-driven marketing and truly global
              distribution, we invest in the tools and talent that keep our
              authors ahead of the curve.
            </p>
            <ul className="mt-6 space-y-3">
              {visionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check />
                  <span className="font-sans text-sm text-ink">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact-author-website-design-agency">Join Our Community</Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="grid grid-cols-3 gap-3">
              {["/books/book3.webp", "/books/book6.webp", "/books/book8.webp"].map(
                (src) => (
                  <div
                    key={src}
                    className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-book ring-1 ring-sand"
                  >
                    <Image
                      src={src}
                      alt="Book cover designed by Authors Pilot"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                ),
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-warm-wash py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">
                Author Love
              </span>
              <p className="mt-4 heading-section">
                Authors Who Trust{" "}
                <span className="text-[#E08A2A]">Authors Pilot</span>
              </p>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-charcoal sm:text-base">
                Don&apos;t take our word for it - here&apos;s what authors say
                after working with Authors Pilot.
              </p>
            </div>
          </FadeIn>
          <GoogleReviews />
        </div>
      </section>

      <BestSellerCta />
    </>
  );
}

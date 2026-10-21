"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ForgeNumbers } from "@/components/ui/ForgeNumbers";
import { BestSellerCta } from "@/components/ui/BestSellerCta";
import { GoogleReviews } from "@/components/ui/GoogleReviews";
import { ServicePageHero } from "@/components/services/ServicePageHero";
import {
  journeyPageHero,
  services,
} from "@/content/site";

const categories = [
  {
    heading: "Book Writing & Ghostwriting",
    intro: "From idea and outline to a finished manuscript in your voice.",
    items: [
      {
        tag: "Ghostwriting + Publishing",
        title: "eBook Writing & Publishing",
        blurb:
          "Have an idea but not the time to write it? We turn your concept into a polished eBook, then prepare it for publication.",
        href: "/book-writing-services-for-authors",
      },
      {
        tag: "Your Name on the Cover",
        title: "Ghostwriting",
        blurb:
          "A professional writer drafts the book around your stories, expertise, and voice - confidential, and fully yours.",
        href: "/ghostwriting-services-for-authors",
      },
    ],
  },
  {
    heading: "Editing & Formatting",
    intro: "Polish the words and the page so readers stay with you.",
    items: [
      {
        tag: "Flawless Every Page",
        title: "Book Editing & Proofreading",
        blurb:
          "Story, line and proof editing so nothing breaks a reader's trust - your voice stays intact.",
        href: "/professional-book-editing-services",
        id: "book-editing",
      },
      {
        tag: "Print & eBook Ready",
        title: "Book Formatting",
        blurb:
          "Typesetting and eBook conversion so your book looks polished in print and on every e-reader.",
        href: "/book-formatting-services-for-authors",
        id: "book-formatting",
      },
    ],
  },
  {
    heading: "Cover Design",
    intro: "Our flagship craft - covers and art that sell.",
    items: [
      {
        tag: "Flagship Service",
        title: "Book Cover Design",
        blurb:
          "Your cover is the single most important marketing asset your book will ever have. We engineer cinematic, genre-perfect covers that win the click.",
        href: "/book-cover-design-services",
        id: "book-cover-design",
        flagship: true,
      },
      {
        tag: "Flagship Service",
        title: "eBook Cover Designing",
        blurb:
          "On Kindle, Apple Books and Kobo, your cover lives as a tiny thumbnail. We design digital-first covers that still pop at postage-stamp size.",
        href: "/book-cover-design-services",
        flagship: true,
      },
      {
        tag: "Custom Artwork",
        title: "Book Illustration",
        blurb:
          "From character design to full interior spreads, original artwork that gives your book a signature look readers remember.",
        href: "/book-cover-design-services",
      },
    ],
  },
  {
    heading: "Publishing & Distribution",
    intro: "From manuscript to the marketplaces readers already shop.",
    items: [
      {
        tag: "End-to-End Publishing",
        title: "Book Publishing",
        blurb:
          "Every technical, creative and logistical step between your finished manuscript and a book readers can buy.",
        href: "/book-publishing-services-for-authors",
      },
      {
        tag: "Keep 100% Control",
        title: "Self Publishing",
        blurb:
          "The independence of self-publishing without the overwhelm. You keep every right and royalty; we handle the craft.",
        href: "/self-publishing-services-for-authors",
      },
      {
        tag: "Worldwide Reach",
        title: "Global Publishing",
        blurb:
          "Reach readers far beyond your home market with distribution across international retailers and libraries.",
        href: "/amazon-kdp-publishing-services",
      },
      {
        tag: "For Young Readers",
        title: "Children Book Publishing",
        blurb:
          "Picture books and middle-grade stories with warmth, color and craft - illustration, layout and publishing under one roof.",
        href: "/book-publishing-services-for-authors",
      },
    ],
  },
  {
    heading: "Marketing",
    intro: "Help the right readers find the book after it is live.",
    items: [
      {
        tag: "Launch & Visibility",
        title: "Book Marketing",
        blurb:
          "Launch plans, social content, and promotion that help readers discover your book after publication day.",
        href: "/book-marketing-services-for-authors",
      },
      {
        tag: "Your Digital Home",
        title: "Author Website Development",
        blurb:
          "A fast author website that builds your brand, grows your email list and sells your books 24/7.",
        href: "/author-website-design-agency-usa",
      },
      {
        tag: "Narration to Publishing",
        title: "Audiobook Production",
        blurb:
          "Professional narration, studio mastering and distribution - audiobooks are the fastest-growing format in publishing.",
        href: "/audiobook-production-services-for-authors",
      },
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Creative Brief",
    body: "We learn your story, audience and comp titles, then lock a winning visual and publishing direction.",
  },
  {
    number: "02",
    title: "Concepts",
    body: "Distinct, market-ready directions - covers, structure or strategy - so you can choose with confidence.",
  },
  {
    number: "03",
    title: "Revisions",
    body: "Unlimited tweaks on your chosen route: typography, color, copy, mood - until it feels like yours.",
  },
  {
    number: "04",
    title: "Final Files",
    body: "Print-ready PDF, eBook files, mockups and launch assets delivered, with a clear next step to publish.",
  },
];

export function ServicesView() {
  return (
    <>
      <ServicePageHero title={journeyPageHero.prepare.h1} />

      <section className="relative overflow-hidden bg-warm-wash py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <FadeIn className="mx-auto w-full max-w-xl text-center lg:max-w-none">
              <p className="font-sans text-base leading-relaxed text-charcoal sm:text-lg">
                {services.hero.description} From scroll-stopping cover design to
                global publishing and best-seller marketing - one coordinated
                team takes authors from idea to icon.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact-author-website-design-agency">Talk To An Expert</Button>
                <Button href="#browse" variant="ghost">
                  Learn More →
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-charcoal">
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

              <div className="image-float-xy relative mx-auto mt-8 aspect-[16/9] w-full max-w-lg overflow-hidden rounded-soft shadow-soft">
                <Image
                  src="/services/hero-books.webp"
                  alt="collection-of-books-authors-pilot-services"
                  fill
                  sizes="(max-width: 1024px) 100vw, 512px"
                  className="image-ken-burns object-cover object-center"
                  priority
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.08} className="mx-auto w-full max-w-md lg:max-w-none">
              <QuoteForm />
            </FadeIn>
          </div>
        </div>
      </section>

      <BestSellerCta />

      <section id="browse" className="scroll-mt-24 bg-ivory py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">
                Browse By Category
              </span>
              <h2 className="mt-4 heading-section">
                Full-Service Publishing Support
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-charcoal sm:text-base">
                Cover design leads everything we do, but every craft your book
                needs lives here - coordinated by a single dedicated team.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 space-y-12">
            {categories.map((category) => (
              <div key={category.heading}>
                <FadeIn>
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {category.heading}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-charcoal">
                    {category.intro}
                  </p>
                </FadeIn>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item, i) => (
                    <FadeIn key={item.title} delay={i * 0.04}>
                      <Link
                        href={item.href}
                        id={item.id}
                        className="group flex h-full scroll-mt-24 flex-col rounded-2xl border border-sand bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-[#273E2B]/35 hover:shadow-lift"
                      >
                        <p className="flex flex-wrap items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#E08A2A]">
                          {item.tag}
                          {"flagship" in item && item.flagship && (
                            <span className="rounded-full bg-[#273E2B] px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-white">
                              Flagship
                            </span>
                          )}
                        </p>
                        <h4 className="mt-2 font-display text-xl font-semibold text-ink group-hover:text-[#E08A2A]">
                          {item.title}
                        </h4>
                        <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-charcoal">
                          {item.blurb}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-semibold text-[#E08A2A]">
                          Explore
                          <span aria-hidden className="transition group-hover:translate-x-0.5">
                            →
                          </span>
                        </span>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">
                How We Work
              </span>
              <h2 className="mt-4 heading-section">
                Why Choose Our Agency
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-charcoal sm:text-base">
                No matter which service you choose, you get the same
                transparent, collaborative path.
              </p>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-sand bg-white p-6 shadow-soft">
                  <p className="font-display text-2xl font-semibold text-[#E08A2A]">
                    {step.number}
                  </p>
                  <p className="mt-3 font-display text-xl font-semibold text-ink">
                    {step.title}
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ForgeNumbers />

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

      <section className="bg-cta-wash py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="heading-section text-white sm:text-4xl">
            Not Sure Which Service You{" "}
            <span className="text-[#E08A2A]">Need?</span>
          </p>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/75 sm:text-base">
            Book a free consultation and we&apos;ll map the perfect path for
            your book - no pressure, no jargon.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
            <Button href="/contact-author-website-design-agency">Book Free Consultation</Button>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

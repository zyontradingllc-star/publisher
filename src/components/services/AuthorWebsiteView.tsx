"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { HeroBookFan, WEBSITE_MOCKUPS } from "@/components/ui/HeroBookFan";
import { seoPages } from "@/content/seo-pages";
import { serviceFaqs } from "@/content/service-faqs";

const features = [
  {
    title: "Showcase Your Books",
    body: "Display your book covers, descriptions, excerpts, reviews, and purchase links.",
    icon: "books" as const,
  },
  {
    title: "Tell Your Story",
    body: "Create a professional author bio and share your journey with readers.",
    icon: "pen" as const,
  },
  {
    title: "Build Credibility",
    body: "Showcase reviews, testimonials, media features, and achievements.",
    icon: "star" as const,
  },
  {
    title: "Grow Your Audience",
    body: "Give readers an easy way to connect with you and join your email list.",
    icon: "mail" as const,
  },
  {
    title: "Promote Your Books",
    body: "Connect visitors directly to Amazon, bookstores, publishers, and other platforms.",
    icon: "link" as const,
  },
  {
    title: "Built for Every Screen",
    body: "A professional, mobile-friendly experience across phones, tablets, and desktops.",
    icon: "device" as const,
  },
];

const genres = [
  "Fiction",
  "Non-Fiction",
  "Children's Books",
  "Poetry",
  "Memoir",
  "Romance",
  "Mystery",
  "Business",
];

const steps = [
  {
    icon: "book" as const,
    title: "Share Your Vision",
    body: "Share your author information, books, and goals.",
  },
  {
    icon: "layout" as const,
    title: "We Build Your Website",
    body: "We create a professional website around your brand.",
  },
  {
    icon: "review" as const,
    title: "Review & Request Changes",
    body: "See your website before you approve it.",
  },
  {
    icon: "launch" as const,
    title: "Launch",
    body: "Once you're happy, your website goes live.",
  },
];

const related = [
  { href: "/book-marketing-services-for-authors", label: "Book Marketing" },
  { href: "/book-cover-design-services", label: "Cover Design" },
  { href: "/book-publishing-services-for-authors", label: "Publishing" },
  { href: "/contact-author-website-design-agency", label: "Contact" },
];

const whyPoints = [
  "Readers look you up after they finish a book - give them a professional place to land.",
  "Your books, bio, and buy links live together so people can discover and purchase your work.",
  "Reviews, media, and achievements sit on a site you control, not a retailer page you do not.",
  "A clear email signup and contact path helps you grow an audience beyond one launch.",
];


const pricing = [
  {
    title: "Author Junior",
    body: "A focused website for a first book or a clean author debut.",
    priceLabel: "New Author",
    price: "$150",
    items: [
      "Homepage built around your book",
      "Author bio and book page",
      "Retailer and bookstore links",
      "Contact form",
      "Payment Gateway Integration",
    ],
  },
  {
    title: "Author Senior",
    body: "A fuller home for writers who want credibility and list growth.",
    featured: true,
    priceLabel: "Existing Author",
    price: "$299",
    items: [
      "Custom design around your genre",
      "Multiple book or series pages",
      "Reviews, press, and testimonials",
      "Email list signup",
      "SEO foundations for search",
      "Payment Gateway Integration",
    ],
  },
  {
    title: "Author Executive",
    body: "A tailored build for series, imprints, or a growing catalog.",
    priceLabel: "Author as a Business",
    price: "$399",
    items: [
      "Extra pages as your career grows",
      "Custom layout and brand details",
      "SEO AEO and GEO with Backlinks",
      "Review the site before you pay",
      "Payment Gateway Integration",
    ],
  },
];

function StepIcon({ icon }: { icon: (typeof steps)[number]["icon"] }) {
  const className = "h-5 w-5";
  if (icon === "book") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path strokeLinecap="round" d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5Z" />
        <path strokeLinecap="round" d="M5 5.5h12" />
      </svg>
    );
  }
  if (icon === "layout") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
        <path strokeLinecap="round" d="M3.5 9h17M9 9v10.5" />
      </svg>
    );
  }
  if (icon === "review") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.2 2.3 2.3 4.7-5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 19.5 19 12 5 4.5v6.2L13 12 5 13.3z" />
    </svg>
  );
}

function FeatureIcon({ icon }: { icon: (typeof features)[number]["icon"] }) {
  const className = "h-5 w-5";
  if (icon === "books") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path strokeLinecap="round" d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5Z" />
        <path strokeLinecap="round" d="M5 5.5h12" />
      </svg>
    );
  }
  if (icon === "pen") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 19 3.2-.8L19 7.4a1.8 1.8 0 0 0 0-2.5l-.9-.9a1.8 1.8 0 0 0-2.5 0L5.8 14.8 5 19Z" />
      </svg>
    );
  }
  if (icon === "star") {
    return (
      <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden>
        <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
      </svg>
    );
  }
  if (icon === "mail") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="M4 7.5 12 13l8-5.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "link") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path strokeLinecap="round" d="M9 12h6M8 8H7a4 4 0 0 0 0 8h1M16 8h1a4 4 0 0 1 0 8h-1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="7" y="3.5" width="10" height="17" rx="2" />
      <path d="M10 18.5h4" strokeLinecap="round" />
    </svg>
  );
}

export function AuthorWebsiteView() {
  const page = seoPages["author-website-design-usa"];
  const faqs = serviceFaqs["author-website-design-usa"];

  return (
    <>
      <Breadcrumbs items={page.breadcrumbs} />

      <section className="relative overflow-hidden bg-warm-wash">
        <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-8 px-4 pb-14 pt-6 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-8 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-pill"
            >
              Website for Authors
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="mt-3 heading-hero"
            >
              <span className="block">Author Branding</span>
              <span className="block">Websites Built to</span>
              <span className="block text-[#E08A2A]">Sell Your Books</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-charcoal sm:text-lg"
            >
              Build a professional author website designed around{" "}
              <strong className="font-semibold text-ink">
                your books, your story, and your audience.
              </strong>{" "}
              Showcase your books, build your author brand, connect with
              readers, and make it easier for people to discover your work.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-8"
            >
              <Button href="/contact-author-website-design-agency">Book Website Consultation</Button>
              <p className="mt-4 font-sans text-sm text-charcoal">
                Review your website before you pay.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative mx-auto mt-0 w-full max-w-lg sm:max-w-xl lg:max-w-none"
          >
            <HeroBookFan
              covers={WEBSITE_MOCKUPS}
              imageAlt="Business website mockup"
            />
            <h2 className="-mt-2 text-center font-display text-xl font-bold text-ink sm:-mt-4 sm:text-2xl">
              Business Website Development
            </h2>
          </motion.div>
        </div>
      </section>

      <LogoMarquee />

      <section className="relative overflow-hidden bg-cta-wash py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-coral/20 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <FadeIn>
            <span className="badge-pill">Custom Author Website Design</span>
            <h2 className="mt-5 heading-section text-balance text-white">
              Why Authors Need a{" "}
              <span className="text-[#F2C14D]">Professional Website</span>
            </h2>
            <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/70 sm:text-base">
              We design it around your{" "}
              <strong className="font-semibold text-white">
                books, genre, personality, and audience
              </strong>{" "}
              - whether you&apos;re a first-time author or an established
              writer.
            </p>
            <ul className="mt-6 space-y-3">
              {whyPoints.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 font-sans text-sm leading-relaxed text-white/80 sm:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2C14D]" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-white/85"
                >
                  {genre}
                </span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-white/10">
              <Image
                src="/author-website-branding.webp"
                alt="Author branding services for a professional writer website"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">Author Website Features</span>
              <h2 className="mt-4 heading-section text-balance">
                What&apos;s Included in Your Author Website
              </h2>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.04}>
                <article className="h-full rounded-2xl border border-sand bg-white p-6 shadow-soft">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#273E2B] text-white">
                    <FeatureIcon icon={item.icon} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold not-italic text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                    {item.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">Simple Process</span>
              <h2 className="mt-4 heading-section text-balance">
                Our Website Design Process
              </h2>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.05}>
                <article className="h-full rounded-2xl border border-sand bg-white p-6 shadow-soft">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#273E2B] text-white">
                    <StepIcon icon={step.icon} />
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold not-italic text-ink">
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">Transparent Options</span>
              <h2 className="mt-4 heading-section text-balance">
                Pricing &amp; Packages
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-charcoal sm:text-base">
                Author websites start from $250 to $1,500, depending on pages
                and features. You review the site before you pay.
              </p>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {pricing.map((plan, i) => (
              <FadeIn key={plan.title} delay={i * 0.06} className="h-full">
                <article
                  className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-soft sm:p-7 ${
                    plan.featured
                      ? "border-[#A7C4AB] bg-gradient-to-b from-[#1a2e1d] via-[#273E2B] to-[#355a3c] text-linen ring-2 ring-[#A7C4AB]/40 shadow-lift"
                      : "border-sand bg-white"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-ink shadow-cta">
                      Most Authors
                    </span>
                  )}
                  <h3
                    className={`text-center font-display text-xl font-bold not-italic ${
                      plan.featured ? "text-white" : "text-ink"
                    }`}
                  >
                    {plan.title}
                  </h3>
                  <p
                    className={`mt-2 text-center font-sans text-sm leading-relaxed ${
                      plan.featured ? "text-white/70" : "text-charcoal"
                    }`}
                  >
                    {plan.body}
                  </p>
                  <p
                    className={`mt-4 text-center font-sans text-sm font-bold ${
                      plan.featured ? "text-[#F2C14D]" : "text-[#273E2B]"
                    }`}
                  >
                    {plan.priceLabel}{" "}
                    <span
                      className={`font-display text-2xl font-bold tracking-tight ${
                        plan.featured ? "text-white" : "text-ink"
                      }`}
                    >
                      {plan.price}
                    </span>
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.items.map((item) => (
                      <li
                        key={item}
                        className={`flex items-start gap-2.5 font-sans text-sm ${
                          plan.featured ? "text-white/80" : "text-charcoal"
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            plan.featured
                              ? "bg-[#A7C4AB] text-ink"
                              : "bg-[#273E2B] text-white"
                          }`}
                        >
                          <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
                            <path d="M7.8 13.2 4.6 10l-1.2 1.2 4.4 4.4L16.8 6.6 15.6 5.4z" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Button href="/contact-author-website-design-agency">Signup</Button>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <span className="badge-pill">Questions &amp; Answers</span>
              <h2 className="mt-5 heading-section text-balance">
                Frequently Asked Questions About{" "}
                <span className="text-[#E08A2A]">Author Websites</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="mt-10">
            <Accordion items={faqs} variant="gold" />
          </FadeIn>
          <FadeIn delay={0.12} className="mt-12 text-center">
            <p className="font-display text-xl font-bold text-ink sm:text-2xl">
              Ready to Build Your Author Brand?
            </p>
            <p className="mx-auto mt-3 max-w-xl text-charcoal">
              Get a professional author website designed around your books,
              your readers, and your long-term publishing goals.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/contact-author-website-design-agency">
                Get Your Author Website
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <section className="relative overflow-hidden rounded-soft border border-sand bg-cta-wash px-6 py-12 text-linen sm:px-10 sm:py-16">
              <div className="relative mx-auto max-w-2xl text-center">
                <p className="heading-section text-balance not-italic text-linen">
                  Business Website Design &amp; Development Services
                </p>
                <div className="mt-5 space-y-3 font-sans text-sm leading-relaxed text-white/70 sm:text-base">
                  <p>
                    We design and develop professional websites for businesses of
                    every kind - from authors to e-commerce brands. Designed to
                    turn visitors into customers, not just look good.
                  </p>
                  <p>
                    Every website is custom-built, mobile-responsive, and
                    SEO-optimized from the ground up.
                  </p>
                  <p>
                    From concept to launch to ongoing support - we handle it
                    all, so you can focus on running your business.
                  </p>
                </div>
                <div className="mt-8 flex justify-center">
                  <Button href="/contact-author-website-design-agency">New Business Website</Button>
                </div>
              </div>
            </section>
          </FadeIn>
        </div>
      </section>

      <section className="bg-ivory py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="heading-section-sm text-forest">
              Explore more services
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-full border border-sand bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-coral hover:text-[#E08A2A]"
                  >
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

    </>
  );
}

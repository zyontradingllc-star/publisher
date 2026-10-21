"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { RoyalPackages } from "@/components/ui/RoyalPackages";
import { PackageCompareTable } from "@/components/packages/PackageCompareTable";
import { Accordion } from "@/components/ui/Accordion";
import { BestSellerCta } from "@/components/ui/BestSellerCta";
import { GoogleReviews } from "@/components/ui/GoogleReviews";
import { packageFaq } from "@/content/packages";

export function PackagesView() {
  return (
    <>
      <section className="relative overflow-hidden bg-warm-wash pb-16 pt-8 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs text-charcoal">
            <Link href="/book-publishing-author-website-design-agency" className="hover:text-[#E08A2A]">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Packages</span>
          </p>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <FadeIn>
              <span className="badge-pill">
                Royal Packages
              </span>
              <h1 className="mt-5 heading-hero sm:text-[3.2rem] lg:text-[3.5rem]">
                Author Publishing &amp;{" "}
                <span className="text-[#E08A2A]">Website Pricing</span>
              </h1>
              <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-charcoal sm:text-lg">
                Simple, transparent, one-time pricing with full rights included.
                Start with a stunning cover or go all the way to a marketed
                best-seller - your royalties stay 100% yours.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <Button href="/contact-author-website-design-agency">Get A Custom Quote</Button>
                <Button href="#compare" variant="ghost">
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

      <BestSellerCta />

      <RoyalPackages compareHref="#compare" />

      <PackageCompareTable />

      <section className="bg-warm-wash py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">
                Author Results
              </span>
              <p className="mt-4 heading-section">
                Authors Who Invested In{" "}
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

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <span className="badge-pill">
                Pricing Questions
              </span>
              <h2 className="mt-5 heading-section">
                Frequently Asked Pricing Questions
              </h2>
              <p className="mx-auto mt-3 max-w-lg font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                Everything you need to know before choosing your package.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="mt-10">
            <Accordion items={[...packageFaq]} variant="gold" />
          </FadeIn>
        </div>
      </section>

      <section className="bg-cta-wash py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="heading-section text-white sm:text-4xl">
            Ready To Choose Your{" "}
            <span className="text-[#E08A2A]">Package?</span>
          </p>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/75 sm:text-base">
            Book a free consultation and we&apos;ll recommend the perfect tier,
            plus claim your new-author discount.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
            <Button href="/contact-author-website-design-agency">Book Free Consultation</Button>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/Section";
import { ServicePageHero } from "@/components/services/ServicePageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import { seoPages } from "@/content/seo-pages";
import { bookCoverDesignSections } from "@/content/service-sections/book-cover-design";
import { services } from "@/content/site";

const page = seoPages["book-cover-design"];
const content = bookCoverDesignSections;
const image = services.images["book-cover-design"];

export function BookCoverDesignView() {
  return (
    <>
      <Breadcrumbs items={page.breadcrumbs} />
      <ServicePageHero title={content.h1} />

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <FadeIn className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-soft bg-ivory shadow-soft">
            <Image
              src={image}
              alt="Professional book cover design services"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div>
            <h2 className="heading-section-sm text-forest">
              {content.intro.heading}
            </h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-charcoal">
              {content.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/contact-author-website-design-agency">Design My Book Cover</Button>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-20">
          <h2 className="heading-section text-center text-forest">
            {content.services.heading}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.items.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-sand bg-white p-6 shadow-soft"
              >
                <h3 className="font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-20 rounded-2xl border border-sand bg-ivory p-8 sm:p-10">
          <h2 className="heading-section-sm text-forest">
            {content.whyUs.heading}
          </h2>
          <div className="mt-4 space-y-3 text-base leading-relaxed text-charcoal">
            {content.whyUs.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {content.whyUs.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm text-charcoal sm:text-base"
              >
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral"
                  aria-hidden
                />
                {point}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="mt-20">
          <h2 className="heading-section text-center text-forest">
            {content.process.heading}
          </h2>
          <ol className="mx-auto mt-10 grid max-w-3xl gap-4">
            {content.process.steps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-2xl border border-sand bg-white px-5 py-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#A7C4AB]/40 font-sans text-sm font-bold text-ink">
                  {index + 1}
                </span>
                <p className="pt-1 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </FadeIn>

        <ServiceFaqSection slug="book-cover-design" />

        <div className="mt-20">
          <CtaBanner
            title="Ready for a cover that represents your story?"
            description="Book a free consultation and get cover concepts built for your genre and publishing goals."
            cta={{ label: "Get My Cover Designed", href: "/contact-author-website-design-agency" }}
          />
        </div>
      </div>
    </>
  );
}

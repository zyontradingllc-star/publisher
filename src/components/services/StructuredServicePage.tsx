import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/Section";
import { ServicePageHero } from "@/components/services/ServicePageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import { serviceAiContent } from "@/content/service-ai-content";
import { seoPages } from "@/content/seo-pages";
import { services, brandMessages } from "@/content/site";
import type { ServiceSeoSlug } from "@/lib/service-page-seo";

type Props = {
  slug: ServiceSeoSlug;
};

export function StructuredServicePage({ slug }: Props) {
  const page = seoPages[slug];
  const content = serviceAiContent[slug];
  const service = services.items.find((item) => item.slug === page.serviceSlug);

  if (!service || !content) notFound();

  const image = slug === "audiobook" ? null : services.images[service.slug];

  return (
    <>
      <Breadcrumbs items={page.breadcrumbs} />

      {slug === "audiobook" ? (
        <FadeIn className="bg-service-hero-wash pb-8 pt-6 sm:pb-10 sm:pt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[1600/500] w-full overflow-hidden rounded-2xl shadow-soft">
              <Image
                src="/services/audiobook-books-banner.webp"
                alt="Audiobooks by Authors Pilot"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover object-center"
              />
            </div>
            <h1 className="mt-8 heading-hero text-center">{content.h1}</h1>
          </div>
        </FadeIn>
      ) : (
        <ServicePageHero title={content.h1} />
      )}

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <FadeIn className="mt-10">
          <div className="rounded-2xl border border-[#A7C4AB]/50 bg-[#F8FAF8] p-6 sm:p-8">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
              Short Answer
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink sm:text-lg">
              {content.shortAnswer}
            </p>
          </div>
        </FadeIn>

        <FadeIn
          className={
            image
              ? "mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14"
              : "mt-12"
          }
        >
          <div
            className={
              image
                ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-1"
                : "grid gap-8 sm:grid-cols-2"
            }
          >
            <section>
              <h2 className="heading-section-sm text-forest">
                {content.whatWeOffer.heading}
              </h2>
              <ul className="mt-4 space-y-3">
                {content.whatWeOffer.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-charcoal sm:text-base"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral"
                      aria-hidden
                    />
                    {slug === "book-editing" ? (
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {item}
                      </h3>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              {slug === "book-formatting" ? (
                <h2 className="heading-section-sm text-forest">
                  {content.whoWeHelp.heading}
                </h2>
              ) : (
                <p className="heading-section-sm text-forest">
                  {content.whoWeHelp.heading}
                </p>
              )}
              <ul className="mt-4 space-y-3">
                {content.whoWeHelp.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-charcoal sm:text-base"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {image ? (
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-soft bg-ivory shadow-soft">
              <Image
                src={image}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
            </div>
          ) : null}
        </FadeIn>

        <FadeIn className="mt-16">
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

        <FadeIn className="mt-16 rounded-2xl border border-sand bg-ivory p-8 sm:p-10">
          {slug === "audiobook" || slug === "book-editing" ? (
            <p className="heading-section-sm text-forest">
              {content.whyAuthorsPilot.heading}
            </p>
          ) : (
            <h2 className="heading-section-sm text-forest">
              {content.whyAuthorsPilot.heading}
            </h2>
          )}
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {content.whyAuthorsPilot.proof.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm text-charcoal sm:text-base"
              >
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#273E2B]"
                  aria-hidden
                />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/contact-author-website-design-agency">{service.cta.label}</Button>
          </div>
        </FadeIn>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <ServiceFaqSection slug={slug} />

        {page.relatedLinks.length > 0 && (
          <FadeIn className="mt-16">
            <p className="font-display text-2xl font-semibold text-forest">
              Continue the journey
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal sm:text-base">
              {brandMessages.short}
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {page.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-full border border-sand px-4 py-2 text-sm font-medium text-ink transition hover:border-coral hover:text-[#E08A2A]"
                  >
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>
        )}

        <div className="mt-20">
          <CtaBanner
            title="You bring the idea."
            description="We'll help shape what comes next."
            cta={{ label: "Pilot My Story", href: "/contact-author-website-design-agency" }}
          />
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  services,
  servicePages,
  serviceRelatedLinks,
  brandMessages,
} from "@/content/site";
import { canonicalUrl } from "@/lib/seo";
import { FadeIn } from "@/components/motion/FadeIn";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/Section";
import { AuthorConsultation } from "@/components/ui/AuthorConsultation";
import { AmazonSpotlight } from "@/components/ui/AmazonSpotlight";
import { ServicePageHero } from "@/components/services/ServicePageHero";
import { journeyPageHero } from "@/content/site";

type ServicePageKey = keyof typeof servicePages;

const journeyHeroByPageKey: Partial<
  Record<ServicePageKey, (typeof journeyPageHero)[keyof typeof journeyPageHero]>
> = {
  "ebook-writing": journeyPageHero.write,
  "book-publishing": journeyPageHero.publish,
};

type Props = {
  pageKey: ServicePageKey;
};

export function servicePageMetadata(pageKey: ServicePageKey): Metadata {
  const page = servicePages[pageKey];
  const path = page.path ?? `/${pageKey}`;
  const url = canonicalUrl(path);
  const metadata: Metadata = {
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    authors: [{ name: "Authors Pilot" }],
    robots: { index: true, follow: true },
    alternates: { canonical: url },
  };

  if ("ogDescription" in page && page.ogDescription) {
    metadata.openGraph = {
      title: page.seoTitle,
      description: page.ogDescription,
      type: "website",
      url,
      siteName: "Authors Pilot",
    };
  }

  return metadata;
}

export function ServiceLanding({ pageKey }: Props) {
  const page = servicePages[pageKey];
  const service = services.items.find((s) => s.slug === page.serviceSlug);
  if (!service) notFound();

  const related = serviceRelatedLinks[pageKey] ?? [];

  const hero = journeyHeroByPageKey[pageKey] ?? { h1: page.h1 };

  return (
    <>
      <ServicePageHero title={hero.h1} />

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <FadeIn className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
        {services.images[service.slug] ? (
          <div
            className={`relative w-full overflow-hidden rounded-soft ${
              service.slug === "book-publishing" ? "" : "shadow-soft"
            } ${
              service.slug === "audiobook-production" ||
              service.slug === "pdf-to-audio"
                ? "aspect-square bg-[#6b0f14]"
                : service.slug === "book-publishing"
                  ? "aspect-[4/5] bg-transparent shadow-none sm:aspect-square"
                  : "aspect-[5/4] bg-ivory"
            }`}
          >
            {service.slug === "book-publishing" ? (
              <div className="image-float-xy absolute inset-5 sm:inset-6">
                <div className="image-ken-burns relative h-full w-full">
                  <Image
                    src={services.images[service.slug]}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain object-center opacity-90"
                    priority
                  />
                </div>
              </div>
            ) : (
              <Image
                src={services.images[service.slug]}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={
                  service.slug === "audiobook-production" ||
                  service.slug === "pdf-to-audio"
                    ? "object-contain object-center"
                    : "object-cover object-center"
                }
                priority
              />
            )}
          </div>
        ) : (
          <PlaceholderImage
            alt={service.imageAlt}
            className="aspect-[5/4] w-full rounded-soft shadow-soft"
          />
        )}
        <div>
          <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
            {pageKey === "book-publishing"
              ? "Our Publishing Process"
              : service.heading}
          </h2>
          <div className="mt-4 space-y-3 text-base leading-relaxed text-charcoal">
            {service.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {service.details.length > 0 && (
            <>
              <h3 className="mt-8 font-display text-xl font-semibold text-ink">
                {service.listTitle}
              </h3>
              <ul className="mt-4 space-y-3">
                {service.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex gap-3 text-sm text-charcoal sm:text-base"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral"
                      aria-hidden
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-8">
            <Button href={service.cta.href}>{service.cta.label}</Button>
          </div>
        </div>
      </FadeIn>

      </div>

      {pageKey === "book-publishing" && (
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <FadeIn className="grid gap-10 lg:grid-cols-2">
            <section>
              <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
                Traditional vs Self-Publishing Support
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal">
                Traditional publishing means pitching, contracts, and a house
                timeline. Self-publishing means you keep the rights, royalties,
                and launch date. Authors Pilot supports both paths — preparing
                files, metadata, and distribution so the route you choose is
                executed professionally.
              </p>
            </section>
            <section>
              <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
                What&apos;s Included
              </h2>
              <ul className="mt-4 space-y-3">
                {[
                  "Manuscript-to-marketplace file preparation",
                  "Print and eBook formatting guidance",
                  "Cover and metadata alignment",
                  "Retailer and distribution setup",
                  "Launch-ready publishing support",
                ].map((item) => (
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
          </FadeIn>
        </div>
      )}

      {pageKey === "book-publishing" && <AmazonSpotlight />}

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      {related.length > 0 && (
        <FadeIn className="mt-16">
          <p className="font-display text-2xl font-semibold text-forest">
            Continue the journey
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal sm:text-base">
            {brandMessages.short}
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {related.map((link) => (
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

      </div>

      {pageKey === "book-publishing" && <AuthorConsultation />}

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
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

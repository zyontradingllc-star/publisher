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
import { FadeIn } from "@/components/motion/FadeIn";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/Section";

type ServicePageKey = keyof typeof servicePages;

type Props = {
  pageKey: ServicePageKey;
};

export function servicePageMetadata(pageKey: ServicePageKey): Metadata {
  const page = servicePages[pageKey];
  return {
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    keywords: page.keywords,
  };
}

export function ServiceLanding({ pageKey }: Props) {
  const page = servicePages[pageKey];
  const service = services.items.find((s) => s.slug === page.serviceSlug);
  if (!service) notFound();

  const related = serviceRelatedLinks[pageKey] ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <FadeIn>
        <header className="mx-auto max-w-3xl pt-10 text-center sm:pt-14">
          <p className="text-[20px] font-medium uppercase tracking-[0.14em] text-coral">
            {service.title}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-forest text-balance sm:text-5xl sm:font-semibold">
            {page.h1}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-charcoal sm:text-lg">
            {service.summary}
          </p>
        </header>
      </FadeIn>

      <FadeIn className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
        {services.images[service.slug] ? (
          <div
            className={`relative w-full overflow-hidden rounded-soft shadow-soft ${
              service.slug === "audiobook-production" ||
              service.slug === "pdf-to-audio"
                ? "aspect-square bg-[#6b0f14]"
                : "aspect-[5/4] bg-ivory"
            }`}
          >
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
          </div>
        ) : (
          <PlaceholderImage
            alt={service.imageAlt}
            className="aspect-[5/4] w-full rounded-soft shadow-soft"
          />
        )}
        <div>
          <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
            {service.heading}
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

      {related.length > 0 && (
        <FadeIn className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-forest">
            Continue the journey
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal sm:text-base">
            {brandMessages.short}
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {related.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-sand px-4 py-2 text-sm font-medium text-ink transition hover:border-coral hover:text-coral-deep"
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
          description="We'll help forge what comes next."
          cta={{ label: "Forge My Story", href: "/contact" }}
        />
      </div>
    </div>
  );
}

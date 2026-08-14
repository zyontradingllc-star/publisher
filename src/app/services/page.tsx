import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services, journeyChains, brandMessages } from "@/content/site";
import { PageHero } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description: services.hero.description,
};

const dedicated = new Set([
  "ebook-writing",
  "ghostwriting",
  "audiobook-production",
  "pdf-to-audio",
  "book-publishing",
  "book-animation",
  "book-marketing",
]);

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <PageHero
        title={services.hero.title}
        description={services.hero.description}
        imageSrc="/services/hero-books.png"
        imageAlt="collection-of-books-author-forges-services"
      />

      <FadeIn className="mt-10 rounded-soft border border-sand bg-cream px-6 py-8 sm:px-8">
        <p className="text-center font-sans text-base leading-relaxed text-charcoal sm:text-lg">
          {brandMessages.medium}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {journeyChains.map((chain) => (
            <div key={chain.title}>
              <h3 className="font-sans text-base font-semibold text-ink">
                {chain.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal">
                {chain.links.map((link, i) => (
                  <span key={link.href + link.label}>
                    <Link href={link.href} className="hover:text-coral-soft">
                      {link.label}
                    </Link>
                    {i < chain.links.length - 1 && (
                      <span className="mx-1.5 text-coral/50" aria-hidden>
                        →
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((service, i) => {
          const href = dedicated.has(service.slug)
            ? `/${service.slug}`
            : `/services#${service.slug}`;
          const imageSrc = services.images[service.slug];

          return (
            <FadeIn key={service.slug} delay={Math.min(i * 0.04, 0.24)}>
              <article
                id={service.slug}
                className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-sand bg-cream shadow-soft transition hover:-translate-y-1 hover:border-coral/30 hover:shadow-lift"
              >
                <Link href={href} className="relative block aspect-[5/6] w-full shrink-0 overflow-hidden bg-ivory">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center"
                    />
                  ) : (
                    <PlaceholderImage
                      alt={service.imageAlt}
                      className="h-full w-full"
                      label={service.title}
                    />
                  )}
                </Link>

                  <div className="flex min-h-[168px] flex-col items-center p-5 text-center">
                    <p className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-coral">
                      {service.title}
                    </p>
                    <h2 className="mt-2 line-clamp-2 font-display text-xl font-bold leading-snug text-ink">
                      <Link href={href} className="hover:text-coral-deep">
                        {service.heading}
                      </Link>
                    </h2>
                    <p className="mt-2 line-clamp-2 flex-1 font-sans text-sm leading-relaxed text-charcoal">
                      {service.summary}
                    </p>
                    <div className="mt-4 flex w-full justify-center">
                      <Button
                        href={service.cta.href}
                        className="!px-4 !py-2.5 !text-xs"
                      >
                        {service.cta.label}
                      </Button>
                    </div>
                  </div>
              </article>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn className="mt-16 text-center sm:mt-20">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Ready to forge your book?
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-sans text-base text-charcoal">
          One conversation can start the full journey — writing, design, audio,
          and publishing.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact">Forge My Story</Button>
        </div>
      </FadeIn>

      <div className="mt-14">
        <FadeIn>
          <div className="overflow-hidden rounded-soft leading-none">
            <Image
              src="/banner.png"
              alt="You bring the idea. We'll help forge what comes next."
              width={1905}
              height={227}
              sizes="100vw"
              className="block h-auto w-full"
              priority={false}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

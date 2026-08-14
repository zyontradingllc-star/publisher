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

      <div className="relative mt-14 [perspective:1400px] sm:mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-72 bg-[radial-gradient(ellipse_at_center,_rgba(29,94,219,0.08)_0%,_transparent_70%)]"
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {services.items.map((service, i) => {
            const href = dedicated.has(service.slug)
              ? `/${service.slug}`
              : `/services#${service.slug}`;
            const imageSrc = services.images[service.slug];

            return (
              <FadeIn key={service.slug} delay={Math.min(i * 0.06, 0.36)}>
                <article
                  id={service.slug}
                  className="floating-card group flex h-full scroll-mt-24 flex-col overflow-hidden"
                >
                  <div className="relative aspect-[5/4] w-full shrink-0 overflow-hidden">
                    <div className="absolute inset-3 z-10 rounded-xl ring-1 ring-white/40" />
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <PlaceholderImage
                        alt={service.imageAlt}
                        className="h-full w-full"
                        label={service.title}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-7 pt-6">
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-coral">
                      {service.title}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold leading-[1.2] tracking-tight text-ink">
                      <Link href={href} className="transition hover:text-coral-deep">
                        {service.heading}
                      </Link>
                    </h2>
                    <p className="mt-4 line-clamp-3 flex-1 font-sans text-sm leading-relaxed text-charcoal">
                      {service.summary}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-sand/80 pt-5">
                      <Button
                        href={service.cta.href}
                        className="!rounded-full !px-5 !py-2.5 !text-xs !tracking-[0.08em]"
                      >
                        {service.cta.label}
                      </Button>
                      <Link
                        href={href}
                        className="font-sans text-sm font-medium text-ink underline-offset-4 transition hover:text-coral hover:underline"
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <div className="mt-20">
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

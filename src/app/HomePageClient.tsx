"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { FadeIn } from "@/components/motion/FadeIn";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import {
  brand,
  home,
  services,
  portfolio,
  blog,
  testimonials,
  testimonialsSection,
  brandMessages,
} from "@/content/site";

const dedicated = new Set([
  "ebook-writing",
  "ghostwriting",
  "audiobook-production",
  "pdf-to-audio",
  "book-publishing",
  "book-animation",
  "book-marketing",
]);

function serviceHref(slug: string) {
  return dedicated.has(slug) ? `/${slug}` : `/services#${slug}`;
}

export default function HomePageClient() {
  const featured = services.items.slice(0, 8);

  return (
    <>
      {/* Hero — BookChimp style: text left, book stack right */}
      <section className="relative overflow-hidden bg-warm-wash">
        <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[20px] font-medium uppercase tracking-[0.16em] text-coral"
            >
              {brand.name}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="mt-3 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              {home.hero.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-charcoal sm:text-lg"
            >
              {home.hero.subhead}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href={home.hero.primaryCta.href}>
                {home.hero.primaryCta.label}
              </Button>
              <Button href={home.hero.secondaryCta.href} variant="ghost">
                {home.hero.secondaryCta.label}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative mx-auto mt-0 w-full max-w-lg sm:max-w-xl lg:max-w-none"
          >
            <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
              <Image
                src="/hero-bg.png"
                alt={home.hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-top"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured services */}
      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Featured Ways We Forge
              </h2>
              <Link
                href="/services"
                className="shrink-0 text-[14px] font-medium text-coral hover:text-coral-deep"
              >
                view all
              </Link>
            </div>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((service, i) => {
              const imageSrc = services.images[service.slug];
              return (
                <FadeIn key={service.slug} delay={i * 0.04}>
                  <Link
                    href={serviceHref(service.slug)}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-cream shadow-soft transition hover:-translate-y-1 hover:border-coral/30 hover:shadow-lift"
                  >
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-ivory">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={service.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 240px"
                          className="object-cover object-center transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <PlaceholderImage
                          alt={service.imageAlt}
                          className="h-full w-full"
                          label={service.title}
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-charcoal">
                        {service.heading}
                      </p>
                      <span className="mt-3 text-[14px] font-medium text-coral transition group-hover:text-coral-deep">
                        Explore →
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audiobook promo — BookChimp light panel */}
      <section className="bg-warm-wash py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.75rem] bg-ivory/80 p-6 sm:p-10 lg:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <FadeIn>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">
                  Audiobook
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
                  Try our new feature Audiobook here for{" "}
                  <span className="text-[#E85D04]">Free!</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal sm:text-base">
                  Turn your manuscript or PDF into a listening experience — voice,
                  pacing, and production built for real audiences.
                </p>
                <Link
                  href="/audiobook-production"
                  className="mt-8 inline-flex items-center justify-center rounded-md bg-coral px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-coral-deep"
                >
                  View All Audiobook
                </Link>
              </FadeIn>

              <FadeIn delay={0.08}>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      title: "Audiobook Production",
                      desc: "Narration and sound that give your book a second life.",
                      href: "/audiobook-production",
                      image: services.images["book-cover-design"],
                      alt: "promo-audiobook-production",
                    },
                    {
                      title: "PDF to Audio",
                      desc: "Already have the PDF? Convert it into listenable audio.",
                      href: "/pdf-to-audio",
                      image: services.images["book-editing"],
                      alt: "promo-pdf-to-audio",
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex overflow-hidden rounded-xl bg-cream shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <div className="relative w-28 shrink-0 self-stretch sm:w-36">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.alt}
                            fill
                            sizes="144px"
                            className="object-cover"
                          />
                        ) : (
                          <PlaceholderImage
                            alt={item.alt}
                            className="h-full min-h-[8rem] w-full"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                        <span className="inline-flex w-fit rounded bg-[#E85D04] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          Free
                        </span>
                        <h3 className="mt-2 font-display text-lg font-semibold text-ink sm:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-charcoal sm:text-sm">
                          {item.desc}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-[20px] font-semibold uppercase tracking-wide text-coral">
                          <span aria-hidden className="text-[10px]">
                            ▶
                          </span>
                          Play Audiobook
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio — collection strip */}
      <section className="bg-ivory py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {portfolio.hero.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-charcoal sm:text-base">
                  {portfolio.hero.description}
                </p>
              </div>
              <Link
                href="/portfolio"
                className="shrink-0 text-[14px] font-medium text-coral hover:text-coral-deep"
              >
                view all
              </Link>
            </div>
          </FadeIn>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {portfolio.items.slice(0, 4).map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.05}>
                <Link href="/portfolio" className="group block">
                  <PlaceholderImage
                    alt={item.imageAlt}
                    className="aspect-[3/4] w-full rounded-soft shadow-book transition group-hover:-translate-y-1"
                  />
                  <h3 className="mt-3 font-display text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal">{item.genre}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Author spotlight — BookChimp author block */}
      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <FadeIn>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full shadow-lift sm:aspect-[4/5] sm:rounded-soft">
              <Image
                src="/about-team.png"
                alt="about-team-authorforges-studio"
                fill
                sizes="(max-width: 1024px) 90vw, 448px"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-[20px] font-medium uppercase tracking-[0.14em] text-coral">
              Why Author Forges
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              We don&apos;t just finish books. We forge them.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal">
              {brandMessages.medium}
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                About the forge
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-sand bg-ivory py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                {testimonialsSection.title}
              </h2>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-charcoal sm:text-base">
              {testimonialsSection.description}
            </p>
          </FadeIn>
          {testimonials.length > 0 ? (
            <FadeIn className="mt-10">
              <TestimonialCarousel items={testimonials} />
            </FadeIn>
          ) : (
            <FadeIn className="mt-8 max-w-xl">
              <p className="text-sm text-charcoal">
                Genuine client experiences will appear here as authors share their
                journeys.
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Blog — BookChimp blog row */}
      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                The Author Forges Library
              </h2>
              <Link
                href="/blog"
                className="text-[14px] font-medium text-coral hover:text-coral-deep"
              >
                view all
              </Link>
            </div>
          </FadeIn>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {blog.posts.slice(0, 3).map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.06}>
                <Link href={`/blog#${post.slug}`} className="group block">
                  <PlaceholderImage
                    alt={post.imageAlt}
                    className="aspect-[16/10] w-full rounded-soft"
                  />
                  <p className="mt-3 text-[20px] font-medium uppercase tracking-wider text-coral">
                    {post.category}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink transition group-hover:text-coral-deep">
                    {post.title}
                  </h3>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / final CTA */}
      <section className="relative block leading-none">
        <Image
          src="/banner.png"
          alt=""
          width={1905}
          height={227}
          sizes="100vw"
          className="block h-auto w-full"
          priority={false}
        />
      </section>
    </>
  );
}

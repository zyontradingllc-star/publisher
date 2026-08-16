"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { FadeIn } from "@/components/motion/FadeIn";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { BookShowcase } from "@/components/ui/BookShowcase";
import { HeroBookFan } from "@/components/ui/HeroBookFan";
import { CoversInMotion } from "@/components/ui/CoversInMotion";
import { ComeToLife } from "@/components/ui/ComeToLife";
import {
  brand,
  home,
  services,
  portfolio,
  blog,
  testimonials,
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

const portfolioTiles = [
  "/books/book3.jpg",
  "/books/book9.jpg",
  "/books/book10.jpg",
  "/books/book5.jpg",
  "/books/book11.jpg",
];

export default function HomePageClient() {
  const featured = services.items.slice(0, 8);

  return (
    <>
      {/* Hero — BookChimp style: text left, book stack right */}
      {/* Pulled up behind the transparent navbar so the band runs to the top. */}
      <section className="relative -mt-[108px] overflow-hidden bg-warm-wash pt-[108px] sm:-mt-[116px] sm:pt-[116px]">
        <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-10 px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[20px] font-medium uppercase tracking-[0.16em] text-coral-deep"
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
            <HeroBookFan />
          </motion.div>
        </div>
      </section>

      {/* Retailer logos */}
      <LogoMarquee />

      {/* Featured services */}
      <section className="relative bg-cream py-14 sm:py-16">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[380px] bg-cta-wash sm:h-[420px] lg:h-[440px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                Featured Ways We{" "}
                <span className="text-coral-soft">Forge</span>
              </h2>
              <Link
                href="/services"
                className="shrink-0 rounded-full border border-white/50 px-4 py-2 text-[14px] font-medium text-white transition hover:bg-white hover:text-coral-deep"
              >
                view all
              </Link>
            </div>
          </FadeIn>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((service, i) => {
              const imageSrc = services.images[service.slug];
              const href = serviceHref(service.slug);
              return (
                <FadeIn key={service.slug} delay={i * 0.04}>
                  <div className="group relative h-full">
                    <span
                      aria-hidden="true"
                      className="absolute bottom-6 right-[-8px] top-1/2 w-3 rounded-r-lg bg-coral"
                    />
                    <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-cream shadow-soft transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
                      <div className="relative aspect-[7/6] w-full shrink-0 overflow-hidden bg-ivory">
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
                        <span className="absolute -bottom-1 left-4 flex h-12 w-12 items-center justify-center rounded-lg bg-coral text-white shadow-soft">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H5.5A1.5 1.5 0 0 1 4 15.5z" />
                            <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H14a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h4.5a1.5 1.5 0 0 0 1.5-1.5z" />
                          </svg>
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col px-4 pb-5 pt-6 text-center">
                        <h3 className="font-display text-lg font-bold text-ink">
                          <Link href={href} className="hover:text-coral-deep">
                            {service.title}
                          </Link>
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal">
                          {service.heading}
                        </p>
                        <Link
                          href={href}
                          className="mt-4 inline-flex items-center gap-2 self-center rounded-md bg-ink py-2 pl-4 pr-2 text-[13px] font-semibold text-white transition hover:bg-slate"
                        >
                          Read More
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-coral text-white">
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="h-3 w-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            >
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recommended books strip */}
      <BookShowcase />

      {/* Covers in motion — 3D ring */}
      <CoversInMotion />

      {/* Watch it come to life */}
      <ComeToLife />

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
          <FadeIn className="mt-8">
            <div className="grid grid-cols-1 overflow-hidden rounded-soft sm:grid-cols-3">
              {portfolio.items.slice(0, 5).map((item, i) => (
                <Link
                  key={item.id}
                  href="/portfolio"
                  className={`group relative block h-56 overflow-hidden sm:h-64 ${
                    i === 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <Image
                    src={portfolioTiles[i]}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"
                  />
                  <span className="absolute inset-x-0 bottom-0 block p-5 sm:p-6">
                    <span className="block font-sans text-xl font-bold text-white sm:text-2xl">
                      {item.title}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 transition group-hover:text-white">
                      View Project
                      <span aria-hidden="true">›</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </FadeIn>
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

      {/* Testimonials banner */}
      <section className="bg-cream leading-none">
        <FadeIn>
          <Image
            src="/testimonials-banner.png"
            alt="The Stories Behind the Stories — Author Forges client journeys"
            width={5953}
            height={937}
            sizes="100vw"
            className="block h-auto w-full"
            quality={95}
          />
        </FadeIn>
        {testimonials.length > 0 && (
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <TestimonialCarousel items={testimonials} />
          </div>
        )}
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

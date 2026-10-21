"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { VideoInsights } from "@/components/ui/VideoInsights";
import { AmazonSpotlight } from "@/components/ui/AmazonSpotlight";
import { BookFairMoments } from "@/components/ui/BookFairMoments";
import { CoversThatSell } from "@/components/ui/CoversThatSell";
import { BookFairHighlights } from "@/components/ui/BookFairHighlights";
import { BestSellerCta } from "@/components/ui/BestSellerCta";
import { HomeFaq } from "@/components/ui/HomeFaq";
import { FreeCoverOffer } from "@/components/ui/FreeCoverOffer";
import { RoyalPackages } from "@/components/ui/RoyalPackages";
import { PublishingJourney } from "@/components/ui/PublishingJourney";
import { HeroBookFan } from "@/components/ui/HeroBookFan";
import { ComeToLife } from "@/components/ui/ComeToLife";
import { ForgeNumbers } from "@/components/ui/ForgeNumbers";
import { ReliabilityAcrossBorders } from "@/components/ui/ReliabilityAcrossBorders";
import { HomeServiceLinks } from "@/components/ui/HomeServiceLinks";
import { HomeWhatWeDo } from "@/components/ui/HomeWhatWeDo";
import { GoogleReviews } from "@/components/ui/GoogleReviews";
import { home, portfolio } from "@/content/site";
import { platformHref } from "@/lib/platform";

const portfolioTiles = [
  "/books/book3.webp",
  "/books/book9.webp",
  "/books/book10.webp",
  "/books/book5.webp",
  "/books/book11.webp",
];

export default function HomePageClient() {
  return (
    <>
      {/* Hero - BookChimp style: text left, book stack right */}
      <section className="relative overflow-hidden bg-warm-wash">
        <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-8 px-4 pb-14 pt-6 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-8 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-pill"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 16 7.5 8l4.5 5 4.5-5L21 16H4z" />
                <path d="M6 16h12v2.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.5V16z" />
              </svg>
              Flagship eBook &amp; Book Cover Design
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="mt-3 heading-hero"
            >
              Book Publishing &amp; Author Website Design Agency
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
              className="mt-8"
            >
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <Button href={platformHref("/publish")}>Submit Your Book</Button>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-charcoal">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex text-[#E08A2A]" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                        <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
                      </svg>
                    ))}
                  </span>
                  4.9/5 average rating
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-[#E08A2A]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3l7 3v6c0 4.5-2.8 7.6-7 9-4.2-1.4-7-4.5-7-9V6z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                  100% rights &amp; royalties stay yours
                </span>
              </div>
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

      <HomeWhatWeDo />

      {/* Behind the pages / author insights */}
      <VideoInsights />

      {/* Amazon spotlight - covers slide left to right */}
      <AmazonSpotlight />

      {/* Book fair moments */}
      <BookFairMoments />

      <PublishingJourney />

      <section className="bg-warm-wash py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">Author Love</span>
              <h2 className="mt-4 heading-section">What Our Authors Say</h2>
            </div>
          </FadeIn>
          <GoogleReviews />
        </div>
      </section>

      {/* Covers that sell */}
      <CoversThatSell />

      {/* Numbers / proof */}
      <ForgeNumbers />

      {/* Reliability across borders */}
      <ReliabilityAcrossBorders />

      {/* Watch it come to life */}
      <ComeToLife />

      {/* Portfolio - collection strip */}
      <section className="bg-ivory py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="heading-section">
                  {portfolio.hero.title}
                </p>
                <p className="mt-3 max-w-2xl text-sm text-charcoal sm:text-base">
                  {portfolio.hero.description}
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn className="mt-8">
            <div className="grid grid-cols-1 overflow-hidden rounded-soft sm:grid-cols-3">
              {portfolio.items.slice(0, 5).map((item, i) => (
                <Link
                  key={item.id}
                  href="/contact-author-website-design-agency"
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

      {/* Pricing Fit For Royalty */}
      <RoyalPackages showHeading={false} />

      {/* SEO service links */}
      <HomeServiceLinks />

      {/* Authors Pilot Book Fair Highlights */}
      <BookFairHighlights />

      {/* Best-seller CTA */}
      <BestSellerCta />

      {/* Free cover mockup */}
      <FreeCoverOffer />

      {/* FAQ */}
      <HomeFaq />
    </>
  );
}

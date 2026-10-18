"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

const covers = [
  { title: "Speak With No Fear", src: "/covers-that-sell/cover-1.webp" },
  { title: "Cover Design 2", src: "/covers-that-sell/cover-2.webp" },
  { title: "Journey of Life", src: "/covers-that-sell/cover-3.webp" },
  { title: "Cover Design 4", src: "/covers-that-sell/cover-4.webp" },
  { title: "They Hunt", src: "/covers-that-sell/cover-5.webp" },
  { title: "Cover Design 6", src: "/covers-that-sell/cover-6.webp" },
  { title: "Cover Design 7", src: "/covers-that-sell/cover-7.webp" },
  { title: "Cover Design 8", src: "/covers-that-sell/cover-8.webp" },
];

export function CoversThatSell() {
  return (
    <section id="covers" className="scroll-mt-24 bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">
              Premium · Award Design
            </span>
            <p className="mt-4 heading-section">
              Covers That Sell
            </p>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              Real covers we designed for real authors, each one engineered to
              win the click and the buy. Hit any cover to see the craft up close.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {covers.map((cover, i) => (
            <FadeIn key={cover.src} delay={i * 0.03}>
              <Link href="/contact-author-website-design-agency" className="group block">
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-book ring-1 ring-sand">
                  <Image
                    src={cover.src}
                    alt={cover.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mt-2.5 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E08A2A]">
                    <span aria-hidden>+</span>
                    View Case
                  </span>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/contact-author-website-design-agency">Design My Cover</Button>
          <Button href="/contact-author-website-design-agency" variant="ghost">
            Explore Cover Design →
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}

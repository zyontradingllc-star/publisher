"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";

const fairs = [
  {
    id: "london",
    title: "London Book Fair",
    place: "Olympia London · March",
    images: ["/book-fair/fair12.webp", "/book-fair/fair1.webp"],
  },
  {
    id: "frankfurt",
    title: "Frankfurt Book Fair",
    place: "Frankfurt · October",
    images: ["/book-fair/fair6.webp", "/book-fair/fair7.webp"],
  },
  {
    id: "ala",
    title: "ALA Conference",
    place: "USA · June",
    images: ["/book-fair/fair3.webp", "/book-fair/fair9.webp"],
  },
];

const slides = fairs.flatMap((fair) =>
  fair.images.map((src) => ({
    src,
    fairId: fair.id,
    caption: fair.title,
  })),
);

function CrownMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M3 16.5 6.5 8l5.5 6 5.5-6L21 16.5H3z" />
      <path d="M5 18h14v1.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V18z" />
    </svg>
  );
}

export function BookFairHighlights() {
  const [index, setIndex] = useState(0);
  const current = slides[index];
  const activeFair = current.fairId;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2800);

    return () => window.clearInterval(id);
  }, []);

  const selectFair = (fairId: string) => {
    const next = slides.findIndex((slide) => slide.fairId === fairId);
    if (next >= 0) setIndex(next);
  };

  return (
    <section id="book-fairs" className="scroll-mt-24 bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">
              On the World Stage
            </span>
            <p className="mt-4 heading-section">
              Authors Pilot Book Fair{" "}
              <span className="text-[#E08A2A]">Highlights</span>
            </p>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              From London to Frankfurt, real moments from Authors Pilot booths -
              authors, editors, and readers, together.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:gap-12">
          <FadeIn>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-book ring-1 ring-sand">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.src}
                    alt={current.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="image-ken-burns object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/70 to-transparent px-5 pb-5 pt-16">
                <p className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-white">
                  <span className="text-[#E08A2A]">
                    <CrownMark />
                  </span>
                  {current.caption}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="font-sans text-sm leading-relaxed text-charcoal">
              Three stops on the calendar where our authors meet their readers.
              Choose a fair - photos keep rotating on their own.
            </p>
            <ul className="mt-5 space-y-3">
              {fairs.map((fair) => {
                const selected = fair.id === activeFair;
                return (
                  <li key={fair.id}>
                    <button
                      type="button"
                      onClick={() => selectFair(fair.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                        selected
                          ? "border-[#273E2B]/50 bg-[#A7C4AB]/25"
                          : "border-sand bg-white hover:border-[#273E2B]/30"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          selected
                            ? "bg-[#273E2B] text-white"
                            : "bg-ivory text-[#E08A2A]"
                        }`}
                      >
                        <CrownMark />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-sans text-sm font-bold text-ink">
                          {fair.title}
                        </span>
                        <span className="mt-0.5 block font-sans text-xs text-charcoal">
                          {fair.place}
                        </span>
                      </span>
                      <span className="flex shrink-0 gap-1.5">
                        {fair.images.map((src) => (
                          <span
                            key={src}
                            className={`relative h-10 w-8 overflow-hidden rounded-md ring-1 ${
                              current.src === src
                                ? "ring-[#273E2B]"
                                : "ring-sand"
                            }`}
                          >
                            <Image
                              src={src}
                              alt="Book fair moment thumbnail"
                              fill
                              sizes="32px"
                              className="object-cover object-center"
                            />
                          </span>
                        ))}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

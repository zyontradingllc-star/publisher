"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

const perks = [
  {
    title: "Free eBook Cover Mockup",
    body: "A 3D mockup of your title on a Kindle, yours to keep and share.",
    icon: "book" as const,
  },
  {
    title: "Free Author Website",
    body: "Review your website before you pay, with unlimited revisions until you're completely satisfied.",
    icon: "shield" as const,
  },
  {
    title: "Exclusive New-Author Discount",
    body: "Claim a limited launch discount when you book your free consultation.",
    icon: "star" as const,
  },
];

function PerkIcon({ icon }: { icon: (typeof perks)[number]["icon"] }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#273E2B] text-white">
      {icon === "book" && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
          <path strokeLinecap="round" d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5Z" />
          <path strokeLinecap="round" d="M5 5.5h12" />
        </svg>
      )}
      {icon === "shield" && (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-2.8 7.6-7 9-4.2-1.4-7-4.5-7-9V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
        </svg>
      )}
      {icon === "star" && (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      )}
    </span>
  );
}

const mockupCovers = Array.from(
  { length: 24 },
  (_, i) => `/covers-that-sell/cover-${i + 1}.webp`,
);

function KindleMockup() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % mockupCovers.length);
    }, 3200);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-[210px] sm:w-[240px] lg:w-[260px]" style={{ perspective: "900px" }}>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A7C4AB]/25 blur-3xl"
      />
      <div
        className="relative rounded-[1.75rem] bg-[#1a1520] p-2.5 shadow-lift ring-1 ring-white/10"
        style={{ transform: "rotateY(-16deg) rotateX(6deg)" }}
      >
        <div
          className="relative aspect-[2/3] overflow-hidden rounded-lg bg-black"
          style={{ perspective: "800px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mockupCovers[index]}
              initial={{ rotateY: 90, opacity: 0.4 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0.4 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden", transformOrigin: "center" }}
            >
              <Image
                src={mockupCovers[index]}
                alt="Sample eBook cover mockup on a Kindle"
                fill
                sizes="260px"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mx-auto mt-2.5 h-7 w-7 rounded-full border border-white/20" />
      </div>
    </div>
  );
}

export function FreeCoverOffer() {
  return (
    <section className="bg-cream py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="overflow-hidden rounded-[2rem] bg-warm-wash px-6 py-10 shadow-soft sm:px-10 sm:py-12 lg:px-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
              <div>
                <span className="badge-pill">
                  <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
                    <path d="M10 1.2 12.1 7l6.2.5-4.8 3.9 1.5 6-5-3.2-5 3.2 1.5-6L1.7 7.5 7.9 7 10 1.2z" />
                  </svg>
                  Free For Authors
                </span>

                <p className="mt-5 heading-section">
                  Free{" "}
                  <span className="text-[#E08A2A]">Authors Website</span>
                  {" "}&amp; Book Cover Mockup
                </p>

                <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                  See your book as a finished cover before you spend a cent. Request
                  a free 3D mockup and a professional audit of your current cover —
                  no strings attached.
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {perks.map((perk) => (
                    <li
                      key={perk.title}
                      className="rounded-2xl border border-sand bg-white p-3.5"
                    >
                      <PerkIcon icon={perk.icon} />
                      <p className="mt-3 font-sans text-sm font-bold text-ink">
                        {perk.title}
                      </p>
                      <p className="mt-1 font-sans text-xs leading-relaxed text-charcoal">
                        {perk.body}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button href="#consultation">Claim My Free Mockup</Button>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <KindleMockup />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

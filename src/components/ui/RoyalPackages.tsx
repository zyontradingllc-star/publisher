"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { royalPackages } from "@/content/packages";

type RoyalPackagesProps = {
  showHeading?: boolean;
  compareHref?: string;
};

export function RoyalPackages({
  showHeading = true,
  compareHref = "/contact-author-website-design-agency",
}: RoyalPackagesProps) {
  const standardListRef = useRef<HTMLUListElement>(null);
  const [listHeight, setListHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = standardListRef.current;
    if (!el) return;

    const update = () => setListHeight(el.scrollHeight);

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge-pill">
                Royal Packages
              </span>
              <h2 className="mt-4 heading-section">
                Choose Your Package
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-charcoal sm:text-base">
                Simple, transparent, one-time pricing with full rights included.
                Start with a stunning cover or go all the way to a marketed
                best-seller — your royalties stay 100% yours.
              </p>
            </div>
          </FadeIn>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {royalPackages.map((pkg, i) => {
            const isStandard = pkg.id === "standard";
            const scrollable = !isStandard && listHeight !== null;

            return (
              <FadeIn key={pkg.id} delay={i * 0.06} className="h-full">
                <article
                  className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-soft sm:p-7 ${
                    pkg.featured
                      ? "border-[#A7C4AB] bg-gradient-to-b from-[#1a2e1d] via-[#273E2B] to-[#355a3c] text-linen ring-2 ring-[#A7C4AB]/40 shadow-lift"
                      : "border-sand bg-white"
                  }`}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-ink shadow-cta">
                      Most Popular
                    </span>
                  )}

                  <p
                    className={`font-sans text-[11px] font-bold uppercase tracking-[0.16em] ${
                      pkg.featured ? "text-[#A7C4AB]" : "text-[#273E2B]"
                    }`}
                  >
                    {pkg.eyebrow}
                  </p>
                  <h3
                    className={`mt-2 font-display text-2xl font-semibold ${
                      pkg.featured ? "text-white" : "text-ink"
                    }`}
                  >
                    {pkg.title}
                  </h3>
                  <p
                    className={`mt-2 min-h-[2.5rem] font-sans text-sm leading-relaxed ${
                      pkg.featured ? "text-white/70" : "text-charcoal"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  <ul
                    ref={isStandard ? standardListRef : undefined}
                    style={scrollable ? { maxHeight: listHeight } : undefined}
                    className={`mt-5 space-y-2.5 ${
                      scrollable
                        ? pkg.featured
                          ? "overflow-y-auto overscroll-contain pr-1 [scrollbar-color:#A7C4AB_#273E2B] [scrollbar-width:thin]"
                          : "overflow-y-auto overscroll-contain pr-1 [scrollbar-color:#273E2B_#f3e6d4] [scrollbar-width:thin]"
                        : ""
                    }`}
                  >
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2.5 font-sans text-sm ${
                          pkg.featured ? "text-white/80" : "text-charcoal"
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            pkg.featured
                              ? "bg-[#A7C4AB] text-ink"
                              : "bg-[#273E2B]/15 text-[#273E2B]"
                          }`}
                        >
                          <svg
                            viewBox="0 0 20 20"
                            className="h-3 w-3"
                            fill="none"
                            aria-hidden
                          >
                            <path
                              d="M5 10.5 8.2 13.5 15 6.5"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Button href="/contact-author-website-design-agency" className="w-full justify-center">
                      {pkg.cta}
                    </Button>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        {showHeading && (
          <FadeIn className="mt-8 text-center">
            <Link
              href={compareHref}
              className="font-sans text-sm font-semibold text-[#273E2B] hover:underline"
            >
              Compare All Packages →
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

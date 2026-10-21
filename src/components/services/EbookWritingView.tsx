"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { AnimatedServiceCards } from "@/components/ui/AnimatedServiceCards";
import { ServicePageHero } from "@/components/services/ServicePageHero";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import {
  ebookWritingBanner,
  ebookWritingSections,
  journeyPageHero,
} from "@/content/site";

function CyclingBoxes({ labels }: { labels: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (labels.length === 0) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % labels.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [labels.length]);

  return (
    <ul className="mt-4 flex flex-wrap justify-center gap-3">
      {labels.map((label, itemIndex) => {
        const isActive = active === itemIndex;
        return (
          <li
            key={label}
            className="w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)]"
          >
            <FadeIn delay={itemIndex * 0.1}>
              <div
                className={`rounded-2xl border px-4 py-4 text-center font-sans text-sm font-semibold shadow-soft transition duration-500 sm:text-base ${
                  isActive
                    ? "-translate-y-0.5 border-[#273E2B] bg-[#273E2B] text-white shadow-lift"
                    : "border-sand bg-white text-ink hover:-translate-y-0.5 hover:border-[#273E2B] hover:bg-[#273E2B] hover:text-white hover:shadow-lift"
                }`}
              >
                {label}
              </div>
            </FadeIn>
          </li>
        );
      })}
    </ul>
  );
}

export function EbookWritingView() {
  return (
    <>
      <ServicePageHero title={journeyPageHero.write.h1} />

      <section className="bg-cream py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] shadow-lift sm:min-h-[26rem] lg:min-h-[20rem]">
              <Image
                src={ebookWritingBanner.image}
                alt={ebookWritingBanner.imageAlt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1152px"
                className="object-cover object-[70%_center] lg:object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10 lg:from-black/75 lg:via-black/45 lg:to-transparent" />

              <div className="relative flex h-full min-h-[22rem] items-center sm:min-h-[26rem] lg:min-h-[20rem]">
                <div className="max-w-xl px-6 py-10 text-white sm:px-10 sm:py-12 lg:max-w-lg lg:px-12">
                  <p className="font-sans text-sm leading-relaxed text-white/85 sm:text-base">
                    {ebookWritingBanner.body}
                  </p>
                  <p className="mt-5 font-display text-lg font-semibold text-white sm:text-xl">
                    {ebookWritingBanner.closing}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {ebookWritingSections.map((section, index) => (
        <section
          key={section.id}
          className={
            section.id === "draft-to-manuscript"
              ? "bg-cta-wash py-14 sm:py-16"
              : index % 2 === 0
                ? "bg-ivory py-14 sm:py-16"
                : "bg-cream py-14 sm:py-16"
          }
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="mx-auto max-w-4xl">
                <span
                  className={`badge-pill ${
                    section.id === "draft-to-manuscript"
                      ? "bg-white/15 text-white"
                      : ""
                  }`}
                >
                  {section.eyebrow}
                </span>
                <h2
                  className={`mt-5 heading-section ${
                    section.id === "draft-to-manuscript" ? "text-white" : ""
                  }`}
                >
                  {section.heading}
                </h2>
                <p
                  className={`mt-4 max-w-3xl font-sans text-base leading-relaxed sm:text-lg ${
                    section.id === "draft-to-manuscript"
                      ? "text-white/80"
                      : "text-charcoal"
                  }`}
                >
                  {section.body}
                </p>

                {section.items.length > 0 && (
                  <>
                    <p className="mt-8 font-sans text-sm font-bold uppercase tracking-[0.12em] text-ink">
                      {section.listTitle}
                    </p>
                    {section.id === "turn-ideas-into-words" ? (
                      <AnimatedServiceCards
                        items={section.items.filter(
                          (item) => typeof item !== "string",
                        )}
                      />
                    ) : (
                      <CyclingBoxes
                        labels={section.items.map((item) =>
                          typeof item === "string" ? item : item.title,
                        )}
                      />
                    )}
                  </>
                )}

                {"closingPrompt" in section && section.closingPrompt && (
                  <p
                    className={`mt-8 font-display text-xl font-semibold sm:text-2xl ${
                      section.id === "draft-to-manuscript"
                        ? "text-white"
                        : "text-ink"
                    }`}
                  >
                    {section.closingPrompt}
                  </p>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ServiceFaqSection slug="book-writing" className="mt-0" />
        </div>
      </section>

    </>
  );
}

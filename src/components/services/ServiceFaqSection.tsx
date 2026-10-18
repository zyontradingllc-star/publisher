"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { serviceFaqs } from "@/content/service-faqs";
import type { ServiceSeoSlug } from "@/lib/service-page-seo";

type Props = {
  slug: ServiceSeoSlug;
  heading?: string;
  className?: string;
};

export function ServiceFaqSection({
  slug,
  heading = "Frequently Asked Questions",
  className = "mt-20",
}: Props) {
  const items = serviceFaqs[slug];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items?.length) return null;

  return (
    <FadeIn className={className}>
        <p className="heading-section text-center text-forest">{heading}</p>
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {items.map((item, index) => {
            const open = openIndex === index;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-sand bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
                    {item.question}
                  </h3>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral/15 font-sans text-lg text-coral transition-transform ${open ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="border-t border-sand px-5 pb-5 pt-3 text-sm leading-relaxed text-charcoal sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </FadeIn>
  );
}

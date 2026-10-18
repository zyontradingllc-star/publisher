"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  variant?: "default" | "gold";
};

export function Accordion({ items, variant = "default" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const gold = variant === "gold";

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl border bg-white ${
              gold && open
                ? "border-[#273E2B]/45 shadow-soft"
                : "border-sand"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className="font-display text-base font-semibold text-ink sm:text-lg">
                {item.question}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform ${
                  gold
                    ? "bg-[#273E2B] text-white"
                    : "bg-coral/15 text-coral"
                } ${open ? (gold ? "rotate-180" : "rotate-45") : ""}`}
                aria-hidden
              >
                {gold ? (
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                    <path
                      d="M5 7.5 10 12.5 15 7.5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  "+"
                )}
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
  );
}

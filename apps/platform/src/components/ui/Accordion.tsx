"use client";

import { useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string | string[];
};

type AccordionProps = {
  items: AccordionItem[];
  /** Open first item by default */
  defaultOpen?: number | null;
};

export function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        const paragraphs = Array.isArray(item.answer)
          ? item.answer
          : [item.answer];

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-sand bg-white shadow-soft"
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
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral/15 text-coral transition-transform ${
                  open ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            {open ? (
              <div className="space-y-3 border-t border-sand px-5 pb-5 pt-3 sm:px-6">
                {paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="text-sm leading-relaxed text-charcoal sm:text-base"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

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
            className="relative overflow-hidden rounded-2xl border border-[#6B7280]/40 bg-gradient-to-br from-[#6B7280] via-[#4B5563] to-[#374151] shadow-soft"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-5 -top-6 h-16 w-16 rounded-full bg-white/15"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 left-8 h-12 w-12 rounded-full bg-black/20"
            />
            <button
              type="button"
              className="relative flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className="font-display text-base font-semibold text-white sm:text-lg">
                {item.question}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-transform ${
                  open ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            {/* Always in the HTML (CSS-collapsed) so FAQPage JSON-LD answers are crawlable */}
            <div
              className={`relative space-y-3 border-t border-white/15 px-5 pb-5 pt-3 sm:px-6 ${
                open ? "" : "hidden"
              }`}
              aria-hidden={!open}
            >
              {paragraphs.map((p) => (
                <p
                  key={p.slice(0, 48)}
                  className="text-sm leading-relaxed text-white/80 sm:text-base"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

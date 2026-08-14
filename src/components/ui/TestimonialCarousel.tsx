"use client";

import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { testimonials as TestimonialsType } from "@/content/site";

type Testimonial = (typeof TestimonialsType)[number];

type TestimonialCarouselProps = {
  items: Testimonial[];
};

export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + items.length) % items.length);
    },
    [items.length]
  );

  useEffect(() => {
    const id = window.setInterval(() => goTo(index + 1, 1), 5500);
    return () => window.clearInterval(id);
  }, [goTo, index]);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -60) goTo(index + 1, 1);
    else if (info.offset.x > 60) goTo(index - 1, -1);
  }

  const item = items[index];

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-soft border border-sand bg-cream px-6 py-10 sm:px-10 sm:py-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.blockquote
            key={item.name}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="cursor-grab active:cursor-grabbing"
          >
            <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-8">
              <cite className="not-italic">
                <span className="block font-semibold text-ink">
                  {item.name}
                </span>
                <span className="mt-0.5 block text-sm text-charcoal">
                  {item.role}
                </span>
              </cite>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => goTo(index - 1, -1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sand text-ink transition hover:bg-coral hover:text-white"
        >
          ←
        </button>
        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-7 bg-coral" : "w-2.5 bg-sand hover:bg-coral/50"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => goTo(index + 1, 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sand text-ink transition hover:bg-coral hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}

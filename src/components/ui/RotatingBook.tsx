"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

const covers = Array.from({ length: 8 }, (_, i) => `/books/book${i + 1}.webp`);

const WIDTH = 260;
const HEIGHT = 390;
const DEPTH = 34;
/** Degrees per millisecond - one full turn takes about seven seconds. */
const SPEED = 0.05;

export function RotatingBook() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4, once: false });
  const rotation = useMotionValue(0);
  const transform = useTransform(
    rotation,
    (deg) => `rotateX(-6deg) rotateY(${deg}deg)`,
  );

  const [index, setIndex] = useState(0);
  const swaps = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!inView) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const next = rotation.get() + delta * SPEED;
    rotation.set(next);

    // Swap the cover while the back of the book faces the viewer.
    const turns = Math.floor((next + 180) / 360);
    if (turns > swaps.current) {
      swaps.current = turns;
      setIndex((prev) => (prev + 1) % covers.length);
    }
  });

  return (
    <div ref={rootRef} className="relative mx-auto flex w-full justify-center">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral/10 blur-2xl"
      />
      <div
        className="relative scale-[0.72] sm:scale-90 lg:scale-100"
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          perspective: "1300px",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", transform }}
        >
          {/* Front cover */}
          <div
            className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-sm shadow-book ring-1 ring-black/10"
            style={{
              transform: `translateZ(${DEPTH / 2}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src={covers[index]}
              alt="Book published by Authors Pilot"
              fill
              sizes="260px"
              className="object-cover object-center"
            />
          </div>

          {/* Back cover - plain dark grey */}
          <div
            className="absolute inset-0 rounded-l-md rounded-r-sm bg-slate ring-1 ring-white/10"
            style={{
              transform: `rotateY(180deg) translateZ(${DEPTH / 2}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
              <span className="h-10 w-10 rounded-full border border-coral/50" />
              <span className="font-display text-sm tracking-[0.2em] text-white/45">
                AUTHORS PILOT
              </span>
            </div>
          </div>

          {/* Spine */}
          <div
            className="absolute top-0 h-full bg-gradient-to-r from-black/70 via-slate to-black/40"
            style={{
              width: `${DEPTH}px`,
              left: `${(WIDTH - DEPTH) / 2}px`,
              transform: `rotateY(-90deg) translateZ(${WIDTH / 2}px)`,
            }}
          />

          {/* Page edge */}
          <div
            className="absolute top-0 h-full bg-[repeating-linear-gradient(to_right,#FFFFFF_0px,#FFFFFF_2px,#DCDCDC_3px)]"
            style={{
              width: `${DEPTH}px`,
              left: `${(WIDTH - DEPTH) / 2}px`,
              transform: `rotateY(90deg) translateZ(${WIDTH / 2}px)`,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

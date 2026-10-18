"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";

const covers = Array.from(
  { length: 9 },
  (_, i) => `/covers-in-motion/cover-${i + 1}.webp`,
);

const CARD_WIDTH = 220;
const CARD_HEIGHT = 330;
const ANGLE = 360 / covers.length;
/** Radius that spaces the covers evenly around the ring without overlap. */
const RADIUS = Math.round(
  CARD_WIDTH / 2 / Math.tan((Math.PI * ANGLE) / 360) + 26,
);

export function CoversInMotion() {
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (deg) => `rotateY(${deg}deg)`);

  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);

  useAnimationFrame((_, delta) => {
    if (dragging.current) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    rotation.set(rotation.get() + delta * 0.007);
  });

  return (
    <section className="relative overflow-hidden bg-cta-wash py-14 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#273E2B]/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-[#273E2B]/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div>
            <span className="badge-pill bg-white/15 text-white">
              Covers In Motion
            </span>
            <p className="mt-3 heading-section text-white">
              Stand Out on Every Shelf
            </p>
          </div>
        </FadeIn>
      </div>

      <div
        className="relative mt-10 cursor-grab touch-pan-y select-none active:cursor-grabbing sm:mt-12"
        onPointerDown={(event) => {
          dragging.current = true;
          dragStartX.current = event.clientX;
          dragStartRotation.current = rotation.get();
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragging.current) return;
          const travelled = event.clientX - dragStartX.current;
          rotation.set(dragStartRotation.current + travelled * 0.3);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <div
          className="relative mx-auto h-[380px] w-full max-w-4xl scale-[0.72] sm:h-[440px] sm:scale-95 lg:scale-110"
          style={{ perspective: "1600px" }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transformStyle: "preserve-3d", transform }}
          >
            {covers.map((src, i) => (
              <div
                key={src}
                className="absolute overflow-hidden rounded-md bg-cream shadow-book ring-1 ring-black/5"
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                  transform: `translate(-50%, -50%) rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src={src}
                  alt={`Authors Pilot book cover ${i + 1}`}
                  width={CARD_WIDTH}
                  height={CARD_HEIGHT}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <p className="mt-2 text-center font-sans text-xs text-white/55 sm:mt-4">
          ↔ drag to spin · auto-rotates on its own
        </p>
      </div>
    </section>
  );
}

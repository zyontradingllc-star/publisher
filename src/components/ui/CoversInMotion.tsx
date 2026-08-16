"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";

const covers = Array.from({ length: 11 }, (_, i) => `/books/book${i + 1}.jpg`);

const CARD_WIDTH = 176;
const CARD_HEIGHT = 264;
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
    <section className="border-y border-sand bg-ivory py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-coral-deep">
                Covers In Motion
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Stand Out on Every Shelf
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="text-[14px] font-medium text-coral-deep hover:text-coral"
            >
              Browse the full portfolio →
            </Link>
          </div>
        </FadeIn>
      </div>

      <div
        className="mt-10 cursor-grab touch-pan-y select-none active:cursor-grabbing sm:mt-12"
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
          className="relative mx-auto h-[300px] w-full max-w-3xl scale-[0.62] sm:h-[340px] sm:scale-90 lg:scale-100"
          style={{ perspective: "1500px" }}
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
                  alt=""
                  fill
                  sizes="176px"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <p className="mt-2 text-center font-sans text-xs text-charcoal sm:mt-4">
          ↔ drag to spin · auto-rotates on its own
        </p>
      </div>
    </section>
  );
}

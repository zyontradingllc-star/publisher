"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const covers = Array.from({ length: 10 }, (_, i) => `/books/book${i + 1}.webp`);

type Placement = {
  x: string;
  rotateY: number;
  scale: number;
  z: number;
  dim: number;
  opacity: number;
};

const front: Placement = {
  x: "0%",
  rotateY: 0,
  scale: 1,
  z: 30,
  dim: 1,
  opacity: 1,
};

const inner = (side: 1 | -1): Placement => ({
  x: `${side * 42}%`,
  rotateY: side * -20,
  scale: 0.85,
  z: 20,
  dim: 0.9,
  opacity: 1,
});

const outer = (side: 1 | -1, opacity = 1): Placement => ({
  x: `${side * 76}%`,
  rotateY: side * -34,
  scale: 0.72,
  z: 10,
  dim: 0.8,
  opacity,
});

/**
 * Five spots stay filled at all times: two left, front, two right.
 * Covers slide spot to spot; the one leaving and the one arriving swap
 * quietly at the outer spots so the shape never breaks.
 */
function placement(distance: number, total: number): Placement {
  if (distance === 0) return front;
  if (distance === 1) return inner(1);
  if (distance === 2) return outer(1);
  if (distance === total - 1) return inner(-1);
  if (distance === total - 2) return outer(-1);
  return distance <= total / 2 ? outer(1, 0) : outer(-1, 0);
}

export function HeroBookFan() {
  const [lead, setLead] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setLead((prev) => (prev + 1) % covers.length);
    }, 1100);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="image-bob relative aspect-[4/3] w-full sm:aspect-[5/4]">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(39,62,43,0.16),transparent)]"
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {covers.map((src, i) => {
          const spot = placement(
            (i - lead + covers.length) % covers.length,
            covers.length,
          );
          if (spot.opacity === 0) return null;

          return (
            <motion.div
              key={src}
              className="absolute left-1/2 top-1/2 h-[78%] w-[38%] overflow-hidden rounded-md shadow-book ring-1 ring-black/5"
              style={{ transformStyle: "preserve-3d" }}
              initial={false}
              animate={{
                x: `calc(-50% + ${spot.x})`,
                y: "-50%",
                rotateY: spot.rotateY,
                scale: spot.scale,
                opacity: loaded[src] ? spot.opacity : 0,
                zIndex: spot.z,
                filter: `brightness(${spot.dim})`,
              }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={src}
                alt={`Featured book cover ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 45vw, 320px"
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                onLoad={() => setLoaded((prev) => ({ ...prev, [src]: true }))}
                className="image-ken-burns object-cover object-center"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

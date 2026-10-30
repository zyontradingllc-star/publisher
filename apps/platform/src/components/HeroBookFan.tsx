"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { platformPublicPath } from "@/lib/utils";

const BOOK_COVERS = Array.from(
  { length: 10 },
  (_, i) => `/books/book${i + 1}.webp`,
);

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
  dim: 0.72,
  opacity: 1,
});

const outer = (side: 1 | -1, opacity = 1): Placement => ({
  x: `${side * 76}%`,
  rotateY: side * -34,
  scale: 0.72,
  z: 10,
  dim: 0.42,
  opacity,
});

function placement(distance: number, total: number): Placement {
  if (distance === 0) return front;
  if (distance === 1) return inner(1);
  if (distance === 2) return outer(1);
  if (distance === total - 1) return inner(-1);
  if (distance === total - 2) return outer(-1);
  return distance <= total / 2 ? outer(1, 0) : outer(-1, 0);
}

type HeroBookFanProps = {
  covers?: string[];
  imageAlt?: string;
};

export function HeroBookFan({
  covers = BOOK_COVERS,
  imageAlt = "Featured book cover",
}: HeroBookFanProps) {
  const reduceMotion = useReducedMotion();
  const [lead, setLead] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || isMobile) return;

    const id = window.setInterval(() => {
      setLead((prev) => (prev + 1) % covers.length);
    }, 1100);

    return () => window.clearInterval(id);
  }, [covers.length, reduceMotion, isMobile]);

  const visibleCovers = isMobile
    ? covers.slice(0, 3).map((src, i) => ({
        src,
        spot: i === 0 ? front : i === 1 ? inner(1) : inner(-1),
        index: i,
      }))
    : covers.map((src, i) => ({
        src,
        spot: placement(
          (i - lead + covers.length) % covers.length,
          covers.length,
        ),
        index: i,
      }));

  return (
    <div className="image-bob relative aspect-[4/3] w-full sm:aspect-[5/4]">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(39,62,43,0.16),transparent)]"
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: isMobile ? undefined : "1400px" }}
      >
        {visibleCovers.map(({ src, spot, index }) => {
          if (spot.opacity === 0) return null;

          return (
            <motion.div
              key={src}
              className="absolute left-1/2 top-1/2 h-[78%] w-[38%] overflow-hidden rounded-md shadow-book ring-1 ring-black/5"
              style={{ transformStyle: isMobile ? undefined : "preserve-3d" }}
              initial={false}
              animate={{
                x: `calc(-50% + ${spot.x})`,
                y: "-50%",
                rotateY: isMobile ? 0 : spot.rotateY,
                scale: spot.scale,
                opacity: loaded[src] ? spot.opacity : 0,
                zIndex: spot.z,
                filter: `brightness(${spot.dim})`,
              }}
              transition={
                isMobile || reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <Image
                src={platformPublicPath(src)}
                alt={`${imageAlt} ${index + 1}`}
                fill
                sizes="(max-width: 767px) 40vw, (max-width: 1024px) 45vw, 320px"
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                onLoad={() => setLoaded((prev) => ({ ...prev, [src]: true }))}
                className={`object-cover object-center ${isMobile ? "" : "image-ken-burns"}`}
                unoptimized
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

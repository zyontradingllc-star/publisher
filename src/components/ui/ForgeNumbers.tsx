"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";

const stats = [
  { target: 500, suffix: "+", label: "Books Published" },
  { target: 35, suffix: "+", label: "Design Awards" },
  { target: 50, suffix: "M+", label: "Pages Edited" },
  { target: 10, suffix: "", label: "Years of Craft" },
];

function CountUp({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const duration = 1600;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(eased * target));
      if (t < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, target]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

export function ForgeNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cta-wash py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#273E2B]/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#273E2B]/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="badge-pill">
            What makes us reality
          </span>
          <p className="mt-5 heading-section text-white">
            Numbers From{" "}
            <span className="text-[#E08A2A]">Authors Pilot</span>
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/75 sm:text-base">
            A decade of designing, editing and launching bestsellers - the proof
            is in the page count, the awards, and the authors who trust us.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.06}>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-7 backdrop-blur-sm sm:py-8">
                <p className="font-display text-4xl font-semibold text-[#E08A2A] sm:text-5xl">
                  <CountUp
                    target={stat.target}
                    suffix={stat.suffix}
                    active={active}
                  />
                </p>
                <p className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white/85">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

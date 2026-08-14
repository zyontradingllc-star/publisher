"use client";

import { useMemo, useState } from "react";
import { portfolio } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { FadeIn } from "@/components/motion/FadeIn";

type Genre = (typeof portfolio.genres)[number];

export function PortfolioGrid() {
  const [genre, setGenre] = useState<Genre>("All");

  const filtered = useMemo(() => {
    if (genre === "All") return portfolio.items;
    return portfolio.items.filter((item) => item.genre === genre);
  }, [genre]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {portfolio.genres.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGenre(g)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              genre === g
                ? "bg-coral text-white shadow-soft"
                : "border border-sand bg-cream text-ink hover:border-coral/40"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <FadeIn key={item.id} delay={i * 0.05}>
            <Card className="h-full !p-0 overflow-hidden">
              <PlaceholderImage
                alt={item.imageAlt}
                className="aspect-[4/3] w-full"
              />
              <div className="p-5">
                <p className="text-[20px] font-semibold uppercase tracking-wider text-coral">
                  {item.genre}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  {item.blurb}
                </p>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

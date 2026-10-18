"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";

export type AnimatedServiceItem = {
  tag: string;
  title: string;
  description: string;
  image?: string;
};

const defaultImages = [
  "/services/ghostwriting.webp",
  "/services/ebook-writing.webp",
  "/services/book-editing.webp",
  "/services/process.webp",
  "/services/hero-books.webp",
];

type AnimatedServiceCardsProps = {
  items: AnimatedServiceItem[];
};

export function AnimatedServiceCards({ items }: AnimatedServiceCardsProps) {
  return (
    <ul className="mt-5 space-y-4">
      {items.map((item, index) => {
        const image = item.image ?? defaultImages[index % defaultImages.length];
        const driftDelay = index * 0.9;

        return (
          <FadeIn key={item.title} delay={index * 0.07}>
            <motion.li
              className="group overflow-hidden rounded-2xl border border-sand bg-white shadow-soft transition-shadow hover:shadow-lift"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative min-h-[12rem] w-full shrink-0 overflow-hidden sm:min-h-[9.5rem] sm:w-56 lg:w-64">
                  <div
                    className="cover-drift absolute inset-0"
                    style={{ animationDelay: `${driftDelay}s` }}
                  >
                    <div
                      className="image-ken-burns absolute -inset-3"
                      style={{ animationDelay: `${driftDelay + 0.4}s` }}
                    >
                      <Image
                        src={image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 256px"
                        className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-center px-5 py-5 sm:px-6">
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#E08A2A]">
                    {item.tag}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-ink sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.li>
          </FadeIn>
        );
      })}
    </ul>
  );
}

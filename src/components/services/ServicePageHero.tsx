"use client";

import { FadeIn } from "@/components/motion/FadeIn";

type ServicePageHeroProps = {
  title: string;
};

export function ServicePageHero({ title }: ServicePageHeroProps) {
  return (
    <section className="bg-service-hero-wash pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <header className="mx-auto max-w-3xl text-center">
            <h1 className="heading-hero sm:text-[3.2rem] lg:text-[3.5rem]">
              {title}
            </h1>
          </header>
        </FadeIn>
      </div>
    </section>
  );
}

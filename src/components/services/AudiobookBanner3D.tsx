"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

type AudiobookBanner3DProps = {
  ctaHref: string;
  ctaLabel: string;
};

export function AudiobookBanner3D({ ctaHref, ctaLabel }: AudiobookBanner3DProps) {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative aspect-[1024/508] w-full overflow-hidden rounded-2xl shadow-lift">
            <Image
              src="/services/audiobook-promo-banner.webp"
              alt="Your Book. Your Voice. Your Audience. — Authors Pilot audiobook production"
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="mt-10 flex justify-center">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

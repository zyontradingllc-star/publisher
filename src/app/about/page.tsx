import type { Metadata } from "next";
import Image from "next/image";
import { about, brandMessages } from "@/content/site";
import { PageHero, CtaBanner } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.description,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <PageHero title={about.hero.title} description={about.hero.description} />

      <FadeIn className="mx-auto mt-10 max-w-3xl text-center">
        <p className="font-display text-[20px] leading-relaxed text-coral-soft">
          {brandMessages.short}
        </p>
      </FadeIn>

      {/* 18 — Why the name */}
      <FadeIn className="mt-14 grid items-center gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-soft sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src="/about-team-storyhands-studio.png"
            alt={about.story.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
            priority
          />
        </div>
        <div>
          <p className="text-[20px] font-medium uppercase tracking-[0.14em] text-coral">
            Why the name Author Forges?
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-forest sm:text-4xl">
            {about.story.title}
          </h2>
          <div className="mt-5 space-y-4">
            {about.story.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="text-base leading-relaxed text-charcoal">
                {p}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* 19 — Our difference */}
      <FadeIn className="mt-20 rounded-soft border border-sand bg-cream px-6 py-10 sm:px-10 sm:py-12">
        <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">
          {about.difference.title}
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-charcoal sm:text-lg">
          {about.difference.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-8">
          {about.difference.pillars.map((pillar) => (
            <li
              key={pillar}
              className="font-display text-[20px] font-semibold text-coral"
            >
              {pillar}
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* 20 — Author experience */}
      <FadeIn className="mt-20">
        <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">
          {about.experience.title}
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-charcoal sm:text-lg">
          {about.experience.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <div className="mt-8">
          <Button href={about.experience.cta.href}>
            {about.experience.cta.label}
          </Button>
        </div>
      </FadeIn>

      {/* 21 — Quality */}
      <FadeIn className="mt-20 border-l-4 border-coral pl-6 sm:pl-8">
        <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">
          {about.quality.title}
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-charcoal sm:text-lg">
          {about.quality.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      </FadeIn>

      <div className="mt-20">
        <CtaBanner
          title="Forge Your Story. Publish Your Legacy."
          description="Bring what you have. We'll help identify the next step."
          cta={{ label: "Start With What I Have", href: "/contact" }}
        />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { howItWorks } from "@/content/site";
import { PageHero, CtaBanner } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "How It Works",
  description: howItWorks.hero.description,
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <PageHero
        title={howItWorks.hero.title}
        description={howItWorks.hero.description}
      />

      <ol className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {howItWorks.steps.map((step, i) => (
          <FadeIn key={step.number} delay={i * 0.04}>
            <li className="h-full rounded-soft border border-sand bg-cream p-6 sm:p-7">
              <p className="font-display text-[20px] font-semibold text-coral/80">
                {step.number}
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold text-forest sm:text-2xl">
                {step.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
                {step.description}
              </p>
            </li>
          </FadeIn>
        ))}
      </ol>

      <div className="mt-20">
        <CtaBanner
          title={howItWorks.closing.title}
          description={howItWorks.closing.description}
          cta={howItWorks.closing.cta}
        />
      </div>
    </div>
  );
}

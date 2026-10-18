import { FadeIn } from "@/components/motion/FadeIn";
import { RotatingBook } from "@/components/ui/RotatingBook";
import { Button } from "@/components/ui/Button";
import { howItWorks } from "@/content/site";

export function ComeToLife() {
  const steps = howItWorks.steps.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-cta-wash py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-coral/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-coral-soft/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <FadeIn>
          <span className="badge-pill">
            Watch It Come To Life
          </span>

          <p className="mt-5 heading-section text-white">
            From a Quiet Manuscript to a Book That{" "}
            <span className="text-[#F2C14D]">Opens the World</span>
          </p>

          <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/70 sm:text-base">
            Every stage reveals a little more of the book you set out to write.
            That moment, when a reader first lifts your cover, is what we design
            every detail to earn.
          </p>

          <ol className="mt-8 space-y-6">
            {steps.map((step, i) => (
              <li key={step.number} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral font-sans text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 max-w-lg font-sans text-sm leading-relaxed text-white/65">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Button href="/contact-author-website-design-agency">Start My Book</Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <RotatingBook />
        </FadeIn>
      </div>
    </section>
  );
}

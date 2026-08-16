import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { RotatingBook } from "@/components/ui/RotatingBook";
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
          <span className="inline-flex items-center gap-2 rounded-full border border-coral/40 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-coral-soft">
            Watch It Come To Life
          </span>

          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
            From a Quiet Manuscript to a Book That{" "}
            <span className="text-coral-soft">Opens the World</span>
          </h2>

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
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#032bb8] px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-wide text-white shadow-cta transition duration-300 hover:-translate-y-0.5 hover:bg-[#02208f] hover:shadow-cta-lg"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%] motion-reduce:hidden"
              />
              <span className="relative">Start My Book</span>
              <span
                aria-hidden="true"
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <RotatingBook />
        </FadeIn>
      </div>
    </section>
  );
}

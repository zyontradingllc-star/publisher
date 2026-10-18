import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { journeyIcons } from "@/components/ui/JourneyIcons";

const covers = [
  { src: "/publishing-work/cover-1.webp", alt: "Published book cover 1" },
  { src: "/publishing-work/cover-2.webp", alt: "Published book cover 2" },
  { src: "/publishing-work/cover-3.webp", alt: "Published book cover 3" },
  { src: "/publishing-work/cover-4.webp", alt: "Published book cover 4" },
  { src: "/publishing-work/cover-5.webp", alt: "Published book cover 5" },
  { src: "/publishing-work/cover-6.webp", alt: "Published book cover 6" },
];

const steps = [
  {
    number: "01",
    title: "Free Consultation & Manuscript Review",
    description:
      "Share the idea, draft, or notes you already have. We listen, review the material, and map the right publishing path.",
  },
  {
    number: "02",
    title: "Professional Editing",
    description:
      "Structure, line, and proof editing so the manuscript reads with clarity, pace, and a confident author voice.",
  },
  {
    number: "03",
    title: "Cover Design",
    description:
      "A market-ready cover that belongs on the shelf — typography, imagery, and genre cues working together.",
  },
  {
    number: "04",
    title: "Formatting",
    description:
      "Print and ebook interiors laid out for comfortable reading — margins, type, and chapter flow done properly.",
  },
  {
    number: "05",
    title: "Print, ISBN & Distribution",
    description:
      "ISBN, print files, and retailer setup so the book can reach Amazon, Ingram, and the stores readers already use.",
  },
  {
    number: "06",
    title: "Launch & Marketing",
    description:
      "A launch plan, author brand, and promotion so the finished book has somewhere — and someone — to go.",
  },
];

export function PublishingJourney() {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
                <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
              </svg>
              Six Steps. Zero Guesswork.
            </span>
            <h2 className="mt-4 heading-section">How It Works</h2>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              A clear, collaborative path that turns your manuscript into a
              published, best-selling book, with you in control at every step.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="cover-drift mx-auto grid max-w-md grid-cols-3 gap-3 sm:max-w-lg sm:gap-4">
            {covers.map((cover) => (
              <div
                key={cover.src}
                className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-book ring-1 ring-sand"
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="160px"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = journeyIcons[i];
              return (
              <FadeIn key={step.number} delay={i * 0.04}>
                <div>
                  <Icon />
                  <p className="mt-3 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
                    — Step {step.number}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
              );
            })}
          </div>

        <FadeIn className="mt-12 flex justify-center">
          <Button href="/contact-author-website-design-agency">Start Your Publishing Journey</Button>
        </FadeIn>
      </div>
    </section>
  );
}

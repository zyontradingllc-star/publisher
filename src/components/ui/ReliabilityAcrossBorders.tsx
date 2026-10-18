import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

const portraits = [
  {
    src: "/book-fair/fair12.webp",
    alt: "Authors celebrating a newly published book",
    className:
      "absolute left-[4%] top-[28%] z-10 h-[42%] w-[42%] sm:left-[6%] sm:h-[46%] sm:w-[46%]",
    object: "object-[center_20%]",
  },
  {
    src: "/book-fair/fair6.webp",
    alt: "Authors at an international book fair",
    className:
      "absolute right-[4%] top-[16%] z-20 h-[34%] w-[34%] sm:right-[8%] sm:h-[38%] sm:w-[38%]",
    object: "object-center",
  },
  {
    src: "/book-fair/fair3.webp",
    alt: "Reader discovering a book at a fair booth",
    className:
      "absolute right-[2%] top-[52%] z-10 h-[36%] w-[36%] sm:right-[4%] sm:h-[40%] sm:w-[40%]",
    object: "object-[center_30%]",
  },
];

const points = [
  "A trusted publishing partner for authors across the USA, UK & Europe",
  "Consistently rated 4.9/5 for author satisfaction",
  "Dedicated account managers in your time zone, every step of the way",
  "Secure contracts, transparent pricing and 100% of your rights retained",
];

function CheckMark() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#273E2B] text-white">
      <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" aria-hidden>
        <path
          d="M5 10.5 8.2 13.5 15 6.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function ReliabilityAcrossBorders() {
  return (
    <section className="relative overflow-hidden bg-warm-wash py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#A7C4AB]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#273E2B]/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
        <FadeIn>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute left-[12%] top-[20%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(224,138,42,0.16),transparent)]"
            />

            <span className="absolute left-[14%] top-2 z-30 max-w-[11.5rem] rounded-xl bg-[#273E2B] px-3 py-2 font-sans text-[11px] font-bold leading-snug text-white shadow-cta sm:left-[16%] sm:max-w-[13rem] sm:text-xs">
              Trusted by 500+ authors worldwide
            </span>

            {portraits.map((portrait, i) => (
              <div
                key={portrait.src}
                className={`${portrait.className} image-bob overflow-hidden rounded-full bg-ivory shadow-lift ring-[5px] ring-white ${
                  i === 1 ? "image-bob-delay" : i === 2 ? "image-bob-delay-2" : ""
                }`}
              >
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="220px"
                  className={`image-ken-burns object-cover ${portrait.object}`}
                />
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <span className="badge-pill">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" />
              <path
                strokeLinecap="round"
                d="M3 12h18M12 3c2.5 3 3.8 6 3.8 9s-1.3 6-3.8 9c-2.5-3-3.8-6-3.8-9s1.3-6 3.8-9z"
              />
            </svg>
            Reliability Across Borders
          </span>

          <h2 className="mt-5 heading-section">
            Why Authors Choose AuthorsPilot
          </h2>

          <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
            Authors on both sides of the Atlantic choose Authors Pilot because we
            combine boutique, author-first care with the reach of a global house.
            Wherever you write from, your book gets the same standard — and a
            team that actually answers.
          </p>

          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckMark />
                <span className="font-sans text-sm leading-snug text-ink sm:text-[15px]">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 md:justify-start">
            <Button href="/contact-author-website-design-agency">Talk to Our Team</Button>
            <div className="flex items-center gap-2">
              <span className="inline-flex text-[#E08A2A]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 20 20"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
                  </svg>
                ))}
              </span>
              <span className="font-sans text-sm text-charcoal">
                Trusted by authors worldwide
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

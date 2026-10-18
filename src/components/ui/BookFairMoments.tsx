import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

const moments = [
  {
    src: "/book-fair-moments/moment-authors.webp",
    alt: "Authors collaborating on a book project",
  },
  {
    src: "/book-fair-moments/moment2.webp",
    alt: "Author writing and planning a manuscript",
  },
  {
    src: "/book-fair/fair1.webp",
    alt: "Authors and readers meeting at a book fair",
  },
  {
    src: "/book-fair/fair2.webp",
    alt: "Writers workshop at a literary event",
  },
];

export function BookFairMoments() {
  return (
    <section className="bg-warm-wash py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <FadeIn>
          <span className="badge-pill">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5.5A1.5 1.5 0 0 1 6.5 4H11v16H6.5A1.5 1.5 0 0 1 5 18.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 5.5A1.5 1.5 0 0 0 17.5 4H13v16h4.5A1.5 1.5 0 0 0 19 18.5z"
              />
            </svg>
            Book Fair Moments
          </span>
          <p className="mt-4 heading-section">
            Meeting Authors On The
            <span className="mt-1 block text-4xl text-[#E08A2A] sm:text-5xl">
              World Stage
            </span>
          </p>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
            From US to Frankfurt, here are real moments from Authors Pilot
            booths — authors, editors and readers, together.
          </p>
        </FadeIn>
      </div>

      <FadeIn className="mx-auto mt-10 max-w-5xl px-4 sm:mt-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-6">
          {moments.map((shot, i) => (
            <div
              key={shot.src}
              className={`relative h-52 w-36 shrink-0 overflow-hidden rounded-2xl shadow-book ring-1 ring-sand sm:h-60 sm:w-40 ${
                i % 2 === 0 ? "polaroid-bob-left" : "polaroid-bob-right"
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="160px"
                loading="lazy"
                className="image-ken-burns object-cover object-center"
              />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}


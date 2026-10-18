import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { AMAZON_BESTSELLERS_URL } from "@/components/portfolio/AmazonBestsellers";

const spotlight = [
  "Speak With No Fear",
  "Cover Design 2",
  "Journey of Life",
  "Cover Design 4",
  "They Hunt",
  "Cover Design 6",
  "Cover Design 7",
  "Cover Design 8",
  "Our Deadly Designs",
  "Cover Design 10",
  "Cover Design 11",
  "Cover Design 12",
  "Cover Design 13",
  "Rhapsody of Fire",
  "Cover Design 15",
  "Cover Design 16",
  "Cover Design 17",
  "Cover Design 18",
  "Cover Design 19",
  "Painted With Plum and Silence",
  "Cover Design 21",
  "Cover Design 22",
].map((title, i) => ({
  title,
  src: `/covers-that-sell/cover-${i + 1}.webp`,
  genre: [
    "Non-Fiction",
    "Mystery",
    "Biography",
    "Romance",
    "Thriller",
    "Sci-Fi",
    "Fantasy",
    "Thriller",
    "Fantasy",
    "Romance",
    "Mystery",
    "Non-Fiction",
    "Sci-Fi",
    "Fantasy",
    "Thriller",
    "Biography",
    "Romance",
    "Mystery",
    "Non-Fiction",
    "Romance",
    "Thriller",
    "Sci-Fi",
    "Fantasy",
    "Biography",
  ][i],
}));

export function AmazonSpotlight() {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="badge-pill gap-1.5">
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
                <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
              </svg>
              Amazon Spotlight
            </span>
            <p className="mt-4 heading-section">
              Bestsellers From{" "}
              <span className="text-[#E08A2A]">Authors Pilot</span>
            </p>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              Books we designed and published, now climbing the charts. Tap
              through and see them live on Amazon.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="marquee mt-10 sm:mt-12">
        <div className="marquee-track" style={{ animationDuration: "55s" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {spotlight.map((book) => (
                <figure
                  key={`${copy}-${book.title}`}
                  className="mx-3 w-36 shrink-0 sm:mx-4 sm:w-40"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-book ring-1 ring-sand">
                    <Image
                      src={book.src}
                      alt={book.title}
                      fill
                      sizes="160px"
                      loading="lazy"
                      className="image-ken-burns object-cover object-center"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-charcoal">
                      {book.genre}
                    </span>
                    <Link
                      href={AMAZON_BESTSELLERS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 font-sans text-[10px] font-semibold text-[#E08A2A] underline-offset-2 hover:underline"
                    >
                      View on Amazon
                    </Link>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

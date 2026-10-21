import Image from "next/image";
import { Button } from "@/components/ui/Button";

/** Authors Pilot BookStore landing (Coming Soon). No external retailer links. */
const STORE_HREF = "/bookstore";

const books = [
  {
    title: "Verity",
    author: "Colleen Hoover",
    badge: "Best Seller",
    formats: "Options: 12 languages, 8 formats",
    rating: "4.6",
    reviews: "530.2K",
    src: "/featured-row-2/verity.webp",
  },
  {
    title: "In the Shadow of Eight: Surviving the Reality of My Childhood",
    author: "Collin Gosselin",
    badge: "Best Seller",
    formats: "Options: 3 formats",
    rating: "4.9",
    reviews: "1.5K",
    src: "/featured-row-2/shadow-of-eight.webp",
  },
  {
    title: "The Correspondent: A Novel",
    author: "Virginia Evans",
    badge: "Best Seller",
    formats: "Options: 7 languages, 4 formats",
    rating: "4.5",
    reviews: "176.3K",
    src: "/featured-row-2/correspondent.webp",
  },
  {
    title: "The Hollow: A Harry Bosch Novel",
    author: "Michael Connelly",
    series: "Book 21 of 21: Harry Bosch",
    formats: "Options: 5 formats",
    src: "/featured-row-2/the-hollow.webp",
  },
  {
    title: "The Night of the Crash",
    author: "Jessica Irena Smith",
    formats: "Options: 3 formats",
    rating: "4.2",
    reviews: "13.1K",
    src: "/featured-row-2/night-of-the-crash.webp",
  },
] as const;

export function BestsellersPublishRow() {
  return (
    <section className="border-b border-sand bg-[#F3F4F6] py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">
              Featured Books
            </p>
            <h2 className="mt-2 heading-section">Discover Your Next Great Read</h2>
            <p className="mt-2 max-w-xl text-sm text-charcoal sm:text-base">
              <span className="font-semibold text-ink">Are You an Author?</span>{" "}
              Showcase your books, reach new readers, and keep control of your
              sales. Authors Pilot takes 0% commission.
            </p>
          </div>
          <Button href={STORE_HREF}>Browse Store</Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-5 md:gap-x-5">
          {books.map((book) => (
            <a key={book.title} href={STORE_HREF} className="group block">
              {"badge" in book && book.badge ? (
                <span className="mb-1.5 inline-block rounded-sm bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink shadow-cta">
                  {book.badge}
                </span>
              ) : (
                <span className="mb-1.5 block h-[18px]" aria-hidden />
              )}
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-white shadow-soft ring-1 ring-sand transition group-hover:-translate-y-0.5 group-hover:shadow-lift">
                <Image
                  src={book.src}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 45vw, 180px"
                  className="object-cover object-top"
                />
              </div>
              <p className="mt-2.5 line-clamp-2 text-sm font-bold leading-snug text-ink">
                {book.title}
              </p>
              <p className="mt-0.5 line-clamp-1 text-xs text-charcoal">
                by {book.author}
              </p>
              {"series" in book && book.series ? (
                <p className="mt-0.5 line-clamp-1 text-[11px] text-forest-muted">
                  {book.series}
                </p>
              ) : null}
              <p className="mt-1 text-[11px] text-forest-muted">{book.formats}</p>
              {"rating" in book && book.rating ? (
                <p className="mt-1 text-[11px] text-coral">
                  ★ {book.rating}
                  {"reviews" in book && book.reviews
                    ? ` (${book.reviews})`
                    : null}
                </p>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

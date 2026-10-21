import Image from "next/image";
import { Button } from "@/components/ui/Button";

/** Authors Pilot BookStore landing (Coming Soon). No external Kobo links. */
const STORE_HREF = "/bookstore";

const books = [
  {
    title: "Chain Reaction",
    author: "Lee Child, Andrew Child",
    src: "/kobo/book-1.webp",
  },
  {
    title: "The Summer Hikaru Died, Chapter 51",
    author: "Mokumokuren, Abigail Blackman",
    rating: "5.0 (4)",
    src: "/kobo/book-2.webp",
  },
  {
    title: "Shadow of Fall",
    author: "Rebecca Zanetti",
    rating: "4.5 (7)",
    src: "/kobo/book-3.webp",
  },
  {
    title: "A Court of Splintered Harmony",
    author: "Sarah J. Maas",
    rating: "5.0 (6)",
    src: "/kobo/book-4.webp",
  },
  {
    title: "Wild Wicked Mate",
    author: "Laurie Gilmore",
    rating: "5.0 (1)",
    src: "/kobo/book-5.webp",
  },
] as const;

export function KoboPublishRow() {
  return (
    <section className="border-b border-sand bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">
              Publish
            </p>
            <h2 className="mt-2 heading-section">
              Featured on <span className="text-coral">Authors Pilot</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-charcoal sm:text-base">
              Publish your book and reach readers in the Authors Pilot BookStore.
            </p>
          </div>
          <Button href={STORE_HREF}>Browse Store</Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-5 md:gap-x-5">
          {books.map((book) => (
            <a key={book.title} href={STORE_HREF} className="group block">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-ivory shadow-soft ring-1 ring-sand transition group-hover:-translate-y-0.5 group-hover:shadow-lift">
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
                {book.author}
              </p>
              {"rating" in book && book.rating ? (
                <p className="mt-1 text-[11px] text-coral">★ {book.rating}</p>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

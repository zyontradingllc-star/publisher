import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

const books = [
  { title: "Every Time I Die", src: "/books/book1.jpg" },
  { title: "Oppenheimer", src: "/books/book2.jpg" },
  { title: "Re-Creation", src: "/books/book3.jpg" },
  { title: "Misdirection", src: "/books/book4.jpg" },
  { title: "Broken Trust", src: "/books/book5.jpg" },
  { title: "A Single Flame", src: "/books/book6.jpg" },
  { title: "Longing", src: "/books/book7.jpg" },
  { title: "Next", src: "/books/book8.jpg" },
  { title: "The Crimes of Steamfield", src: "/books/book9.jpg" },
  { title: "Hidden Figures", src: "/books/book10.jpg" },
  { title: "Ponies", src: "/books/book11.jpg" },
];

export function BookShowcase() {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <FadeIn>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Recommended For You
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
            Our team of exceptionally skilled ghostwriters, editors, and
            publishing experts work seamlessly to bring your vision to life —
            ensuring every effort is strategically invested in making you a
            highly sought-after author.
          </p>
        </div>
      </FadeIn>

      <div className="marquee mt-10 sm:mt-12">
        <div className="marquee-track" style={{ animationDuration: "60s" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {books.map((book) => (
                <figure key={`${copy}-${book.title}`} className="mx-4 shrink-0 sm:mx-5">
                  <div className="relative h-64 w-44 overflow-hidden rounded-lg shadow-book sm:h-72 sm:w-48">
                    <Image
                      src={book.src}
                      alt={book.title}
                      fill
                      sizes="192px"
                      className="object-cover object-center"
                    />
                  </div>
                  <figcaption className="mt-4 text-center font-sans text-sm font-bold text-ink">
                    {book.title}
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

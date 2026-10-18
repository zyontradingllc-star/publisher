import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

export const AMAZON_BESTSELLERS_URL =
  "https://www.amazon.com/gp/bestsellers/books";

type BestSeller = {
  title: string;
  author?: string;
  src: string;
  rating: number;
  reviews: string;
  price: string;
  listPrice?: string;
  discount?: string;
  bestSeller?: boolean;
};

const books: BestSeller[] = [
  {
    title: "Death Row",
    author: "Freida McFadden",
    src: "/amazon-books/cover1.webp",
    rating: 3.8,
    reviews: "127,876",
    price: "$1.99",
    bestSeller: true,
  },
  {
    title: "The Friend of the Family",
    author: "Dean Koontz",
    src: "/amazon-books/cover2.webp",
    rating: 4.5,
    reviews: "16,285",
    price: "$9.99",
    bestSeller: true,
  },
  {
    title: "If You Tell",
    author: "Gregg Olsen",
    src: "/amazon-books/cover3.webp",
    rating: 4.2,
    reviews: "184,925",
    price: "$2.49",
    listPrice: "$4.99",
    discount: "-50%",
    bestSeller: true,
  },
  {
    title: "The Last Letter of Rachel Ellsworth",
    author: "Barbara O'Neal",
    src: "/amazon-books/cover4.webp",
    rating: 4.5,
    reviews: "17,354",
    price: "$2.49",
    listPrice: "$4.99",
    discount: "-50%",
    bestSeller: true,
  },
  {
    title: "The Price of Honey",
    author: "Liane Moriarty",
    src: "/amazon-books/cover5.webp",
    rating: 3.7,
    reviews: "30,893",
    price: "$1.99",
    bestSeller: true,
  },
  {
    title: "No One Knew",
    author: "Kendra Elliot",
    src: "/amazon-books/cover6.webp",
    rating: 4.5,
    reviews: "23,920",
    price: "$6.99",
    bestSeller: true,
  },
  {
    title: "S'more of You",
    author: "Tessa Bailey",
    src: "/amazon-books/cover7.webp",
    rating: 3.6,
    reviews: "8,180",
    price: "$1.99",
    bestSeller: true,
  },
  {
    title: "Woman Down",
    author: "Colleen Hoover",
    src: "/amazon-books/cover8.webp",
    rating: 4.0,
    reviews: "77,086",
    price: "$5.99",
  },
  {
    title: "The Stopover",
    author: "T L Swan",
    src: "/amazon-books/cover9.webp",
    rating: 4.4,
    reviews: "101,407",
    price: "$3.99",
  },
  {
    title: "The Wild Card",
    author: "Carolyn Brown",
    src: "/amazon-books/cover10.webp",
    rating: 4.4,
    reviews: "8,611",
    price: "$4.99",
  },
  {
    title: "In the Likely Event",
    author: "Rebecca Yarros",
    src: "/amazon-books/cover11.webp",
    rating: 4.5,
    reviews: "131,388",
    price: "$4.99",
  },
  {
    title: "What She Saw",
    author: "Mary Burton",
    src: "/amazon-books/cover12.webp",
    rating: 4.3,
    reviews: "43,896",
    price: "$5.99",
    bestSeller: true,
  },
  {
    title: "Reminders of Him",
    author: "Colleen Hoover",
    src: "/amazon-books/cover13.webp",
    rating: 4.7,
    reviews: "408,224",
    price: "$5.99",
    bestSeller: true,
  },
  {
    title: "The Perfect Child",
    author: "Lucinda Berry",
    src: "/amazon-books/cover14.webp",
    rating: 4.2,
    reviews: "104,122",
    price: "$4.99",
    bestSeller: true,
  },
  {
    title: "Every Time I Die",
    src: "/books/book1.webp",
    rating: 4.1,
    reviews: "21,430",
    price: "$2.99",
    listPrice: "$5.99",
    discount: "-50%",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-px" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => {
        const lit = rating >= i + 0.5;
        return (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5"
            fill={lit ? "#FFA41C" : "#D4D4D4"}
          >
            <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
          </svg>
        );
      })}
    </span>
  );
}

export function AmazonBestsellers() {
  return (
    <section className="rounded-soft border border-sand bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-sans text-xl font-bold text-ink sm:text-2xl">
            Best sellers in Amazon Original books
          </h2>
          <Link
            href={AMAZON_BESTSELLERS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-semibold text-coral underline-offset-2 transition hover:underline"
          >
            See all on Amazon →
          </Link>
        </div>
      </FadeIn>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {books.map((book, i) => (
          <FadeIn key={book.title} delay={i * 0.03}>
            <Link
              href={AMAZON_BESTSELLERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col"
            >
              <div className="relative w-full">
                {book.bestSeller && (
                  <span className="absolute left-0 top-0 z-10 rounded-sm bg-[#C45500] px-1.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide text-white">
                    Best Seller
                  </span>
                )}
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-sm border-[10px] border-slate shadow-book transition group-hover:shadow-lift">
                  <Image
                    src={book.src}
                    alt={book.author ? `${book.title} by ${book.author}` : book.title}
                    fill
                    sizes="(max-width: 640px) 40vw, (max-width: 1280px) 16vw, 130px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="font-sans text-xs font-semibold text-ink">
                  {book.rating.toFixed(1)}
                </span>
                <Stars rating={book.rating} />
                <span className="font-sans text-xs text-coral">
                  {book.reviews}
                </span>
              </div>

              <p className="mt-1.5 font-sans text-[11px] font-medium leading-tight text-[#C45500]">
                kindleunlimited
              </p>
              <p className="mt-0.5 font-sans text-xs text-ink">Kindle Edition</p>

              <div className="mt-1.5">
                {book.discount && (
                  <span className="mr-1.5 font-sans text-xs font-semibold text-[#CC0C39]">
                    {book.discount}
                  </span>
                )}
                <span className="font-sans text-sm font-bold text-ink">
                  {book.price}
                </span>
                {book.listPrice && (
                  <p className="mt-0.5 font-sans text-[11px] text-charcoal">
                    Digital List Price:{" "}
                    <span className="line-through">{book.listPrice}</span>
                  </p>
                )}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

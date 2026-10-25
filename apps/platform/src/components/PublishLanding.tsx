import Image from "next/image";
import Link from "next/link";
import { AuthorCard } from "@/components/AuthorCard";
import { BookCard } from "@/components/BookCard";
import { PricingNotice } from "@/components/PricingNotice";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { VS_BOOKS2READ_POINTS } from "@/lib/seo-content";
import { MARKETING_HOME_URL, platformPublicPath } from "@/lib/utils";
import type { BookWithRelations, Profile } from "@/types/database";

/** Featured books + authors stay hidden until catalog reaches this size. */
const FEATURED_MIN_BOOKS = 10;

const STEPS = [
  {
    title: "Share your author story",
    body: "After approval, each author gets a separate public page - a dedicated link for your profile and books.",
  },
  {
    title: "Submit your book listing",
    body: "Add cover, description, genre, and the external links where readers can buy.",
  },
  {
    title: "We review for quality",
    body: "Our team checks listings against author guidelines before they go live.",
  },
  {
    title: "Readers click out to buy",
    body: "Purchases happen on your website, Amazon, or other channels you choose - not on Authors Pilot.",
  },
];

const HOME_FAQ = [
  {
    question: "What is Authors Pilot, and who is it for?",
    answer:
      "Authors Pilot is an independent author platform offering book discovery, author profiles, book promotion, and professional publishing services. Whether you're writing your first book or already have published titles, Authors Pilot helps you build your author presence, reach readers, and grow your writing career.",
  },
  {
    question: "Can Authors Pilot help me publish my first book?",
    answer: [
      "Yes! Authors Pilot supports first-time writers and aspiring authors with services such as manuscript preparation, book formatting, professional cover design, publishing assistance, and author website development.",
      "Our goal is to help you turn your manuscript into a professionally presented book and establish your online author presence.",
    ],
  },
  {
    question: "I already published my book. Can I list it on Authors Pilot?",
    answer: [
      "Absolutely! If your book is already available on Amazon, Barnes & Noble, your author website, or another bookstore, you can submit it to Authors Pilot.",
      "Once approved, your book listing can include its cover, description, genre, author details, and external purchase links to help readers discover where to buy it.",
    ],
  },
  {
    question: "Does Authors Pilot sell my books or charge sales commissions?",
    answer: [
      "Authors Pilot does not process purchases through its book discovery listings. Instead, we connect readers to your preferred bookstores, publishing platforms, or author website.",
      "Authors Pilot takes no commission on sales made through those links. External retailers may apply their own fees. Optional professional publishing and marketing services may have separate charges.",
    ],
  },
  {
    question: "Can Authors Pilot help me build my author brand and business?",
    answer:
      "Yes! Authors Pilot helps authors move beyond simply publishing a book. Through author websites, professional branding, book promotion, and online visibility services, we help writers establish a stronger digital presence and build their author business.",
  },
];

type PublishLandingProps = {
  books: BookWithRelations[];
  authors: Profile[];
  publishedCount: number;
};

export function PublishLanding({
  books,
  authors,
  publishedCount,
}: PublishLandingProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-sand bg-[#1a0a0a]">
        <div className="relative mx-auto w-full max-w-[1400px]">
          {/* Shorter crop: keep headline + eagle in frame, cut empty forest from bottom */}
          <div className="relative aspect-[3/1] w-full min-h-[140px] sm:min-h-[200px] lg:min-h-[260px]">
            <Image
              src={platformPublicPath("/banners/publish-home-halloween.jpg")}
              alt="Authors Pilot — Get one link, sell it anywhere. Keep 100% of your book earnings."
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[50%_28%]"
            />
          </div>
          <h1 className="sr-only">
            Publish Your Book. Get One Link to Sell It Anywhere. Keep 100% of
            Your Book Earnings.
          </h1>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 sm:px-6 sm:pb-5 sm:pt-12">
            <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-3">
              <p className="max-w-xl text-sm text-white/90 sm:text-base">
                List your book, get a free author page and shareable link, and
                send readers to Amazon or your website.
              </p>
              <Button href="/signup?google=1">Get Your Link</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="heading-section">Keep 100% of Your Book Earnings</h2>
            <p className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">
              Your Books. Your Readers. Your Revenue.
            </p>
            <p className="mt-4 text-charcoal">
              Turn your published books into opportunities. Authors Pilot helps
              readers discover your titles and connects them directly to your
              preferred sales channels. We don&apos;t process payments or take
              commissions on your book sales.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-charcoal">
              <li>
                <span className="font-semibold text-ink">Showcase Your Books</span>
                {" - "}
                List your published titles with beautiful covers, descriptions,
                and genres.
              </li>
              <li>
                <span className="font-semibold text-ink">Sell Your Way</span>
                {" - "}
                Connect readers to Amazon, your author website, or other
                bookstores.
              </li>
              <li>
                <span className="font-semibold text-ink">Track Reader Interest</span>
                {" - "}
                Monitor outbound clicks through your author dashboard and
                discover which books attract attention.
              </li>
            </ul>
            <p className="mt-5 font-display text-base font-bold text-ink sm:text-lg">
              You Own Your Books. You Control Your Sales. We Help Readers Find
              You.
            </p>
          </div>
          <PricingNotice />
        </div>
      </section>

      <section className="border-y border-sand bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="heading-section">
            Why Authors Choose Authors Pilot Over Books2Read
          </h2>
          <p className="mt-3 max-w-3xl text-charcoal">
            Link-only tools such as Books2Read, Booklinker, Geniuslink, BookFunnel,
            and 1link.st mostly redirect. Authors Pilot adds a branded author page,
            click analytics, and a keep-100%-royalties model with no commission.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {VS_BOOKS2READ_POINTS.map((item) => (
              <li
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC] p-5 shadow-soft"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-5 h-16 w-16 rounded-full bg-white/50"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-5 left-6 h-12 w-12 rounded-full bg-sky-700/10"
                />
                <p className="relative font-display text-lg font-bold text-ink">
                  {item.title}
                </p>
                <p className="relative mt-2 text-sm text-ink/75">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/vs-books2read/">Authors Pilot vs Books2Read</Button>
            <Button href="/vs-booklinker/" variant="ghost">
              vs Booklinker
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-sand bg-ivory/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="heading-section">Sell Your Books. Own Your Business.</h2>
          <p className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">
            Your Store. Your Customers. Your Earnings.
          </p>
          <p className="mt-4 max-w-3xl text-charcoal">
            Build your author brand and sell books directly through your own
            website. With Authors Pilot, you can showcase your titles, reach new
            readers, and send buyers straight to your preferred store - without
            paying Authors Pilot a sales commission.
          </p>
          <ul className="mt-5 max-w-3xl space-y-3 text-sm text-charcoal">
            <li>
              <span className="font-semibold text-ink">
                Own Your Customer Relationships
              </span>
              {" - "}
              Build direct connections with readers through your website.
            </li>
            <li>
              <span className="font-semibold text-ink">
                Drive Traffic to Your Store
              </span>
              {" - "}
              Turn book discovery into potential sales.
            </li>
            <li>
              <span className="font-semibold text-ink">
                Grow Your Author Business
              </span>
              {" - "}
              Build your audience, strengthen your brand, and stay in control of
              your sales channels.
            </li>
          </ul>
          <div className="mt-8">
            <Button href="/signup?google=1">List Your Book</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="heading-section">How publishing works</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="relative overflow-hidden rounded-2xl border border-[#A7C4AB]/50 bg-gradient-to-br from-[#273E2B] via-[#2F4A33] to-[#3A5640] p-5 shadow-soft"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-5 h-16 w-16 rounded-full bg-[#A7C4AB]/30"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-5 left-4 h-12 w-12 rounded-full bg-white/10"
              />
              <span className="relative text-xs font-bold uppercase tracking-wide text-[#A7C4AB]">
                Step {i + 1}
              </span>
              <h3 className="relative mt-2 font-display text-lg font-bold text-white">
                {step.title}
              </h3>
              <p className="relative mt-2 text-sm text-white/75">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Button href="/how-publishing-works" variant="ghost">
            Read the full guide
          </Button>
        </div>
      </section>

      {publishedCount >= FEATURED_MIN_BOOKS ? (
        <>
          <section className="border-t border-sand bg-white">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="heading-section">Featured books</h2>
                <Link href="/books" className="text-sm font-semibold text-coral hover:underline">
                  View all books →
                </Link>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-sand">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="heading-section">Featured authors</h2>
                <Link href="/authors" className="text-sm font-semibold text-coral hover:underline">
                  Browse authors →
                </Link>
              </div>
              {authors.length > 0 ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {authors.map((author) => (
                    <AuthorCard key={author.id} author={author} />
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        </>
      ) : null}

      <section className="border-t border-sand bg-[#C9D3C8]/45">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="heading-section">
            Your Publishing Questions, Answered
          </h2>
          <p className="mt-3 max-w-3xl text-charcoal">
            From your first manuscript to your next book launch, discover how
            Authors Pilot helps writers publish with confidence, promote their
            books, build their author brand, and connect with readers worldwide.
          </p>
          <div className="mt-8">
            <Accordion items={HOME_FAQ} />
          </div>
          <p className="mt-8 text-center font-display text-lg font-bold text-ink sm:text-xl">
            Your Story. Your Books. Your Brand.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button href="/signup?google=1">Get Your Link</Button>
            <Button href={MARKETING_HOME_URL} variant="ghost">
              Explore Author Services
            </Button>
          </div>
          <p className="mt-6 text-center text-sm text-forest-muted">
            More answers on our{" "}
            <Link
              href="/faq"
              className="font-semibold text-coral hover:underline"
            >
              FAQ page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-sand bg-[#E8F4FC]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <PricingNotice />
          <div className="mt-8 text-center">
            <Button href="/signup?google=1">Get Your Link</Button>
          </div>
        </div>
      </section>
    </>
  );
}

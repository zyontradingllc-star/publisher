import Link from "next/link";
import { AuthorCard } from "@/components/AuthorCard";
import { BookCard } from "@/components/BookCard";
import { BestsellersPublishRow } from "@/components/BestsellersPublishRow";
import { KoboPublishRow } from "@/components/KoboPublishRow";
import { PricingNotice } from "@/components/PricingNotice";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { MARKETING_HOME_URL } from "@/lib/utils";
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
      <section className="border-b border-sand bg-cta-wash text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-soft">
            Independent Publishing Platform
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[1.85rem] font-bold leading-tight sm:text-4xl lg:text-5xl">
            Your Books. Your Readers. 100% Your Earnings.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
            Publish your book listings, reach new readers, and grow your author
            brand with AuthorsPilot. Connect readers directly to your website or
            preferred sales channels. No commissions. No middlemen. You stay in
            control.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/publish/start">Submit Your Book</Button>
            <Button
              href="/books"
              variant="ghost"
              className="!border-white/40 !bg-white/10 !text-white hover:!bg-white/20"
            >
              Explore Books
            </Button>
          </div>
        </div>
      </section>

      <KoboPublishRow />
      <BestsellersPublishRow />

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
            <Button href="/publish/start">List Your Book</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="heading-section">How publishing works</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="card-surface">
              <span className="text-xs font-bold uppercase tracking-wide text-coral">
                Step {i + 1}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-charcoal">{step.body}</p>
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
            <Button href="/publish/start">Submit Your Book</Button>
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

      <section className="border-t border-sand bg-[#F0F5F1]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <PricingNotice />
          <div className="mt-8 text-center">
            <Button href="/publish/start">Submit Your Book</Button>
          </div>
        </div>
      </section>
    </>
  );
}

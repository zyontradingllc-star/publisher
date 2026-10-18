import Link from "next/link";
import { AuthorCard } from "@/components/AuthorCard";
import { BookCard } from "@/components/BookCard";
import { PricingNotice } from "@/components/PricingNotice";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublicAuthors, getPublishedBooks } from "@/lib/books";
import { isFirebaseConfigured } from "@/lib/firebase/config";

const STEPS = [
  {
    title: "Create your account",
    body: "Sign up free during launch and complete your public author profile.",
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
    body: "Purchases happen on your website, Amazon, or other channels you choose — not on Authors Pilot.",
  },
];

const HOME_FAQ = [
  {
    q: "Does Authors Pilot sell my books?",
    a: "No. We publish discoverable listings and send readers to your external purchase links.",
  },
  {
    q: "Do I keep my royalties?",
    a: "Yes. You keep 100% of book royalties from sales on your own channels. We do not take a cut of your book sales.",
  },
  {
    q: "Is there a cost to join?",
    a: "Access is free during launch. Paid plans may be introduced later with advance notice.",
  },
];

export default async function HomePage() {
  // Public catalog still uses empty/fallback until Firestore public queries are wired
  const configured = isFirebaseConfigured();
  const books: Awaited<ReturnType<typeof getPublishedBooks>>["books"] = [];
  const authors: Awaited<ReturnType<typeof getPublicAuthors>>["authors"] = [];
  const fetchError: string | null = null;
  void configured;
  void fetchError;

  return (
    <>
      <section className="border-b border-sand bg-cta-wash text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-soft">
            Independent publishing platform
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[1.85rem] font-bold leading-tight sm:text-4xl lg:text-5xl">
            Publish book listings. Keep 100% of your earnings.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
            Authors Pilot helps readers discover your work and sends them to your own website or
            chosen sales channels. We never process book checkout on this platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/signup">Signup As Author</Button>
            <Button href="/books" variant="ghost" className="!border-white/40 !bg-white/10 !text-white hover:!bg-white/20">
              Explore Books
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="heading-section">Keep 100% of your book royalties</h2>
            <p className="mt-4 text-charcoal">
              Your readers pay you through the stores and websites you control. Authors Pilot is
              a discovery and listing layer — not a bookstore taking a commission on each sale.
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-charcoal">
              <li>List published titles with cover, description, and genre</li>
              <li>Add Amazon, author website, and other outbound purchase links</li>
              <li>Track outbound clicks from your dashboard (analytics only, not confirmed sales)</li>
            </ul>
          </div>
          <PricingNotice />
        </div>
      </section>

      <section className="border-y border-sand bg-ivory/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="heading-section">Sell through your own website</h2>
          <p className="mt-3 max-w-3xl text-charcoal">
            Direct sales on your site mean you own the customer relationship. Point your primary
            purchase button to your store, then use Authors Pilot to reach new readers.
          </p>
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

      <section className="border-t border-sand bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="heading-section">Featured books</h2>
            <Link href="/books" className="text-sm font-semibold text-coral hover:underline">
              View all books →
            </Link>
          </div>
          {!configured ? (
            <div className="mt-8">
            <EmptyState
              title="Catalog not connected"
              description="Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to show live book listings."
              actionHref="/signup"
              actionLabel="Create author account"
            />
            </div>
          ) : fetchError ? (
            <div className="mt-8">
            <EmptyState
              title="Could not load books"
              description={fetchError}
              actionHref="/books"
              actionLabel="Try the books page"
            />
            </div>
          ) : books.length === 0 ? (
            <div className="mt-8">
            <EmptyState
              title="No published books yet"
              description="Be among the first authors on Authors Pilot — submit a listing from your dashboard after sign-up."
              actionHref="/signup"
              actionLabel="Start Publishing Free"
            />
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
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
          {configured && authors.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {authors.map((author) => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </div>
          ) : configured ? (
            <div className="mt-8">
            <EmptyState
              title="No public author profiles yet"
              description="Authors appear here once they publish a public profile and at least one listing."
              actionHref="/signup"
              actionLabel="Join as an author"
            />
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="heading-section">Common questions</h2>
        <dl className="mt-8 space-y-6">
          {HOME_FAQ.map((item) => (
            <div key={item.q} className="card-surface">
              <dt className="font-display text-lg font-bold text-ink">{item.q}</dt>
              <dd className="mt-2 text-sm text-charcoal">{item.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-forest-muted">
          More answers on our{" "}
          <Link href="/faq" className="font-semibold text-coral hover:underline">
            FAQ page
          </Link>
          .
        </p>
      </section>

      <section className="border-t border-sand bg-[#F0F5F1]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <PricingNotice />
          <div className="mt-8 text-center">
            <Button href="/signup">Start Publishing Free</Button>
          </div>
        </div>
      </section>
    </>
  );
}

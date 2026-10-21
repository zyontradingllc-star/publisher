import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { MARKETING_HOME_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Authors Pilot - book discovery, publishing services, royalties, and author profiles.",
};

const FAQ_ITEMS = [
  {
    question: "What is Authors Pilot?",
    answer:
      "Authors Pilot is an independent book discovery, author promotion, and publishing services platform designed for new and established authors. We help writers showcase their published books, connect with readers, build professional author profiles, and access services including book formatting, cover design, publishing assistance, author websites, and book marketing.",
  },
  {
    question: "Is Authors Pilot a bookstore or a publishing platform?",
    answer:
      "Authors Pilot offers book discovery listings and professional publishing support. Our book marketplace displays published titles and connects readers to external purchase links, including Amazon, other retailers, and author-owned websites. We do not process book purchases directly through our marketplace.",
  },
  {
    question: "Can Authors Pilot help me publish my first book?",
    answer:
      "Yes. If you're a new author preparing to publish your first book, Authors Pilot offers professional publishing support, including manuscript preparation, book formatting, cover design, and publishing assistance. Our services help aspiring writers prepare their books for publication and build their author presence.",
  },
  {
    question: "I already published my book. Can I submit it?",
    answer:
      "Absolutely. Authors who have already published books through Amazon, other retailers, or their own websites can submit their titles for listing. Once approved, your books can appear in our discovery platform with cover images, descriptions, genres, author information, and purchase links.",
  },
  {
    question: "Do authors keep 100% of their book royalties?",
    answer:
      "Authors Pilot does not take a percentage of book sales generated through external purchase links. Your earnings are handled by your selected retailer or sales channel according to its royalty terms and applicable fees. Any Authors Pilot subscription or professional service charges are separate from book sales.",
  },
  {
    question: "What does it cost to join Authors Pilot?",
    answer: [
      "Author platform access is free during our launch period. You can create an author profile and submit eligible books for review. Optional professional services, including book publishing assistance, author website development, and marketing, may have separate costs.",
      "Paid membership plans may be introduced in the future with advance notice.",
    ],
  },
  {
    question: "Do I need an author website to list my books?",
    answer: [
      "No. You can submit your book with a valid purchase link from Amazon or another supported retailer.",
      "However, having your own author website can help you build your brand, showcase your complete book collection, connect with readers, and sell books directly. Authors Pilot also offers author website development services.",
    ],
  },
  {
    question:
      "Can Authors Pilot help me promote my books and grow my author business?",
    answer: [
      "Yes. Authors Pilot supports authors who want to develop their writing into a professional brand or business. Our services include author website development, book marketing, branding, and online promotion support.",
      "You can also use your public author profile and book listings to introduce your work to potential readers and direct them to your preferred sales channels.",
    ],
  },
  {
    question: "How long does book submission approval take?",
    answer: [
      "Book submissions are reviewed before publication. Review times depend on submission volume and whether additional information is required.",
      "You can check your submission status through your author dashboard. Email notifications may also be sent when available.",
    ],
  },
  {
    question: "Can readers purchase books directly on Authors Pilot?",
    answer: [
      "No. Authors Pilot does not currently provide direct book checkout through its discovery marketplace.",
      "When readers click a purchase button, they are redirected to the external bookstore or author website selected by the author. Authors Pilot may record outbound clicks for analytics, but these clicks do not confirm completed purchases.",
    ],
  },
  {
    question: "Can I list multiple books under one author profile?",
    answer: [
      "Yes. Authors can build a public profile featuring multiple approved book listings. Each book can have its own title, description, cover, genre, and external purchase links.",
      "This helps readers discover more titles from the same author without requiring a separate author profile for every book.",
    ],
  },
  {
    question: "Will my books and author profile appear in Google Search?",
    answer: [
      "Public author profiles and approved book listings may be discovered and indexed by Google and other search engines.",
      "Complete author biographies, original book descriptions, accurate genres, and relevant book information can help search engines understand your content. However, indexing, rankings, and organic traffic are not guaranteed.",
    ],
  },
  {
    question: "How do I report an incorrect or unauthorized book listing?",
    answer:
      "You can use the report form available on a book detail page to report inaccurate information, copyright concerns, or unauthorized listings. Our team reviews reports according to the platform's community and content policies.",
  },
];

export default function FaqPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">Frequently Asked Questions</h1>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-coral sm:text-sm">
        Free Author Access During Launch · Professional Publishing Services
        Available · Paid Plans Coming Soon
      </p>
      <p className="mt-4 text-charcoal">
        Whether you&apos;re a first-time writer, a self-published author, or an
        established author, Authors Pilot helps you publish, showcase, promote,
        and grow your books. Authors Pilot takes no commission on sales through
        external purchase links. Optional professional services and future
        subscription plans may have separate fees.
      </p>

      <div className="mt-10">
        <Accordion items={FAQ_ITEMS} />
      </div>

      <div className="mt-14 rounded-2xl border border-sand bg-white px-6 py-10 text-center shadow-soft sm:px-10">
        <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
          Ready to Share Your Story With the World?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-charcoal">
          Whether you&apos;re publishing your first book or promoting your next
          bestseller, Authors Pilot helps you take the next step.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button href="/publish/start">Submit Your Book</Button>
          <Button href={MARKETING_HOME_URL} variant="ghost">
            Explore Publishing Services
          </Button>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-charcoal">
        Still need help?{" "}
        <Link
          href="/how-publishing-works"
          className="font-semibold text-coral hover:underline"
        >
          How publishing works
        </Link>
        .
      </p>
    </article>
  );
}

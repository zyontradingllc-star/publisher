import { FadeIn } from "@/components/motion/FadeIn";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";

const items = [
  {
    question: "What services does Authors Pilot offer for authors?",
    answer:
      "Authors Pilot offers professional book publishing services, manuscript editing and formatting, book cover design, author website development, book marketing, and author branding. Whether you're a first-time writer or an established author, we help you publish, promote, and grow your author business.",
  },
  {
    question: "Can Authors Pilot help me publish my first book?",
    answer:
      "Yes! Authors Pilot helps first-time authors turn manuscripts into professionally prepared books. Our services include manuscript preparation, book formatting, cover design, and self-publishing assistance. We guide you through the publishing process so you can confidently launch your first book.",
  },
  {
    question: "I already published my book. Can Authors Pilot help me?",
    answer:
      "Absolutely! If your book is already published on Amazon, Barnes & Noble, or another platform, we can help you promote it, build your author website, improve online visibility, and reach new readers. You can also submit your published book to Authors Pilot for discovery and promotion.",
  },
  {
    question: "Can Authors Pilot create a professional author website?",
    answer:
      "Yes. We design custom, SEO-friendly author websites for fiction, nonfiction, and self-published writers. Your website can showcase your books, biography, reviews, purchase links, and email subscriptions, helping you establish your author brand and connect directly with readers.",
  },
  {
    question:
      "How does Authors Pilot help with book marketing and Google visibility?",
    answer:
      "Authors Pilot offers book marketing, author branding, and SEO-focused website development services. We help improve your online presence through optimized book pages, technical SEO, promotional content, and digital marketing strategies. Our goal is to make your books easier to discover on Google and other search platforms, although rankings and traffic are not guaranteed.",
  },
  {
    question: "How much do Authors Pilot publishing and author services cost?",
    answer:
      "Pricing depends on your project requirements, including manuscript length, editing, formatting, cover design, website features, and marketing needs. We provide customized quotes based on your goals and budget. Book listing access is free during launch, while professional publishing and marketing services are priced separately.",
  },
];

export function HomeFaq() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="badge-pill">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="currentColor"
                aria-hidden
              >
                <path d="M4 16 7.5 8l4.5 5 4.5-5L21 16H4z" />
                <path d="M6 16h12v2.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.5V16z" />
              </svg>
              Questions &amp; Answers
            </span>
            <h2 className="mt-5 heading-section text-balance">
              Frequently Asked Questions About Our{" "}
              <span className="text-[#E08A2A]">Author Services</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              Discover how Authors Pilot helps new and established authors
              publish, promote, and grow their books with professional
              publishing and marketing services.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10">
          <Accordion items={items} variant="gold" />
        </FadeIn>

        <FadeIn delay={0.12} className="mt-12 text-center">
          <p className="font-display text-xl font-bold text-ink sm:text-2xl">
            Ready to Publish Your Book or Grow Your Author Brand?
          </p>
          <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
            From your first manuscript to your next bestseller, Authors Pilot
            offers professional services to support your publishing journey.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button href="/self-publishing-agency-services">
              Explore Our Services
            </Button>
            <Button
              href="/contact-author-website-design-agency"
              variant="ghost"
            >
              Get a Free Quote
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

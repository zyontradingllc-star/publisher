import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

const items = [
  {
    href: "/book-publishing-services-for-authors",
    title: "Book Publishing",
    text: "Take a finished manuscript to eBook, print, and retailer-ready files.",
  },
  {
    href: "/audiobook-production-services-for-authors",
    title: "Audiobook Production",
    text: "Narration, studio production, and files ready for audio platforms.",
  },
  {
    href: "/book-marketing-services-for-authors",
    title: "Book Marketing",
    text: "Launch plans and promotion so readers can find your book.",
  },
  {
    href: "/author-website-design-agency-usa",
    title: "Author Website Design",
    text: "A professional site built around your books, story, and audience.",
  },
];

export function HomeWhatWeDo() {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">For Authors</span>
            <h2 className="mt-4 heading-section">What We Do for Authors</h2>
          </div>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <FadeIn key={item.href} delay={i * 0.04}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-sand bg-white p-5 shadow-soft transition hover:border-[#273E2B]/30"
              >
                <h3 className="font-display text-lg font-semibold text-ink transition group-hover:text-[#273E2B]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-charcoal">
                  {item.text}
                </p>
                <span className="mt-4 font-sans text-sm font-semibold text-[#E08A2A]">
                  Learn more →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

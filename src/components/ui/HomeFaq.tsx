import { FadeIn } from "@/components/motion/FadeIn";
import { Accordion } from "@/components/ui/Accordion";

const items = [
  {
    question: "What exactly does a publisher do for me?",
    answer:
      "Authors Pilot handles everything between your finished idea and a book readers can buy: cover design, editing, formatting, ISBN, distribution to Amazon and global retailers, and optional marketing. You stay the author and owner — we're the team that makes it real.",
  },
  {
    question: "Why does a book cover matter so much?",
    answer:
      "Readers judge a book by its cover in a second. A strong cover wins the click, the shelf glance, and the buy. We design for your genre so the book looks like it belongs — and still stands out.",
  },
  {
    question: "How much does it cost to publish with Authors Pilot?",
    answer:
      "Packages are scoped to the work your book actually needs. Standard, Signature, and Elite tiers cover writing through publishing and marketing. After a free consultation we'll recommend the right path — with no obligation until you're ready.",
  },
  {
    question: "Do I keep my rights and royalties?",
    answer:
      "Yes. You keep 100% of your rights and royalties. We don't take ownership of your work — you remain the author, and every cent of royalties stays yours.",
  },
  {
    question: "Can you help authors in the USA and worldwide?",
    answer:
      "Yes. Authors across the USA, UK, Europe, and beyond work with us. Dedicated account managers stay in your time zone, and your book gets the same standard wherever you write from.",
  },
  {
    question: "How fast is cover turnaround?",
    answer:
      "Cover concepts typically start in the first project phase once the brief and references are in. Exact dates depend on the package; we'll map the timeline clearly before work begins.",
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
            <p className="mt-5 heading-section">
              <span className="text-[#E08A2A]">Straight answers</span>
              <br />
              before you start searching.
            </p>
            <p className="mx-auto mt-3 max-w-lg font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              Everything you need to know about publishing with Authors Pilot.
              Still curious? Our team is one message away.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10">
          <Accordion items={items} variant="gold" />
        </FadeIn>
      </div>
    </section>
  );
}

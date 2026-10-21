import { contact } from "@/content/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { Accordion } from "@/components/ui/Accordion";
import { AuthorConsultation } from "@/components/ui/AuthorConsultation";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact Our Author Website Design Agency | Authors Pilot",
  description:
    "Contact Authors Pilot to start your author website, book publishing, cover design, or marketing project. Review your website mockup before you pay.",
  path: "/contact-author-website-design-agency",
  keywords: "contact author website design agency, author website quote, book publishing consultation",
});

export default function ContactPage() {
  return (
    <>
      <AuthorConsultation asHero />

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <section id="faq" className="mt-12 scroll-mt-24 sm:mt-16">
          <FadeIn>
            <p className="heading-section text-center text-forest text-balance">
              {contact.faq.title}
            </p>
          </FadeIn>
          <FadeIn className="mx-auto mt-10 max-w-3xl" delay={0.08}>
            <Accordion items={contact.faq.items} />
          </FadeIn>
        </section>
      </div>
    </>
  );
}

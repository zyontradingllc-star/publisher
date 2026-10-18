import { contact, brand } from "@/content/site";
import { PageHero } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import { Accordion } from "@/components/ui/Accordion";
import { SupportPromo } from "@/components/contact/SupportPromo";
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
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <PageHero
        title={contact.hero.title}
        description={contact.hero.description}
      />

      <SupportPromo />

      <div
        id="contact-form"
        className="mt-12 grid scroll-mt-24 gap-12 lg:mt-14 lg:grid-cols-5 lg:gap-14"
      >
        <FadeIn className="lg:col-span-3">
          <div className="rounded-soft border border-sand bg-cream p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Get in Touch
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-2">
          <div className="rounded-soft border border-sand bg-cream p-6 sm:p-8">
            <p className="font-display text-2xl font-semibold text-ink">
              Prefer email?
            </p>
            <p className="mt-3 text-sm leading-relaxed text-charcoal">
                Reach us anytime at{" "}
              <a
                href={`mailto:${brand.email}`}
                className="font-medium text-[#273E2B] underline-offset-2 hover:underline"
              >
                hello@AuthorsPilot.com
              </a>
              .
            </p>
            <p className="mt-6 text-sm text-charcoal">
              {contact.hero.reassurance}
            </p>
          </div>
        </FadeIn>
      </div>

      <section id="faq" className="mt-20 scroll-mt-24">
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
  );
}

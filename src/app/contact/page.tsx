import type { Metadata } from "next";
import { contact, brand } from "@/content/site";
import { PageHero, SectionHeading } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import { Accordion } from "@/components/ui/Accordion";
import { SupportPromo } from "@/components/contact/SupportPromo";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.hero.description,
};

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
            <ContactForm />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-2">
          <div className="rounded-soft border border-sand bg-cream p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Prefer email?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal">
              Reach us anytime at{" "}
              <a
                href={`mailto:${brand.email}`}
                className="text-[20px] font-medium text-coral hover:text-coral-soft"
              >
                {brand.email}
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
          <SectionHeading title={contact.faq.title} />
        </FadeIn>
        <FadeIn className="mx-auto mt-10 max-w-3xl" delay={0.08}>
          <Accordion items={contact.faq.items} />
        </FadeIn>
      </section>
    </div>
  );
}

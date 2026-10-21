import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

const services = [
  { href: "/book-writing-services-for-authors", label: "Book Writing", text: "Turn your idea into a polished manuscript." },
  { href: "/ghostwriting-services-for-authors", label: "Ghostwriting", text: "Publish under your name with expert writing support." },
  { href: "/self-publishing-services-for-authors", label: "Self Publishing", text: "Publish independently with professional guidance." },
  { href: "/book-cover-design-services", label: "Cover Design", text: "Covers built for genre, audience, and retailers." },
  { href: "/professional-book-editing-services", label: "Book Editing", text: "Editing that protects your voice and clarity." },
  { href: "/book-formatting-services-for-authors", label: "Formatting", text: "Print and eBook files prepared for publishing." },
  { href: "/audiobook-production-services-for-authors", label: "Audiobooks", text: "Turn your book into a professional listening experience." },
  { href: "/amazon-kdp-publishing-services", label: "Amazon KDP", text: "Kindle and print publishing support for KDP." },
  { href: "/author-website-design-agency-usa", label: "Author Website", text: "A professional site and free mockup for USA authors." },
];

export function HomeServiceLinks() {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge-pill">Publishing Services</span>
            <p className="mt-4 heading-section">Explore Authors Pilot Services</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              From first draft to published book, audiobook, and Amazon KDP launch -
              find the service that matches where you are in your author journey.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <FadeIn key={service.href} delay={index * 0.04}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-sand bg-white p-5 shadow-soft transition hover:border-[#273E2B]/30"
              >
                <h3 className="font-display text-lg font-semibold text-ink transition group-hover:text-[#273E2B]">
                  {service.label}
                </h3>
                <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-charcoal">
                  {service.text}
                </p>
                <span className="mt-4 font-sans text-sm font-semibold text-[#E08A2A]">
                  Learn more →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center">
          <Button href="/blog/author-publishing-blog-resources">Read Author Resources</Button>
        </FadeIn>
      </div>
    </section>
  );
}

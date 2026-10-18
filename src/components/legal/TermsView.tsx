import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { brand } from "@/content/site";

const sections = [
  {
    title: "Agreement to Terms",
    body: [
      `By accessing or using the Authors Pilot website and services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue use of our services.`,
    ],
  },
  {
    title: "Content Originality",
    body: [
      "Authors Pilot guarantees 100% original, plagiarism-free content. A plagiarism report can be provided upon request to verify authenticity.",
      "All content is created exclusively according to the client's requirements.",
    ],
  },
  {
    title: "Content Ownership",
    body: [
      "Upon successful completion and delivery, full ownership and rights to the content are transferred to you. No attribution to Authors Pilot is required.",
    ],
  },
  {
    title: "Image Usage & Copyright",
    body: [
      "We strictly comply with copyright laws and do not use copyrighted images without permission. Suggested images are for reference only, and clients are responsible for licensing.",
    ],
  },
  {
    title: "Refund Policy",
    body: [
      "Refunds are offered only under specific circumstances. Please read the policy carefully before placing an order.",
    ],
  },
  {
    title: "Change of Mind",
    body: [
      "A 100% refund is available if requested before work begins. Refund requests made within the first hour of order placement are eligible. After that, a 15% processing fee applies.",
    ],
  },
  {
    title: "Incompetent Delivery",
    body: [
      "Refunds are considered only after unlimited revisions have been provided. If the delivery still does not meet documented requirements, a partial or full refund may be issued based on mutual agreement.",
    ],
  },
  {
    title: "Delivery Errors",
    body: [
      "If we fail to deliver services on time due to our fault, a refund may be processed after verification.",
    ],
  },
  {
    title: "Timeline for Refunds",
    body: [
      "Refund requests must be submitted within 60 days of delivery. Requests after this period will not be accepted.",
    ],
  },
  {
    title: "Non-Refundable Cases",
    body: [
      "Minor issues such as grammar, formatting, or word count do not qualify for refunds. Delays caused by the client are not our responsibility.",
    ],
  },
  {
    title: "Plagiarism Policy",
    body: [
      "Plagiarism or unethical use of content is strictly prohibited. Authors Pilot is not responsible for misuse of delivered content.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "Authors Pilot shall not be liable for indirect, incidental, or consequential damages arising from the use of our services.",
    ],
  },
  {
    title: "Policy Updates",
    body: [
      "We reserve the right to modify these Terms at any time. Continued use of our services indicates acceptance of updated terms.",
    ],
  },
  {
    title: "Governing Law",
    body: ["These Terms are governed by the laws of the United States."],
  },
];

export function TermsView() {
  return (
    <div className="bg-cream pb-20">
      <section className="bg-warm-wash py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs text-charcoal">
            <Link href="/book-publishing-author-website-design-agency" className="hover:text-[#273E2B]">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Terms and Conditions</span>
          </p>
          <FadeIn>
            <h1 className="mt-6 heading-hero sm:text-[3.2rem] lg:text-[3.5rem]">
              Terms and Conditions
            </h1>
            <p className="mt-4 font-sans text-base leading-relaxed text-charcoal sm:text-lg">
              Please read these terms carefully before using our services. By
              using our services, you agree to be bound by these terms.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 pt-12 sm:px-6 lg:px-8">
        {sections.map((section, i) => (
          <FadeIn key={section.title} delay={i * 0.02}>
            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          </FadeIn>
        ))}

        <FadeIn>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Contact Information
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              For any questions, please contact:
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              {brand.name}
              <br />
              Email:{" "}
              <a
                href={`mailto:${brand.email}`}
                className="text-[#273E2B] hover:underline"
              >
                {brand.email}
              </a>
              <br />
              Phone: {brand.phone}
            </p>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}

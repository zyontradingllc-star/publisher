import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { brand } from "@/content/site";

const sections = [
  {
    title: "1. Introduction",
    body: [
      `Welcome to authorspilot.com (“we,” “our,” or “us”). We are committed to protecting your privacy and ensuring a secure experience while using our website and services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.`,
      "By accessing or using our website, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of the site.",
    ],
  },
  {
    title: "2. Information We Collect",
    intro: "We may collect information about you in the following ways:",
    bullets: [
      "Personal Information: Name, email address, phone number, mailing address, and other details you voluntarily provide when registering, placing an order, or contacting us.",
      "Payment Information: Billing details and payment method information required to process transactions securely.",
      "Technical Data: IP address, browser type, operating system, device information, and browsing behavior collected automatically.",
      "Publishing Details: Information related to your books, manuscripts, publishing goals, and marketing requirements provided for our services.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    intro: "We use your information to:",
    bullets: [
      "Provide and manage our publishing and marketing services",
      "Process payments and transactions",
      "Communicate with you regarding services, updates, or support",
      "Improve website functionality and user experience",
      "Send promotional and marketing communications (you may opt out anytime)",
      "Comply with legal and regulatory obligations",
    ],
  },
  {
    title: "4. Sharing of Your Information",
    intro:
      "We do not sell or rent your personal information. We may share your data only in the following circumstances:",
    bullets: [
      "Service Providers: Trusted third parties who assist us with payment processing, hosting, analytics, or customer support.",
      "Legal Requirements: When required by law or to protect our rights, users, or services.",
      "Business Transfers: In case of a merger, acquisition, or sale of assets.",
    ],
  },
  {
    title: "5. Data Security",
    body: [
      "We implement industry-standard administrative, technical, and physical safeguards to protect your personal information. While we strive to protect your data, no method of transmission over the internet is 100% secure.",
    ],
  },
  {
    title: "6. Your Rights",
    intro: "Depending on your location, you may have rights including:",
    bullets: [
      "Access to your personal data",
      "Correction of inaccurate information",
      "Deletion of your data",
      "Restriction or objection to processing",
      "Data portability where applicable",
    ],
  },
  {
    title: "7. Cookies and Tracking Technologies",
    body: [
      "We use cookies and similar technologies to enhance user experience, analyze traffic, and improve our services. You can manage cookie preferences through your browser settings.",
    ],
  },
  {
    title: "8. Children's Privacy",
    body: [
      "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "9. Changes to This Privacy Policy",
    body: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
    ],
  },
];

export function PrivacyView() {
  return (
    <div className="bg-cream pb-20">
      <section className="bg-warm-wash py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs text-charcoal">
            <Link href="/" className="hover:text-[#273E2B]">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Privacy Policy</span>
          </p>
          <FadeIn>
            <h1 className="mt-6 heading-hero sm:text-[3.2rem] lg:text-[3.5rem]">
              Privacy Policy
            </h1>
            <p className="mt-4 font-sans text-base leading-relaxed text-charcoal sm:text-lg">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 pt-12 sm:px-6 lg:px-8">
        {sections.map((section, i) => (
          <FadeIn key={section.title} delay={i * 0.03}>
            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">
                {section.title}
              </h2>
              {section.body?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
              {section.intro && (
                <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                  {section.intro}
                </p>
              )}
              {section.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-5 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          </FadeIn>
        ))}

        <FadeIn>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">
              10. Contact Us
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal sm:text-base">
              If you have questions regarding this Privacy Policy, please contact
              us:
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
            </p>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}

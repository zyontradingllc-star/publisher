import type { Metadata } from "next";
import { serviceFaqs } from "@/content/service-faqs";
import { seoPages } from "@/content/seo-pages";
import { canonicalUrl, SITE_URL } from "@/lib/seo";

export type ServiceSeoSlug = keyof typeof seoPages;

export function getServiceMetadata(slug: ServiceSeoSlug): Metadata {
  const page = seoPages[slug];
  const url = canonicalUrl(page.path);

  return {
    title: { absolute: page.pageTitle },
    description: page.pageDescription,
    keywords: page.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.pageTitle,
      description: page.pageDescription,
      url,
      siteName: "Authors Pilot",
      type: "website",
      images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Authors Pilot" }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.pageTitle,
      description: page.pageDescription,
      images: ["/og-image.webp"],
    },
    robots: { index: true, follow: true },
  };
}

export function getServiceSchema(slug: ServiceSeoSlug) {
  const page = seoPages[slug];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.schemaName,
    provider: {
      "@type": "Organization",
      name: "Authors Pilot",
      url: `${SITE_URL}/`,
    },
    serviceType: page.serviceType,
    areaServed: "Worldwide",
    url: canonicalUrl(page.path),
  };
}

export function getFaqSchema(slug: ServiceSeoSlug) {
  const items = serviceFaqs[slug];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

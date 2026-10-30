type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Safe JSON-LD script tag for App Router pages. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: "Authors Pilot",
    url: origin,
    email: "info@authorspilot.com",
    telephone: "+1-771-221-0508",
    logo: `${origin}/logo-authors-pilot.webp`,
    description:
      "Independent publishing platform: free author page, one shareable book link to Amazon or your website, and 100% royalties with no commission.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8 The Green B",
      addressLocality: "Dover",
      addressRegion: "DE",
      postalCode: "19901",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-771-221-0508",
      contactType: "customer support",
      areaServed: "US",
      availableLanguage: ["English"],
    },
  };
}

export function faqPageSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function webSiteSchema(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Authors Pilot",
    url: origin,
    publisher: { "@id": `${origin}/#organization` },
  };
}

export function breadcrumbListSchema(
  origin: string,
  items: ReadonlyArray<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : `${origin}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

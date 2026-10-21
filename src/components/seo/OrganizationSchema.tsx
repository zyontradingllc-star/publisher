import JsonLd from "@/components/seo/JsonLd";
import { brand, socialLinks } from "@/content/site";
import { canonicalUrl } from "@/lib/seo";

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: brand.name,
        url: canonicalUrl("/"),
        logo: canonicalUrl("/logo-authors-pilot.webp"),
        image: canonicalUrl("/og-image.webp"),
        description:
          "Authors Pilot helps authors turn their ideas and manuscripts into professionally written, edited, designed, formatted and published books.",
        email: brand.email,
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: brand.email,
            areaServed: "US",
            availableLanguage: "English",
          },
        ],
        sameAs: socialLinks.map((link) => link.href),
      }}
    />
  );
}

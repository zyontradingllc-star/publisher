import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { AuthorWebsiteView } from "@/components/services/AuthorWebsiteView";
import {
  getFaqSchema,
  getServiceMetadata,
  getServiceSchema,
} from "@/lib/service-page-seo";

export const metadata: Metadata = getServiceMetadata(
  "author-website-design-usa",
);

export default function AuthorWebsiteDesignUsaPage() {
  const faqSchema = getFaqSchema("author-website-design-usa");
  const serviceSchema = {
    ...getServiceSchema("author-website-design-usa"),
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <AuthorWebsiteView />
    </>
  );
}

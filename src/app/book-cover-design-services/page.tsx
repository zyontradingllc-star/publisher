import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { StructuredServicePage } from "@/components/services/StructuredServicePage";
import { getFaqSchema, getServiceMetadata, getServiceSchema } from "@/lib/service-page-seo";

export const metadata: Metadata = getServiceMetadata("book-cover-design");

export default function BookCoverDesignPage() {
  const faqSchema = getFaqSchema("book-cover-design");

  return (
    <>
      <JsonLd data={getServiceSchema("book-cover-design")} />
      <JsonLd data={faqSchema} />
      <StructuredServicePage slug="book-cover-design" />
    </>
  );
}

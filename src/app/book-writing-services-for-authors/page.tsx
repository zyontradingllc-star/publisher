import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { StructuredServicePage } from "@/components/services/StructuredServicePage";
import { getFaqSchema, getServiceMetadata, getServiceSchema } from "@/lib/service-page-seo";

export const metadata: Metadata = getServiceMetadata("book-writing");

export default function BookWritingPage() {
  const faqSchema = getFaqSchema("book-writing");

  return (
    <>
      <JsonLd data={getServiceSchema("book-writing")} />
      <JsonLd data={faqSchema} />
      <StructuredServicePage slug="book-writing" />
    </>
  );
}

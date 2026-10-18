import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { StructuredServicePage } from "@/components/services/StructuredServicePage";
import { getFaqSchema, getServiceMetadata, getServiceSchema } from "@/lib/service-page-seo";

export const metadata: Metadata = getServiceMetadata("book-formatting");

export default function BookFormattingPage() {
  const faqSchema = getFaqSchema("book-formatting");

  return (
    <>
      <JsonLd data={getServiceSchema("book-formatting")} />
      <JsonLd data={faqSchema} />
      <StructuredServicePage slug="book-formatting" />
    </>
  );
}

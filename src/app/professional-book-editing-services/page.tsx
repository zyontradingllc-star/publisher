import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { StructuredServicePage } from "@/components/services/StructuredServicePage";
import { getFaqSchema, getServiceMetadata, getServiceSchema } from "@/lib/service-page-seo";

export const metadata: Metadata = getServiceMetadata("book-editing");

export default function BookEditingPage() {
  const faqSchema = getFaqSchema("book-editing");

  return (
    <>
      <JsonLd data={getServiceSchema("book-editing")} />
      <JsonLd data={faqSchema} />
      <StructuredServicePage slug="book-editing" />
    </>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { StructuredServicePage } from "@/components/services/StructuredServicePage";
import { getFaqSchema, getServiceMetadata, getServiceSchema } from "@/lib/service-page-seo";

export const metadata: Metadata = getServiceMetadata("ghostwriting");

export default function GhostwritingPage() {
  const faqSchema = getFaqSchema("ghostwriting");

  return (
    <>
      <JsonLd data={getServiceSchema("ghostwriting")} />
      <JsonLd data={faqSchema} />
      <StructuredServicePage slug="ghostwriting" />
    </>
  );
}

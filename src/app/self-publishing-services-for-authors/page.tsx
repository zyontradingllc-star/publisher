import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { StructuredServicePage } from "@/components/services/StructuredServicePage";
import { getFaqSchema, getServiceMetadata, getServiceSchema } from "@/lib/service-page-seo";

export const metadata: Metadata = getServiceMetadata("self-publishing");

export default function SelfPublishingPage() {
  const faqSchema = getFaqSchema("self-publishing");

  return (
    <>
      <JsonLd data={getServiceSchema("self-publishing")} />
      <JsonLd data={faqSchema} />
      <StructuredServicePage slug="self-publishing" />
    </>
  );
}

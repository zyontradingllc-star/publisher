import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { StructuredServicePage } from "@/components/services/StructuredServicePage";
import { getFaqSchema, getServiceMetadata, getServiceSchema } from "@/lib/service-page-seo";

export const metadata: Metadata = getServiceMetadata("amazon-kdp-publishing");

export default function AmazonKdpPublishingPage() {
  const faqSchema = getFaqSchema("amazon-kdp-publishing");

  return (
    <>
      <JsonLd data={getServiceSchema("amazon-kdp-publishing")} />
      <JsonLd data={faqSchema} />
      <StructuredServicePage slug="amazon-kdp-publishing" />
    </>
  );
}

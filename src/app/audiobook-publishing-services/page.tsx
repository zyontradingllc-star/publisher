import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { StructuredServicePage } from "@/components/services/StructuredServicePage";
import {
  getFaqSchema,
  getServiceMetadata,
  getServiceSchema,
} from "@/lib/service-page-seo";

export const metadata: Metadata = getServiceMetadata("audiobook");

export default function AudiobookPage() {
  return (
    <>
      <JsonLd data={getServiceSchema("audiobook")} />
      <JsonLd data={getFaqSchema("audiobook")} />
      <StructuredServicePage slug="audiobook" />
    </>
  );
}

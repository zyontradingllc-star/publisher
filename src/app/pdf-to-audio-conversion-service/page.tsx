import type { Metadata } from "next";
import {
  ServiceLanding,
  servicePageMetadata,
} from "@/components/services/ServiceLanding";

export const metadata: Metadata = servicePageMetadata("pdf-to-audio");

export default function Page() {
  return <ServiceLanding pageKey="pdf-to-audio" />;
}

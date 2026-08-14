import type { Metadata } from "next";
import {
  ServiceLanding,
  servicePageMetadata,
} from "@/components/services/ServiceLanding";

export const metadata: Metadata = servicePageMetadata("ghostwriting");

export default function Page() {
  return <ServiceLanding pageKey="ghostwriting" />;
}

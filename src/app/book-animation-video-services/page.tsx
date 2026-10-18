import type { Metadata } from "next";
import {
  ServiceLanding,
  servicePageMetadata,
} from "@/components/services/ServiceLanding";

export const metadata: Metadata = servicePageMetadata("book-animation");

export default function Page() {
  return <ServiceLanding pageKey="book-animation" />;
}

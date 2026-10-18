import type { Metadata } from "next";
import { AudiobookProductionView } from "@/components/services/AudiobookProductionView";
import { servicePageMetadata } from "@/components/services/ServiceLanding";

export const metadata: Metadata = servicePageMetadata("audiobook-production");

export default function Page() {
  return <AudiobookProductionView />;
}

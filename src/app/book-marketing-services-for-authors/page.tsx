import type { Metadata } from "next";
import { BookMarketingView } from "@/components/services/BookMarketingView";
import { servicePageMetadata } from "@/components/services/ServiceLanding";

export const metadata: Metadata = servicePageMetadata("book-marketing");

export default function Page() {
  return <BookMarketingView />;
}

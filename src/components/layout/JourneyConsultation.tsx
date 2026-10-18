"use client";

import { usePathname } from "next/navigation";
import { AuthorConsultation } from "@/components/ui/AuthorConsultation";

const journeyPaths = new Set([
  "/contact-author-website-design-agency",
  "/contact-author-website-design-agency/",
]);

export function JourneyConsultation() {
  const pathname = usePathname();

  if (!journeyPaths.has(pathname)) return null;

  return <AuthorConsultation />;
}

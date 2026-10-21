import { DiyGuideView } from "@/components/guides/DiyGuideView";
import { getDiyGuide } from "@/content/guides/diy-guides";
import { diyGuideMetadata } from "@/lib/guides/page-meta";
import { notFound } from "next/navigation";

const SLUG = "free-book-publishing-websites";

export const metadata = diyGuideMetadata(SLUG);

export default function DiyGuidePage() {
  const guide = getDiyGuide(SLUG);
  if (!guide) notFound();
  return <DiyGuideView guide={guide} />;
}

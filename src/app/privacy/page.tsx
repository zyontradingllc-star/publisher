import { PrivacyView } from "@/components/legal/PrivacyView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | Authors Pilot",
  description:
    "How Authors Pilot collects, uses, and protects your information when you use our website and publishing services.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyView />;
}

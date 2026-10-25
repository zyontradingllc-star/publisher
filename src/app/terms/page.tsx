import { TermsView } from "@/components/legal/TermsView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms and Conditions | Authors Pilot",
  description:
    "Please read these terms before using Authors Pilot services. By using our site, you agree to these terms.",
  path: "/terms",
});

export default function TermsPage() {
  return <TermsView />;
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { PublishWizard } from "@/components/publish/PublishWizard";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Submit Your Book | Authors Pilot",
  description:
    "Submit your book listing in three steps: details, metadata, and storefront setup.",
  path: "/publish/start",
});

export default function PublishStartPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6">
      <h1 className="heading-hero">Submit your book</h1>
      <p className="mt-3 font-sans text-sm text-charcoal sm:text-base">
        Your draft saves in this browser as you type. Files stay on this device
        until you activate the storefront.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <p className="font-sans text-sm text-charcoal">Loading form…</p>
          }
        >
          <PublishWizard />
        </Suspense>
      </div>
    </div>
  );
}

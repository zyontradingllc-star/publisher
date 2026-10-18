import type { Metadata } from "next";
import { Suspense } from "react";
import { PublishWizard } from "@/components/publish/PublishWizard";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Publish Your Bookstore | Authors Pilot",
  description:
    "Create a live bookstore page in three steps: book details, metadata, and storefront activation.",
  path: "/publish",
});

export default function PublishPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6">
      <h1 className="heading-hero">Publish in three steps</h1>
      <p className="mt-3 font-sans text-sm text-charcoal sm:text-base">
        Your draft saves in this browser as you type. Files stay on this device
        until you activate the storefront.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="font-sans text-sm text-charcoal">Loading wizard…</p>}>
          <PublishWizard />
        </Suspense>
      </div>
    </div>
  );
}

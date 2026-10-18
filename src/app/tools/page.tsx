import type { Metadata } from "next";
import Link from "next/link";
import { AdSenseSlot } from "@/components/ads/AdSenseSlot";
import { PaidSoonBadge } from "@/components/publish/PaidSoonBadge";
import { liveTools } from "@/content/live-tools";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free AI Author Tools | Authors Pilot",
  description:
    "Free author utilities: blurb writer, keyword researcher, title generator, and royalty calculator.",
  path: "/tools",
});

export default function ToolsHubPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8">
      <div>
        <h1 className="heading-hero">Free AI tools for authors</h1>
        <p className="mt-3 max-w-2xl font-sans text-sm text-charcoal sm:text-base">
          Use these utilities while they are free, then move into the LIVE
          bookstore wizard when you are ready to sell.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {liveTools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}/`}
                className="relative block h-full rounded-2xl border border-sand bg-white p-5 shadow-soft transition hover:border-[#273E2B]/40"
              >
                <PaidSoonBadge />
                <h2 className="pr-24 font-display text-xl font-semibold text-ink">
                  {tool.name}
                </h2>
                <p className="mt-2 font-sans text-sm text-charcoal">{tool.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <AdSenseSlot slot="tools-sidebar" />
      </aside>
    </div>
  );
}

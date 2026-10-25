import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { buildAppMetadata } from "@/lib/seo";
import { getAllGuidePages } from "@/lib/seo-app-pages";

export const metadata: Metadata = buildAppMetadata({
  title: "Author Guides | Free Author Page & Book Links | Authors Pilot",
  description:
    "Guides for indie authors: free author pages, Amazon links, royalties, social promotion, and listing your book—same Authors Pilot theme and tools.",
  path: "/guides/",
});

export default function GuidesIndexPage() {
  const guides = getAllGuidePages();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">
        Guides
      </p>
      <h1 className="mt-3 heading-section">Author guides</h1>
      <p className="mt-4 text-charcoal leading-relaxed">
        Practical help for listing books, sharing one link, promoting on social,
        and keeping 100% royalties with Authors Pilot.
      </p>
      <ul className="mt-10 space-y-3">
        {guides.map((g) => (
          <li key={g.slug} className="border-b border-sand pb-3">
            <Link
              href={g.path}
              className="font-display text-lg font-bold text-ink hover:text-coral"
            >
              {g.h1}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Button href="/publish/">Get your free author page</Button>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Sparkles, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PaidSoonBadge } from "@/components/publish/PaidSoonBadge";
import { liveTools } from "@/content/live-tools";

export function LiveHubView() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <p className="badge-pill">LIVE · Self-serve bookstore</p>
      <h1 className="mt-5 heading-hero max-w-3xl">
        Launch a live bookstore page in{" "}
        <span className="text-[#E08A2A]">three steps</span>
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-charcoal sm:text-base">
        Add your title, metadata, and files. Activate an AuthorsPilot storefront
        - or send buyers to your own link. Free AI tools stay open for now.
      </p>
      <div className="relative mt-8 inline-flex">
        <PaidSoonBadge className="-top-3 right-0" />
        <Button href="/publish/?step=1">Start the 3-step wizard</Button>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Link
          href="/publish/?step=1"
          className="relative rounded-2xl border border-sand bg-white p-6 shadow-soft transition hover:border-[#273E2B]/40"
        >
          <PaidSoonBadge />
          <Store className="h-7 w-7 text-[#E08A2A]" aria-hidden />
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
            AuthorsPilot Storefront
          </h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
            Generate a live sales page from your book title, then upgrade to a
            custom site if you want 100% of every sale.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-semibold text-[#E08A2A]">
            Open the funnel <ArrowRight className="h-4 w-4" />
          </span>
        </Link>

        <div className="rounded-2xl border border-sand bg-ivory p-6">
          <Sparkles className="h-7 w-7 text-[#E08A2A]" aria-hidden />
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
            Free AI utilities
          </h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
            Blurbs, keywords, titles, and royalty math - useful before you pay
            for a full publishing setup.
          </p>
          <ul className="mt-5 space-y-3">
            {liveTools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}/`}
                  className="relative block rounded-xl border border-sand bg-white px-4 py-3 transition hover:border-[#273E2B]/40"
                >
                  <PaidSoonBadge className="-top-2 right-3" />
                  <span className="font-sans text-sm font-semibold text-ink">
                    {tool.name}
                  </span>
                  <span className="mt-1 block font-sans text-xs text-charcoal">
                    {tool.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

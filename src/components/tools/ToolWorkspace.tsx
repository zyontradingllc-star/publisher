"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AdSenseSlot } from "@/components/ads/AdSenseSlot";
import { PaidSoonBadge } from "@/components/publish/PaidSoonBadge";
import { liveTools, type LiveToolSlug } from "@/content/live-tools";

export function ToolWorkspace({ slug }: { slug: LiveToolSlug }) {
  const tool = liveTools.find((item) => item.slug === slug)!;
  const [input, setInput] = useState("");
  const [price, setPrice] = useState("9.99");

  const output = useMemo(() => {
    const text = input.trim() || "your book";
    if (slug === "blurb-writer") {
      return `In ${text}, readers get a clear promise, a lived-in voice, and a reason to keep turning pages. This is the story they recommend - not the one they forget in the store.`;
    }
    if (slug === "keyword-researcher") {
      const words = text.toLowerCase().split(/\s+/).filter(Boolean);
      return [...new Set([...words, `${words[0] || "book"} for authors`, "independent publishing", "kindle ebook"])].join(", ");
    }
    if (slug === "title-generator") {
      return [
        `${text}: A Field Guide`,
        `The ${text} Method`,
        `After ${text}`,
        `${text} in Plain Sight`,
      ].join("\n");
    }
    const amount = Number(price) || 0;
    const storefront = amount * 0.85;
    return `List price $${amount.toFixed(2)}\nAuthorsPilot storefront (15% fee): $${storefront.toFixed(2)}\nCustom website bundle (0% fee): $${amount.toFixed(2)}`;
  }, [input, price, slug]);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8">
      <div>
        <div className="relative inline-block">
          <PaidSoonBadge className="-top-3 right-0" />
          <p className="badge-pill">Free AI utility</p>
        </div>
        <h1 className="mt-5 heading-hero">{tool.name}</h1>
        <p className="mt-3 max-w-2xl font-sans text-sm text-charcoal sm:text-base">
          {tool.summary}
        </p>
        <div className="mt-8 space-y-4 rounded-2xl border border-sand bg-white p-5 shadow-soft sm:p-6">
          <label className="block font-sans text-xs font-medium text-ink sm:text-sm">
            {slug === "royalty-calculator" ? "Book idea or title" : "Source text"}
          </label>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={5}
            className="w-full rounded-lg border border-sand bg-ivory px-3 py-2 text-sm text-ink outline-none focus:border-[#273E2B] focus:ring-2 focus:ring-[#273E2B]/25"
            placeholder="Paste a title, genre, or rough synopsis"
          />
          {slug === "royalty-calculator" && (
            <div>
              <label htmlFor="list-price" className="block font-sans text-xs font-medium text-ink">
                List price (USD)
              </label>
              <input
                id="list-price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="mt-1 w-full rounded-lg border border-sand bg-ivory px-3 py-2 text-sm"
              />
            </div>
          )}
          <pre className="whitespace-pre-wrap rounded-xl bg-ivory p-4 font-sans text-sm leading-relaxed text-ink">
            {output}
          </pre>
          <Button href="/publish/?step=1">Use this in the LIVE wizard</Button>
        </div>
      </div>
      <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <AdSenseSlot slot="tools-sidebar" />
        <AdSenseSlot slot="tools-sidebar" className="min-h-[120px]" />
      </aside>
    </div>
  );
}

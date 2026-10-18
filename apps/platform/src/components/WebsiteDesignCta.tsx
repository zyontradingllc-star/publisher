"use client";

import { usePathname } from "next/navigation";
import { recordWebsiteDesignCtaClickAction } from "@/app/actions/activity";
import { AUTHOR_WEBSITE_DESIGN_URL } from "@/lib/utils";
import { cn } from "@/lib/utils";

type WebsiteDesignCtaProps = {
  compact?: boolean;
  bookId?: string;
  className?: string;
};

export function WebsiteDesignCta({
  compact = false,
  bookId,
  className,
}: WebsiteDesignCtaProps) {
  const pathname = usePathname();

  async function handleClick() {
    const result = await recordWebsiteDesignCtaClickAction(
      (() => {
        const fd = new FormData();
        fd.set("source_path", pathname || "/");
        if (bookId) fd.set("book_id", bookId);
        return fd;
      })()
    );
    const url = result.url || AUTHOR_WEBSITE_DESIGN_URL;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <aside
      className={cn(
        compact
          ? "rounded-2xl border border-sand bg-white p-5"
          : "rounded-3xl border border-sand bg-white p-6 sm:p-8",
        className
      )}
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-muted">
        Author Website Design
      </p>
      <h3 className="mt-2 heading-display text-xl sm:text-2xl">
        Don&apos;t Have an Author Website Yet?
      </h3>
      <p className="mt-3 max-w-2xl text-forest-muted">
        Build a professional online home for your books and let readers purchase
        directly from your own store.
      </p>
      <div className="mt-5">
        <button
          type="button"
          onClick={handleClick}
          className="group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-6 py-3 font-sans text-sm font-bold uppercase tracking-wide text-ink shadow-cta transition duration-300 hover:brightness-105 hover:shadow-cta-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E08A2A] focus-visible:ring-offset-2"
        >
          <span>Explore Author Website Design</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="mt-3 text-xs text-forest-muted">
        Optional recommendation — having a website is never required to publish
        on Authors Pilot.
      </p>
    </aside>
  );
}

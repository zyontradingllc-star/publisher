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

const benefits = [
  {
    title: "Build Your Author Brand",
    body: "Create a professional online presence that represents your writing style, books, and identity.",
  },
  {
    title: "Showcase & Sell Your Books",
    body: "Display your complete book collection with covers, descriptions, reviews, and direct purchase links.",
  },
  {
    title: "Get Discovered on Google",
    body: "Build an SEO-friendly website with a structure that helps search engines understand your books and author profile.",
  },
  {
    title: "Grow Your Reader Community",
    body: "Collect email subscribers, share book launches, and build lasting relationships with readers.",
  },
  {
    title: "Own Your Online Presence",
    body: "Keep your author biography, achievements, media features, and book information together on a website you control.",
  },
  {
    title: "Turn Writing Into a Business",
    body: "Promote your books, develop your author brand, and create opportunities beyond individual book launches.",
  },
] as const;

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
        Professional Author Website Design
      </p>
      <h3 className="mt-2 heading-display text-xl sm:text-2xl">
        Your Books Deserve More Than Just a Store Page.
      </h3>
      <p className="mt-3 max-w-3xl text-forest-muted">
        Whether you&apos;re a first-time writer or an established author, your
        website should reflect your books, genre, personality, and unique author
        brand. Authors Pilot creates custom author websites designed to help
        readers discover your work, connect with you, and find where to buy your
        books.
      </p>

      {!compact ? (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {benefits.map((item) => (
            <li key={item.title} className="text-sm text-charcoal">
              <span className="font-semibold text-ink">{item.title}</span>
              {" - "}
              {item.body}
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-5 font-display text-base font-bold text-ink sm:text-lg">
        From Fiction to Nonfiction, Every Author Deserves a Website That Stands
        Out.
      </p>

      <div className="mt-5">
        <button
          type="button"
          onClick={handleClick}
          className="group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-[#E08A2A] to-[#F2C14D] px-6 py-3 font-sans text-sm font-bold uppercase tracking-wide text-ink shadow-cta transition duration-300 hover:brightness-105 hover:shadow-cta-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E08A2A] focus-visible:ring-offset-2"
        >
          <span>Get Your Author Website</span>
        </button>
      </div>
      <p className="mt-3 text-xs text-forest-muted">
        Optional recommendation - having a website is never required to publish
        on Authors Pilot.
      </p>
    </aside>
  );
}

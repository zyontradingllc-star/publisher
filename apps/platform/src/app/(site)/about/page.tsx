import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "What Authors Pilot is and who it serves.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="heading-section">About Authors Pilot</h1>
      <div className="mt-8 space-y-4 text-charcoal leading-relaxed">
        <p>
          Authors Pilot is a publishing platform for independent authors who want readers to discover
          their books without giving up control of sales. We host curated listings — cover,
          description, genre, and outbound purchase links — while purchases happen on your website,
          Amazon, or other channels you choose.
        </p>
        <p>
          We are built for authors who already sell (or plan to sell) through their own storefronts
          and want an additional discovery layer. We are not a bookstore and we do not process book
          checkout on this site.
        </p>
        <p>
          During launch, author access is free. Paid platform plans may be introduced later with
          advance notice. Authors keep 100% of book royalties from sales on their own channels.
        </p>
        <p>
          Authors Pilot is operated alongside the broader Authors Pilot marketing presence at{" "}
          <a
            href="https://www.authorspilot.com"
            className="font-semibold text-coral hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            authorspilot.com
          </a>
          . Optional author website design services are offered separately and are never required to
          publish here.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/how-publishing-works">How publishing works</Button>
        <Button href="/books" variant="ghost">
          Explore books
        </Button>
      </div>
      <p className="mt-8 text-xs text-forest-muted">
        Questions? Visit our <Link href="/contact" className="text-coral hover:underline">contact page</Link>.
      </p>
    </article>
  );
}

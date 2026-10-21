import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildPageMetadata({
  title: "BookStore - Coming Soon | Authors Pilot",
  description:
    "Something exciting is coming soon to the Authors Pilot BookStore. Stay tuned!",
  path: "/bookstore",
});

export default function BookstoreComingSoonPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="font-sans text-sm font-bold uppercase tracking-[0.22em] text-[#E08A2A] sm:text-base">
        Authors Pilot BookStore
      </p>
      <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
        Something Exciting Is Coming Soon. Stay Tuned!
      </h1>
      <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-charcoal">
        We are building a discovery storefront for authors. In the meantime you
        can submit your book listing or explore our publishing services.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button href="/publish/">Submit Your Book</Button>
        <Button href="/book-publishing-author-website-design-agency/" variant="ghost">
          Back to Home
        </Button>
      </div>
    </section>
  );
}

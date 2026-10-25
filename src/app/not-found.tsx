import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
        404
      </p>
      <h1 className="mt-4 heading-section">Page Not Found</h1>
      <p className="mt-4 font-sans text-base leading-relaxed text-charcoal">
        The page you are looking for may have moved or no longer exists. Try one
        of the links below or return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to Home</Button>
        <Link
          href="/contact-author-website-design-agency"
          className="inline-flex items-center rounded-full border border-sand bg-white px-6 py-3 font-sans text-sm font-semibold text-ink transition hover:border-coral"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

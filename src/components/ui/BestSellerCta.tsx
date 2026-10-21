import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

function CrownMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8 text-[#E08A2A]"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 16 7.5 8l4.5 5 4.5-5L21 16H4z" />
      <path d="M6 16h12v2.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.5V16z" />
    </svg>
  );
}

export function BestSellerCta() {
  return (
    <section className="relative overflow-hidden bg-cta-wash py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#A7C4AB]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#A7C4AB]/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex justify-center">
            <CrownMark />
          </div>

          <p className="mt-5 heading-section text-white lg:text-[2.7rem]">
            Your Story Deserves To Become The Next{" "}
            <span className="text-[#E08A2A]">Best-Seller</span>
          </p>

          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/80 sm:text-base">
            You wrote the story. We&apos;ll help you publish it. Step into a
            community of authors who chose to publish with craft - and never
            looked back.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
            <Button href="/contact-author-website-design-agency">Become a Best-Seller</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

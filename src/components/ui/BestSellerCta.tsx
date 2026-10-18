import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { brand } from "@/content/site";

const telHref = `tel:${brand.phone.replace(/[^\d+]/g, "")}`;

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
            community of authors who chose to publish with craft — and never
            looked back.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
            <Button href="/contact-author-website-design-agency">Become a Best-Seller</Button>

            <a
              href={telHref}
              className="group inline-flex items-center gap-3 text-left"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35 text-[#E08A2A] transition group-hover:border-[#A7C4AB]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.5 4.5h2.2l1 4.2-1.7 1.1a12.5 12.5 0 0 0 6.2 6.2l1.1-1.7 4.2 1v2.2c0 .8-.7 1.5-1.5 1.5C9.6 19 5 14.4 5 6c0-.8.7-1.5 1.5-1.5z"
                  />
                </svg>
              </span>
              <span>
                <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#E08A2A]">
                  Talk to an Expert
                </span>
                <span className="mt-0.5 block font-sans text-lg font-semibold text-white">
                  {brand.phone}
                </span>
              </span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

export function VideoInsights() {
  return (
    <section className="bg-warm-wash py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <FadeIn className="flex flex-col items-start text-left">
          <p className="heading-section-sm">
            From Idea to{" "}
            <span className="text-[#E08A2A]">Finished Book</span>
          </p>
          <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-charcoal sm:text-base">
            We turn your ideas into polished books that reflect your unique voice
            and vision. From concept to finished book, we&apos;re with you every
            step of the way.
          </p>
          <div className="relative mt-6 aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl shadow-book ring-1 ring-sand">
            <Image
              src="/forge-different.webp"
              alt="An author reading her published book"
              fill
              sizes="(max-width: 640px) 80vw, 384px"
              className="object-cover object-top"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="flex flex-col items-start text-left">
          <p className="heading-section-sm">
            Straight From the{" "}
            <span className="text-[#E08A2A]">Authors</span>
          </p>
          <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-charcoal sm:text-base">
            Real stories, real experiences, and honest insights
            <br />
            from authors who trusted Authors Pilot
            <br />
            to bring their books to life.
          </p>
          <div className="relative mt-6 aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl shadow-book ring-1 ring-sand">
            <Image
              src="/author-insights.webp"
              alt="A published author sharing their story with Authors Pilot"
              fill
              sizes="(max-width: 640px) 80vw, 384px"
              className="object-cover object-top"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

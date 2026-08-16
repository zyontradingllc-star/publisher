import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"} ${className}`}
    >
      {eyebrow && (
        <p className="mb-3 text-[20px] font-semibold uppercase tracking-[0.14em] text-coral">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-forest text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-charcoal sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

type CtaBannerProps = {
  title: string;
  description: string;
  cta: { label: string; href: string };
};

export function CtaBanner({ title, description, cta }: CtaBannerProps) {
  return (
    <FadeIn>
      <section className="relative overflow-hidden rounded-soft border border-sand bg-cta-wash px-6 py-12 text-linen sm:px-10 sm:py-14">
        <div
          aria-hidden
          className="organic-blob absolute -bottom-16 -right-10 h-48 w-48 bg-coral/20 blur-2xl"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href={cta.href} variant="inverse">
              {cta.label}
            </Button>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

type PageHeroProps = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  titleClassName?: string;
};

export function PageHero({
  title,
  description,
  imageSrc,
  imageAlt = "",
  titleClassName = "text-coral",
}: PageHeroProps) {
  return (
    <FadeIn>
      <header className="mx-auto max-w-3xl pt-10 text-center sm:pt-14">
        <h1
          className={`font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl sm:font-semibold ${titleClassName}`}
        >
          {title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-charcoal sm:text-lg">
          {description}
        </p>
        {imageSrc && (
          <div className="relative mx-auto mt-8 aspect-[16/9] w-full overflow-hidden rounded-soft shadow-soft sm:mt-10">
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-center"
              priority
            />
          </div>
        )}
      </header>
    </FadeIn>
  );
}

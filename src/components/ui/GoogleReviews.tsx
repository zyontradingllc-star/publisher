import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { packageTestimonials } from "@/content/packages";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.4 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.7.4-2.4V6.5H1.4C.5 8.2 0 10.1 0 12s.5 3.8 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.6 1.4 6.5l4 3.1C6.3 6.8 8.9 4.8 12 4.8z"
      />
    </svg>
  );
}

function Star({ fill, clipId }: { fill: "full" | "half" | "empty"; clipId: string }) {
  if (fill === "half") {
    return (
      <span className="relative inline-block h-4 w-4">
        <svg viewBox="0 0 20 20" className="absolute inset-0 h-4 w-4 text-[#D0D0D0]" fill="currentColor" aria-hidden>
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
        <svg viewBox="0 0 20 20" className="absolute inset-0 h-4 w-4 text-[#FABB05]" fill="currentColor" aria-hidden>
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width="10" height="20" />
            </clipPath>
          </defs>
          <path
            clipPath={`url(#${clipId})`}
            d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z"
          />
        </svg>
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${fill === "full" ? "text-[#FABB05]" : "text-[#D0D0D0]"}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}

function StarRow({ rating, id }: { rating: 4.5 | 5; id: string }) {
  const fills: Array<"full" | "half" | "empty"> =
    rating === 5
      ? ["full", "full", "full", "full", "full"]
      : ["full", "full", "full", "full", "half"];

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {fills.map((fill, i) => (
        <Star key={i} fill={fill} clipId={`${id}-half`} />
      ))}
    </span>
  );
}

export function GoogleReviews() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {packageTestimonials.map((item, i) => (
        <FadeIn key={item.name} delay={i * 0.04}>
          <article className="flex h-full flex-col rounded-2xl border border-sand bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <StarRow
                  rating={item.rating}
                  id={item.name.toLowerCase().replace(/\s+/g, "-")}
                />
                <span className="font-sans text-xs font-bold text-ink">
                  {item.rating.toFixed(1)}
                </span>
              </div>
              <GoogleMark />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-sand">
                <Image
                  src={item.photo}
                  alt={item.name}
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <p className="font-sans text-sm font-bold text-ink">{item.name}</p>
                <p className="mt-0.5 font-sans text-xs text-charcoal">
                  {item.role} · Posted on Google
                </p>
              </div>
            </div>

            <p className="mt-4 flex-1 font-display text-lg leading-relaxed text-ink">
              &ldquo;{item.quote}&rdquo;
            </p>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}

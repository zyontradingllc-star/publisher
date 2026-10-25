import Image from "next/image";
import Link from "next/link";
import { brand, homeHref } from "@/content/site";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
  /** @deprecated Wordmark already includes the brand name */
  showName?: boolean;
  onClick?: () => void;
};

/** Circular logo mark — keep navbar compact but readable. */
const box = {
  sm: "h-11 w-11",
  md: "h-12 w-12 sm:h-14 sm:w-14",
  lg: "h-14 w-14 sm:h-16 sm:w-16",
} as const;

export function BrandLogo({
  className = "",
  priority = false,
  size = "md",
  onClick,
}: BrandLogoProps) {
  return (
    <Link
      href={homeHref}
      onClick={onClick}
      className={`group inline-flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`}
      aria-label={`${brand.name} home`}
    >
      <span
        className={`relative inline-block shrink-0 overflow-hidden rounded-full border border-sand bg-ivory ${box[size]}`}
      >
        <Image
          src="/logo-authors-pilot.webp?v=2"
          alt=""
          width={400}
          height={400}
          priority={priority}
          className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
        />
      </span>
      <span className="font-display text-base font-bold tracking-tight text-[#273E2B] sm:text-lg lg:text-xl">
        {brand.name}
      </span>
    </Link>
  );
}

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

/** Full eagle lockup (~1.06:1) - keep navbar compact but readable. */
const box = {
  sm: "h-14 w-[59px]",
  md: "h-16 w-[68px] sm:h-[4.25rem] sm:w-[72px]",
  lg: "h-16 w-[68px] sm:h-[4.75rem] sm:w-[80px]",
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
      <span className={`relative inline-block shrink-0 ${box[size]}`}>
        <Image
          src="/logo-authors-pilot.webp?v=2"
          alt=""
          width={400}
          height={400}
          priority={priority}
          className="h-full w-full object-contain object-left transition-transform group-hover:scale-[1.02]"
        />
      </span>
      <span className="font-display text-base font-bold tracking-tight text-[#273E2B] sm:text-lg lg:text-xl">
        {brand.name}
      </span>
    </Link>
  );
}

import Image from "next/image";
import { brand } from "@/content/site";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
  /** @deprecated Wordmark already includes the brand name */
  showName?: boolean;
};

/** Full eagle lockup (~1.06:1) — keep navbar compact but readable. */
const box = {
  sm: "h-14 w-[59px]",
  md: "h-16 w-[68px] sm:h-[4.25rem] sm:w-[72px]",
  lg: "h-16 w-[68px] sm:h-[4.75rem] sm:w-[80px]",
} as const;

export function BrandLogo({
  className = "",
  priority = false,
  size = "md",
}: BrandLogoProps) {
  return (
    <span className={`relative inline-block shrink-0 ${box[size]} ${className}`}>
      <Image
        src="/logo-authors-pilot.webp?v=2"
        alt={brand.name}
        width={400}
        height={400}
        priority={priority}
        className="h-full w-full object-contain object-left"
      />
    </span>
  );
}

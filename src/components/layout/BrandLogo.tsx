import Image from "next/image";
import { brand } from "@/content/site";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
};

const box = {
  sm: "h-9 w-9",
  md: "h-11 w-11 sm:h-12 sm:w-12",
  lg: "h-14 w-14 sm:h-16 sm:w-16",
} as const;

export function BrandLogo({
  className = "",
  priority = false,
  size = "md",
  showName = true,
}: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={`relative shrink-0 overflow-hidden ${box[size]}`}>
        <Image
          src="/logo2.png"
          alt={brand.name}
          fill
          sizes="64px"
          priority={priority}
          className="object-contain"
        />
      </span>
      {showName && (
        <span className="font-display text-xl font-semibold tracking-tight text-inherit sm:text-2xl">
          {brand.name}
        </span>
      )}
    </span>
  );
}

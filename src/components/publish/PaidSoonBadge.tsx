import { cn } from "@/lib/cn";

export function PaidSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "absolute -top-2 right-3 z-10 animate-pulse rounded-full bg-red-600 px-2 py-0.5 text-xs text-white",
        className,
      )}
    >
      🎁 FREE NOW - PAID SOON
    </span>
  );
}

import { cn } from "@/lib/cn";

type Props = {
  slot: "tools-sidebar" | "blog-article";
  className?: string;
};

export function AdSenseSlot({ slot, className }: Props) {
  /* ADSENSE PLACEHOLDER */
  return (
    <div
      data-ad-slot={slot}
      className={cn(
        "flex min-h-[250px] items-center justify-center rounded-2xl border border-dashed border-sand bg-ivory px-4 py-8 text-center",
        className,
      )}
      aria-hidden
    >
      <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-charcoal">
        Advertisement
      </p>
    </div>
  );
}

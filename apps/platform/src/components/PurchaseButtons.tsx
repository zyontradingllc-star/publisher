import { recordOutboundClickAction } from "@/app/actions/books";
import { activeSalesLinks } from "@/lib/books";
import { purchaseCtaLabel } from "@/lib/utils";
import type { SalesLink } from "@/types/database";
import { Button } from "@/components/ui/Button";

type PurchaseButtonsProps = {
  bookId: string;
  links: SalesLink[] | undefined | null;
};

export function PurchaseButtons({ bookId, links }: PurchaseButtonsProps) {
  const active = activeSalesLinks(links);

  if (active.length === 0) {
    return (
      <p className="text-sm text-forest-muted">
        Purchase links have not been added for this book yet. Check back later or visit the
        author&apos;s profile.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-forest-muted">
        Purchases happen on external sites — Authors Pilot does not checkout here.
      </p>
      {active.map((link) => (
        <form key={link.id} action={recordOutboundClickAction} className="w-full">
          <input type="hidden" name="link_id" value={link.id} />
          <input type="hidden" name="book_id" value={bookId} />
          <input type="hidden" name="url" value={link.url} />
          <Button
            type="submit"
            variant={link.is_primary ? "primary" : "ghost"}
            className="w-full sm:w-auto"
          >
            {purchaseCtaLabel(link.link_type, link.label)}
          </Button>
        </form>
      ))}
    </div>
  );
}

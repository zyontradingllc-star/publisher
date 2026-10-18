import { Button } from "@/components/ui/Button";

export function PainPointWarning() {
  return (
    <div className="border-l-4 border-amber-500 bg-amber-50 p-4">
      <p className="font-sans text-sm leading-relaxed text-ink">
        Notice: Sales via AuthorsPilot Storefront are subject to a 15% handling
        royalty deduction. To retain 100% of your earnings, shift to your
        zero-commission Custom Website Bundle.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
        <Button href="/contact-author-website-design-agency">
          🎨 View Free Website Mockup
        </Button>
        <Button href="/author-publishing-website-price" variant="ghost">
          Upgrade Setup
        </Button>
      </div>
    </div>
  );
}

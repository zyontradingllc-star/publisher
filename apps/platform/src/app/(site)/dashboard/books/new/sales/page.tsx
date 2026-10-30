import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { PublishBookPricingForm } from "@/components/forms/PublishBookPricingForm";

export const metadata = { title: "Publish Book - Pricing & Sales" };

export default async function PublishBookSalesPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  await requireProfile("/dashboard/books/new/sales");
  const { title } = await searchParams;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-section">
          {title ?? "Sales links & publish"}
        </h1>
        <p className="mt-2 max-w-2xl text-forest-muted">
          Set territories and purchase links. Authors Pilot never processes
          payment or takes a royalty percentage.
        </p>
      </header>

      <nav
        aria-label="Publish progress"
        className="flex flex-wrap gap-2 border-b border-sand pb-4 sm:gap-6"
      >
        <StepDone label="Book Details" />
        <StepCurrent n={2} label="Sales Links" />
      </nav>

      <PublishBookPricingForm bookTitle={title} />

      <p className="text-sm">
        <Link href="/dashboard/books/new" className="text-coral hover:underline">
          ← Edit book details
        </Link>
      </p>
    </div>
  );
}

function StepDone({ label }: { label: string }) {
  return (
    <div className="flex min-w-[9rem] flex-1 items-center gap-2 rounded-xl border border-green-600 bg-green-50 px-3 py-2 text-sm font-semibold text-green-900">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs text-white">
        ✓
      </span>
      <span>
        {label}
        <span className="mt-0.5 block text-[10px] font-normal uppercase tracking-wide">
          Complete
        </span>
      </span>
    </div>
  );
}

function StepCurrent({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex min-w-[9rem] flex-1 items-center gap-2 rounded-xl border border-coral bg-[#F0F5F1] px-3 py-2 text-sm font-semibold text-ink">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral text-xs text-white">
        {n}
      </span>
      <span>
        {label}
        <span className="mt-0.5 block text-[10px] font-normal uppercase tracking-wide">
          In progress
        </span>
      </span>
    </div>
  );
}

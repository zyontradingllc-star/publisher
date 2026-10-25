import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { PublishBookContentForm } from "@/components/forms/PublishBookContentForm";

export const metadata = { title: "Publish Book - Content" };

export default async function PublishBookContentPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; submission?: string }>;
}) {
  await requireProfile("/dashboard/books/new/content");
  const { title, submission } = await searchParams;

  return (
    <div className="space-y-6">
      <nav
        aria-label="Publish progress"
        className="flex flex-wrap gap-2 border-b border-sand pb-4 sm:gap-6"
      >
        <Step
          n={1}
          label="Book Details"
          status="complete"
        />
        <Step n={2} label="Book Content" status="current" />
        <Step n={3} label="Sales Links" status="upcoming" />
      </nav>

      <header>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
          Publish book · Step 2
        </p>
        <h1 className="heading-section mt-1">Book Content</h1>
        <p className="mt-2 text-forest-muted">
          {title
            ? title
            : "Table of contents, cover, ISBN, and accessibility - like a KDP content step, for Authors Pilot."}
        </p>
      </header>

      <PublishBookContentForm bookTitle={title} submissionId={submission} />

      <p className="text-center text-sm">
        <Link href="/dashboard" className="text-coral hover:underline">
          ← Dashboard
        </Link>
      </p>
    </div>
  );
}

function Step({
  n,
  label,
  status,
}: {
  n: number;
  label: string;
  status: "complete" | "current" | "upcoming";
}) {
  if (status === "complete") {
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
  if (status === "current") {
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
  return (
    <div className="flex min-w-[9rem] flex-1 items-center gap-2 rounded-xl border border-sand bg-white px-3 py-2 text-sm font-semibold text-forest-muted">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sand text-xs">
        {n}
      </span>
      <span>
        {label}
        <span className="mt-0.5 block text-[10px] font-normal uppercase tracking-wide">
          Not started
        </span>
      </span>
    </div>
  );
}

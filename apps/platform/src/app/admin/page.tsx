import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { BookStatus } from "@/types/database";

export const metadata = { title: "Admin" };

export default async function AdminOverviewPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: books } = await supabase.from("books").select("status");
  const counts = (books ?? []).reduce(
    (acc, row) => {
      const s = row.status as BookStatus;
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<BookStatus, number>>
  );

  const { count: openReports } = await supabase
    .from("content_reports")
    .select("*", { count: "exact", head: true })
    .in("status", ["open", "reviewing"]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="heading-section">Admin overview</h1>
        <p className="mt-2 text-forest-muted">
          Review submissions, manage listings, and resolve reader reports. Authors
          Pilot does not track sales or royalties — only listing workflow and
          outbound link analytics.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          label="Pending review"
          value={counts.pending_review ?? 0}
          href="/admin/books?status=pending_review"
        />
        <Metric
          label="Published"
          value={counts.published ?? 0}
          href="/admin/books?status=published"
        />
        <Metric
          label="Changes requested"
          value={counts.changes_requested ?? 0}
          href="/admin/books?status=changes_requested"
        />
        <Metric
          label="Rejected"
          value={counts.rejected ?? 0}
          href="/admin/books?status=rejected"
        />
      </div>

      <section className="card-surface">
        <h2 className="font-display text-lg font-bold text-ink">Open reports</h2>
        <p className="mt-2 font-display text-3xl font-bold text-ink">
          {openReports ?? 0}
        </p>
        <Link
          href="/admin/reports"
          className="mt-3 inline-block text-sm font-semibold text-coral hover:underline"
        >
          View reports →
        </Link>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href} className="card-surface transition hover:shadow-lift">
      <p className="text-xs font-bold uppercase tracking-wide text-forest-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
    </Link>
  );
}

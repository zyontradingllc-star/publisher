import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { resolveReportAction } from "@/app/actions/admin";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { ReportStatus } from "@/types/database";

export const metadata = { title: "Admin · Reports" };

const reportStatusLabel: Record<ReportStatus, string> = {
  open: "Open",
  reviewing: "Reviewing",
  resolved: "Resolved",
  dismissed: "Dismissed",
};

export default async function AdminReportsPage() {
  async function resolveReport(formData: FormData) {
    "use server";
    await resolveReportAction({ ok: false }, formData);
  }

  await requireAdmin();
  const supabase = await createClient();

  const { data: reports } = await supabase
    .from("content_reports")
    .select(
      `
      *,
      books:books(id, title, slug, status)
    `
    )
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-section">Content reports</h1>
        <p className="mt-2 text-forest-muted">
          Reader-submitted flags on published listings.
        </p>
      </header>

      {(reports ?? []).length === 0 ? (
        <p className="text-forest-muted">No reports yet.</p>
      ) : (
        <ul className="space-y-4">
          {(reports ?? []).map((report) => {
            const book = report.books as {
              id: string;
              title: string;
              slug: string;
              status: string;
            } | null;
            return (
              <li key={report.id} className="card-surface space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-forest-muted">
                      {reportStatusLabel[report.status as ReportStatus]}
                    </p>
                    <p className="font-semibold text-ink">{report.reason}</p>
                    {book ? (
                      <p className="mt-1 text-sm">
                        Book:{" "}
                        <Link
                          href={`/admin/books/${book.id}`}
                          className="text-coral hover:underline"
                        >
                          {book.title}
                        </Link>
                      </p>
                    ) : null}
                  </div>
                  <span className="text-xs text-forest-muted">
                    {formatDate(report.created_at)}
                  </span>
                </div>
                {report.details ? (
                  <p className="text-sm text-charcoal whitespace-pre-wrap">
                    {report.details}
                  </p>
                ) : null}
                {report.reporter_email ? (
                  <p className="text-xs text-forest-muted">
                    Reporter: {report.reporter_email}
                  </p>
                ) : null}
                {report.admin_notes ? (
                  <p className="text-sm text-forest-muted">
                    Notes: {report.admin_notes}
                  </p>
                ) : null}

                {report.status === "open" || report.status === "reviewing" ? (
                  <form
                    action={resolveReport}
                    className="flex flex-wrap items-end gap-2 border-t border-sand pt-4"
                  >
                    <input type="hidden" name="report_id" value={report.id} />
                    <div>
                      <label
                        className="label-field"
                        htmlFor={`status-${report.id}`}
                      >
                        Update status
                      </label>
                      <select
                        id={`status-${report.id}`}
                        name="status"
                        className="input-field py-2 text-sm"
                        defaultValue="resolved"
                      >
                        <option value="reviewing">Reviewing</option>
                        <option value="resolved">Resolved</option>
                        <option value="dismissed">Dismissed</option>
                      </select>
                    </div>
                    <div className="min-w-[200px] flex-1">
                      <label
                        className="label-field"
                        htmlFor={`notes-${report.id}`}
                      >
                        Admin notes
                      </label>
                      <input
                        id={`notes-${report.id}`}
                        name="admin_notes"
                        className="input-field py-2 text-sm"
                      />
                    </div>
                    <Button type="submit" variant="secondary">
                      Save
                    </Button>
                  </form>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

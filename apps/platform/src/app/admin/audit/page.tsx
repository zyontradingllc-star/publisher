import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Admin · Audit log" };

type AuditRow = {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  profiles: { display_name: string | null; email: string | null } | null;
};

export default async function AdminAuditPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from("admin_audit_log")
    .select(
      `
      id,
      action,
      entity_type,
      entity_id,
      metadata,
      created_at,
      profiles:profiles!admin_audit_log_actor_id_fkey(display_name, email)
    `
    )
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-section">Audit log</h1>
        <p className="mt-2 text-forest-muted">
          Recent admin actions on books, reports, and author profiles.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-sand bg-ivory/80 text-xs uppercase tracking-wide text-forest-muted">
            <tr>
              <th className="px-4 py-3 font-bold">When</th>
              <th className="px-4 py-3 font-bold">Actor</th>
              <th className="px-4 py-3 font-bold">Action</th>
              <th className="hidden px-4 py-3 font-bold md:table-cell">Entity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand">
            {(rows as AuditRow[] | null)?.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3 whitespace-nowrap text-forest-muted">
                  {formatDate(row.created_at)}
                </td>
                <td className="px-4 py-3">
                  {row.profiles?.display_name ?? row.profiles?.email ?? "System"}
                </td>
                <td className="px-4 py-3 font-mono text-xs">{row.action}</td>
                <td className="hidden px-4 py-3 text-forest-muted md:table-cell">
                  {row.entity_type}
                  {row.entity_id ? (
                    <span className="block font-mono text-xs">{row.entity_id}</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(rows ?? []).length === 0 ? (
          <p className="px-4 py-8 text-center text-forest-muted">No audit entries.</p>
        ) : null}
      </div>
    </div>
  );
}

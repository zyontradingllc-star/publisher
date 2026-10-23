import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Admin · Audit log" };

export default async function AdminAuditPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-section">Audit log</h1>
        <p className="mt-2 text-forest-muted">
          The Supabase audit log was removed. Payload CMS change history and
          submission <span className="font-semibold">adminNotes</span> /
          <span className="font-semibold"> reviewedAt</span> cover review actions
          for now. Full audit can be re-added as a Payload collection later.
        </p>
      </header>
      <p className="text-forest-muted">
        Open{" "}
        <Link href="/cms" className="font-semibold text-coral hover:underline">
          /cms
        </Link>{" "}
        for submission review history fields.
      </p>
    </div>
  );
}

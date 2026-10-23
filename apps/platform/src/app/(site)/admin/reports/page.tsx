import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Admin · Reports" };

export default async function AdminReportsPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-section">Content reports</h1>
        <p className="mt-2 text-forest-muted">
          Reader-submitted flags. The Supabase reports store was removed — add a
          Payload collection when you need this queue again. For now use{" "}
          <Link href="/cms" className="font-semibold text-coral hover:underline">
            /cms
          </Link>{" "}
          notes on book submissions.
        </p>
      </header>
      <p className="text-forest-muted">No reports store configured.</p>
    </div>
  );
}

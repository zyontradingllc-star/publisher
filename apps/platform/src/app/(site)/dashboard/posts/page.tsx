import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { getMyBooks } from "@/lib/books";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Posts" };

export default async function DashboardPostsPage() {
  const profile = await requireProfile("/dashboard/posts");
  const books = await getMyBooks(profile.id, profile.email);

  return (
    <DashboardShell books={books}>
      <section className="rounded-none border border-sand bg-white p-6 shadow-soft">
        <h1 className="font-display text-2xl font-bold text-ink">Posts</h1>
        <p className="mt-2 max-w-xl text-sm text-forest-muted">
          Share book updates with readers from your author dashboard. Post
          publishing is coming soon — for now, manage your listings and profile.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/dashboard/books/new">Create New Book</Button>
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-semibold text-coral hover:underline"
          >
            Back to dashboard
          </Link>
        </div>
      </section>
    </DashboardShell>
  );
}

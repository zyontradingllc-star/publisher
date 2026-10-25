import Link from "next/link";
import { redirect } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { getAuthorLead } from "@/lib/lead-session";
import { getMyBooks } from "@/lib/books";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { DashboardProfileHeader } from "@/components/dashboard/DashboardProfileHeader";
import { DashboardBookPreview } from "@/components/dashboard/DashboardBookPreview";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardRightRail } from "@/components/dashboard/DashboardRightRail";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; published?: string }>;
}) {
  const profile = await requireProfile("/dashboard");
  const params = await searchParams;
  if (params.submitted === "1" || params.published === "1") {
    redirect("/dashboard/books?submitted=1");
  }

  const books = await getMyBooks(profile.id, profile.email);
  const lead = await getAuthorLead();

  const publishedCount = books.filter((b) => b.status === "published").length;
  const draftOrPending =
    books.find(
      (b) => b.status === "draft" || b.status === "pending_review"
    ) ?? null;
  const pendingBook =
    books.find((b) => b.status === "pending_review") ?? null;
  const previewBook = pendingBook ?? books[0] ?? null;
  const showInReview = Boolean(pendingBook);

  return (
    <DashboardShell books={books} variant="home" showRightRail={false}>
      {!profile.profile_complete ? (
        <Alert variant="warning">
          <p className="font-semibold">Complete your author profile</p>
          <p className="mt-1">
            Add a display name, public URL, and a short bio.{" "}
            <Link href="/dashboard/profile" className="font-semibold underline">
              Edit profile
            </Link>
          </p>
        </Alert>
      ) : null}

      <DashboardProfileHeader
        profile={profile}
        booksCount={books.length}
        publishedCount={publishedCount}
        draftTitle={
          draftOrPending?.title ?? lead?.lastBookTitle ?? null
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-4">
          {previewBook || showInReview ? (
            <DashboardBookPreview
              book={previewBook}
              fallbackTitle={lead?.lastBookTitle ?? "Your book submission"}
              showInReview={showInReview}
            />
          ) : (
            <section className="rounded-none border border-sand bg-white p-5 shadow-soft">
              <h2 className="font-display text-lg font-bold text-ink">
                Welcome home
              </h2>
              <p className="mt-2 text-sm text-forest-muted">
                Start a book project or polish your author profile so readers
                can find you.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button href="/dashboard/books/new">+ New Book Project</Button>
                <Button href="/dashboard/profile" variant="ghost">
                  Edit Author Profile
                </Button>
              </div>
            </section>
          )}

          {profile.bio?.trim() ? (
            <section className="rounded-none border border-sand bg-white p-5 shadow-soft">
              <h2 className="font-display text-lg font-bold text-ink">About</h2>
              <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm leading-relaxed text-charcoal">
                {profile.bio}
              </p>
            </section>
          ) : null}
        </div>

        <div className="w-full shrink-0 lg:w-[260px]">
          <DashboardRightRail books={books} forceVisible />
        </div>
      </div>
    </DashboardShell>
  );
}

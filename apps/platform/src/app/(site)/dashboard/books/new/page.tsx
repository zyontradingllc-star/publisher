import { requireProfile } from "@/lib/auth";
import { getGenres } from "@/lib/books";
import { PublishBookDetailsForm } from "@/components/forms/PublishBookDetailsForm";

export const metadata = { title: "Publish Book — Details" };

export default async function PublishBookDetailsPage() {
  const profile = await requireProfile("/dashboard/books/new");
  const genres = await getGenres();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
          Publish book
        </p>
        <h1 className="heading-section mt-1">Book Details</h1>
        <p className="mt-2 max-w-2xl text-forest-muted">
          Step 1 of 3 — enter the details readers will see on your Authors Pilot
          listing. Sales happen on your own website or retailer; we take no
          royalty.
        </p>
      </header>

      <PublishBookDetailsForm
        genres={genres}
        defaultAuthorName={profile.display_name ?? ""}
        authorEmail={profile.email}
      />
    </div>
  );
}

import Image from "next/image";
import { requireProfile } from "@/lib/auth";
import { getGenres } from "@/lib/books";
import { PublishBookDetailsForm } from "@/components/forms/PublishBookDetailsForm";

export const metadata = { title: "Publish Book - Details" };

export default async function PublishBookDetailsPage() {
  const profile = await requireProfile("/dashboard/books/new");
  const genres = await getGenres();

  return (
    <div className="space-y-4">
      <header className="space-y-4">
        <div className="relative w-full overflow-hidden rounded-2xl border border-sand shadow-soft">
          <Image
            src="/banners/submit-book-buy-link-banner.webp"
            alt="Submit your book and share your buy link - Authors Pilot"
            width={1024}
            height={235}
            priority
            className="h-auto w-full object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1152px"
          />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
            Publish book · Step 1 of 3
          </p>
          <h1 className="heading-section mt-1">Book Details</h1>
          <p className="mt-1 max-w-2xl text-sm text-forest-muted">
            Listing details for your catalog page. Sales stay on your store - we
            take no royalty.
          </p>
        </div>
      </header>

      <PublishBookDetailsForm
        genres={genres}
        defaultAuthorName={profile.display_name ?? ""}
        authorEmail={profile.email}
      />
    </div>
  );
}

import { requireProfile } from "@/lib/auth";
import { getMyBooks } from "@/lib/books";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { AvatarUploadForm } from "@/components/forms/AvatarUploadForm";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { avatarUrl } from "@/lib/utils";

export const metadata = { title: "Profile" };

export default async function DashboardProfilePage() {
  const profile = await requireProfile("/dashboard/profile");
  const books = await getMyBooks(profile.id, profile.email);
  const avatar = avatarUrl(profile.avatar_path);

  return (
    <DashboardShell books={books}>
      <div className="space-y-6">
        <header>
          <h1 className="heading-display text-2xl font-bold text-ink">
            Author profile
          </h1>
          <p className="mt-2 text-sm text-forest-muted">
            Your public author page helps readers discover your work. Authors
            Pilot never sells books on your behalf.
          </p>
        </header>

        <section className="card-surface">
          <AvatarUploadForm initialUrl={avatar} />
        </section>

        <ProfileForm profile={profile} />
      </div>
    </DashboardShell>
  );
}

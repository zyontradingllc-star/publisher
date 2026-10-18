import { requireProfile } from "@/lib/auth";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { AvatarUploadForm } from "@/components/forms/AvatarUploadForm";
import { avatarUrl } from "@/lib/utils";

export const metadata = { title: "Profile" };

export default async function DashboardProfilePage() {
  const profile = await requireProfile("/dashboard/profile");
  const avatar = avatarUrl(profile.avatar_path);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="heading-section">Author profile</h1>
        <p className="mt-2 text-forest-muted">
          Your public author page helps readers discover your work. Authors Pilot
          never sells books on your behalf — profile links point to channels you
          control.
        </p>
      </header>

      <section className="card-surface">
        <AvatarUploadForm initialUrl={avatar} />
      </section>

      <ProfileForm profile={profile} />
    </div>
  );
}

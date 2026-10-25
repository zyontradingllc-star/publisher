import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { getMyBooks } from "@/lib/books";
import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = { title: "Settings" };

export default async function DashboardSettingsPage() {
  const profile = await requireProfile("/dashboard/settings");
  const books = await getMyBooks(profile.id, profile.email);

  return (
    <DashboardShell books={books}>
      <div className="space-y-6">
        <header>
          <h1 className="heading-display text-2xl font-bold text-ink">
            Account settings
          </h1>
          <p className="mt-2 text-sm text-forest-muted">
            Manage sign-in details for your Authors Pilot account.
          </p>
        </header>

        <section className="card-surface space-y-4">
          <h2 className="font-display text-lg font-bold text-ink">Email</h2>
          <p className="text-charcoal">{profile.email ?? "No email on file"}</p>
          <p className="help-text">
            Contact support if you need to change your login email.
          </p>
        </section>

        <section className="card-surface space-y-4">
          <h2 className="font-display text-lg font-bold text-ink">Password</h2>
          <p className="text-sm text-forest-muted">
            Send yourself a secure reset link if you want to update your
            password.
          </p>
          <Button href="/forgot-password" variant="ghost">
            Reset password
          </Button>
        </section>

        <section className="card-surface space-y-4">
          <h2 className="font-display text-lg font-bold text-ink">Session</h2>
          <Alert variant="info">
            Signing out ends your session on this device only.
          </Alert>
          <form action={logoutAction}>
            <Button type="submit" variant="secondary">
              Log out
            </Button>
          </form>
        </section>

        <p className="text-sm text-forest-muted">
          Need help? Visit{" "}
          <Link href="/" className="font-semibold text-coral underline">
            Authors Pilot home
          </Link>
          .
        </p>
      </div>
    </DashboardShell>
  );
}

import { requireProfile } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireProfile("/dashboard");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {children}
    </div>
  );
}

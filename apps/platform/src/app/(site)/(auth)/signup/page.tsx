import type { Metadata } from "next";
import { Suspense } from "react";
import { CreateAccountForm } from "@/components/forms/CreateAccountForm";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="card-surface p-8 text-center text-sm text-forest-muted">Loading…</div>}>
      <CreateAccountForm />
    </Suspense>
  );
}

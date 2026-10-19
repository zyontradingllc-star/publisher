import type { Metadata } from "next";
import { signupAction } from "@/app/actions/auth";
import { AuthForm } from "@/components/forms/AuthForm";
import { PricingNotice } from "@/components/PricingNotice";

export const metadata: Metadata = {
  title: "Signup As Author",
};

export default function SignupPage() {
  return (
    <div className="space-y-4">
      <AuthForm mode="signup" action={signupAction} />
      <PricingNotice />
    </div>
  );
}

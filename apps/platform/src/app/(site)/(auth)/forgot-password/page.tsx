import type { Metadata } from "next";
import { forgotPasswordAction } from "@/app/actions/auth";
import { AuthForm } from "@/components/forms/AuthForm";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return <AuthForm mode="forgot" action={forgotPasswordAction} />;
}

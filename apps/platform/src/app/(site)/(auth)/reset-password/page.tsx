import type { Metadata } from "next";
import { resetPasswordAction } from "@/app/actions/auth";
import { AuthForm } from "@/components/forms/AuthForm";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = {
  title: "Reset password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ oobCode?: string; mode?: string }>;
}) {
  const sp = await searchParams;
  const oobCode = sp.oobCode ?? "";

  return (
    <div className="space-y-4">
      {oobCode ? (
        <Alert variant="info">
          Choose a new password. After saving, log in with your email and new
          password to open your dashboard.
        </Alert>
      ) : (
        <Alert variant="warning">
          Open the password reset link from your email (it includes a secure
          code). Or use Forgot password on the login page to get a new link.
        </Alert>
      )}
      <AuthForm
        mode="reset"
        action={resetPasswordAction}
        hiddenFields={oobCode ? { oobCode } : undefined}
      />
    </div>
  );
}

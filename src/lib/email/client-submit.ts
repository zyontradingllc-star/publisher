import { FORM_EMAIL } from "@/lib/email/formsubmit";

export type ClientSubmitResult = {
  success: boolean;
  message?: string;
};

export async function submitToInbox(
  payload: Record<string, string>,
): Promise<ClientSubmitResult> {
  try {
    const res = await fetch("/send-mail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (res.ok && data?.success) {
      return { success: true };
    }
  } catch {
    // Hostinger PHP is the only sender — no mailto popup.
  }

  return {
    success: false,
    message: `Could not send right now. Email us at ${FORM_EMAIL}.`,
  };
}

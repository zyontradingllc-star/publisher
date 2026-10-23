import { FORM_EMAIL } from "@/lib/email/formsubmit";

type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export async function sendMail({ to, subject, text, html }: SendMailInput) {
  const resendKey = process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM || "Authors Pilot <info@authorspilot.com>";

  if (!resendKey) {
    return {
      success: false as const,
      message: "Email is not configured on this server.",
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html: html || text.replace(/\n/g, "<br />"),
    }),
  });

  if (res.ok) {
    return { success: true as const };
  }

  const data = (await res.json().catch(() => null)) as { message?: string } | null;
  return {
    success: false as const,
    message: data?.message || "Could not send email.",
  };
}

export async function sendAdminMail({
  subject,
  text,
}: {
  subject: string;
  text: string;
}) {
  return sendMail({
    to: process.env.ADMIN_EMAIL || FORM_EMAIL,
    subject,
    text,
  });
}

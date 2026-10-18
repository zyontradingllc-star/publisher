import { NextResponse } from "next/server";
import { sendAdminMail } from "@/lib/email/send-mail";

type ContactBody = {
  name?: string;
  email?: string;
  creating?: string;
  alreadyHave?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, creating, alreadyHave, message } = body;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !creating ||
    !alreadyHave ||
    !message?.trim()
  ) {
    return NextResponse.json(
      { success: false, message: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  const result = await sendAdminMail({
    subject: `Project Inquiry — ${creating}`,
    text: [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Creating: ${creating}`,
      `Already have: ${alreadyHave}`,
      "",
      message.trim(),
    ].join("\n"),
  });

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message || "Could not send email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { sendAdminMail } from "@/lib/email/send-mail";

type Body = Record<string, string>;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const message = (body.message || "").trim();
  if (!message) {
    return NextResponse.json(
      { success: false, message: "Message is required." },
      { status: 400 },
    );
  }

  const lines = Object.entries(body)
    .filter(([key]) => !key.startsWith("_") && key !== "message")
    .map(([key, value]) => `${key}: ${value}`);

  const result = await sendAdminMail({
    subject: body._subject || "New website inquiry",
    text: [...lines, "", message].join("\n"),
  });

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}

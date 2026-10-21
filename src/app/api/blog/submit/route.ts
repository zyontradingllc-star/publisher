import { NextResponse } from "next/server";
import { sendAdminMail } from "@/lib/email/send-mail";

type Body = {
  email?: string;
  authorName?: string;
  title?: string;
  category?: string;
  excerpt?: string;
  content?: string;
};

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

  const email = body.email?.trim().toLowerCase() ?? "";
  const authorName = body.authorName?.trim() ?? "";
  const title = body.title?.trim() ?? "";
  const category = body.category?.trim() ?? "";
  const excerpt = body.excerpt?.trim() ?? "";
  const content = body.content?.trim() ?? "";

  if (!email || !authorName || !title || !category || !excerpt || !content) {
    return NextResponse.json(
      { success: false, message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const text = [
    `Author: ${authorName}`,
    `Email: ${email}`,
    `Category: ${category}`,
    `Title: ${title}`,
    "",
    "Excerpt:",
    excerpt,
    "",
    "Article body:",
    content,
  ].join("\n");

  const result = await sendAdminMail({
    subject: `New Blog Submission - ${title}`,
    text,
  });

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: result.message || "Could not submit your article.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}

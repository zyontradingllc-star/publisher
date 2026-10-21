import { submitToInbox } from "@/lib/email/client-submit";

export type BlogSubmission = {
  email: string;
  authorName: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
};

export async function submitBlogPost(submission: BlogSubmission) {
  try {
    const apiRes = await fetch("/api/blog/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });

    if (apiRes.status !== 404) {
      const data = (await apiRes.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;
      if (apiRes.ok && data?.success) {
        return { success: true as const };
      }
      if (apiRes.status !== 404) {
        return {
          success: false as const,
          message: data?.message || "Could not submit your article.",
        };
      }
    }
  } catch {
    // Static hosting has no API - fall through to send-mail.php.
  }

  const text = [
    `Author: ${submission.authorName}`,
    `Email: ${submission.email}`,
    `Category: ${submission.category}`,
    `Title: ${submission.title}`,
    "",
    "Excerpt:",
    submission.excerpt,
    "",
    "Article body:",
    submission.content,
  ].join("\n");

  return submitToInbox({
    name: submission.authorName,
    email: submission.email,
    _subject: `New Blog Submission - ${submission.title}`,
    _replyto: submission.email,
    message: text,
  });
}

"use server";

import { getSessionUser } from "@/lib/auth";
import { reportSchema } from "@/lib/validations";
import type { ActionState } from "@/app/actions/auth";

export async function reportBookAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = reportSchema.safeParse({
    book_id: formData.get("book_id"),
    reason: formData.get("reason"),
    details: formData.get("details") || "",
    reporter_email: formData.get("reporter_email") || "",
  });

  if (!parsed.success) {
    return { ok: false, message: "Please provide a reason for the report." };
  }

  void (await getSessionUser());

  return {
    ok: false,
    message:
      "Reporting is temporarily unavailable while we move off Supabase. Email hello@authorspilot.com with the book URL and reason.",
  };
}

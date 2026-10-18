"use server";

import { createClient } from "@/lib/supabase/server";
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

  const user = await getSessionUser();
  const supabase = await createClient();
  const { error } = await supabase.from("content_reports").insert({
    book_id: parsed.data.book_id,
    reason: parsed.data.reason,
    details: parsed.data.details || null,
    reporter_email: parsed.data.reporter_email || user?.email || null,
    reporter_user_id: user?.id ?? null,
  });

  if (error) return { ok: false, message: error.message };

  return {
    ok: true,
    message: "Thank you. Your report was submitted for review.",
  };
}

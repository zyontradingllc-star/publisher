"use client";

import { useActionState } from "react";
import type { ActionState } from "@/app/actions/auth";
import { reportBookAction } from "@/app/actions/reports";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = { ok: true };

const REASONS = [
  "Copyright or rights concern",
  "Misleading description",
  "Inappropriate content",
  "Spam or duplicate listing",
  "Broken or unsafe purchase link",
  "Other",
];

type ReportFormProps = {
  bookId: string;
  defaultEmail?: string | null;
};

export function ReportForm({ bookId, defaultEmail }: ReportFormProps) {
  const [state, formAction, pending] = useActionState(reportBookAction, initialState);

  if (state.ok && state.message?.startsWith("Thank you")) {
    return (
      <Alert variant="success" className="mt-4">
        {state.message}
      </Alert>
    );
  }

  return (
    <form action={formAction} className="mt-4 space-y-4 rounded-2xl border border-sand bg-ivory/50 p-5">
      <div>
        <h3 className="font-display text-lg font-bold text-ink">Report this listing</h3>
        <p className="mt-1 text-sm text-forest-muted">
          Flag content that may violate our community policy. Reports are reviewed by our team.
        </p>
      </div>

      <input type="hidden" name="book_id" value={bookId} />

      {state.message && !state.ok ? (
        <Alert variant="error">{state.message}</Alert>
      ) : null}

      <div>
        <label htmlFor="reason" className="label-field">
          Reason
        </label>
        <select id="reason" name="reason" required className="input-field">
          <option value="">Select a reason</option>
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="details" className="label-field">
          Details (optional)
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          className="input-field resize-y"
          placeholder="Tell us what seems wrong with this listing."
        />
      </div>

      <div>
        <label htmlFor="reporter_email" className="label-field">
          Your email (optional)
        </label>
        <input
          id="reporter_email"
          name="reporter_email"
          type="email"
          defaultValue={defaultEmail ?? ""}
          className="input-field"
          placeholder="you@example.com"
        />
        <p className="help-text">We may contact you if we need clarification.</p>
      </div>

      <Button type="submit" disabled={pending} variant="secondary" className="!text-sm">
        {pending ? "Submitting…" : "Submit report"}
      </Button>
    </form>
  );
}

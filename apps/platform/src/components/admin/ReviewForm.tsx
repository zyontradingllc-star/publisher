"use client";

import { useActionState, useState } from "react";
import { reviewBookAction } from "@/app/actions/admin";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import type { BookStatus } from "@/types/database";

const initialState: ActionState = { ok: false };

type ReviewAction = "approve" | "request_changes" | "reject" | "unpublish";

export function ReviewForm({
  bookId,
  currentStatus,
}: {
  bookId: string;
  currentStatus: BookStatus;
}) {
  const [state, formAction, pending] = useActionState(
    reviewBookAction,
    initialState
  );
  const [selected, setSelected] = useState<ReviewAction | "">("");

  const needsNote =
    selected === "request_changes" || selected === "reject";

  return (
    <div className="space-y-4">
      {state.message ? (
        <Alert variant={state.ok ? "success" : "error"}>{state.message}</Alert>
      ) : null}

      <form action={formAction} className="card-surface space-y-4">
        <input type="hidden" name="book_id" value={bookId} />

        <div>
          <label className="label-field" htmlFor="action">
            Review decision
          </label>
          <select
            id="action"
            name="action"
            className="input-field"
            required
            value={selected}
            onChange={(e) => setSelected(e.target.value as ReviewAction)}
          >
            <option value="" disabled>
              Choose an action…
            </option>
            {currentStatus !== "published" ? (
              <option value="approve">Approve — publish listing</option>
            ) : null}
            {currentStatus === "pending_review" ||
            currentStatus === "changes_requested" ? (
              <>
                <option value="request_changes">Request changes</option>
                <option value="reject">Reject</option>
              </>
            ) : null}
            {currentStatus === "published" ? (
              <option value="unpublish">Unpublish listing</option>
            ) : null}
          </select>
        </div>

        <div>
          <label className="label-field" htmlFor="note">
            Note to author {needsNote ? "(required)" : "(optional)"}
          </label>
          <textarea
            id="note"
            name="note"
            rows={4}
            className="input-field"
            required={needsNote}
            placeholder={
              needsNote
                ? "Explain what the author should fix or why the listing was rejected."
                : "Optional internal or author-facing note."
            }
          />
        </div>

        <Button type="submit" disabled={pending || !selected}>
          Apply decision
        </Button>
      </form>
    </div>
  );
}

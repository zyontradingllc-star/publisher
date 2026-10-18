"use client";

import { useActionState } from "react";
import { upsertSalesLinkAction } from "@/app/actions/books";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import type { SalesLink } from "@/types/database";
import { SALES_LINK_TYPES } from "@/types/database";

const initialState: ActionState = { ok: false };

function FieldError({
  errors,
  name,
}: {
  errors?: Record<string, string[]>;
  name: string;
}) {
  const msg = errors?.[name]?.[0];
  if (!msg) return null;
  return <p className="error-text">{msg}</p>;
}

type SalesLinkFormProps = {
  bookId: string;
  link?: SalesLink | null;
  onCancel?: () => void;
};

export function SalesLinkForm({ bookId, link, onCancel }: SalesLinkFormProps) {
  const [state, formAction, pending] = useActionState(
    upsertSalesLinkAction,
    initialState
  );

  return (
    <div className="space-y-3">
      {state.message ? (
        <Alert variant={state.ok ? "success" : "error"}>{state.message}</Alert>
      ) : null}

      <form action={formAction} className="space-y-4 rounded-xl border border-sand bg-ivory/40 p-4">
        <input type="hidden" name="book_id" value={bookId} />
        {link?.id ? <input type="hidden" name="link_id" value={link.id} /> : null}

        <div>
          <label className="label-field" htmlFor="link_type">
            Link type
          </label>
          <select
            id="link_type"
            name="link_type"
            className="input-field"
            defaultValue={link?.link_type ?? "other"}
          >
            {SALES_LINK_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-field" htmlFor="label">
            Button label
          </label>
          <input
            id="label"
            name="label"
            className="input-field"
            required
            defaultValue={link?.label ?? ""}
            placeholder="Buy on my website"
          />
          <FieldError errors={state.fieldErrors} name="label" />
        </div>

        <div>
          <label className="label-field" htmlFor="url">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            className="input-field"
            required
            defaultValue={link?.url ?? ""}
            placeholder="https://"
          />
          <p className="help-text">
            Readers leave Authors Pilot to complete purchases. We do not process
            checkout or take royalties.
          </p>
          <FieldError errors={state.fieldErrors} name="url" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field" htmlFor="display_order">
              Display order
            </label>
            <input
              id="display_order"
              name="display_order"
              type="number"
              min={0}
              className="input-field"
              defaultValue={link?.display_order ?? 0}
            />
          </div>
          <div className="flex flex-col justify-end gap-3 pb-1">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="is_primary"
                defaultChecked={link?.is_primary ?? false}
              />
              Primary purchase link
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="is_active"
                value="true"
                defaultChecked={link?.is_active ?? true}
              />
              Active (visible to readers)
            </label>
            <input type="hidden" name="is_active" value="false" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={pending}>
            {link ? "Update link" : "Add link"}
          </Button>
          {onCancel ? (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

"use client";

import { useActionState, useMemo, useState } from "react";
import {
  saveBookDraftAction,
  submitBookAction,
} from "@/app/actions/books";
import type { ActionState } from "@/app/actions/auth";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import type { BookWithRelations, Genre } from "@/types/database";
import { LANGUAGES } from "@/types/database";
import { slugify } from "@/lib/utils";

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

type BookFormProps = {
  book?: BookWithRelations | null;
  genres: Genre[];
  defaultAuthorName?: string;
  readOnly?: boolean;
  showSubmit?: boolean;
};

export function BookForm({
  book,
  genres,
  defaultAuthorName = "",
  readOnly = false,
  showSubmit = false,
}: BookFormProps) {
  const [saveState, saveAction, savePending] = useActionState(
    saveBookDraftAction,
    initialState
  );
  const [submitState, submitAction, submitPending] = useActionState(
    submitBookAction,
    initialState
  );

  const [title, setTitle] = useState(book?.title ?? "");
  const slugHint = useMemo(() => slugify(title || book?.slug || ""), [title, book?.slug]);

  const state = submitState.message ? submitState : saveState;
  const pending = savePending || submitPending;

  return (
    <div className="space-y-4">
      {state.message ? (
        <Alert variant={state.ok ? "success" : "error"}>{state.message}</Alert>
      ) : null}

      <form action={saveAction} className="card-surface space-y-5">
        {book?.id ? (
          <input type="hidden" name="book_id" value={book.id} />
        ) : null}

        <div>
          <label className="label-field" htmlFor="title">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            name="title"
            className="input-field"
            required
            disabled={readOnly}
            defaultValue={book?.title ?? ""}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FieldError errors={state.fieldErrors} name="title" />
        </div>

        <div>
          <label className="label-field" htmlFor="subtitle">
            Subtitle
          </label>
          <input
            id="subtitle"
            name="subtitle"
            className="input-field"
            disabled={readOnly}
            defaultValue={book?.subtitle ?? ""}
          />
        </div>

        <div>
          <label className="label-field" htmlFor="slug">
            Public URL slug
          </label>
          <input
            id="slug"
            name="slug"
            className="input-field"
            disabled={readOnly}
            defaultValue={book?.slug ?? ""}
            placeholder={slugHint || "my-book-title"}
          />
          <p className="help-text">
            {slugHint
              ? `Listing URL: /books/${slugHint}`
              : "Leave blank to generate from the title when you save."}
          </p>
          <FieldError errors={state.fieldErrors} name="slug" />
        </div>

        <div>
          <label className="label-field" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            className="input-field"
            disabled={readOnly}
            defaultValue={book?.description ?? ""}
          />
          <p className="help-text">
            At least 40 characters required before you submit for review.
          </p>
          <FieldError errors={state.fieldErrors} name="description" />
        </div>

        <div>
          <label className="label-field" htmlFor="author_display_name">
            Author name (on listing) <span className="text-red-600">*</span>
          </label>
          <input
            id="author_display_name"
            name="author_display_name"
            className="input-field"
            required
            disabled={readOnly}
            defaultValue={book?.author_display_name ?? defaultAuthorName}
          />
          <FieldError errors={state.fieldErrors} name="author_display_name" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field" htmlFor="genre_id">
              Genre
            </label>
            <select
              id="genre_id"
              name="genre_id"
              className="input-field"
              disabled={readOnly}
              defaultValue={book?.genre_id ?? ""}
            >
              <option value="">Select a genre</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            <FieldError errors={state.fieldErrors} name="genre_id" />
          </div>

          <div>
            <label className="label-field" htmlFor="language">
              Language
            </label>
            <select
              id="language"
              name="language"
              className="input-field"
              disabled={readOnly}
              defaultValue={book?.language ?? "en"}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label-field" htmlFor="publication_date">
            Publication date
          </label>
          <input
            id="publication_date"
            name="publication_date"
            type="date"
            className="input-field"
            disabled={readOnly}
            defaultValue={book?.publication_date ?? ""}
          />
        </div>

        <div className="space-y-3 rounded-xl border border-sand bg-ivory/50 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="rights_confirmed"
              className="mt-1"
              disabled={readOnly}
              defaultChecked={book?.rights_confirmed ?? false}
            />
            <span className="text-sm text-charcoal">
              I confirm I own or control the rights to publish this work and
              may grant Authors Pilot permission to display this listing.
            </span>
          </label>
          <FieldError errors={state.fieldErrors} name="rights_confirmed" />

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="content_policy_accepted"
              className="mt-1"
              disabled={readOnly}
              defaultChecked={book?.content_policy_accepted ?? false}
            />
            <span className="text-sm text-charcoal">
              I agree this listing follows the Authors Pilot content policy (no
              illegal content, plagiarism, or misleading claims).
            </span>
          </label>
          <FieldError errors={state.fieldErrors} name="content_policy_accepted" />
        </div>

        {!readOnly ? (
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={pending}>
              {book?.id ? "Save draft" : "Create draft"}
            </Button>
            {showSubmit && book?.id ? (
              <Button
                type="submit"
                formAction={submitAction}
                disabled={pending}
                variant="secondary"
              >
                Submit for review
              </Button>
            ) : null}
          </div>
        ) : null}
      </form>
    </div>
  );
}

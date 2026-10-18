"use client";

import { DESCRIPTION_LIMIT, type PublishDraft } from "@/lib/publish/types";

const fieldClass =
  "mt-1 w-full rounded-lg border border-sand bg-ivory px-3 py-2 text-sm text-ink outline-none transition focus:border-[#273E2B] focus:ring-2 focus:ring-[#273E2B]/25";
const labelClass = "block font-sans text-xs font-medium text-ink sm:text-sm";

type Props = {
  draft: PublishDraft;
  onChange: (patch: Partial<PublishDraft>) => void;
};

export function StepBookDetails({ draft, onChange }: Props) {
  const remaining = DESCRIPTION_LIMIT - draft.description.length;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="book-title" className={labelClass}>
          Book Title *
        </label>
        <input
          id="book-title"
          value={draft.title}
          onChange={(event) => onChange({ title: event.target.value })}
          className={fieldClass}
          placeholder="The book title readers will search"
          required
        />
      </div>
      <div>
        <label htmlFor="book-subtitle" className={labelClass}>
          Subtitle (optional)
        </label>
        <input
          id="book-subtitle"
          value={draft.subtitle}
          onChange={(event) => onChange({ subtitle: event.target.value })}
          className={fieldClass}
          placeholder="A short line that clarifies the promise"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="author-first" className={labelClass}>
            Author first name *
          </label>
          <input
            id="author-first"
            value={draft.firstName}
            onChange={(event) => onChange({ firstName: event.target.value })}
            className={fieldClass}
            autoComplete="given-name"
            required
          />
        </div>
        <div>
          <label htmlFor="author-last" className={labelClass}>
            Author last name *
          </label>
          <input
            id="author-last"
            value={draft.lastName}
            onChange={(event) => onChange({ lastName: event.target.value })}
            className={fieldClass}
            autoComplete="family-name"
            required
          />
        </div>
      </div>
      <div>
        <div className="flex items-end justify-between gap-3">
          <label htmlFor="book-description" className={labelClass}>
            Description *
          </label>
          <span className="font-sans text-xs text-charcoal">
            {remaining.toLocaleString()} / {DESCRIPTION_LIMIT.toLocaleString()} left
          </span>
        </div>
        <textarea
          id="book-description"
          value={draft.description}
          maxLength={DESCRIPTION_LIMIT}
          rows={8}
          onChange={(event) => onChange({ description: event.target.value })}
          className={`${fieldClass} resize-y`}
          placeholder="Write the retail description. Keep it in the author’s voice."
        />
      </div>
    </div>
  );
}

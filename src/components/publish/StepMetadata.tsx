"use client";

import { KeywordTags } from "@/components/publish/KeywordTags";
import { cn } from "@/lib/cn";
import type { PublishDraft, RightsStatus } from "@/lib/publish/types";

type Props = {
  draft: PublishDraft;
  onChange: (patch: Partial<PublishDraft>) => void;
};

const rights: { value: RightsStatus; label: string; hint: string }[] = [
  {
    value: "copyright",
    label: "Copyright",
    hint: "You own the rights and can sell this work.",
  },
  {
    value: "public-domain",
    label: "Public domain",
    hint: "The work is free of copyright restrictions.",
  },
];

export function StepMetadata({ draft, onChange }: Props) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="font-sans text-xs font-medium text-ink sm:text-sm">
          Rights status
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {rights.map((option) => {
            const active = draft.rights === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer rounded-2xl border px-4 py-4 transition",
                  active ? "border-[#273E2B] bg-white shadow-soft" : "border-sand bg-ivory",
                )}
              >
                <input
                  type="radio"
                  name="rights"
                  value={option.value}
                  checked={active}
                  onChange={() => onChange({ rights: option.value })}
                  className="sr-only"
                />
                <span className="block font-sans text-sm font-semibold text-ink">
                  {option.label}
                </span>
                <span className="mt-1 block font-sans text-xs text-charcoal">
                  {option.hint}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <KeywordTags
        tags={draft.keywords}
        onChange={(keywords) => onChange({ keywords })}
      />
    </div>
  );
}

"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

type Props = {
  tags: string[];
  onChange: (tags: string[]) => void;
};

export function KeywordTags({ tags, onChange }: Props) {
  const [value, setValue] = useState("");

  function pushTag(raw: string) {
    const next = raw.replace(/,/g, "").trim();
    if (!next) return;
    if (tags.some((tag) => tag.toLowerCase() === next.toLowerCase())) {
      setValue("");
      return;
    }
    onChange([...tags, next].slice(0, 15));
    setValue("");
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      pushTag(value);
    }
    if (event.key === "Backspace" && !value && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div>
      <label htmlFor="keyword-input" className="block font-sans text-xs font-medium text-ink sm:text-sm">
        Keywords
      </label>
      <input
        id="keyword-input"
        value={value}
        onChange={(event) => {
          const next = event.target.value;
          if (next.includes(",")) {
            pushTag(next);
            return;
          }
          setValue(next);
        }}
        onKeyDown={onKeyDown}
        onBlur={() => pushTag(value)}
        placeholder="Type a keyword and press Enter or comma"
        className="mt-1 w-full rounded-lg border border-sand bg-ivory px-3 py-2 text-sm text-ink outline-none transition focus:border-[#273E2B] focus:ring-2 focus:ring-[#273E2B]/25"
      />
      {tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-sand bg-white px-3 py-1 font-sans text-xs font-semibold text-ink"
            >
              {tag}
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                onClick={() => onChange(tags.filter((item) => item !== tag))}
                className="rounded-full p-0.5 text-charcoal hover:bg-ivory hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

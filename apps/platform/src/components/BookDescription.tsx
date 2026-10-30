"use client";

import { useState } from "react";

type Props = {
  text: string;
};

/** Amazon-style description: first block bold, rest with Read more. */
export function BookDescription({ text }: Props) {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  const [open, setOpen] = useState(parts.length <= 2);

  const visible = open ? parts : parts.slice(0, 2);
  const hasMore = parts.length > 2;

  return (
    <div className="border-t border-sand pt-5">
      <div className="space-y-4 text-[15px] leading-7 text-ink">
        {visible.map((para, i) => (
          <p key={i} className={i === 0 ? "font-bold" : "font-normal"}>
            {para}
          </p>
        ))}
      </div>
      {hasMore && !open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-coral hover:underline"
        >
          Read more
          <span aria-hidden className="text-xs">
            ▾
          </span>
        </button>
      ) : null}
    </div>
  );
}

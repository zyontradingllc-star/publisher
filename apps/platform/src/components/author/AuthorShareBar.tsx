"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/utils";

type Props = {
  name: string;
  path: string;
};

export function AuthorShareBar({ name, path }: Props) {
  const url = `${SITE_URL}${path.endsWith("/") ? path : `${path}/`}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(`Meet ${name} on Authors Pilot`);
  const [copied, setCopied] = useState(false);

  const items = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${text}%20${encoded}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
    {
      label: "Reddit",
      href: `https://www.reddit.com/submit?url=${encoded}&title=${text}`,
    },
  ];

  return (
    <div className="rounded-none border border-sand bg-white/90 p-4 shadow-soft backdrop-blur sm:p-5">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink">
        Share this author page
      </p>
      <p className="mt-1 text-sm text-forest-muted">
        Post your public URL on social so readers can find your approved books.
      </p>
      <p className="mt-3 break-all rounded-none border border-sand bg-ivory/70 px-3 py-2 font-mono text-xs text-charcoal">
        {url}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-none border border-sand bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-charcoal transition hover:border-[#E08A2A]/50"
          >
            {item.label}
          </a>
        ))}
        <button
          type="button"
          className="rounded-none border border-sand bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-charcoal transition hover:border-[#E08A2A]/50"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

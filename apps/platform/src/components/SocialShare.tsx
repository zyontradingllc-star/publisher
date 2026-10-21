"use client";

import { SITE_URL } from "@/lib/utils";

type SocialShareProps = {
  title: string;
  path: string;
};

export function SocialShare({ title, path }: SocialShareProps) {
  const url = `${SITE_URL}${path}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

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
  ];

  return (
    <div>
      <p className="text-sm font-semibold text-ink">Share this book</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-sand bg-white px-3 py-1.5 text-xs font-semibold text-charcoal hover:border-coral/40"
          >
            {item.label}
          </a>
        ))}
        <button
          type="button"
          className="rounded-full border border-sand bg-white px-3 py-1.5 text-xs font-semibold text-charcoal hover:border-coral/40"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              alert("Link copied");
            } catch {
              alert(url);
            }
          }}
        >
          Copy link
        </button>
      </div>
      <p className="mt-2 text-xs text-forest-muted">
        Instagram sharing opens in the Instagram app on mobile - copy the link
        to paste into a story or post.
      </p>
    </div>
  );
}

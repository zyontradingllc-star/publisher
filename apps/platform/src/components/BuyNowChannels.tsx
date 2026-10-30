"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { recordOutboundClickAction } from "@/app/actions/books";
import { Button } from "@/components/ui/Button";
import {
  getPlatformById,
  PLATFORM_LOGO_CHANNELS,
} from "@/lib/sales-channels";
import type { SalesLink } from "@/types/database";

type Props = {
  bookId: string;
  links: SalesLink[] | undefined | null;
};

type Card = {
  id: string;
  title: string;
  hint: string;
  logo?: string;
  url: string | null;
  linkId: string | null;
  isPrimary?: boolean;
};

const ALL_CHANNEL_CARDS: Card[] = PLATFORM_LOGO_CHANNELS.map((p) => ({
  id: p.id,
  title: p.label,
  hint: "Add a live link when publishing",
  logo: p.logo,
  url: null,
  linkId: null,
}));

function activeSalesLinks(links: SalesLink[] | undefined | null): SalesLink[] {
  return (links ?? [])
    .filter((l) => l.is_active && l.url)
    .sort((a, b) => {
      if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
      return a.display_order - b.display_order;
    });
}

function resolveLogo(link: SalesLink) {
  const byType = getPlatformById(link.link_type);
  if (byType) return byType;
  return (
    PLATFORM_LOGO_CHANNELS.find(
      (p) =>
        p.label.toLowerCase() === link.label.toLowerCase() ||
        link.label.toLowerCase().includes(p.label.toLowerCase())
    ) ?? null
  );
}

function mergeLiveChannels(links: SalesLink[]): Card[] {
  const byPlatform = new Map<string, Card>();
  for (const link of links) {
    const platform = resolveLogo(link);
    const key = platform?.id || link.id;
    byPlatform.set(key, {
      id: platform?.id || link.id,
      title:
        platform?.label ||
        (link.link_type === "author_website" ? "Your Website" : link.label) ||
        "Store",
      hint: "Live",
      logo: platform?.logo,
      url: link.url,
      linkId: link.id,
      isPrimary: link.is_primary,
    });
  }

  const extras: Card[] = [];
  for (const [key, card] of byPlatform) {
    if (!PLATFORM_LOGO_CHANNELS.some((p) => p.id === key)) extras.push(card);
  }

  return [
    ...ALL_CHANNEL_CARDS.map((base) => byPlatform.get(base.id) ?? base),
    ...extras,
  ];
}

/**
 * All store logos; only channels with a live purchase URL are highlighted.
 */
export function BuyNowChannels({ bookId, links }: Props) {
  const active = useMemo(() => activeSalesLinks(links), [links]);
  const cards = useMemo(() => mergeLiveChannels(active), [active]);
  const [selectedId, setSelectedId] = useState<string>(cards[0]?.id ?? "");
  const liveCards = cards.filter((c) => c.url && c.linkId);
  const selected =
    cards.find((c) => c.id === selectedId && c.url) ?? liveCards[0] ?? null;
  const canBuy = Boolean(selected?.url && selected.linkId);

  return (
    <div className="w-full border border-sand bg-white p-4 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-forest-muted">
        Choose where to buy
      </p>
      <p className="mt-1 text-xs text-forest-muted">
        Highlighted stores have a live purchase link.
      </p>

      <div
        role="radiogroup"
        aria-label="Sales channels"
        className="mt-3 grid grid-cols-2 gap-2 sm:gap-3"
      >
        {cards.map((card) => {
          const live = Boolean(card.url && card.linkId);
          const isSelected = live && card.id === selected?.id;
          return (
            <button
              key={card.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={!live}
              onClick={() => live && setSelectedId(card.id)}
              className={`flex min-h-[5.75rem] flex-col items-start justify-between border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                live
                  ? isSelected
                    ? "border-coral bg-[#FFF8F0] shadow-soft opacity-100"
                    : "border-sand bg-white opacity-100 hover:border-coral/40"
                  : "cursor-default border-sand bg-ivory/40 opacity-40 grayscale"
              }`}
            >
              <span className="flex w-full items-start justify-between gap-2">
                <span className="font-display text-sm font-bold text-ink">
                  {card.title}
                </span>
                {card.logo ? (
                  <Image
                    src={card.logo}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 shrink-0 object-contain"
                  />
                ) : null}
              </span>
              <span className="mt-2 text-xs text-forest-muted">
                {live ? "Live" : "Not linked"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 border-t border-sand pt-5">
        {canBuy && selected?.url && selected.linkId ? (
          <form action={recordOutboundClickAction} className="w-full">
            <input type="hidden" name="link_id" value={selected.linkId} />
            <input type="hidden" name="book_id" value={bookId} />
            <input type="hidden" name="url" value={selected.url} />
            <Button type="submit" className="w-full !py-3.5 text-sm">
              Buy now with 1-Click
            </Button>
          </form>
        ) : (
          <Button type="button" disabled className="w-full !py-3.5 text-sm">
            Buy now with 1-Click
          </Button>
        )}
        <p className="mt-2 text-xs text-forest-muted">
          {canBuy ? (
            <>
              You&apos;ll open{" "}
              <span className="font-semibold text-ink">{selected?.title}</span>.
              Authors Pilot does not process payments.
            </>
          ) : (
            <>
              Store links are not added yet. Add them when publishing (Rights
              &amp; sales) — then this button opens the selected store.
            </>
          )}
        </p>
      </div>

      <div className="mt-5 border-t border-sand pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-muted">
          Store logos
        </p>
        <ul className="mt-3 flex flex-wrap gap-3" aria-label="Store logos">
          {cards.map((card) => {
            const live = Boolean(card.url && card.linkId);
            const isSelected = live && card.id === selected?.id;
            return (
              <li key={`logo-${card.id}`}>
                <button
                  type="button"
                  disabled={!live}
                  onClick={() => live && setSelectedId(card.id)}
                  title={live ? card.title : `${card.title} (not linked)`}
                  className={`group flex w-[4.5rem] flex-col items-center gap-1.5 p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                    live
                      ? isSelected
                        ? "opacity-100"
                        : "opacity-80 hover:opacity-100"
                      : "cursor-default opacity-25 grayscale"
                  }`}
                >
                  <span
                    className={`relative flex h-10 w-10 items-center justify-center border bg-white shadow-soft ${
                      isSelected ? "border-coral" : "border-sand"
                    }`}
                  >
                    {card.logo ? (
                      <Image
                        src={card.logo}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                    ) : (
                      <span className="text-[10px] font-bold uppercase text-ink">
                        {card.title.slice(0, 3)}
                      </span>
                    )}
                  </span>
                  <span className="max-w-full truncate text-center text-[10px] font-medium text-charcoal">
                    {card.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

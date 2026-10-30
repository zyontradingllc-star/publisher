"use client";

import Image from "next/image";
import {
  PLATFORM_LOGO_CHANNELS,
  type PlatformLogoChannel,
} from "@/lib/sales-channels";

type Props = {
  /** Channel ids that already have a URL row */
  selected: string[];
  /** Click a logo to add its URL field below */
  onAdd: (id: string) => void;
  /** Hidden input name submitted with the form */
  name?: string;
};

export function PlatformLogoPicker({
  selected,
  onAdd,
  name = "primary_marketplace",
}: Props) {
  return (
    <div className="space-y-3">
      <input
        type="hidden"
        name={name}
        value={selected.length ? selected.join(",") : ""}
      />
      <div
        role="group"
        aria-label="Sales platforms"
        className="flex flex-wrap gap-3"
      >
        {PLATFORM_LOGO_CHANNELS.map((channel) => (
          <PlatformLogoButton
            key={channel.id}
            channel={channel}
            selected={selected.includes(channel.id)}
            onAdd={() => onAdd(channel.id)}
          />
        ))}
      </div>
      <p className="text-xs text-forest-muted">
        Click a logo to add its purchase URL below. Use + to add more links.
      </p>
    </div>
  );
}

function PlatformLogoButton({
  channel,
  selected,
  onAdd,
}: {
  channel: PlatformLogoChannel;
  selected: boolean;
  onAdd: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onAdd}
      aria-pressed={selected}
      title={
        selected
          ? `${channel.label} (already added)`
          : `Add ${channel.label} URL`
      }
      className={`group flex w-[4.75rem] flex-col items-center gap-1.5 p-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
        selected ? "opacity-100" : "opacity-80 hover:opacity-100"
      }`}
    >
      <span
        className={`relative flex h-10 w-10 items-center justify-center transition ${
          selected ? "ring-2 ring-coral ring-offset-2 ring-offset-white" : ""
        }`}
      >
        <Image
          src={channel.logo}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
      </span>
      <span
        className={`line-clamp-2 text-center text-[10px] font-semibold leading-tight ${
          selected ? "text-ink" : "text-charcoal"
        }`}
      >
        {channel.label}
      </span>
    </button>
  );
}

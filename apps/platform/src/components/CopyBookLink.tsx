"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function CopyBookLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      <div className="flex min-w-0 flex-1 items-center border border-sand bg-ivory px-3 py-2.5">
        <p className="truncate font-mono text-xs text-charcoal sm:text-sm" title={url}>
          {url}
        </p>
      </div>
      <Button
        type="button"
        onClick={handleCopy}
        className="!px-5 !py-2.5 text-xs shrink-0"
      >
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}

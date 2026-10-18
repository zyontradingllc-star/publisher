"use client";

import { useRef, useState, type DragEvent } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/cn";
import type { FileMeta } from "@/lib/publish/types";

type Props = {
  label: string;
  hint: string;
  accept: string;
  value: FileMeta | null;
  onFile: (file: File) => void;
};

export function FileDropZone({ label, hint, accept, value, onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  function takeFile(file?: File) {
    if (!file) return;
    onFile(file);
  }

  function onDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    setOver(false);
    takeFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div>
      <p className="font-sans text-xs font-medium text-ink sm:text-sm">{label}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={cn(
          "mt-1 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 text-center transition",
          over ? "border-[#E08A2A] bg-[#FFF8EE]" : "border-sand bg-ivory hover:border-[#273E2B]/40",
        )}
      >
        <Upload className="h-6 w-6 text-[#E08A2A]" aria-hidden />
        <span className="mt-2 font-sans text-sm font-semibold text-ink">
          {value ? value.name : "Drop file here or browse"}
        </span>
        <span className="mt-1 font-sans text-xs text-charcoal">{hint}</span>
        {value && (
          <span className="mt-1 font-sans text-xs text-charcoal">
            {(value.size / 1024).toFixed(0)} KB
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(event) => takeFile(event.target.files?.[0])}
      />
    </div>
  );
}

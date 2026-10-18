"use client";

import { FileDropZone } from "@/components/publish/FileDropZone";
import { PainPointWarning } from "@/components/publish/PainPointWarning";
import { PaidSoonBadge } from "@/components/publish/PaidSoonBadge";
import { cn } from "@/lib/cn";
import { storefrontUrl } from "@/lib/publish/slugify";
import type { FileMeta, MonetizationMode, PublishDraft } from "@/lib/publish/types";

type Props = {
  draft: PublishDraft;
  coverPreview: string | null;
  onChange: (patch: Partial<PublishDraft>) => void;
  onManuscript: (file: File) => void;
  onCover: (file: File) => void;
};

const modes: { value: MonetizationMode; label: string }[] = [
  { value: "external", label: "External URL" },
  { value: "storefront", label: "Independent AuthorsPilot Storefront" },
];

function toMeta(file: File): FileMeta {
  return { name: file.name, size: file.size, type: file.type };
}

export function StepUpload({
  draft,
  coverPreview,
  onChange,
  onManuscript,
  onCover,
}: Props) {
  const storeUrl = storefrontUrl(draft.title);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <FileDropZone
          label="Manuscript"
          hint=".docx or .epub"
          accept=".docx,.epub,application/epub+zip,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          value={draft.manuscript}
          onFile={(file) => {
            onManuscript(file);
            onChange({ manuscript: toMeta(file) });
          }}
        />
        <FileDropZone
          label="Cover file"
          hint="JPG, PNG, or WebP"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          value={draft.cover}
          onFile={(file) => {
            onCover(file);
            onChange({ cover: toMeta(file) });
          }}
        />
      </div>

      {coverPreview && (
        <div className="relative mx-auto aspect-[2/3] w-40 overflow-hidden rounded-xl shadow-book ring-1 ring-sand">
          {/* Local object URL — not a hosted asset */}
          <img
            src={coverPreview}
            alt={`${draft.title || "Book"} cover preview`}
            width={160}
            height={240}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <fieldset>
        <legend className="font-sans text-xs font-medium text-ink sm:text-sm">
          Monetization
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {modes.map((mode) => {
            const active = draft.monetization === mode.value;
            return (
              <label
                key={mode.value}
                className={cn(
                  "relative cursor-pointer rounded-2xl border px-4 py-4 transition",
                  active ? "border-[#273E2B] bg-white shadow-soft" : "border-sand bg-ivory",
                )}
              >
                {mode.value === "storefront" && <PaidSoonBadge />}
                <input
                  type="radio"
                  name="monetization"
                  value={mode.value}
                  checked={active}
                  onChange={() => onChange({ monetization: mode.value })}
                  className="sr-only"
                />
                <span className="block font-sans text-sm font-semibold text-ink">
                  {mode.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {draft.monetization === "external" && (
        <div>
          <label htmlFor="external-url" className="block font-sans text-xs font-medium text-ink sm:text-sm">
            Buy link
          </label>
          <input
            id="external-url"
            type="url"
            value={draft.externalUrl}
            onChange={(event) => onChange({ externalUrl: event.target.value })}
            placeholder="https://your-store.com/book"
            className="mt-1 w-full rounded-lg border border-sand bg-ivory px-3 py-2 text-sm text-ink outline-none transition focus:border-[#273E2B] focus:ring-2 focus:ring-[#273E2B]/25"
          />
        </div>
      )}

      {draft.monetization === "storefront" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-sand bg-white px-4 py-3">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#E08A2A]">
              Live storefront URL
            </p>
            <p className="mt-1 break-all font-sans text-sm font-semibold text-ink">
              {storeUrl}
            </p>
          </div>
          <PainPointWarning />
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StepBookDetails } from "@/components/publish/StepBookDetails";
import { StepMetadata } from "@/components/publish/StepMetadata";
import { StepUpload } from "@/components/publish/StepUpload";
import { cn } from "@/lib/cn";
import { loadPublishDraft, savePublishDraft } from "@/lib/publish/storage";
import { slugifyTitle } from "@/lib/publish/slugify";
import { emptyPublishDraft, type PublishDraft } from "@/lib/publish/types";

const steps = [
  { id: 1, label: "Book details" },
  { id: 2, label: "Metadata & rights" },
  { id: 3, label: "Upload & activate" },
] as const;

function parseStep(value: string | null) {
  const n = Number(value);
  return n === 2 || n === 3 ? n : 1;
}

export function PublishWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = parseStep(searchParams.get("step"));
  const [draft, setDraft] = useState<PublishDraft>(emptyPublishDraft);
  const [hydrated, setHydrated] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft(loadPublishDraft());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePublishDraft(draft);
  }, [draft, hydrated]);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const author = useMemo(
    () => `${draft.firstName} ${draft.lastName}`.trim(),
    [draft.firstName, draft.lastName],
  );

  function go(next: number) {
    router.push(`/publish/?step=${next}`, { scroll: false });
  }

  function patch(next: Partial<PublishDraft>) {
    setError("");
    setDraft((prev) => ({ ...prev, ...next }));
  }

  function validate() {
    if (step === 1) {
      if (draft.title.trim().length < 2) return "Add a book title.";
      if (draft.firstName.trim().length < 1 || draft.lastName.trim().length < 1) {
        return "Add the author first and last name.";
      }
      if (draft.description.trim().length < 40) {
        return "Write a description of at least 40 characters.";
      }
    }
    if (step === 2 && draft.keywords.length < 1) {
      return "Add at least one keyword.";
    }
    if (step === 3) {
      if (!draft.manuscript) return "Upload a manuscript file.";
      if (!draft.cover) return "Upload a cover file.";
      if (draft.monetization === "external" && !/^https?:\/\//.test(draft.externalUrl)) {
        return "Add a valid external buy link.";
      }
    }
    return "";
  }

  function onNext() {
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    if (step < 3) {
      go(step + 1);
      return;
    }
    const next = { ...draft, activated: true };
    setDraft(next);
    savePublishDraft(next);
    router.push(`/store/${slugifyTitle(draft.title)}/`);
  }

  return (
    <div className="rounded-2xl border border-sand bg-white p-5 shadow-soft sm:p-8">
      <ol className="mb-8 grid grid-cols-3 gap-2">
        {steps.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => go(item.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-full px-3 py-2 text-left font-sans text-xs font-semibold uppercase tracking-wide",
                step === item.id
                  ? "bg-[#273E2B] text-white"
                  : "bg-ivory text-charcoal hover:text-ink",
              )}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                {step > item.id ? <Check className="h-3.5 w-3.5" /> : item.id}
              </span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          </li>
        ))}
      </ol>

      {step === 1 && <StepBookDetails draft={draft} onChange={patch} />}
      {step === 2 && <StepMetadata draft={draft} onChange={patch} />}
      {step === 3 && (
        <StepUpload
          draft={draft}
          coverPreview={coverPreview}
          onChange={patch}
          onManuscript={() => undefined}
          onCover={(file) => {
            if (coverPreview) URL.revokeObjectURL(coverPreview);
            setCoverPreview(URL.createObjectURL(file));
          }}
        />
      )}

      {error && <p className="mt-4 font-sans text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-between">
        {step > 1 ? (
          <Button variant="ghost" onClick={() => go(step - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button onClick={onNext}>
          {step === 3 ? `Activate storefront${author ? ` for ${author}` : ""}` : "Continue"}
        </Button>
      </div>
    </div>
  );
}

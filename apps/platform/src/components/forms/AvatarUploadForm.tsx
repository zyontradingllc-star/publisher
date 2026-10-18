"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { uploadAvatarAction } from "@/app/actions/profile";
import type { ActionState } from "@/app/actions/auth";

const initialState: ActionState = { ok: false };

type Props = {
  initialUrl?: string | null;
};

export function AvatarUploadForm({ initialUrl }: Props) {
  const [state, formAction, pending] = useActionState(
    uploadAvatarAction,
    initialState
  );
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [attached, setAttached] = useState(Boolean(initialUrl));
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setPreview(initialUrl ?? null);
    if (initialUrl) setAttached(true);
  }, [initialUrl]);

  useEffect(() => {
    if (state.ok) setAttached(true);
  }, [state.ok]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const showCheck = attached && preview && !pending;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <form ref={formRef} action={formAction} className="contents">
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={pending}
            className="relative h-24 w-24 overflow-hidden rounded-full bg-ivory ring-2 ring-sand transition hover:ring-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral disabled:opacity-60"
            aria-label="Choose profile photo"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-xs text-forest-muted">
                {pending ? "…" : "No photo"}
              </span>
            )}
          </button>

          {showCheck ? (
            <span
              className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-green-600 text-white shadow-soft"
              title="Photo attached"
              aria-label="Photo attached"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path
                  d="M4 10.5 8 14.5 16 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ) : null}
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-ink">Profile photo</p>
          <p className="text-sm text-forest-muted">
            Click the circle to choose a photo. It appears here right away.
          </p>
          {showCheck ? (
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M4 10.5 8 14.5 16 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Photo attached
            </p>
          ) : null}
          {state.message && !state.ok ? (
            <p className="text-sm text-red-600" role="alert">
              {state.message}
            </p>
          ) : null}
          <input
            ref={inputRef}
            type="file"
            name="avatar"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = URL.createObjectURL(file);
              setPreview((prev) => {
                if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
                return url;
              });
              setAttached(true);
              formRef.current?.requestSubmit();
            }}
          />
        </div>
      </form>
    </div>
  );
}

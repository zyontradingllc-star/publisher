import { slugifyTitle } from "@/lib/publish/slugify";
import {
  emptyPublishDraft,
  PUBLISH_STORAGE_KEY,
  type PublishDraft,
} from "@/lib/publish/types";

export function loadPublishDraft(): PublishDraft {
  if (typeof window === "undefined") return emptyPublishDraft();
  try {
    const raw = window.localStorage.getItem(PUBLISH_STORAGE_KEY);
    if (!raw) return emptyPublishDraft();
    return { ...emptyPublishDraft(), ...(JSON.parse(raw) as Partial<PublishDraft>) };
  } catch {
    return emptyPublishDraft();
  }
}

export function savePublishDraft(draft: PublishDraft) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PUBLISH_STORAGE_KEY, JSON.stringify(draft));
}

export function loadStoreDraft(slug: string): PublishDraft | null {
  const draft = loadPublishDraft();
  if (draft.activated && slugifyTitle(draft.title) === slug) return draft;
  return null;
}

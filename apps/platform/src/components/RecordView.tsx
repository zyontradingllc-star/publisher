"use client";

import { useEffect, useRef } from "react";
import {
  recordAuthorViewAction,
  recordBookViewAction,
} from "@/app/actions/activity";

/** Fire-and-forget public view beacon (once per mount). */
export function RecordBookView({ bookId }: { bookId: string }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void recordBookViewAction(bookId);
  }, [bookId]);
  return null;
}

export function RecordAuthorView({ profileId }: { profileId: string }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void recordAuthorViewAction(profileId);
  }, [profileId]);
  return null;
}

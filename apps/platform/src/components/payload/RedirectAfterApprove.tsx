"use client";

import { useEffect, useRef } from "react";
import { useDocumentInfo, useFormFields } from "@payloadcms/ui";

const FLAG_PREFIX = "ap-cms-approve-redirect:";

/**
 * After Status → Approved + Save, jump straight to the new public book page.
 */
export function RedirectAfterApprove() {
  const { id } = useDocumentInfo();
  const status = useFormFields(([fields]) => fields.status?.value);
  const publicSlug = useFormFields(([fields]) => fields.publicSlug?.value);
  const prevStatus = useRef(status);

  useEffect(() => {
    if (!id) return;
    if (prevStatus.current !== "approved" && status === "approved") {
      sessionStorage.setItem(`${FLAG_PREFIX}${id}`, "1");
    }
    prevStatus.current = status;
  }, [id, status]);

  useEffect(() => {
    if (!id || status !== "approved") return;
    const slug = typeof publicSlug === "string" ? publicSlug.trim() : "";
    if (!slug) return;
    const flag = sessionStorage.getItem(`${FLAG_PREFIX}${id}`);
    if (flag !== "1") return;
    sessionStorage.removeItem(`${FLAG_PREFIX}${id}`);
    window.location.assign(`/books/${encodeURIComponent(slug)}`);
  }, [id, status, publicSlug]);

  if (status === "approved" && typeof publicSlug === "string" && publicSlug) {
    return (
      <p className="field-description" style={{ marginTop: "0.5rem" }}>
        Public page:{" "}
        <a href={`/books/${encodeURIComponent(publicSlug)}`}>
          /books/{publicSlug}
        </a>
      </p>
    );
  }

  return null;
}

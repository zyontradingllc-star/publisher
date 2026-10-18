"use client";

import { useState } from "react";
import { getManuscriptSignedUrl } from "@/app/actions/admin";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export function ManuscriptAccess({
  bookId,
  filename,
}: {
  bookId: string;
  filename?: string | null;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setError(null);
    setLoading(true);
    try {
      const result = await getManuscriptSignedUrl(bookId);
      if (result.error || !result.url) {
        setError(result.error ?? "Could not open manuscript.");
        return;
      }
      window.open(result.url, "_blank", "noopener,noreferrer");
    } catch {
      setError("Could not open manuscript.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      {error ? <Alert variant="error">{error}</Alert> : null}
      <p className="text-sm text-forest-muted">
        {filename
          ? `On file: ${filename} (private — signed URL expires in 2 minutes)`
          : "No manuscript uploaded."}
      </p>
      <Button
        type="button"
        variant="secondary"
        disabled={loading || !filename}
        onClick={handleDownload}
      >
        {loading ? "Opening…" : "Download manuscript"}
      </Button>
    </div>
  );
}

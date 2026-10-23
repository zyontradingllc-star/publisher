import { isPayloadConfigured } from "@/lib/payload";

/**
 * When true, books / drafts / sale-links / profiles use Payload (Mongo).
 * When false/unset, those reads/writes stay on Firestore (rollback).
 * Firebase Auth (+ Storage uploads) are unaffected either way.
 */
export function usePayloadData(): boolean {
  return (
    process.env.USE_PAYLOAD_DATA === "true" && isPayloadConfigured()
  );
}

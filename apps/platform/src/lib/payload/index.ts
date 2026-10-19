import { getPayload, type Payload } from "payload";
import config from "@payload-config";

export function isPayloadConfigured(): boolean {
  const url = process.env.DATABASE_URL || process.env.MONGODB_URI;
  const secret = process.env.PAYLOAD_SECRET;
  return Boolean(url && secret && secret !== "CHANGE-ME-IN-ENV");
}

let cached: Payload | null = null;

/** Local API client — use from server actions / Node only. */
export async function getPayloadClient(): Promise<Payload> {
  if (!isPayloadConfigured()) {
    throw new Error(
      "Payload is not configured. Set DATABASE_URL (or MONGODB_URI) and PAYLOAD_SECRET."
    );
  }
  if (cached) return cached;
  cached = await getPayload({ config });
  return cached;
}

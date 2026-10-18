/**
 * Circuit breaker when Supabase is unreachable.
 * Uses process memory + a short cookie so Edge middleware and Node
 * server components agree (they do not share memory).
 */
import { cookies } from "next/headers";

export const SB_DOWN_COOKIE = "ap_sb_down";

let downUntil = 0;

const COOLDOWN_MS = 60_000;

export function isSupabaseCircuitOpen(): boolean {
  return Date.now() < downUntil;
}

export function markSupabaseDown(ms: number = COOLDOWN_MS) {
  downUntil = Math.max(downUntil, Date.now() + ms);
}

export function markSupabaseUp() {
  downUntil = 0;
}

export function sbDownCookieOptions(maxAgeSec = 60) {
  return {
    name: SB_DOWN_COOKIE,
    value: "1",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSec,
  };
}

export function clearSbDownCookieOptions() {
  return {
    name: SB_DOWN_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

/** Prefer this over bare isSupabaseConfigured() for any network call. */
export function shouldUseSupabase(configured: boolean): boolean {
  return configured && !isSupabaseCircuitOpen();
}

/** Async check including the shared down cookie (Node server components). */
export async function shouldUseSupabaseAsync(
  configured: boolean
): Promise<boolean> {
  if (!configured) return false;
  if (isSupabaseCircuitOpen()) return false;
  try {
    const store = await cookies();
    if (store.get(SB_DOWN_COOKIE)?.value === "1") {
      markSupabaseDown();
      return false;
    }
  } catch {
    // cookies() unavailable in some contexts
  }
  return true;
}

/**
 * Waitlist submission integration layer.
 *
 * This is the ONLY place that knows how a signup is sent. Today it POSTs to an
 * AWS API Gateway endpoint (see /aws). Swapping to Supabase / another provider
 * later means changing only this file.
 *
 * If NEXT_PUBLIC_WAITLIST_ENDPOINT is not set, it runs in "demo mode": it
 * validates + simulates a successful signup so the full UX works before the
 * backend exists. Demo mode logs a clear warning and never pretends to store
 * anything.
 */
import { getAttribution } from "@/lib/tracking";

const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubmitResult =
  | { ok: true; demo: boolean }
  | { ok: false; error: string; code: "invalid" | "duplicate" | "network" };

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

/** Local guard against a user resubmitting the same email in one session. */
const SUBMITTED_KEY = "arc_waitlist_submitted_emails";

function readSubmitted(): string[] {
  try {
    const raw = localStorage.getItem(SUBMITTED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function rememberSubmitted(email: string) {
  try {
    const list = readSubmitted();
    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem(SUBMITTED_KEY, JSON.stringify(list));
    }
  } catch {
    /* ignore storage errors (private mode etc.) */
  }
}

export function alreadySubmitted(email: string): boolean {
  return readSubmitted().includes(email.trim().toLowerCase());
}

export async function submitWaitlist(rawEmail: string): Promise<SubmitResult> {
  const email = rawEmail.trim().toLowerCase();

  if (!isValidEmail(email)) {
    return { ok: false, error: "Enter a valid email address.", code: "invalid" };
  }

  if (alreadySubmitted(email)) {
    // Treat as success from the user's perspective, but flag it.
    return { ok: false, error: "You're already on the list.", code: "duplicate" };
  }

  const payload = {
    email,
    timestamp: new Date().toISOString(),
    ...getAttribution(),
  };

  // Demo mode: no backend configured yet.
  if (!ENDPOINT) {
    if (typeof console !== "undefined") {
      console.warn(
        "[waitlist] NEXT_PUBLIC_WAITLIST_ENDPOINT is not set — running in demo mode. " +
          "Signup was NOT stored. Payload:",
        payload
      );
    }
    await new Promise((r) => setTimeout(r, 700));
    rememberSubmitted(email);
    return { ok: true, demo: true };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 409) {
      rememberSubmitted(email);
      return { ok: false, error: "You're already on the list.", code: "duplicate" };
    }

    if (!res.ok) {
      return {
        ok: false,
        error: "Something went wrong. Try again in a sec.",
        code: "network",
      };
    }

    rememberSubmitted(email);
    return { ok: true, demo: false };
  } catch {
    return {
      ok: false,
      error: "Network error. Check your connection and try again.",
      code: "network",
    };
  }
}

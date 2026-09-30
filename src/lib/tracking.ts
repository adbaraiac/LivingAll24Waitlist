/**
 * Attribution capture.
 *
 * Reads referral + UTM parameters from the current URL so we can later tell
 * which TikTok / Reel / Short drove a signup. All values are optional and this
 * is safe to call on the server (it returns empty values when there is no
 * window / URL available).
 */

export type Attribution = {
  /** Freeform "?ref=" or "?source=" param (e.g. a creator/video id). */
  referral: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  /** The full landing URL (minus the query string) for context. */
  landing_page: string | null;
  /** document.referrer, if any. */
  referrer: string | null;
};

const EMPTY: Attribution = {
  referral: null,
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_content: null,
  utm_term: null,
  landing_page: null,
  referrer: null,
};

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY;

  try {
    const params = new URLSearchParams(window.location.search);
    const pick = (...keys: string[]) => {
      for (const k of keys) {
        const v = params.get(k);
        if (v) return v.slice(0, 256); // guard against absurdly long values
      }
      return null;
    };

    return {
      referral: pick("ref", "source", "r"),
      utm_source: pick("utm_source"),
      utm_medium: pick("utm_medium"),
      utm_campaign: pick("utm_campaign"),
      utm_content: pick("utm_content"),
      utm_term: pick("utm_term"),
      landing_page: window.location.origin + window.location.pathname,
      referrer: document.referrer || null,
    };
  } catch {
    return EMPTY;
  }
}

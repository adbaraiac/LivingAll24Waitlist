/**
 * Single source of truth for brand + copy-level constants.
 * Change the app name / taglines here and it updates everywhere.
 */
export const site = {
  /** The app name. Change this one value to rebrand the whole site. */
  name: "LivingAll24",
  /** Short tagline used in metadata + hero. */
  tagline: "Level Up Your Actual Life.",
  /** SEO description / OG description. */
  description:
    "Turn your goals into a game. Build your OVR, earn XP, compete with friends, and become the person you want to be.",
  /**
   * Public URL of the deployed site, including any base path (used for Open
   * Graph share previews). Set at build time by the deploy workflow via
   * NEXT_PUBLIC_SITE_URL; falls back to the local dev server.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, ""),
  /** Sub-path the site is served from ("" at a domain root). */
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, ""),
  /** Where the "not launched yet" status is communicated. */
  status: "Coming soon",
} as const;

export type Site = typeof site;

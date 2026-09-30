# LivingAll24 — waitlist landing page

A mobile-first waitlist landing page for a gamified self-improvement app.
Built with **Next.js 15 + React 19 + TypeScript + Tailwind CSS**, output as a
fully static site (deployable to GitHub Pages, S3, Netlify, Vercel — anything).

The waitlist form stores signups in **AWS DynamoDB** and **emails you** on every
signup via **AWS SNS**.

---

## Quick start (local)

```bash
npm install
npm run dev
```

Open http://localhost:3000. The form runs in **demo mode** until you set an AWS
endpoint (see below) — it shows the full success flow but doesn't store anything.

Other scripts:

```bash
npm run build      # static export to ./out
npm run typecheck  # TypeScript check
npm run lint       # Next.js lint
```

---

## Changing the app name

The app name lives in **one file**:

```
src/config/site.ts
```

Change `name`, `tagline`, `description`, and `url` there and it updates across
the whole site, page metadata, and social share tags. No other file needs
editing to rebrand.

## Changing the look

- **Accent color + surfaces:** `tailwind.config.ts` (the `colors` block) and the
  CSS variables in `src/app/globals.css`. The single accent is `accent.DEFAULT`.
- **Copy:** each section is its own component in `src/components/sections/`.
- **The app mockup in the hero:** `src/components/PhoneMockup.tsx`.

---

## Project structure

```
src/
  app/
    layout.tsx        # fonts + SEO/Open Graph metadata
    page.tsx          # assembles the sections
    globals.css       # theme tokens + base styles
  config/
    site.ts           # ← app name and brand constants (single source of truth)
  components/
    WaitlistForm.tsx  # the functional signup form (validation/loading/success)
    PhoneMockup.tsx   # conceptual app UI (pure HTML/CSS, no screenshot)
    Reveal.tsx        # scroll-reveal wrapper
    ui/StatBar.tsx    # animated category stat bar
    sections/         # Hero, Problem, OvrShowcase, HowItWorks,
                      # DistractionBlocking, FriendCompetition,
                      # FutureSelf, FinalCTA, Footer
  hooks/
    useInView.ts      # IntersectionObserver reveal trigger
    useCountUp.ts     # number count-up (respects reduced motion)
  lib/
    waitlist.ts       # ← the ONLY place that talks to the backend
    tracking.ts       # captures ?ref / utm_* params for attribution
    ovr.ts            # OVR tier colors/labels

aws/
  lambda/index.mjs    # signup handler (DynamoDB + SNS email alert)
  template.yaml       # one-command infra (API Gateway + Lambda + DynamoDB)

.github/workflows/deploy.yml   # build + deploy to GitHub Pages
```

---

## Going live

Full step-by-step instructions — AWS backend first, then GitHub Pages hosting —
are in **[DEPLOYMENT.md](DEPLOYMENT.md)**.

Short version:

1. Deploy the AWS backend (`aws/`) → you get an API endpoint URL.
2. Push this repo to GitHub.
3. Add one repo **Variable**: `WAITLIST_ENDPOINT` (the URL). The base path is
   derived from the repo name automatically.
4. Enable **Pages → Source: GitHub Actions**. Every push to `main` deploys.

## Attribution / analytics

Every signup captures, when present in the URL:

- `email` + signup `timestamp`
- `?ref=` / `?source=` (put a creator or video id here)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- landing page + referrer

So a link like
`https://yoursite.com/?ref=tiktok_gym_v3&utm_source=tiktok` tells you exactly
which clip drove the signup — it shows up in the notification email and in
DynamoDB.

## Security

- No credentials are ever hardcoded. Config comes from environment variables.
- `.env.local` is gitignored. Only `NEXT_PUBLIC_*` values reach the browser, and
  the only one there is the public API URL (which is meant to be public).

import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Build your character",
    body: "Tell the app who you want to become and the goals that actually matter to you.",
    visual: <BuildVisual />,
  },
  {
    n: "02",
    title: "Get your daily missions",
    body: "Your goals become specific actions you can knock out today — not a vague to-do list.",
    visual: <MissionsVisual />,
  },
  {
    n: "03",
    title: "Earn XP + raise your OVR",
    body: "Every day you follow through, you earn XP and your stats climb.",
    visual: <XpVisual />,
  },
  {
    n: "04",
    title: "Compete with friends",
    body: "Start a private league and see who stacks the most XP each week.",
    visual: <CompeteVisual />,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            From goals to game in four steps.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} className="card flex flex-col p-6" delay={i * 90}>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/12 font-display text-sm font-bold text-accent">
                  {step.n}
                </span>
                <h3 className="font-display text-lg font-bold text-ink">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {step.body}
              </p>
              <div className="mt-5">{step.visual}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- little inline UI visuals --- */

function BuildVisual() {
  return (
    <div className="flex flex-wrap gap-2">
      {["Get lean", "Launch my brand", "3.8 GPA", "Save $5k"].map((g) => (
        <span
          key={g}
          className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-ink"
        >
          {g}
        </span>
      ))}
    </div>
  );
}

function MissionsVisual() {
  const items = [
    { t: "Train — push day", done: true },
    { t: "Deep work · 90 min", done: true },
    { t: "Read 10 pages", done: false },
  ];
  return (
    <div className="space-y-2">
      {items.map((it) => (
        <div
          key={it.t}
          className="flex items-center gap-2.5 rounded-lg border border-line bg-white/[0.03] px-3 py-2"
        >
          <span
            className={`grid h-4 w-4 place-items-center rounded-[5px] ${
              it.done ? "bg-accent text-black" : "border border-white/25"
            }`}
          >
            {it.done && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span
            className={`text-[13px] ${it.done ? "text-muted line-through decoration-white/20" : "text-ink"}`}
          >
            {it.t}
          </span>
        </div>
      ))}
    </div>
  );
}

function XpVisual() {
  return (
    <div className="rounded-xl border border-line bg-white/[0.03] p-4">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>Today</span>
        <span className="font-semibold text-accent">+320 XP</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: "72%", boxShadow: "0 0 12px rgba(180,255,57,0.5)" }}
        />
      </div>
      <p className="mt-2 text-xs text-faint">72% to your next level</p>
    </div>
  );
}

function CompeteVisual() {
  const rows = [
    { name: "Jake", xp: "4,850", you: false },
    { name: "You", xp: "4,420", you: true },
    { name: "Daniel", xp: "3,970", you: false },
  ];
  return (
    <div className="space-y-1.5">
      {rows.map((r, i) => (
        <div
          key={r.name}
          className={`flex items-center justify-between rounded-lg px-3 py-2 text-[13px] ${
            r.you ? "border border-accent/30 bg-accent/[0.07]" : "bg-white/[0.03]"
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="tabular w-4 text-faint">{i + 1}</span>
            <span className={r.you ? "font-semibold text-accent" : "text-ink"}>
              {r.name}
            </span>
          </span>
          <span className="tabular text-muted">{r.xp} XP</span>
        </div>
      ))}
    </div>
  );
}

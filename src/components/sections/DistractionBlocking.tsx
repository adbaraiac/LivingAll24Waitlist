"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const APPS = [
  { name: "TikTok", color: "#25F4EE" },
  { name: "Instagram", color: "#E1306C" },
  { name: "YouTube", color: "#FF0000" },
];

export function DistractionBlocking() {
  const [done, setDone] = useState(false);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* copy */}
          <Reveal>
            <span className="eyebrow">Focus mode</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Earn your distractions.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              You pick the apps that eat your day and the habit that unlocks them.
              Miss the habit, stay locked. Hit it, they open. You&apos;re in
              control — not the algorithm.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Choose which apps to restrict",
                "Tie them to your non-negotiables",
                "Unlock the moment you follow through",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px] text-ink">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* interactive demo card */}
          <Reveal delay={120}>
            <div className="card mx-auto max-w-sm p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                Today&apos;s non-negotiable
              </p>

              {/* the mission */}
              <button
                onClick={() => setDone((d) => !d)}
                className={`mt-3 flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                  done
                    ? "border-accent/40 bg-accent/[0.08]"
                    : "border-line bg-white/[0.03] hover:border-white/20"
                }`}
                aria-pressed={done}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-md transition-colors ${
                    done ? "bg-accent text-black" : "border border-white/30"
                  }`}
                >
                  {done && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="flex-1">
                  <span className={`block font-semibold ${done ? "text-ink" : "text-ink"}`}>
                    Gym workout
                  </span>
                  <span className="block text-xs text-muted">
                    {done ? "Complete · +250 XP" : "Tap to complete"}
                  </span>
                </span>
                {done && (
                  <span className="rounded-full bg-accent/15 px-2 py-1 text-xs font-bold text-accent">
                    +250 XP
                  </span>
                )}
              </button>

              {/* apps */}
              <div className="mt-5 flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  {done ? "Unlocked" : "Locked until complete"}
                </p>
                <span
                  className={`text-xs font-semibold ${done ? "text-accent" : "text-faint"}`}
                >
                  {done ? "Open" : "Locked"}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {APPS.map((app) => (
                  <div
                    key={app.name}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
                      done
                        ? "border-line bg-white/[0.03] opacity-100"
                        : "border-line bg-white/[0.02] opacity-70"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="h-8 w-8 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, ${app.color}, ${app.color}88)`,
                          filter: done ? "none" : "grayscale(0.7)",
                        }}
                        aria-hidden
                      />
                      <span className="text-sm text-ink">{app.name}</span>
                    </span>
                    <LockGlyph locked={!done} />
                  </div>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-faint">
                {done
                  ? "Nice. Enjoy it — you earned it."
                  : "Do the work first. Then scroll."}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LockGlyph({ locked }: { locked: boolean }) {
  if (locked) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-faint" aria-hidden>
        <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent" aria-hidden>
      <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10V7a4 4 0 0 1 7-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

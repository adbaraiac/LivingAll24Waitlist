"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { StatBar } from "@/components/ui/StatBar";
import { ovrColor, ovrLabel } from "@/lib/ovr";

const OVR = 78;

const CATEGORIES = [
  { label: "Fitness", value: 84 },
  { label: "Career", value: 76 },
  { label: "Money", value: 71 },
  { label: "Discipline", value: 82 },
];

/**
 * Conceptual app UI rendered as pure HTML/CSS inside a phone frame.
 * No screenshot dependency — this IS the mock.
 */
export function PhoneMockup({ floating = true }: { floating?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const ovr = useCountUp(OVR, inView, { duration: 1200, from: 60 });
  const xp = useCountUp(2450, inView, { duration: 1400 });
  const color = ovrColor(OVR);

  return (
    <div
      ref={ref}
      className={`relative mx-auto w-[300px] max-w-full ${
        floating ? "sm:animate-float" : ""
      }`}
    >
      {/* glow behind phone */}
      <div
        className="absolute -inset-8 -z-10 rounded-[3rem] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(180,255,57,0.22), transparent 70%)",
        }}
        aria-hidden
      />

      {/* phone frame */}
      <div className="rounded-[2.6rem] border border-white/10 bg-[#08090b] p-2.5 shadow-card">
        <div className="relative overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-[#111317] to-[#0a0b0d]">
          {/* notch */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* status bar */}
          <div className="flex items-center justify-between px-6 pb-1 pt-4 text-[11px] font-medium text-muted">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-3 rounded-[2px] bg-white/70" />
              <span className="inline-block h-2.5 w-4 rounded-[2px] border border-white/40" />
            </span>
          </div>

          {/* screen content */}
          <div className="space-y-3.5 px-4 pb-6 pt-3">
            {/* header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">Welcome back</p>
                <p className="font-display text-lg font-bold leading-tight text-ink">
                  Aiden
                </p>
              </div>
              <div
                className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-black"
                style={{ backgroundColor: color }}
                aria-hidden
              >
                A
              </div>
            </div>

            {/* OVR hero card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div
                className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl"
                style={{ backgroundColor: color }}
                aria-hidden
              />
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                    Overall
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="tabular font-display text-6xl font-extrabold leading-none"
                      style={{ color }}
                    >
                      {ovr}
                    </span>
                    <span
                      className="mb-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{ backgroundColor: `${color}22`, color }}
                    >
                      {ovrLabel(OVR)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">
                  <ArrowUp />
                  +6 this month
                </div>
              </div>
            </div>

            {/* category stats */}
            <div className="space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              {CATEGORIES.map((c, i) => (
                <StatBar
                  key={c.label}
                  label={c.label}
                  value={c.value}
                  color={ovrColor(c.value)}
                  delay={i * 90}
                />
              ))}
            </div>

            {/* weekly XP */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                  Weekly XP
                </p>
                <p className="tabular font-display text-2xl font-bold text-ink">
                  {xp.toLocaleString()}
                </p>
              </div>
              <div className="flex h-11 items-end gap-1" aria-hidden>
                {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-full bg-accent/70"
                    style={{
                      height: inView ? `${h}%` : "10%",
                      transition: `height 700ms ${i * 70}ms ease-out`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 19V5M12 5l-6 6M12 5l6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

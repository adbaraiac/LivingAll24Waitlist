"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { Reveal } from "@/components/Reveal";
import { StatBar } from "@/components/ui/StatBar";
import { ovrColor, ovrLabel } from "@/lib/ovr";

const STAGES = [
  {
    ovr: 63,
    caption: "Month 1",
    cats: [
      { label: "Fitness", value: 61 },
      { label: "Career", value: 58 },
      { label: "Money", value: 55 },
      { label: "Discipline", value: 60 },
    ],
  },
  {
    ovr: 72,
    caption: "Month 3",
    cats: [
      { label: "Fitness", value: 74 },
      { label: "Career", value: 68 },
      { label: "Money", value: 66 },
      { label: "Discipline", value: 73 },
    ],
  },
  {
    ovr: 81,
    caption: "Month 6",
    cats: [
      { label: "Fitness", value: 85 },
      { label: "Career", value: 79 },
      { label: "Money", value: 76 },
      { label: "Discipline", value: 84 },
    ],
  },
];

function OvrNumber({ to, color }: { to: number; color: string }) {
  const value = useCountUp(to, true, { from: Math.max(to - 9, 0), duration: 900 });
  return (
    <span
      className="tabular font-display text-8xl font-extrabold leading-none transition-colors duration-500"
      style={{ color }}
    >
      {value}
    </span>
  );
}

export function OvrShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [active, setActive] = useState(0);
  const stage = STAGES[active];
  const color = ovrColor(stage.ovr);

  // Auto-advance through the stages once in view (stops after reaching the top).
  useEffect(() => {
    if (!inView) return;
    if (active >= STAGES.length - 1) return;
    const t = setTimeout(() => setActive((a) => Math.min(a + 1, STAGES.length - 1)), 1700);
    return () => clearTimeout(t);
  }, [inView, active]);

  return (
    <section id="ovr" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
        aria-hidden
      />
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The hook</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            What if your real life had an <span className="text-accent">OVR</span>?
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            One number for who you&apos;re becoming. It goes up when you prove it.
          </p>
        </Reveal>

        <div ref={ref} className="mx-auto mt-14 max-w-lg">
          {/* Big OVR card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-8 shadow-card">
            <div
              className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-colors duration-700"
              style={{ backgroundColor: color }}
              aria-hidden
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                Overall rating
              </span>
              <span className="text-xs font-medium text-muted">{stage.caption}</span>
            </div>

            <div className="mt-2 flex items-end gap-3">
              <OvrNumber key={active} to={stage.ovr} color={color} />

              <span
                className="mb-3 rounded-lg px-2 py-1 text-xs font-bold uppercase tracking-wide transition-colors duration-500"
                style={{ backgroundColor: `${color}22`, color }}
              >
                {ovrLabel(stage.ovr)}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {stage.cats.map((c, i) => (
                <StatBar
                  key={`${active}-${c.label}`}
                  label={c.label}
                  value={c.value}
                  color={ovrColor(c.value)}
                  delay={i * 70}
                />
              ))}
            </div>
          </div>

          {/* Progression track */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {STAGES.map((s, i) => (
              <button
                key={s.ovr}
                onClick={() => setActive(i)}
                className="group flex items-center gap-3"
                aria-label={`Show ${s.caption}, ${s.ovr} OVR`}
                aria-pressed={i === active}
              >
                <span
                  className={`tabular font-display text-lg font-bold transition-all ${
                    i === active ? "scale-110" : "text-faint"
                  }`}
                  style={{ color: i === active ? ovrColor(s.ovr) : undefined }}
                >
                  {s.ovr}
                </span>
                {i < STAGES.length - 1 && (
                  <span className="text-faint" aria-hidden>
                    →
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* three-line explanation */}
        <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            { n: "01", t: "Choose who you want to become." },
            { n: "02", t: "Build the habits that get you there." },
            { n: "03", t: "Watch your rating climb as you prove it." },
          ].map((step, i) => (
            <Reveal key={step.n} className="card p-5" delay={i * 100}>
              <p className="tabular font-display text-2xl font-bold text-accent">
                {step.n}
              </p>
              <p className="mt-2 text-[15px] text-ink">{step.t}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

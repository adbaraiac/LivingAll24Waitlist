"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { Reveal } from "@/components/Reveal";
import { ovrColor } from "@/lib/ovr";

export function FutureSelf() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 });
  const today = useCountUp(68, inView, { from: 68, duration: 1 });
  const future = useCountUp(82, inView, { from: 68, duration: 1600 });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 accent-glow" aria-hidden />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">The payoff</span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Become the person you keep telling yourself you&apos;re going to
            become.
          </h2>
        </Reveal>

        {/* today vs 90 days */}
        <div
          ref={ref}
          className="mx-auto mt-14 grid max-w-lg grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6"
        >
          <div className="card p-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Today</p>
            <p
              className="tabular mt-1 font-display text-5xl font-extrabold sm:text-6xl"
              style={{ color: ovrColor(68) }}
            >
              {today}
            </p>
            <p className="mt-1 text-xs text-faint">OVR</p>
          </div>

          <div className="flex flex-col items-center text-accent" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="card border-accent/30 bg-accent/[0.05] p-6 text-center shadow-glow">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">90 days</p>
            <p
              className="tabular mt-1 font-display text-5xl font-extrabold sm:text-6xl"
              style={{ color: ovrColor(82) }}
            >
              {future}
            </p>
            <p className="mt-1 text-xs text-faint">OVR</p>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-xs text-faint">
          Illustrative — not a guarantee. How far you go is on you.
        </p>

        <Reveal className="mx-auto mt-14 max-w-2xl text-center">
          <p className="font-display text-xl font-semibold leading-relaxed text-ink sm:text-2xl">
            You don&apos;t need another place to write down your goals.
          </p>
          <p className="mt-2 text-lg text-muted sm:text-xl">
            You need something that makes following through{" "}
            <span className="text-accent">addictive.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

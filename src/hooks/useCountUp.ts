"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Animate a number from `from` to `to` once `active` becomes true.
 * Honors prefers-reduced-motion by snapping straight to the target.
 */
export function useCountUp(
  to: number,
  active: boolean,
  { from = 0, duration = 1100 }: { from?: number; duration?: number } = {}
) {
  const [value, setValue] = useState(from);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }

    let raf = 0;
    const start = performance.now();
    // easeOutCubic
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(from + (to - from) * ease(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, from, duration]);

  return value;
}

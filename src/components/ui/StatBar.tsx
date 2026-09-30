"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * A labeled category stat with an animated progress bar + counting number.
 * Used in the phone mockup and the OVR section.
 */
export function StatBar({
  label,
  value,
  max = 99,
  color = "#B4FF39",
  showValue = true,
  delay = 0,
}: {
  label: string;
  value: number;
  max?: number;
  color?: string;
  showValue?: boolean;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const count = useCountUp(value, inView, { duration: 900 });
  const pct = Math.min((count / max) * 100, 100);

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-[13px] font-medium text-muted">
        {label}
      </span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: color,
            transitionDelay: `${delay}ms`,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </div>
      {showValue && (
        <span className="tabular w-7 shrink-0 text-right text-sm font-semibold text-ink">
          {count}
        </span>
      )}
    </div>
  );
}

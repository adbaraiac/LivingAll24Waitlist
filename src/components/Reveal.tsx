"use client";

import { useInView } from "@/hooks/useInView";

/**
 * Fades + slides its children in the first time they enter the viewport.
 * Falls back to fully visible when JS/IO is unavailable or reduced-motion.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.15 });
  const Component = Tag as any;

  return (
    <Component
      ref={ref as any}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

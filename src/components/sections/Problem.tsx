import { Reveal } from "@/components/Reveal";

const WANT = [
  "Train 5x a week",
  "Build my business",
  "Lock in on school",
  "Save money",
  "Wake up early",
];

const REALITY = [
  "3 hours on TikTok",
  "YouTube rabbit hole",
  '"I\'ll start Monday"',
  "Late-night gaming",
  "Skipped the gym. Again.",
];

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The gap</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            You know exactly what you should be doing.
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          <Reveal className="card p-6" delay={0}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              Who you want to be
            </p>
            <ul className="space-y-3">
              {WANT.map((item) => (
                <li key={item} className="flex items-center gap-3 text-ink">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check />
                  </span>
                  <span className="text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="card p-6" delay={120}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-faint">
              What actually happens
            </p>
            <ul className="space-y-3">
              {REALITY.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-muted line-through decoration-white/20"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[0.06] text-faint">
                    <Cross />
                  </span>
                  <span className="text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-12 max-w-2xl text-center">
          <p className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
            The problem was never your goals.
            <br />
            It&apos;s <span className="text-accent">following through</span> on
            them.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

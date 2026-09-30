import { Reveal } from "@/components/Reveal";

const BOARD = [
  { name: "Jake", xp: 4850 },
  { name: "Aiden", xp: 4420, you: true },
  { name: "Daniel", xp: 3970 },
  { name: "Luke", xp: 3600 },
];

const MAX = BOARD[0].xp;

export function FriendCompetition() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          {/* leaderboard card */}
          <Reveal>
            <div className="card mx-auto max-w-md p-6">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink">
                  This week
                </p>
                <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-muted">
                  Resets Sunday
                </span>
              </div>

              <div className="mt-5 space-y-2.5">
                {BOARD.map((row, i) => (
                  <div
                    key={row.name}
                    className={`relative overflow-hidden rounded-xl border px-4 py-3 ${
                      row.you
                        ? "border-accent/40 bg-accent/[0.06]"
                        : "border-line bg-white/[0.02]"
                    }`}
                  >
                    {/* xp fill bar */}
                    <div
                      className="absolute inset-y-0 left-0 bg-white/[0.03]"
                      style={{ width: `${(row.xp / MAX) * 100}%` }}
                      aria-hidden
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="flex items-center gap-3">
                        <span
                          className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                            i === 0
                              ? "bg-accent text-black"
                              : "bg-white/[0.06] text-muted"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={`font-medium ${
                            row.you ? "text-accent" : "text-ink"
                          }`}
                        >
                          {row.name}
                          {row.you && (
                            <span className="ml-2 text-[10px] uppercase tracking-wide text-accent/70">
                              you
                            </span>
                          )}
                        </span>
                      </span>
                      <span className="tabular text-sm font-semibold text-ink">
                        {row.xp.toLocaleString()}
                        <span className="ml-1 text-xs font-normal text-muted">XP</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <Reveal delay={120} className="text-center lg:text-left">
            <span className="eyebrow">Private leagues</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Stop sending your friends motivational clips.
              <br className="hidden sm:block" />{" "}
              <span className="text-accent">Actually compete.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
              Make a private group with your friends. The leaderboard ranks who
              showed up most this week — pure XP and consistency. It resets every
              week, so nobody coasts.
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm text-faint lg:mx-0">
              It&apos;s a race on effort, not a ranking of whose life is
              &quot;better.&quot; Your OVR stays yours.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

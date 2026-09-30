import { site } from "@/config/site";
import { WaitlistForm } from "@/components/WaitlistForm";
import { PhoneMockup } from "@/components/PhoneMockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 accent-glow" aria-hidden />

      <div className="container-page relative">
        {/* wordmark */}
        <div className="mb-10 flex items-center justify-center sm:justify-start">
          <span className="font-display text-xl font-extrabold tracking-tight text-ink">
            {site.name}
            <span className="text-accent">.</span>
          </span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy + form */}
          <div className="text-center lg:text-left">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {site.status} · Early access
            </span>

            <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]">
              Level up your
              <br className="hidden sm:block" />{" "}
              <span className="text-accent">actual</span> life.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
              You already know who you want to become. {site.name} turns your
              goals into a game — build your OVR, earn XP, and compete with your
              friends so you actually follow through.
            </p>

            <div className="mt-8">
              <WaitlistForm variant="hero" />
            </div>

            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-faint lg:justify-start">
              <LockIcon />
              No spam. Just your invite when we open.
            </p>
          </div>

          {/* Right: app mockup */}
          <div className="relative">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="10"
        width="16"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 10V7a4 4 0 1 1 8 0v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

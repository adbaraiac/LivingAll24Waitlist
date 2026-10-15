import { site } from "@/config/site";
import { AppStoreButton } from "@/components/AppStoreButton";
import { ScreenPhone } from "@/components/ScreenPhone";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-16">
      {/* ambient glows, matching the app's space theme */}
      <div className="pointer-events-none absolute inset-0 accent-glow" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,77,255,0.45), transparent 65%)" }}
        aria-hidden
      />

      <div className="container-page relative">
        {/* wordmark */}
        <a href={`${site.basePath}/`} className="mb-10 flex items-center justify-center gap-2.5 sm:justify-start">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img src={`${site.basePath}/app-icon.png`} alt="" className="h-9 w-9 rounded-[10px]" />
          <span className="font-display text-xl font-extrabold tracking-tight text-ink">
            {site.name}
            <span className="text-accent">.</span>
          </span>
        </a>

        <div className="grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
          {/* Left: copy + download */}
          <div className="text-center lg:text-left">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Out now on iPhone
            </span>

            <h1 className="mt-5 font-display text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.2rem]">
              Level up your
              <br className="hidden sm:block" /> <span className="text-accent">actual</span> life.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
              Your life, rated like a player card. {site.name} turns your goals into daily missions, grows your
              OVR as you show up, blocks the apps that waste your day, and lets you race your friends.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <AppStoreButton />
              <p className="text-sm text-faint">
                Free to start · <span className="text-muted">Premium optional</span>
              </p>
            </div>

            <ul className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted lg:mx-0 lg:justify-start">
              {["Player card + OVR", "Daily missions", "App blocking", "Friend leaderboards"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-accent/15 text-[10px] text-accent">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: real screenshots */}
          <div className="relative mx-auto h-[520px] w-full max-w-[460px] sm:h-[600px]">
            <div
              className="absolute inset-x-6 top-16 -z-10 h-[420px] rounded-full opacity-70 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(180,255,57,0.22), transparent 70%)" }}
              aria-hidden
            />
            <ScreenPhone
              src="/screens/home.jpg"
              alt="Home: your player card inside the OVR ring"
              width={230}
              className="absolute left-0 top-16 -rotate-[7deg] opacity-90"
            />
            <ScreenPhone
              src="/screens/dream.jpg"
              alt="Your dream card: the 99-rated version of you"
              width={250}
              className="absolute right-0 top-0 rotate-[5deg]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

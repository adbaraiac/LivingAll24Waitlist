import { site } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { AppStoreButton } from "@/components/AppStoreButton";
import { ScreenPhone } from "@/components/ScreenPhone";

export function FinalCTA() {
  return (
    <section id="download" className="relative py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="relative mx-auto grid max-w-5xl items-center gap-10 overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-14 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
          <div
            className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(180,255,57,0.25), transparent 70%)" }}
            aria-hidden
          />
          <div className="relative text-center lg:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
            <img
              src={`${site.basePath}/app-icon.png`}
              alt={`${site.name} app icon`}
              className="mx-auto h-20 w-20 rounded-[22px] shadow-card lg:mx-0"
            />
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Ready to lock in?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-muted sm:text-lg lg:mx-0">
              Download {site.name}, build your card, and see the 99-rated version of you. Free to start.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <AppStoreButton />
            </div>
          </div>
          <div className="relative hidden justify-center lg:flex">
            <ScreenPhone src="/screens/focus.jpg" alt="Lock-in timer blocking distracting apps" width={230} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

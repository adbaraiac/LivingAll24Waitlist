import { site } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { WaitlistForm } from "@/components/WaitlistForm";

export function FinalCTA() {
  return (
    <section id="join" className="relative py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-14 text-center sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(180,255,57,0.25), transparent 70%)",
            }}
            aria-hidden
          />
          <h2 className="relative font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Ready to lock in?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-base text-muted sm:text-lg">
            Join the waitlist and get early access when {site.name} launches.
          </p>
          <div className="relative mt-8">
            <WaitlistForm variant="cta" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

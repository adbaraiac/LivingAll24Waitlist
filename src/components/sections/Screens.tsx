import { site } from "@/config/site";
import { Reveal } from "@/components/Reveal";

const SHOTS = [
  { n: 1, alt: "Level up your actual life: the dream card" },
  { n: 2, alt: "Turn goals into daily missions" },
  { n: 3, alt: "Compete with your friends" },
  { n: 4, alt: "Your life. Your player card." },
  { n: 5, alt: "Lock in. Block distractions." },
  { n: 6, alt: "Level up every part of you" },
];

/** The App Store screenshots, as a swipeable strip on phones and a grid on desktop. */
export function Screens() {
  return (
    <section id="screens" className="relative py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Inside the app</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Built to make you <span className="text-accent">follow through</span>.
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Your card, your missions, your friends, and a lock on the apps that steal your day.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-6">
        {SHOTS.map((s) => (
          <figure
            key={s.n}
            className="w-[230px] shrink-0 snap-center overflow-hidden rounded-[1.6rem] border border-white/10 shadow-card transition duration-300 hover:-translate-y-1.5 lg:w-auto"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
            <img
              src={`${site.basePath}/screens/store-${s.n}.jpg`}
              alt={s.alt}
              loading="lazy"
              className="block h-auto w-full"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { OvrShowcase } from "@/components/sections/OvrShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DistractionBlocking } from "@/components/sections/DistractionBlocking";
import { FriendCompetition } from "@/components/sections/FriendCompetition";
import { FutureSelf } from "@/components/sections/FutureSelf";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-grid min-h-screen">
      <Hero />
      <Problem />
      <OvrShowcase />
      <HowItWorks />
      <DistractionBlocking />
      <FriendCompetition />
      <FutureSelf />
      <FinalCTA />
      <Footer />
    </main>
  );
}

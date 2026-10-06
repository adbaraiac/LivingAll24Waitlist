import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms of Use · ${site.name}`,
  description: `The terms for using ${site.name}.`,
};

const APPLE_EULA = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

export default function TermsPage() {
  const mail = `mailto:${site.contactEmail}`;
  return (
    <LegalPage title="Terms of Use" updated="October 6, 2026">
      <p>
        These terms are an agreement between you and {site.name} (&quot;we&quot;, &quot;us&quot;) for using the{" "}
        {site.name} app. By creating an account or using the app, you agree to them. Apple&apos;s{" "}
        <a href={APPLE_EULA}>Standard End User License Agreement</a> also applies to the app. Our{" "}
        <a href={`${site.basePath}/privacy/`}>Privacy Policy</a> explains how we handle your information.
      </p>

      <h2>Who can use it</h2>
      <p>
        You must be at least 13 years old. If you&apos;re under 18, you need a parent or guardian&apos;s permission. Keep
        your account to yourself; you&apos;re responsible for what happens in it.
      </p>

      <h2>Premium subscriptions</h2>
      <ul>
        <li>
          Premium is an auto-renewing subscription, offered monthly ($9.99) or yearly ($59.99), in US dollars. Prices may
          vary by country and are shown in the app before you buy.
        </li>
        <li>Payment is charged to your Apple ID when you confirm the purchase.</li>
        <li>
          Your subscription renews automatically at the same price unless you turn off auto-renew at least 24 hours before
          the current period ends. Your account is charged for renewal within 24 hours before the period ends.
        </li>
        <li>
          Manage or cancel anytime in your iPhone&apos;s Settings → Apple ID → Subscriptions. Cancelling stops the next
          renewal; you keep Premium until the paid period ends.
        </li>
        <li>If a free trial is offered, any unused part of it ends when you buy a subscription.</li>
        <li>Refunds are handled by Apple under its policies.</li>
      </ul>

      <h2>Your content</h2>
      <p>
        You own what you put in the app: your missions, goals, notes, and photos. You give us permission to store and
        process it to run the app, and to show your name, photo, card, and leaderboard stats to the friends you add.
        Don&apos;t upload anything you don&apos;t have the right to use, or anything illegal, hateful, or sexual.
      </p>

      <h2>Fair play</h2>
      <p>
        Don&apos;t abuse the app or other people: no harassment, no impersonation, no trying to break, overload, or get
        around the app&apos;s limits, and no automated access. We may suspend accounts that do.
      </p>

      <h2>Ratings, AI previews, and health</h2>
      <ul>
        <li>
          Your OVR, ratings, XP, and badges are a game to help you stay consistent. They aren&apos;t a measure of your
          worth, health, or ability.
        </li>
        <li>
          The 30-day glow-up preview is an AI-made illustration of possible styling changes, not a promise of results.
        </li>
        <li>
          {site.name} isn&apos;t medical, mental-health, nutrition, or financial advice. Talk to a professional before
          starting a new exercise, diet, or health routine, and stop if something hurts.
        </li>
      </ul>

      <h2>Changes and availability</h2>
      <p>
        We&apos;re always improving the app, so features may change or go away. We may update these terms; if a change is
        important, we&apos;ll tell you in the app. Continuing to use the app means you accept the updated terms.
      </p>

      <h2>Ending your account</h2>
      <p>
        You can delete your account anytime in the app (Progress → Settings → Delete account). We may suspend or end
        accounts that break these terms.
      </p>

      <h2>No warranty and limits of liability</h2>
      <p>
        The app is provided &quot;as is&quot; without warranties of any kind, to the extent the law allows. To the
        extent the law allows, we aren&apos;t liable for indirect or consequential losses, and our total liability for any
        claim is limited to the amount you paid us in the 12 months before it. Some places don&apos;t allow these limits,
        so they may not apply to you.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={mail}>{site.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}

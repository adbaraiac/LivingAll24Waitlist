import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Support · ${site.name}`,
  description: `Get help with ${site.name}: Premium, app blocking, your account, and how to reach us.`,
};

export default function SupportPage() {
  const mail = `mailto:${site.contactEmail}`;
  return (
    <LegalPage title="Support" updated="October 8, 2026">
      <p>
        Need a hand? Email <a href={mail}>{site.contactEmail}</a> and we&apos;ll get back to you within 1–2 days.
        Include the email you sign in with so we can find your account.
      </p>

      <h2>Premium and billing</h2>
      <ul>
        <li>
          <strong>Cancel or change your plan:</strong> on your iPhone, open Settings → your name → Subscriptions →
          LivingAll24. Cancel at least 24 hours before your renewal date to avoid the next charge.
        </li>
        <li>
          <strong>Free trial:</strong> the yearly plan starts with a 7-day free trial. Cancel before it ends and you
          won&apos;t be charged.
        </li>
        <li>
          <strong>Premium not showing after you paid:</strong> in the app, go to Progress → Settings → Premium →
          Restore purchases.
        </li>
        <li>
          <strong>Refunds:</strong> Apple handles all payments, so refunds are requested from Apple at{" "}
          <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.
        </li>
      </ul>

      <h2>App blocking</h2>
      <ul>
        <li>
          Blocking uses Apple&apos;s Screen Time. The first time you choose apps, iOS asks for Screen Time access; tap
          Continue and allow it.
        </li>
        <li>
          If blocking stopped working, check Settings → Screen Time on your iPhone and make sure LivingAll24 is still
          allowed, then choose your apps again in the Focus tab.
        </li>
        <li>We never see which apps you pick. That list stays on your phone.</li>
      </ul>

      <h2>Steps and Apple Health</h2>
      <p>
        Steps missions check themselves off using Apple Health. If your steps aren&apos;t showing, open the Health app →
        Sharing → Apps → LivingAll24 and turn on Steps.
      </p>

      <h2>Friends and safety</h2>
      <ul>
        <li>Add friends by searching their name, sharing your friend link, or entering their code.</li>
        <li>
          To report or block someone, tap the ⋯ button on their profile or next to their name. Blocked players can&apos;t
          find you or send requests. You can unblock them in Progress → Settings → Blocked players.
        </li>
        <li>We review every report within 24 hours.</li>
      </ul>

      <h2>Your account</h2>
      <ul>
        <li>
          <strong>Delete your account:</strong> Progress → Settings → Delete account. This permanently erases your data.
          It doesn&apos;t cancel Premium, so cancel that in your iPhone settings too.
        </li>
        <li>
          <strong>Can&apos;t sign in:</strong> we email you a 6-digit code. Check your spam folder, or email us.
        </li>
      </ul>

      <h2>More</h2>
      <p>
        Read our <a href={`${site.basePath}/privacy/`}>Privacy Policy</a> and{" "}
        <a href={`${site.basePath}/terms/`}>Terms of Use</a>.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy · ${site.name}`,
  description: `How ${site.name} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  const mail = `mailto:${site.contactEmail}`;
  return (
    <LegalPage title="Privacy Policy" updated="October 6, 2026">
      <p>
        {site.name} (&quot;we&quot;, &quot;us&quot;) makes an iPhone app that turns your goals into daily missions, an
        overall rating (OVR), and friendly competition. This policy explains what we collect, why, who we share it with,
        and the choices you have. We don&apos;t sell your data, and we don&apos;t use advertising or ad-tracking tools.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account:</strong> your email address (to send sign-in codes), your display name, and your time zone (so
          &quot;today&quot; matches your day).
        </li>
        <li>
          <strong>Onboarding answers:</strong> age range, the areas you want to improve, how you spend your time, what gets
          in your way, and the sentence you write about who you want to become. We use these to set up your plan and
          starting rating.
        </li>
        <li>
          <strong>What you put in the app:</strong> missions, goals (including why they matter to you and progress you
          log), check-ins, XP, focus sessions, reminders, badges, and app-blocking rules.
        </li>
        <li>
          <strong>Profile photo (optional):</strong> the photo you add to your player card.
        </li>
        <li>
          <strong>Apple Health (optional):</strong> if you allow it, we read your daily step count. Nothing else, and we
          never write to Apple Health.
        </li>
        <li>
          <strong>Screen Time (optional):</strong> app blocking uses Apple&apos;s Screen Time tools. The apps you choose
          stay on your phone as private tokens; we never learn which apps they are. We store only your rule settings (for
          example, &quot;weekdays 9 to 12&quot;).
        </li>
        <li>
          <strong>Purchases:</strong> Apple handles payment. We receive whether your Premium subscription is active, never
          your payment details.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To run the app: your missions, ratings, streaks, badges, reminders, and leaderboards.</li>
        <li>To check off step missions automatically and show your steps on the friends Steps leaderboard.</li>
        <li>To make the optional 30-day glow-up (see below).</li>
        <li>To keep the service secure and fix problems.</li>
      </ul>
      <p>
        Data from Apple Health is never used for advertising or marketing, and never shared with anyone except as described
        here.
      </p>

      <h2>What your friends can see</h2>
      <p>
        Only people you add as friends can see your player card and OVR, and your weekly leaderboard stats: consistency,
        steps, workouts, focus minutes, and XP. They can&apos;t see your missions, goals, or answers.
      </p>
      <p>
        So friends can find you, other signed-in users can see your display name and profile photo when they search by
        name, and in &quot;suggested friends&quot; if you share a friend or a group. Nothing else about you is shown there.
      </p>

      <h2>The AI glow-up (optional)</h2>
      <p>
        If you use the 30-day glow-up, the app asks your permission first. Then it sends your answers (areas, preferences,
        budget, time) and, if you add one, your photo to OpenAI to write your plan and create an illustrative preview. We
        don&apos;t store your photo. OpenAI doesn&apos;t use it to train its models and deletes it within 30 days. The
        preview image is kept in your account until you delete it or your account. A copy of your photo stays only on your
        phone.
      </p>

      <h2>Who we share data with</h2>
      <p>We use these services to run the app. They process data only on our behalf:</p>
      <ul>
        <li>
          <strong>Supabase:</strong> our database, sign-in, and file storage.
        </li>
        <li>
          <strong>Brevo:</strong> sends your sign-in codes by email.
        </li>
        <li>
          <strong>OpenAI:</strong> the glow-up plan and preview, only when you use it.
        </li>
        <li>
          <strong>RevenueCat and Apple:</strong> manage your subscription.
        </li>
      </ul>
      <p>We may also disclose information if the law requires it.</p>

      <h2>Keeping and deleting your data</h2>
      <p>
        We keep your data while you have an account. You can delete your account any time in the app under{" "}
        <strong>Progress → Settings → Delete account</strong>. That permanently deletes your profile, missions, goals,
        history, friends, and photos. Backups are cleared within 30 days. Deleting your account doesn&apos;t cancel an
        Apple subscription; cancel that in your iPhone&apos;s Settings → Apple ID → Subscriptions.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>Apple Health and Screen Time are optional and can be turned off in your iPhone&apos;s Settings anytime.</li>
        <li>You can edit or remove your photo, missions, and goals in the app.</li>
        <li>
          You can ask us for a copy of your data or to correct or delete it by emailing{" "}
          <a href={mail}>{site.contactEmail}</a>.
        </li>
      </ul>

      <h2>Children</h2>
      <p>
        {site.name} isn&apos;t meant for children under 13, and we don&apos;t knowingly collect their information. The AI
        glow-up is off for anyone who tells us they&apos;re under 18. If you believe a child under 13 has an account,
        email us and we&apos;ll delete it.
      </p>

      <h2>Security</h2>
      <p>
        Data is encrypted in transit, and your account data is protected so only you can read it. No system is perfectly
        secure, but we work to protect your information.
      </p>

      <h2>Changes</h2>
      <p>
        If we change this policy, we&apos;ll update the date above and, for important changes, tell you in the app.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={mail}>{site.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}

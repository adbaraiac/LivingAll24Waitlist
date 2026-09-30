"use client";

import { useId, useState } from "react";
import { submitWaitlist, isValidEmail } from "@/lib/waitlist";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Accessible, self-contained waitlist form.
 * Used in the hero and the final CTA (each gets unique ids via useId).
 */
export function WaitlistForm({
  variant = "hero",
}: {
  variant?: "hero" | "cta";
}) {
  const inputId = useId();
  const statusId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const result = await submitWaitlist(email);

    if (result.ok) {
      setStatus("success");
      setMessage("");
    } else if (result.code === "duplicate") {
      // Friendly: they're effectively in.
      setStatus("success");
      setMessage("duplicate");
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  }

  if (status === "success") {
    return (
      <div
        className="mx-auto w-full max-w-md rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-accent text-black">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-display text-2xl font-bold text-ink">You&apos;re in.</p>
        <p className="mt-1 text-sm text-muted">
          {message === "duplicate"
            ? "You were already on the list — we'll be in touch."
            : "We'll let you know when early access opens."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto w-full max-w-md"
      aria-describedby={statusId}
    >
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="go"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          disabled={status === "loading"}
          aria-invalid={status === "error"}
          aria-describedby={statusId}
          className="h-[52px] rounded-xl border border-line bg-white/[0.04] px-4 text-base text-ink sm:min-w-0 sm:flex-1
                     placeholder:text-faint outline-none transition-colors
                     focus:border-accent/60 focus:bg-white/[0.06]
                     disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-accent h-[52px] shrink-0 px-6 text-base"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <Spinner />
              Joining…
            </span>
          ) : (
            "Join the Waitlist"
          )}
        </button>
      </div>

      <div id={statusId} aria-live="polite" className="min-h-[20px]">
        {status === "error" && (
          <p className="mt-2 text-sm text-[#ff8f6b]">{message}</p>
        )}
        {status !== "error" && (
          <p className="mt-2 text-sm text-muted">
            {variant === "hero"
              ? "Be first to get early access."
              : "Get early access when we launch."}
          </p>
        )}
      </div>
    </form>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

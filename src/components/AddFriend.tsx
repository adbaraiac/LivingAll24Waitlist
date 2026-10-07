"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

const CODE = /^[A-HJ-NP-Z2-9]{8}$/;

/**
 * Opens the app at its add-friend screen (livingall24://add/CODE). If the app
 * isn't installed nothing happens, so the page stays with a way to get it.
 */
export function AddFriend() {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c")?.toUpperCase().replace(/\s/g, "") ?? "";
    if (!CODE.test(c)) return;
    setCode(c);
    window.location.href = `livingall24://add/${c}`;
  }, []);

  return (
    <main className="container-page flex min-h-screen flex-col items-center justify-center py-14 text-center">
      <a href={`${site.basePath}/`} className="font-display text-lg font-extrabold tracking-tight text-ink">
        {site.name}
        <span className="text-accent">.</span>
      </a>
      <h1 className="mt-10 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {code ? "Your friend wants to compete" : "Friend link"}
      </h1>
      <p className="mt-3 max-w-md text-muted">
        {code
          ? "Open this on your iPhone with LivingAll24 installed and you'll add them in one tap."
          : "This link is missing its friend code. Ask your friend to send it again."}
      </p>
      {code ? (
        <>
          <a
            href={`livingall24://add/${code}`}
            className="mt-8 rounded-full bg-accent px-6 py-3 font-bold text-black"
          >
            Open in the app
          </a>
          <p className="mt-6 text-sm text-faint">
            Their code: <span className="font-mono text-ink">{`${code.slice(0, 4)} ${code.slice(4)}`}</span>
          </p>
          <a href={`${site.basePath}/`} className="mt-2 text-sm text-accent">
            Don&apos;t have the app yet?
          </a>
        </>
      ) : null}
    </main>
  );
}

import type { ReactNode } from "react";
import { site } from "@/config/site";
import { Footer } from "@/components/sections/Footer";

/** Shared layout for the Privacy Policy and Terms of Use pages. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <main className="container-page py-14">
        <a href={`${site.basePath}/`} className="font-display text-lg font-extrabold tracking-tight text-ink">
          {site.name}
          <span className="text-accent">.</span>
        </a>
        <article className="legal mx-auto mt-10 max-w-2xl">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-faint">Last updated {updated}</p>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}

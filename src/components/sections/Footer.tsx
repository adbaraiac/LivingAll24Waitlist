import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-display text-lg font-extrabold tracking-tight text-ink">
          {site.name}
          <span className="text-accent">.</span>
        </span>
        <p className="text-xs text-faint">
          © {new Date().getFullYear()} {site.name}. {site.status}.
        </p>
      </div>
    </footer>
  );
}

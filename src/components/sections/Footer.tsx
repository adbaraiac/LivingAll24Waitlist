import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-display text-lg font-extrabold tracking-tight text-ink">
          {site.name}
          <span className="text-accent">.</span>
        </span>
        <div className="flex items-center gap-5 text-xs text-faint">
          <a href={`${site.basePath}/privacy/`} className="hover:text-ink">
            Privacy
          </a>
          <a href={`${site.basePath}/terms/`} className="hover:text-ink">
            Terms
          </a>
          <span>
            © {new Date().getFullYear()} {site.name}. {site.status}.
          </span>
        </div>
      </div>
    </footer>
  );
}

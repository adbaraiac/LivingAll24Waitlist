import { site } from "@/config/site";

/** A real app screenshot inside an iPhone-style frame. */
export function ScreenPhone({
  src,
  alt,
  className = "",
  width = 260,
}: {
  src: string;
  alt: string;
  /** Pass "absolute …" to position it; otherwise it's laid out normally. */
  className?: string;
  width?: number;
}) {
  const positioned = className.split(" ").some((c) => c === "absolute" || c === "fixed");
  return (
    <div className={positioned ? className : `relative ${className}`} style={{ width }}>
      <div className="rounded-[2.8rem] border border-white/15 bg-[#06070d] p-2 shadow-card">
        <div className="relative overflow-hidden rounded-[2.35rem]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
          <img src={`${site.basePath}${src}`} alt={alt} className="block h-auto w-full" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const title = `${site.name} — ${site.tagline}`;

// Absolute URL for share previews (scrapers need absolute image URLs), and
// base-path-aware paths for icons served from /public.
const ogImage = `${site.url}/og.png`;
const asset = (file: string) => `${site.basePath}/${file}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  applicationName: site.name,
  keywords: [
    "self improvement app",
    "habit tracker",
    "OVR",
    "life stats",
    "gamified goals",
    "XP",
    "discipline app",
    "accountability",
  ],
  openGraph: {
    type: "website",
    title,
    description: site.description,
    siteName: site.name,
    url: site.url,
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [ogImage],
  },
  icons: {
    icon: [{ url: asset("favicon.png"), type: "image/png", sizes: "64x64" }],
    apple: [{ url: asset("apple-touch-icon.png"), sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-base font-sans antialiased">{children}</body>
    </html>
  );
}

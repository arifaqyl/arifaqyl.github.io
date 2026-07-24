import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import { AnalyticsPing } from "@/components/analytics-ping";
import "@/app/globals.css";
import { env } from "@/lib/env";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Arif Aqyl | Software Engineer",
    template: "%s | Arif Aqyl"
  },
  description:
    "Malaysian full-stack engineer building practical tools for kedai operations, transit information, and developers.",
  openGraph: {
    title: "Arif Aqyl | Software Engineer",
    description:
      "Malaysian full-stack engineer building practical tools for kedai operations, transit information, and developers.",
    url: env.siteUrl,
    siteName: "arifaqyl.me",
    images: [
      {
        url: "/media/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arif Aqyl portfolio preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Arif Aqyl | Software Engineer",
    description:
      "Malaysian full-stack engineer building practical tools for kedai operations, transit information, and developers.",
    images: ["/media/og-image.jpg"]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1214" },
    { media: "(prefers-color-scheme: light)", color: "#edeae4" }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        {env.plausibleDomain ? (
          <Script defer data-domain={env.plausibleDomain} src="https://plausible.io/js/script.js" />
        ) : null}
        <AnalyticsPing />
        {children}
      </body>
    </html>
  );
}


import type { Metadata } from "next";
import Script from "next/script";
import { AnalyticsPing } from "@/components/analytics-ping";
import "@/app/globals.css";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Arif Aqyl | Software Engineer",
    template: "%s | Arif Aqyl"
  },
  description:
    "Software Engineering student building automation, backend systems, and practical AI tools.",
  openGraph: {
    title: "Arif Aqyl | Software Engineer",
    description:
      "Software Engineering student building automation, backend systems, and practical AI tools.",
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
      "Software Engineering student building automation, backend systems, and practical AI tools.",
    images: ["/media/og-image.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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


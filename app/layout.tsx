import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL = "https://freeqr-social.vercel.app";
const TITLE = "Free QR Code Generator for Social Media — No Sign-Up, No Tracking";
const DESCRIPTION =
  "Generate a free, premium-styled QR code for Instagram, TikTok, WhatsApp, YouTube, and 20+ platforms. Runs entirely in your browser — no account, no expiry, no tracking, no watermark.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | FreeQR",
  },
  description: DESCRIPTION,
  keywords: [
    "free qr code generator",
    "qr code generator no sign up",
    "social media qr code generator",
    "instagram qr code generator",
    "whatsapp qr code generator",
    "qr code generator no tracking",
    "qr code generator 2026",
  ],
  applicationName: "FreeQR",
  authors: [{ name: "FreeQR" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "FreeQR",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FreeQR — Free Social Media QR Code Generator",
    url: SITE_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (runs in browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: DESCRIPTION,
    browserRequirements: "Requires JavaScript. Works in any modern browser.",
    featureList: [
      "No sign-up required",
      "No tracking or analytics on generated codes",
      "20+ social media and contact platforms",
      "Custom dot styles and accent colors",
      "Embedded platform logo",
      "PNG and SVG export",
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

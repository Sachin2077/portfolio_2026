import type { Metadata } from "next";
import { Instrument_Serif, Inria_Serif, Cormorant_Garamond, Inter, Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inriaSerif = Inria_Serif({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cue",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sachin.travelmate.tech";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sachin — From the Core to the Constellation",
  description:
    "Designer turning developer. Co-founder of Zarah AI LLP. An atmospheric portfolio: from the molten Core to the open Constellation.",
  openGraph: {
    title: "Sachin — From the Core to the Constellation",
    description:
      "Designer turning developer. Co-founder of Zarah AI LLP.",
    url: SITE_URL,
    siteName: "Sachin · Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sachin — From the Core to the Constellation",
    description: "Designer turning developer. Co-founder of Zarah AI LLP.",
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sachin",
  jobTitle: "Designer & Frontend Developer",
  url: SITE_URL,
  worksFor: { "@type": "Organization", name: "Zarah AI LLP" },
  knowsAbout: [
    "Product design", "Brand systems", "React", "Next.js", "TypeScript",
    "Tailwind CSS", "react-three-fiber", "Spline", "Prisma", "Supabase",
  ],
  sameAs: [
    "https://www.linkedin.com",
    "https://github.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inriaSerif.variable} ${cormorant.variable} ${inter.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { DM_Sans, Inter, Libre_Baskerville, Source_Serif_4, Space_Grotesk, Space_Mono } from "next/font/google";
import ConditionalSiteNavbar from "@/components/ConditionalSiteNavbar";
import NavAuthBadge from "@/components/NavAuthBadge";
import NavOriginationLink from "@/components/NavOriginationLink";
import GlobalOAuthFlash from "@/components/GlobalOAuthFlash";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/** Editorial serif for institutional display type (headlines, quotes). */
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/** Homepage hero preview — editorial serif + geometric sans. */
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-hero-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hero-sans",
});

/** Dorrsum wordmark / heading face */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-brand",
});

/** Dorrsum tagline / metric labels */
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono-brand",
});

export const metadata: Metadata = {
  title: "DORRSUM",
  description:
    "Research-first, transaction-ready advisory for TMT infrastructure credit — independent, practitioner-grade, and TMT-native.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${libreBaskerville.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-[var(--pa-page)] font-sans text-[var(--pa-text)] antialiased`}
      >
        <GoogleAnalytics />
        <ConditionalSiteNavbar authBadge={<NavAuthBadge />} authNavItems={<NavOriginationLink />} />
        <GlobalOAuthFlash />
        <div className="flex w-full flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}

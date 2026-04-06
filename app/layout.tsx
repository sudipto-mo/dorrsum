import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteNavbar from "@/components/SiteNavbar";
import GlobalOAuthFlash from "@/components/GlobalOAuthFlash";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Principal AI",
  description: "Credit and portfolio tooling for institutional workflows.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen antialiased bg-[#0B0F19] text-slate-50 font-sans flex flex-col`}
      >
        <SiteNavbar />
        <GlobalOAuthFlash />
        <div className="flex-1 w-full flex flex-col">{children}</div>
      </body>
    </html>
  );
}

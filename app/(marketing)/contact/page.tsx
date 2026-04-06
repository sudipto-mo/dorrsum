import type { Metadata } from "next";
import { SITE_LINKEDIN_URL } from "@/lib/contact-constants";

export const metadata: Metadata = {
  title: "Contact | Principal AI",
  description: "Reach out to Principal AI for credit origination, collaboration, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <header className="mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl tracking-tight font-semibold text-slate-50 mb-4">Contact</h1>
        <p className="text-slate-300 leading-relaxed text-base sm:text-lg max-w-2xl m-0">
          For mandates, screening requests, ongoing deal support, or general inquiries, send a message on LinkedIn.
        </p>
      </header>

      <section
        className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 sm:p-10 text-center"
        aria-label="LinkedIn"
      >
        <p className="text-slate-300 leading-relaxed text-base m-0 mb-6">
          I respond fastest on LinkedIn. Open my profile and use the messaging option there.
        </p>
        <a
          href={SITE_LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 px-8 rounded-lg transition-colors no-underline shadow-[0_0_24px_rgba(37,99,235,0.25)]"
        >
          Message on LinkedIn
        </a>
      </section>
    </div>
  );
}

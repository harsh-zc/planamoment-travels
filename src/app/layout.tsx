import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "PlanAMoment Travels — Handcrafted holidays, booked in minutes",
    template: "%s · PlanAMoment Travels",
  },
  description:
    "Discover and book curated holiday packages to Maldives, Bali, Switzerland, Kerala and more. Best prices, flexible payments and 24×7 support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Desk chat widget · Plano Bot */}
        <Script
          src="https://dz6ejslmb2lbc.cloudfront.net/zealdesk/chatbot/widget.js"
          data-widget-id="01M45TW19V2QWPY7Y5ERX6XBC5"
          data-color="#059673"
          data-launcher-icon="bot"
          data-position="bottom-right"
          data-tags="plan-moment"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { LanguageProvider } from "@/context/LanguageContext";
import ParticleBackground from "@/components/ParticleBackground";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.powerlife-shop.com"),
  title: "Vicson L. Vidallon | Full-Stack Developer",
  description:
    "Vicson L. Vidallon — Full-Stack Developer building production-ready, low-cost web systems with Next.js, Supabase, and self-hosted infrastructure.",
  keywords: [
    "Full-Stack Developer",
    "Next.js Developer Philippines",
    "Supabase Developer",
    "Self-Hosted Web Apps",
    "Vicson Vidallon",
  ],
  openGraph: {
    title: "Vicson L. Vidallon | Full-Stack Developer",
    description:
      "Production-ready, low-cost web systems built end to end — Next.js, Supabase, Docker, Cloudflare.",
    images: [{ url: "/assets/photo.svg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-primary custom-scrollbar">
        <LanguageProvider>
          <ParticleBackground />
          <Header />
          <StairTransition />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

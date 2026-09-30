import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Atmosphere } from "@/components/effects/atmosphere";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AWS Student Builders Group",
    template: "%s — AWS SBG",
  },
  description:
    "AWS Student Builders Group is a community for students who build, deploy, and experiment with real systems using cloud technology.",
};

export const viewport: Viewport = {
  themeColor: "#241030",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&sessionStorage.getItem('sbg-boot')!=='1'){var s=document.createElement('style');s.id='sbg-boot-style';s.textContent='[data-boot]{visibility:visible!important}';document.head.appendChild(s)}}catch(e){}",
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Atmosphere />
        <SiteHeader />
        <div id="page-content" className="relative z-10">
          <main id="main">{children}</main>
          <Footer />
        </div>
        <CursorGlow />
        <NoiseOverlay />
      </body>
    </html>
  );
}

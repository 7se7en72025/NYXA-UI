import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((m) => ({ default: m.Analytics })),
  { ssr: false },
);

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => ({ default: m.SpeedInsights })),
  { ssr: false },
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Falak â€” Component Library",
    template: "%s | Falak",
  },
  description:
    "Beautiful, accessible React components built with motion, intention, and weight. Open source and free forever.",
  keywords: ["React", "components", "UI library", "Next.js", "Tailwind CSS", "shadcn"],
  authors: [{ name: "7se7en72025" }],
  creator: "7se7en72025",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kata-ui-rho.vercel.app",
    title: "Falak â€” Component Library",
    description: "Beautiful, accessible React components built with motion, intention, and weight.",
    siteName: "Falak",
  },
  twitter: {
    card: "summary_large_image",
    title: "Falak â€” Component Library",
    description: "Beautiful, accessible React components built with motion, intention, and weight.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/dashboard-mockup.png" fetchPriority="high" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

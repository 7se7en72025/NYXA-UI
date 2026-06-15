import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Kata UI",
  description: "Components built around motion, intention, and weight.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/dashboard-mockup.png" fetchPriority="high" />
      </head>
      <body style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }} suppressHydrationWarning>{children}</body>
    </html>
  );
}

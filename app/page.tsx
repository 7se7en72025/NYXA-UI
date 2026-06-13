"use client";

import { SideFrame } from "@/components/side-frame";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-[300vh] theme-bg relative">
      <Navbar />
      <SideFrame />
      <Hero />
      <Footer />
    </main>
  );
}

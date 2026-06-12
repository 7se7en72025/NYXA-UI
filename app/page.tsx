"use client";

import { SideFrame } from "@/components/side-frame";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-[300vh] theme-bg">
      <Navbar />
      <SideFrame />
    </main>
  );
}

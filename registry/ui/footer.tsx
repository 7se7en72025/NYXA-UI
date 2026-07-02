"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Footer() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const updateTheme = () => {
      const html = document.documentElement;
      const currentTheme = html.getAttribute("data-theme") as "dark" | "light";
      setTheme(currentTheme || "dark");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className="absolute bottom-0 left-[48px] right-[48px] flex items-center justify-between px-6 py-4 border-t border-dotted"
      style={{
        borderColor: "var(--ruler-border)",
      }}
    >
      <div className="flex items-center gap-3">
        <Image
          src={theme === "dark" ? "/FalakLOGOWHITE.svg" : "/FalakLOGOBLACK.svg"}
          alt="Falak"
          width={40}
          height={40}
          className="h-10 w-auto"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold" style={{ color: "var(--fg)" }}>
            Falak
          </span>
          <span className="text-xs" style={{ color: theme === "dark" ? "#888" : "#777" }}>
            made with ❤ by 777
          </span>
        </div>
      </div>

      <div className="text-sm" style={{ color: theme === "dark" ? "#888" : "#777" }}>
        © 2026 Falak. MIT License.
      </div>
    </footer>
  );
}

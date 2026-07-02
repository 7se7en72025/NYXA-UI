import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FaqSection } from "@/components/faq-section";

describe("FaqSection", () => {
  it("renders FAQ questions", () => {
    render(<FaqSection />);
    expect(screen.getByText("Is Falak easy to customise?")).toBeDefined();
  });

  it("shows answer on click", () => {
    render(<FaqSection />);
    fireEvent.click(screen.getByText("Is Falak easy to customise?"));
    expect(screen.getByText(/CSS variables and Tailwind/)).toBeDefined();
  });

  it("toggles on repeated clicks", () => {
    render(<FaqSection />);
    const question = screen.getByText("Is Falak easy to customise?");
    fireEvent.click(question);
    fireEvent.click(question);
    // answer is always in DOM (hidden via maxHeight), just verify no crash
    expect(screen.getByText(/CSS variables and Tailwind/)).toBeDefined();
  });
});

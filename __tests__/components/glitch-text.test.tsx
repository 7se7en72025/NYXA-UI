import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GlitchText } from "@/components/ui/glitch-text";

describe("GlitchText", () => {
  it("renders default text", () => {
    render(<GlitchText />);
    expect(screen.getByText("Falak")).toBeDefined();
  });

  it("renders custom text", () => {
    render(<GlitchText text="Hello World" />);
    expect(screen.getByText("Hello World")).toBeDefined();
  });

  it("renders with custom tag", () => {
    const { container } = render(<GlitchText text="Test" as="h1" />);
    expect(container.querySelector("h1")).toBeDefined();
  });
});

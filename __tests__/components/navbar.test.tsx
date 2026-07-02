import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} src={props.src} />;
  },
}));

beforeEach(() => {
  // jsdom doesn't have localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();
  Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });
});

describe("Navbar", () => {
  it("renders nav element", () => {
    render(<Navbar />);
    expect(screen.getByRole("navigation")).toBeDefined();
  });

  it("renders logo", () => {
    render(<Navbar />);
    expect(screen.getByAltText("Falak")).toBeDefined();
  });

  it("renders docs link", () => {
    render(<Navbar />);
    expect(screen.getByText("View Docs")).toBeDefined();
  });
});

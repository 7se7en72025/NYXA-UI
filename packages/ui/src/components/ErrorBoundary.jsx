import { Component } from "react";

const btnStyle = {
  background: "transparent",
  border: "1px solid #9af0f4",
  color: "#9af0f4",
  padding: "0.5rem 1.5rem",
  fontFamily: "Space Grotesk, sans-serif",
  fontSize: "1rem",
  cursor: "pointer",
  borderRadius: "4px",
};

/**
 * @extends {Component<{ children: import("react").ReactNode, fallback?: import("react").ReactNode, onError?: (error: Error, info: { componentStack: string }) => void }>}
 */
export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    this.props.onError?.(err, info);
    if (!this.props.onError) console.error("ErrorBoundary:", err, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <h1
            style={{
              color: "#9af0f4",
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            Something went wrong
          </h1>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={btnStyle}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

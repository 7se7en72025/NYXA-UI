import { Component } from "react";

const errorContainerStyle = {
  width: "100vw",
  height: "100vh",
  background: "black",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
};

const errorTitleStyle = {
  color: "#9af0f4",
  fontFamily: "Space Grotesk, sans-serif",
  fontSize: "1.5rem",
  textAlign: "center",
};

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

function reload() {
  window.location.reload();
}

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.error("ErrorBoundary:", err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={errorContainerStyle}>
          <h1 style={errorTitleStyle}>Something went wrong</h1>
          <button onClick={reload} style={btnStyle}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

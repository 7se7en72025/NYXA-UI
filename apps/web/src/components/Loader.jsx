import { useMemo } from "react";

const BARS = 12;

export default function Loader() {
  const bars = useMemo(
    () =>
      Array.from({ length: BARS }, (_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static list, fixed length and order, never reordered
          key={i}
          className="bar"
          style={{ backgroundColor: "#9AF0F4", animationDelay: `${i * 0.1}s` }}
        />
      )),
    [],
  );

  return (
    <div className="loader">
      <div className="loaderWrapper">
        <span className="loading">Loading...</span>
        <div className="progressBar">{bars}</div>
      </div>
    </div>
  );
}

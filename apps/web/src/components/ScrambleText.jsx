import { useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHARS_LEN = CHARS.length;

export default function ScrambleText({ text, as = "button", className, style, onClick }) {
  const ref = useRef(null);
  const intervalRef = useRef(null);

  const startScramble = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    let iteration = 0;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      el.textContent = text
        .split("")
        .map((char, i) => (i < iteration ? text[i] : CHARS[Math.floor(Math.random() * CHARS_LEN)]))
        .join("");

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        el.textContent = text;
      }
      iteration += 1 / 3;
    }, 30);
  }, [text]);

  const onMouseLeave = useCallback(() => {
    clearInterval(intervalRef.current);
    if (ref.current) ref.current.textContent = text;
  }, [text]);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      onMouseEnter={startScramble}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {text}
    </Tag>
  );
}

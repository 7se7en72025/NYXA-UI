import * as s from "@styles/ConsolePanel.module.scss";
import ScrambleText from "./ScrambleText";

// The shared glass "holder" frame — a bordered, blurred console panel with
// corner brackets and an optional top status strip. Each section keeps its own
// distinct interior layout; this only provides the readable backdrop so content
// never floats loose on the nebula.
export default function ConsolePanel({
  show,
  label,
  status,
  className = "",
  style,
  children,
}) {
  return (
    <div
      className={`${s.console} ${show ? s.visible : ""} ${className}`}
      style={style}
    >
      <span className={s.cornerTL} />
      <span className={s.cornerTR} />
      <span className={s.cornerBL} />
      <span className={s.cornerBR} />

      {label && (
        <div className={s.bar}>
          <span className={s.barLabel}>
            <span className={s.pip} />
            <ScrambleText as="span" text={label} />
          </span>
          {status && (
            <span className={s.barStatus}>
              <ScrambleText as="span" text={status} />
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
}

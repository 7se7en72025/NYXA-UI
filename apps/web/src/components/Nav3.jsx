import { useState, useEffect } from "react";
import state from "@components/state";
import { subscribe } from "valtio";
import * as styles from "@styles/Nav3.module.scss";

export default function Nav3() {
  const [show, setShow] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const unsub = subscribe(state, () => {
      const next = state.targetSection === 2;
      if (next !== show) {
        setShow(next);
        if (next) setAnimKey((k) => k + 1);
      }
    });
    return unsub;
  }, [show]);

  const vis = show ? styles.visible : "";
  const cmdV = show ? styles.cmdVisible : "";
  const stV = show ? styles.statsVisible : "";

  return (
    <div className={`${styles.nav3} ${vis}`}>
      <img
        key={animKey}
        draggable={false}
        className={styles.background}
        src="/images/nav31.svg"
        alt=""
      />

      <div className={`${styles.commandRow} ${cmdV}`}>
        <span className={styles.icon}>{"\u2318"}</span>
        <code className={styles.command}>
          npx shadcn@latest add @nyxaui/<span className={styles.placeholder}>[component]</span>
        </code>
        <span className={styles.cliBadge}>
          CLI <span className={styles.arrow}>{"\u2197"}</span>
        </span>
      </div>

      <div className={`${styles.stat1} ${stV}`}>
        <span className={styles.statValue}>46</span>
        <span className={styles.statLabel}>Components</span>
      </div>

      <div className={`${styles.stat2} ${stV}`}>
        <span className={styles.statValue}>09</span>
        <span className={styles.statLabel}>Families</span>
      </div>

      <div className={`${styles.stat3} ${stV}`}>
        <span className={styles.statValue}>CLI</span>
        <span className={styles.statLabel}>Ready</span>
      </div>
    </div>
  );
}

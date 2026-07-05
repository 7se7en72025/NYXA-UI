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

  return (
    <div className={`${styles.nav3} ${show ? styles.visible : ""}`}>
      <img
        key={animKey}
        draggable={false}
        className={styles.background}
        src="/images/nav31.svg"
        alt=""
      />
    </div>
  );
}

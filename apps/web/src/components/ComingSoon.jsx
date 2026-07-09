import { useState, useEffect, useRef, memo } from "react";
import state from "@components/state";
import { subscribe } from "valtio";
import * as s from "./ComingSoon.module.scss";

function ComingSoonInner() {
  const [animKey, setAnimKey] = useState(0);
  const [show, setShow] = useState(false);
  const prevShow = useRef(false);

  useEffect(() => {
    const check = () => {
      const next = state.targetSection >= 3;
      if (next !== prevShow.current) {
        prevShow.current = next;
        setShow(next);
        if (next) setAnimKey((k) => k + 1);
      }
    };

    check();
    const unsub = subscribe(state, check);
    return unsub;
  }, []);

  return (
    <div className={`${s.container} ${show ? s.visible : ""}`}>
      <div key={animKey} className={s.glitchWrapper}>
        <span className={s.glitch} data-text="COMING SOON">COMING SOON</span>
      </div>
    </div>
  );
}

export default memo(ComingSoonInner);

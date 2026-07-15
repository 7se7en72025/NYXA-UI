import state from "@components/state";
import { useEffect, useRef, useState } from "react";
import { subscribe } from "valtio";

export function useSectionVisibility(sectionIndex, { delay = 0 } = {}) {
  const [show, setShow] = useState(false);
  const showRef = useRef(false);

  useEffect(() => {
    const t = delay
      ? setTimeout(() => setShow(state.targetSection === sectionIndex), delay)
      : null;
    showRef.current = state.targetSection === sectionIndex;
    if (!delay) setShow(showRef.current);

    const unsub = subscribe(state, () => {
      const next = state.targetSection === sectionIndex;
      if (next !== showRef.current) {
        showRef.current = next;
        setShow(next);
      }
    });

    return () => {
      unsub();
      if (t) clearTimeout(t);
    };
  }, [sectionIndex, delay]);

  return show;
}

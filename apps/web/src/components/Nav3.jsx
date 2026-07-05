import { memo, useState, useEffect, useRef } from "react";
import { useSectionVisibility } from "@hooks/useSectionVisibility";
import * as styles from "@styles/Nav3.module.scss";
import ScrambleText from "./ScrambleText";

function Nav3Inner() {
  const [animKey, setAnimKey] = useState(0);
  const show = useSectionVisibility(2);
  const prevShow = useRef(false);

  useEffect(() => {
    if (show && !prevShow.current) setAnimKey((k) => k + 1);
    prevShow.current = show;
  }, [show]);

  const vis = show ? styles.visible : "";
  const cmdV = show ? styles.cmdVisible : "";
  const stV = show ? styles.statsVisible : "";

  return (
    <div className={`${styles.nav3} ${vis}`}>
      <img key={animKey} draggable={false} className={styles.background} src="/images/nav31.svg" alt="" />

      <div className={`${styles.commandRow} ${cmdV}`}>
        <span className={styles.icon}>{"\u2318"}</span>
        <code className={styles.command}>
          <ScrambleText as="span" text="npx shadcn@latest add @nyxaui/" />
          <span className={styles.placeholder}>[component]</span>
        </code>
        <span className={styles.cliBadge}>
          <ScrambleText as="span" text="CLI" /> <span className={styles.arrow}>{"\u2197"}</span>
        </span>
      </div>

      <div className={`${styles.stat1} ${stV}`}>
        <span className={styles.statValue}><ScrambleText as="span" text="46" /></span>
        <span className={styles.statLabel}><ScrambleText as="span" text="Components" /></span>
      </div>

      <div className={`${styles.stat2} ${stV}`}>
        <span className={styles.statValue}><ScrambleText as="span" text="09" /></span>
        <span className={styles.statLabel}><ScrambleText as="span" text="Families" /></span>
      </div>

      <div className={`${styles.stat3} ${stV}`}>
        <span className={styles.statValue}><ScrambleText as="span" text="CLI" /></span>
        <span className={styles.statLabel}><ScrambleText as="span" text="Ready" /></span>
      </div>
    </div>
  );
}

export default memo(Nav3Inner);

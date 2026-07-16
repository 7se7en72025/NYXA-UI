import { useSectionVisibility } from "@hooks/useSectionVisibility";
import * as s from "@styles/Join.module.scss";
import { useCallback } from "react";
import ScrambleText from "./ScrambleText";

const LINKS = [
  { label: "GITHUB", url: "https://github.com/7se7en72025/NYXA-UI" },
  { label: "DISCORD", url: "https://github.com/7se7en72025/NYXA-UI" },
  { label: "X / TWITTER", url: "https://github.com/7se7en72025/NYXA-UI" },
];

export default function JoinSection() {
  const show = useSectionVisibility(5);

  const handleGithub = useCallback(() => {
    window.open("https://github.com/7se7en72025/NYXA-UI", "_blank");
  }, []);

  return (
    <div className={`${s.wrapper} ${show ? s.visible : ""}`}>
      <span className={s.eyebrow}>JOIN THE CONSTELLATION</span>
      <h2 className={s.title}>
        <ScrambleText as="span" text="BUILD YOUR NEXT UI FASTER" />
      </h2>

      <div className={s.actions}>
        <ScrambleText
          as="button"
          text="STAR ON GITHUB"
          className={s.primaryBtn}
          onClick={handleGithub}
        />
        <ScrambleText
          as="button"
          text="READ THE DOCS"
          className={s.ghostBtn}
          onClick={handleGithub}
        />
      </div>

      <div className={s.links}>
        {LINKS.map((l) => (
          <ScrambleText
            as="button"
            key={l.label}
            text={l.label}
            className={s.linkBtn}
            onClick={() => window.open(l.url, "_blank")}
          />
        ))}
      </div>

      <span className={s.footer}>
        NYXA UI — CONSTELLATION-THEMED COMPONENT LIBRARY
      </span>
    </div>
  );
}

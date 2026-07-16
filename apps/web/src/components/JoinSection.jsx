import { useSectionVisibility } from "@hooks/useSectionVisibility";
import * as s from "@styles/Join.module.scss";
import { useCallback } from "react";
import HelmetHero from "./HelmetHero";
import ScrambleText from "./ScrambleText";

const GITHUB_URL = "https://github.com/7se7en72025/NYXA-UI";

const LINKS = [
  { label: "GITHUB", url: GITHUB_URL },
  { label: "DISCORD", url: GITHUB_URL },
  { label: "X / TWITTER", url: GITHUB_URL },
];

export default function JoinSection() {
  const show = useSectionVisibility(5);

  const openGithub = useCallback(() => {
    window.open(GITHUB_URL, "_blank");
  }, []);

  return (
    <div className={`${s.wrapper} ${show ? s.visible : ""}`}>
      <div className={s.deck}>
        <div className={s.stage}>{show && <HelmetHero />}</div>

        {/* hexagonal command-visor frame */}
        <svg
          className={s.frame}
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            className={s.hex}
            points="50,4 90,27 90,73 50,96 10,73 10,27"
          />
          <path className={s.corner} d="M50 4 L61 10.35" />
          <path className={s.corner} d="M50 4 L39 10.35" />
          <path className={s.corner} d="M10 73 L10 62" />
          <path className={s.corner} d="M90 73 L90 62" />
          <line className={s.scanLine} x1="14" y1="50" x2="86" y2="50" />
        </svg>

        <span className={`${s.hudTag} ${s.hudTL}`}>
          <ScrambleText as="span" text="SIGNAL·06" />
        </span>
        <span className={`${s.hudTag} ${s.hudTR}`}>
          <ScrambleText as="span" text="LIVE" />
        </span>
      </div>

      <div className={s.content}>
        <span className={s.eyebrow}>
          <span className={s.pip} />
          <ScrambleText as="span" text="JOIN THE CONSTELLATION" />
        </span>
        <h2 className={s.title}>
          <ScrambleText as="span" text="BUILD YOUR NEXT UI FASTER" />
        </h2>

        <div className={s.actions}>
          <ScrambleText
            as="button"
            text="STAR ON GITHUB"
            className={s.primaryBtn}
            onClick={openGithub}
          />
          <ScrambleText
            as="button"
            text="READ THE DOCS"
            className={s.ghostBtn}
            onClick={openGithub}
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
      </div>

      <span className={s.footer}>
        NYXA UI — CONSTELLATION-THEMED COMPONENT LIBRARY
      </span>
    </div>
  );
}

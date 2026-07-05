import { useState, useEffect } from "react";
import state from "@components/state";
import { subscribe } from "valtio";
import * as styles from "@styles/TechStack.module.scss";

export default function TechStack() {
  const [show, setShow] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const unsub = subscribe(state, () => {
      const next = state.targetSection === 1;
      if (next !== show) {
        setShow(next);
        if (next) setAnimKey((k) => k + 1);
      }
    });
    return unsub;
  }, [show]);

  return (
    <div className={`${styles.techStack} ${show ? styles.visible : ""} ${hovered ? styles.hovered : ""}`}>
      <img
        draggable={false}
        className={styles.background}
        src="/images/nav22.svg"
        alt=""
      />

      <svg
        key={animKey}
        className={styles.strokes}
        viewBox="0 0 1216 703"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className={styles.panelBorder} d="M408.585 53.6224L408.186 245.262L375.485 280.585L24.9417 279.773L10.585 263.938V25.2014L26.5369 10.5848H245.876L272.196 38.1938H392.633L408.585 53.6224Z" />
        <path className={styles.panelBorder} d="M815.585 53.6224L815.984 245.262L848.685 280.585L1199.23 279.773L1213.58 263.938V25.2014L1197.63 10.5848H978.294L951.974 38.1938H831.537L815.585 53.6224Z" />
        <path className={styles.panelBorder} d="M408.585 657.547L408.186 465.908L375.485 430.585L24.9417 431.397L10.585 447.231V685.968L26.5369 700.585H245.876L272.196 672.976H392.633L408.585 657.547Z" />
        <path className={styles.panelBorder} d="M815.585 657.547L815.984 465.908L848.685 430.585L1199.23 431.397L1213.58 447.231V685.968L1197.63 700.585H978.294L951.974 672.976H831.537L815.585 657.547Z" />
        <path className={styles.connector} d="M682.085 454.085L706.585 506.085H816.085" />
        <path className={styles.connector} d="M543.585 454.085L519.085 506.085H409.585" />
        <path className={styles.connector} d="M682.585 245.585L707.085 193.585H816.585" />
        <path className={styles.connector} d="M543.585 245.585L519.085 193.585H409.585" />
        <circle className={styles.centerCircle} cx="610.446" cy="348.085" r="83" />
        <path className={styles.logoPath} d="M594.016 357.283H570.759L560.585 379.085H583.841L594.016 357.283Z" />
        <path className={styles.logoPath} d="M627.446 379.085H604.19V363.097C604.19 357.283 599.345 354.86 596.923 354.376H572.213L573.666 350.015H596.923C605.062 351.178 608.066 357.283 608.551 360.19C608.551 352.05 616.303 350.015 620.179 350.015H640.528L627.446 379.085Z" />
        <path className={styles.logoPath} d="M646.342 338.387H623.086L631.807 316.585H656.516L646.342 338.387Z" />
        <path className={styles.logoPath} d="M588.202 316.585L575.12 345.655H595.469C602.446 345.655 607.097 337.903 608.551 334.027C609.713 342.166 616.787 345.17 620.179 345.655H643.435L644.888 342.748H643.435H624.539C615.237 342.748 611.942 335.965 611.458 332.573V316.585H588.202Z" />
      </svg>

      <div
        className={styles.hoverZone}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  );
}

"use client";

import Image from "next/image";
import { Fragment, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { BilingualText } from "@/components/bilingual-text";
import styles from "./technical-visual.module.css";

type TechnicalVisualProps = {
  className?: string;
};

type StackMark = {
  label: string;
  iconSrc: string;
  tone?: "light-ink" | "lift" | "outline";
};

const prototypes = [
  {
    id: "oled",
    src: "/uploads/hero/embedded-controller-isolated-tight-v3.webp"
  },
  {
    id: "tft",
    src: "/uploads/hero/hardware-prototype-isolated-tight-v3.webp"
  },
  {
    id: "battery",
    src: "/uploads/hero/battery-power-isolated-tight-v3.webp"
  },
  {
    id: "power",
    src: "/uploads/hero/power-supply-board-isolated-tight-v1.webp"
  },
  {
    id: "mixer",
    src: "/uploads/hero/ad831-mixer-cutout-v1.png"
  }
] as const;

const stackGroups = {
  embedded: [
    { label: "STM32", iconSrc: "/skills/icons/stmicroelectronics-blue-white.svg" },
    { label: "ESP32", iconSrc: "/skills/icons/espressif.png" },
    { label: "Arduino", iconSrc: "/skills/icons/arduino-transparent.png" },
    { label: "Arm Keil Studio", iconSrc: "/skills/icons/keil-studio.png" },
    {
      label: "Texas Instruments",
      iconSrc: "/skills/icons/texas-instruments-symbol-transparent.png"
    }
  ],
  firmware: [
    { label: "C", iconSrc: "/skills/icons/c.svg" },
    { label: "C++", iconSrc: "/skills/icons/cpp.svg", tone: "lift" },
    { label: "Python", iconSrc: "/skills/icons/python.svg" },
    { label: "MATLAB", iconSrc: "/skills/icons/matlab.svg" },
    { label: "LaTeX", iconSrc: "/skills/icons/latex.svg", tone: "light-ink" }
  ],
  tools: [
    { label: "JLCEDA / EasyEDA", iconSrc: "/skills/icons/easyeda.svg" },
    { label: "Cadence Allegro", iconSrc: "/skills/icons/cadence-pcb-editor-clean.png" },
    { label: "Altium Designer", iconSrc: "/skills/icons/altium-designer.svg", tone: "lift" },
    { label: "SOLIDWORKS", iconSrc: "/skills/icons/solidworks-user-drawn-transparent.png" },
    { label: "Linux", iconSrc: "/skills/icons/linux.svg", tone: "outline" }
  ]
} satisfies Record<string, readonly StackMark[]>;

function PrototypeNucleus() {
  return (
    <div className={styles.nucleus} aria-hidden="true">
      <span className={styles.nucleusField} />
      <div className={styles.nucleusRotor}>
        {prototypes.map((prototype, index) => (
          <span className={styles.nucleon} data-index={index} key={prototype.id}>
            <Image
              src={prototype.src}
              alt=""
              fill
              sizes="92px"
              className={`${styles.nucleonImage}${index === prototypes.length - 1 ? ` ${styles.nucleonCutout}` : ""}`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function AtomOrbit({
  className,
  labelEn,
  labelZh,
  marks,
  duration,
  phaseOffset
}: {
  className: string;
  labelEn: string;
  labelZh: string;
  marks: readonly StackMark[];
  duration: number;
  phaseOffset: number;
}) {
  const wrapPhase = (phase: number) => ((phase % 1) + 1) % 1;
  const delayAt = (phase: number) => `${-duration * wrapPhase(phase)}s`;
  const startAt = (phase: number) => `${100 * wrapPhase(phase)}%`;

  return (
    <div
      className={`${styles.orbit} ${className}`}
      style={{ "--orbit-duration": `${duration}s` } as CSSProperties}
      aria-hidden="true"
    >
      <svg
        className={styles.orbitLine}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        focusable="false"
      >
        <ellipse cx="50" cy="50" rx="49.4" ry="49.4" pathLength="100" />
      </svg>
      <span className={styles.orbitLabel}>
        <BilingualText en={labelEn} zh={labelZh} />
      </span>
      {marks.map((mark, index) => {
        const phase = wrapPhase(phaseOffset + index / marks.length);

        return (
          <Fragment key={`${labelEn}-${mark.label}`}>
            <span
              className={styles.cometRunner}
              style={{
                "--electron-delay": delayAt(phase),
                "--orbit-start": startAt(phase)
              } as CSSProperties}
            >
              <i className={styles.cometTail} />
            </span>
            <span
              className={styles.electron}
              style={{
                "--electron-delay": delayAt(phase),
                "--orbit-start": startAt(phase)
              } as CSSProperties}
            >
              <span className={styles.electronBadge} data-icon-tone={mark.tone}>
                <Image
                  src={mark.iconSrc}
                  alt=""
                  width={30}
                  height={30}
                  loading="eager"
                  className={styles.stackLogo}
                />
              </span>
            </span>
          </Fragment>
        );
      })}
    </div>
  );
}

export function TechnicalVisual({ className }: TechnicalVisualProps) {
  const visualDescriptionId = useId();
  const visualRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const visual = visualRef.current;

    if (!visual) {
      return;
    }

    const hero = visual.closest<HTMLElement>(".signal-hero");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;
    const updatePauseState = () => {
      const motionState = motionQuery.matches
        ? "reduced"
        : document.hidden || !isVisible
          ? "paused"
          : "running";

      setIsPaused(motionState !== "running");
      hero?.setAttribute("data-motion", motionState);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        updatePauseState();
      },
      { rootMargin: "100px", threshold: 0.01 }
    );

    observer.observe(visual);
    document.addEventListener("visibilitychange", updatePauseState);
    motionQuery.addEventListener("change", updatePauseState);
    updatePauseState();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePauseState);
      motionQuery.removeEventListener("change", updatePauseState);
      hero?.removeAttribute("data-motion");
    };
  }, []);

  return (
    <div
      ref={visualRef}
      className={`${styles.atomVisual}${className ? ` ${className}` : ""}`}
      data-paused={isPaused ? "true" : "false"}
      role="img"
      aria-labelledby={visualDescriptionId}
    >
      <span id={visualDescriptionId} className="sr-only">
        <BilingualText
          en="Five prototype images form a nucleus. Three slow rotating orbits with evenly spaced electrons group representative embedded systems, firmware, and engineering tool skills."
          zh="五张原型图片组成原子核；三条缓慢旋转且电子等距分布的轨道，分别代表嵌入式系统、固件开发和工程工具。"
        />
      </span>
      <div className={styles.visualLabel} aria-hidden="true">
        <span>GYROSCOPIC CORE</span>
        <BilingualText en="Prototype nucleus · representative stack" zh="原型核心 · 代表性技术栈" />
      </div>
      <span className={styles.cornerTopRight} aria-hidden="true" />

      <div className={styles.atomStage} aria-hidden="true">
        <div className={styles.orbitAssembly}>
          <AtomOrbit
            className={styles.embeddedOrbit}
            labelEn="Embedded systems"
            labelZh="嵌入式系统"
            marks={stackGroups.embedded}
            duration={72}
            phaseOffset={0}
          />
          <AtomOrbit
            className={styles.firmwareOrbit}
            labelEn="Firmware"
            labelZh="固件开发"
            marks={stackGroups.firmware}
            duration={72}
            phaseOffset={1 / 30}
          />
          <AtomOrbit
            className={styles.toolsOrbit}
            labelEn="Engineering tools"
            labelZh="工程工具"
            marks={stackGroups.tools}
            duration={72}
            phaseOffset={2 / 30}
          />
        </div>
        <PrototypeNucleus />
      </div>

    </div>
  );
}

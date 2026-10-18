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

// Real boards, lifted from project photos (the four added on 2026-10-18 with
// macOS subject lifting), alternating with the earlier cutouts, plus the AD831
// render. Every file is cropped tight to the board, and each one is drawn at the
// same visible area (see `boardSize`); `boost` enlarges a board whose cutout
// carries a lot besides the board itself (the mixer's SMA connectors).
const prototypes = [
  { id: "power", src: "/uploads/hero/power-supply-board-cutout-v5.webp", width: 575, height: 498 },
  { id: "gan-esc", src: "/uploads/hero/gan-esc-board-cutout-v1.webp", width: 720, height: 523 },
  { id: "oled", src: "/uploads/hero/embedded-controller-cutout-v5.webp", width: 703, height: 505 },
  { id: "acunit-main", src: "/uploads/hero/acunit-main-board-cutout-v1.webp", width: 720, height: 595 },
  { id: "tft", src: "/uploads/hero/hardware-prototype-cutout-v5.webp", width: 603, height: 523 },
  { id: "acunit-power", src: "/uploads/hero/acunit-power-board-cutout-v1.webp", width: 720, height: 495 },
  { id: "battery", src: "/uploads/hero/battery-power-cutout-v5.webp", width: 720, height: 483 },
  { id: "line-car", src: "/uploads/hero/line-tracking-car-cutout-v1.webp", width: 648, height: 720 },
  { id: "mixer", src: "/uploads/hero/ad831-mixer-cutout-v2.webp", width: 720, height: 539, boost: 1.22 }
] as const;

/** Side of the square every board's visible area matches, in stage pixels. */
const boardArea = 186;

function boardSize(prototype: (typeof prototypes)[number]) {
  const boost = "boost" in prototype ? prototype.boost : 1;
  const ratio = prototype.width / prototype.height;
  return { width: Math.round(boardArea * Math.sqrt(ratio) * boost), height: Math.round((boardArea / Math.sqrt(ratio)) * boost) };
}

/** Dust-tail puffs behind each electron, and how far apart they ride (fraction of an orbit). */
const tailPuffs = 6;
const tailStep = 0.0072;

/** Seconds each prototype holds the nucleus before the next one fades in. */
const nucleusSlot = 5;

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
  const cycle = `${prototypes.length * nucleusSlot}s`;

  return (
    <div
      className={styles.nucleus}
      style={{ "--nucleus-cycle": cycle } as CSSProperties}
      aria-hidden="true"
    >
      {prototypes.map((prototype, index) => (
        <span
          className={styles.nucleusSlide}
          key={prototype.id}
          style={{ "--slot-delay": `${index * nucleusSlot}s` } as CSSProperties}
        >
          <Image
            src={prototype.src}
            alt=""
            width={prototype.width}
            height={prototype.height}
            sizes="240px"
            className={styles.nucleusImage}
            style={boardSize(prototype)}
          />
        </span>
      ))}
    </div>
  );
}

function AtomOrbit({
  className,
  labelEn,
  marks,
  duration,
  phaseOffset
}: {
  className: string;
  labelEn: string;
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
            {/* The dust tail: puffs on the electron's own path, each a little
                further behind, so the tail bends with the orbit. */}
            {Array.from({ length: tailPuffs }, (_, puff) => (
              <span
                key={puff}
                className={styles.cometPuff}
                style={{
                  "--electron-delay": delayAt(phase - (puff + 1) * tailStep),
                  "--puff": puff
                } as CSSProperties}
              />
            ))}
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
          en="The nucleus shows nine prototype boards in turn. Three slow rotating orbits with evenly spaced electrons group representative embedded systems, firmware, and engineering tool skills."
          zh="原子核轮流展示九块原型板；三条缓慢旋转且电子等距分布的轨道，分别代表嵌入式系统、固件开发和工程工具。"
        />
      </span>
      <div className={styles.visualLabel} aria-hidden="true">
        <BilingualText en="Prototype nucleus · representative stack" zh="原型核心 · 代表性技术栈" />
      </div>
      {/* The orbits reach the frame at their tips, so the category names sit in
          a fixed legend instead of riding the orbit ends. */}
      <ul className={styles.orbitLegend} aria-hidden="true">
        <li className={styles.embeddedOrbit}><BilingualText en="Embedded systems" zh="嵌入式系统" /></li>
        <li className={styles.firmwareOrbit}><BilingualText en="Firmware" zh="固件开发" /></li>
        <li className={styles.toolsOrbit}><BilingualText en="Engineering tools" zh="工程工具" /></li>
      </ul>
      <span className={styles.cornerTopRight} aria-hidden="true" />

      <div className={styles.atomStage} aria-hidden="true">
        <div className={styles.orbitAssembly}>
          <AtomOrbit
            className={styles.embeddedOrbit}
            labelEn="Embedded systems"
            marks={stackGroups.embedded}
            duration={72}
            phaseOffset={0}
          />
          <AtomOrbit
            className={styles.firmwareOrbit}
            labelEn="Firmware"
            marks={stackGroups.firmware}
            duration={72}
            phaseOffset={1 / 30}
          />
          <AtomOrbit
            className={styles.toolsOrbit}
            labelEn="Engineering tools"
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

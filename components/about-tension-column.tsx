"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { BilingualText } from "@/components/bilingual-text";
import styles from "@/app/about/about.module.css";

const stages = [
  {
    index: "01",
    titleEn: "System framing",
    titleZh: "系统定义",
    detailEn: "Power · sensing · interfaces",
    detailZh: "电源 · 采样 · 接口"
  },
  {
    index: "02",
    titleEn: "Firmware & protocols",
    titleZh: "固件与协议",
    detailEn: "STM32 · ESP32 · communication",
    detailZh: "STM32 · ESP32 · 通信"
  },
  {
    index: "03",
    titleEn: "Bring-up & measurement",
    titleZh: "上电与测量",
    detailEn: "Waveforms · thermal runs · faults",
    detailZh: "波形 · 热测试 · 故障"
  },
  {
    index: "04",
    titleEn: "Handoff & iteration",
    titleZh: "交接与迭代",
    detailEn: "Pin maps · notes · next revisions",
    detailZh: "引脚表 · 记录 · 下一版本"
  }
] as const;

export function AboutTensionColumn() {
  const columnRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const column = columnRef.current;

    if (!column) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;

    const syncMotion = () => {
      column.dataset.motion =
        isVisible && document.visibilityState === "visible" && !reducedMotion.matches
          ? "running"
          : "paused";
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncMotion();
      },
      { threshold: 0.18 }
    );

    observer.observe(column);
    document.addEventListener("visibilitychange", syncMotion);
    reducedMotion.addEventListener("change", syncMotion);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncMotion);
      reducedMotion.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <section
      ref={columnRef}
      className={styles.tensionColumn}
      data-motion="paused"
      aria-labelledby="tension-column-title"
    >
      <header className={styles.tensionHeader}>
        <h2 id="tension-column-title">
          <BilingualText en="The engineering load path" zh="工程载荷路径" />
        </h2>
        <p>
          <BilingualText
            en="One connected practice, not four separate skill scores."
            zh="一条连续的实践路径，而不是四项技能评分。"
          />
        </p>
      </header>

      <div className={styles.tensionGraph}>
        <figure className={styles.portraitPlate}>
          <Image
            src="/uploads/projects/avatar.jpg"
            alt="Alvin Li hand-drawn portrait"
            width={1000}
            height={1000}
            sizes="(max-width: 720px) 68vw, (max-width: 1100px) 32vw, 240px"
            className={styles.portraitImage}
            preload
          />
          <figcaption>
            <strong>ALVIN LI</strong>
            <span>PROFILE / 04</span>
          </figcaption>
        </figure>

        <div className={styles.tensionTrack}>
          <ol className={styles.tensionStages}>
            {stages.map((stage) => (
              <li key={stage.index} className={styles.tensionStage}>
                <span className={styles.tensionNode} aria-hidden="true">
                  <span />
                </span>
                <div>
                  <span className={styles.stageIndex}>{stage.index}</span>
                  <strong>
                    <BilingualText en={stage.titleEn} zh={stage.titleZh} />
                  </strong>
                  <small>
                    <BilingualText en={stage.detailEn} zh={stage.detailZh} />
                  </small>
                </div>
              </li>
            ))}
          </ol>
          <span className={styles.tensionPulse} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

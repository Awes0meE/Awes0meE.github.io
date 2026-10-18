import { ArrowUpRight } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { CopyText } from "@/components/copy-text";
import { site } from "@/lib/site";
import styles from "./home-contact.module.css";

const stack = [
  {
    en: "Embedded control and firmware",
    zh: "嵌入式控制与固件",
    detailEn: "STM32, ESP32, C/C++, and bare-metal peripheral development",
    detailZh: "STM32、ESP32、C/C++ 与裸机外设开发"
  },
  {
    en: "Hardware development",
    zh: "硬件开发",
    detailEn: "Schematic capture, PCB layout, hand assembly, and staged board bring-up",
    detailZh: "原理图设计、PCB 布局、手工装配与分阶段板级 bring-up"
  },
  {
    en: "Motor drives and power electronics",
    zh: "电机驱动与电力电子",
    detailEn: "PWM, SVPWM, FOC, gate driving, sensing, and power conversion",
    detailZh: "PWM、SVPWM、FOC、栅极驱动、采样与电源变换"
  }
];

const githubHandle = site.github.replace(/^https?:\/\//, "");
const linkedinHandle = "linkedin.com/in/zhiyi-li";

/* Both filters read the same low-frequency noise in the same coordinate
   space (the label's box), so the ink bends exactly where the paper's
   relief is shaded. */
const RELIEF = { baseFrequency: "0.0055 0.0085", numOctaves: 2, seed: 4 } as const;

/* The homepage close: a sheet of letter paper screwed to the bench,
   carrying the contact routes and the three stack lines. */
export function HomeContact() {
  return (
    <section className={styles.close} aria-labelledby="contact-title">
      <h2 id="contact-title" className={styles.title}><BilingualText en="Get in touch" zh="保持联系" /></h2>
      <div className={styles.plate}>
        <svg className={styles.defs} aria-hidden="true" focusable="false">
          <filter id="contact-ink" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" {...RELIEF} result="relief" />
            <feDisplacementMap in="SourceGraphic" in2="relief" scale="9" xChannelSelector="R" yChannelSelector="G" result="bent" />
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9" result="grain" />
            <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.5 0 0 0 0.72" result="speckle" />
            <feComposite in="bent" in2="speckle" operator="in" />
          </filter>
        </svg>
        <span className={styles.lampGlow} aria-hidden="true" />
        <span className={styles.spill} aria-hidden="true" />
        <div className={styles.sheet}>
          <div className={styles.plateHead}>
            <strong>ALVIN LI</strong>
            <span>66CCFF LAB</span>
          </div>
          <div className={styles.mail}>
            <span className={styles.label}><BilingualText en="Mail" zh="邮箱" /></span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <CopyText text={site.email} label={{ en: "Copy email", zh: "复制邮箱" }} className={styles.copy} />
          </div>
          <div className={styles.plateBody}>
            <dl className={styles.routes}>
              <div>
                <dt>GitHub</dt>
                <dd><a href={site.github}>{githubHandle}<ArrowUpRight size={15} aria-hidden="true" /></a></dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd><a href={site.linkedin}>{linkedinHandle}<ArrowUpRight size={15} aria-hidden="true" /></a></dd>
              </div>
              <div className={styles.wechat}>
                <dt><BilingualText en="WeChat" zh="微信" /></dt>
                <dd>
                  <span className={styles.handle}>{site.wechat}</span>
                  <CopyText text={site.wechat} label={{ en: "Copy WeChat ID", zh: "复制微信号" }} className={styles.copy} />
                </dd>
              </div>
            </dl>
            <div className={styles.stack}>
              <h3><BilingualText en="Stack" zh="方向" /></h3>
              {stack.map((item) => (
                <p key={item.en}>
                  <b><BilingualText en={item.en} zh={item.zh} /></b>
                  <span><BilingualText en={item.detailEn} zh={item.detailZh} /></span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <svg className={styles.relief} aria-hidden="true" focusable="false">
          <filter id="contact-relief" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" {...RELIEF} result="relief" />
            <feColorMatrix in="relief" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="height" />
            <feGaussianBlur in="height" stdDeviation="2" result="smooth" />
            <feDiffuseLighting in="smooth" surfaceScale="4" diffuseConstant="1.2" lightingColor="#ffffff" result="lit">
              <feDistantLight azimuth="270" elevation="58" />
            </feDiffuseLighting>
            {/* soften the 8-bit terracing that smooth noise leaves in the normals */}
            <feGaussianBlur in="lit" stdDeviation="2.5" />
          </filter>
          <rect width="100%" height="100%" filter="url(#contact-relief)" />
        </svg>
        <span className={styles.falloff} aria-hidden="true" />
        <span className={styles.screws} aria-hidden="true"><i /><i /><i /><i /></span>
        <span className={styles.lamp} aria-hidden="true" />
      </div>
    </section>
  );
}

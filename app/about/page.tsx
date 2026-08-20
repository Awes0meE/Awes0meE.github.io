import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import { AboutTensionColumn } from "@/components/about-tension-column";
import { BilingualText } from "@/components/bilingual-text";
import { openGraphBase, site } from "@/lib/site";
import styles from "./about.module.css";

const pageTitle = "About";
const pageDescription =
  "About Alvin Li: a route from telecommunications engineering into embedded controller boards, firmware, bring-up, measurement, and robotic systems.";
const socialTitle = `${pageTitle} | Alvin Li`;

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark"
};

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    ...openGraphBase,
    title: socialTitle,
    description: pageDescription,
    url: new URL("/about", site.url)
  },
  twitter: {
    title: socialTitle,
    description: pageDescription
  }
};

const practiceRoutes = [
  {
    index: "01",
    coordinate: "Cirro Tech · 2025–2026",
    titleEn: "From components to bring-up",
    titleZh: "从器件走到 bring-up",
    copyEn:
      "Controller-board work crossed component selection, 2-, 4-, and 6-layer PCB design, assembly, STM32 and ESP32 firmware, communication protocols, board bring-up, and handoff notes.",
    copyZh:
      "控制板工作横跨器件选型、2/4/6 层 PCB、焊接装配、STM32 与 ESP32 固件、通信协议、板级 bring-up，以及交接记录。"
  },
  {
    index: "02",
    coordinate: "Nanjing Turing + Tianjin Jintie · 2025",
    titleEn: "Across the hardware–software boundary",
    titleZh: "跨过硬件与软件的边界",
    copyEn:
      "At Nanjing Turing, Qt/C++ client modules, HTTP and TCP flows, and cross-platform builds sat on the client side of connected systems. At Tianjin Jintie, STM32 state machines, interrupts, and time-sliced polling stayed close to device behaviour.",
    copyZh:
      "在 Nanjing Turing，Qt/C++ 客户端、HTTP 与 TCP 交互和跨平台构建位于连接系统的软件一侧；在 Tianjin Jintie，STM32 状态机、中断与时间片轮询则贴近设备行为。"
  },
  {
    index: "03",
    coordinate: "FYP + XJTLU Hardware Studio · 2024–2026",
    titleEn: "Measurement changes the next revision",
    titleZh: "测量决定下一次迭代",
    copyEn:
      "The GaN-versus-silicon ESC project added repeated electrical, waveform, and thermal tests. Hardware Studio work added revision discipline from prototypes toward small-batch builds.",
    copyZh:
      "GaN 与硅基 ESC 对比项目加入了重复的电气、波形与热测试；Hardware Studio 的工作则建立了从原型走向小批量制作的版本迭代习惯。"
  }
] as const;

const education = [
  {
    placeEn: "Nanyang Technological University, Singapore",
    placeZh: "南洋理工大学 · 新加坡",
    detailEn: "MSc Robotics and Intelligent Systems · 2026–present",
    detailZh: "机器人与智能系统理学硕士 · 2026–至今"
  },
  {
    placeEn: "Xi'an Jiaotong-Liverpool University / University of Liverpool",
    placeZh: "西交利物浦大学 / 利物浦大学",
    detailEn: "Telecommunications Engineering · First Class Honours",
    detailZh: "通信工程 · 一等荣誉学位"
  }
] as const;

export default function AboutPage() {
  return (
    <main className={`signal-theme ${styles.about}`}>
      <section className={styles.hero} aria-labelledby="about-name">
        <div className={styles.heroCopy}>
          <h1 id="about-name" className={styles.name}>
            Alvin Li
          </h1>
          <h2 className={styles.heroStatement}>
            <BilingualText
              en="After the schematic leaves the page"
              zh="原理图离开纸面以后"
            />
          </h2>

          <div className={styles.narrative}>
            <p>
              <BilingualText
                en="My route into this work is grounded in telecommunications engineering and connects STM32 embedded systems, embedded-controller work at Cirro Tech, a GaN-versus-silicon ESC final-year project, and the XJTLU Hardware Studio I helped co-found. Across them, the recurring engineering problem is whole-system behaviour—what happens when power, sensing, communication, firmware, and a physical load meet."
                zh="这条路线扎根于通信工程训练，也连接着 STM32 嵌入式系统、Cirro Tech 的嵌入式控制板工作、GaN 与硅基 ESC 的本科毕业设计，以及我参与创立的 XJTLU Hardware Studio。贯穿这些经历的共同问题，是整套系统的实际表现——当电源、采样、通信、固件和真实负载接在一起，会发生什么。"
              />
            </p>
            <p>
              <BilingualText
                en="I am now pursuing the Master of Science (Robotics and Intelligent Systems) at NTU. This portfolio follows the same engineering chain from assumptions in a schematic, through board bring-up, to measurements, debugging records, and handoff material another engineer can inspect. It keeps what worked, the revisions that failed, and the validation still in progress."
                zh="现在我在 NTU 攻读机器人与智能系统理学硕士。这个作品档案沿着同一条工程链展开：从原理图里的设计假设，到板级 bring-up，再到可复查的测量、调试记录和交付材料。它会同时留下做成的部分、失败的版本，以及仍在推进的验证。"
              />
            </p>
          </div>

          <div className={styles.heroActions}>
            <Link href="/work" className={styles.primaryAction}>
              <BilingualText en="Open the engineering record" zh="打开工程记录" />
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={site.github}
              className={styles.secondaryAction}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <a href={`mailto:${site.email}`} className={styles.mailRoute}>
            <Mail size={17} aria-hidden="true" />
            <span>
              <BilingualText en="Discuss a project" zh="聊聊一个具体项目" />
              <small>{site.email}</small>
            </span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <AboutTensionColumn />

        <a href="#route-title" className={styles.nextLedgerCue}>
          <BilingualText
            en="Next: where the chain took shape"
            zh="下一段：这条工程链在哪里形成"
          />
          <ArrowDown size={17} aria-hidden="true" />
        </a>
      </section>

      <section className={styles.routeSection} aria-labelledby="route-title">
        <header className={styles.sectionHeader}>
          <h2 id="route-title">
            <BilingualText
              en="Where the chain took shape"
              zh="这条工程链在哪里形成"
            />
          </h2>
          <p>
            <BilingualText
              en="Three contexts show the method at work: making decisions, testing them, and leaving records—not a proficiency scale, but a traceable route through the practice."
              zh="三个场景展示这套方法如何落到工作里：做出判断、通过测试复核，并留下记录。它们不是熟练度等级，而是一条可追溯的实践路径。"
            />
          </p>
        </header>

        <ol className={styles.practiceList}>
          {practiceRoutes.map((route) => (
            <li key={route.index} className={styles.practiceRow}>
              <span className={styles.practiceIndex} aria-hidden="true">
                {route.index}
              </span>
              <div className={styles.practiceTitle}>
                <h3>
                  <BilingualText en={route.titleEn} zh={route.titleZh} />
                </h3>
                <span>{route.coordinate}</span>
              </div>
              <p>
                <BilingualText en={route.copyEn} zh={route.copyZh} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.currentSection} aria-labelledby="current-title">
        <div className={styles.currentLead}>
          <h2 id="current-title">
            <BilingualText en="Current coordinates" zh="现在的位置" />
          </h2>
          <p>
            <BilingualText
              en="The work now connects motor drives, power electronics, sensing, and control as parts of one measurable system. The master's degree expands the academic context; project evidence still comes from bench work, measurements, and records."
              zh="现在的实践把电机驱动、电力电子、采样与控制放进同一个可测量的系统里。硕士阶段扩展了学术背景；项目证据仍然来自台架工作、测量和记录。"
            />
          </p>
        </div>

        <div className={styles.coordinateLedger}>
          <dl className={styles.educationList}>
            {education.map((item) => (
              <div key={item.placeEn}>
                <dt>
                  <BilingualText en={item.placeEn} zh={item.placeZh} />
                </dt>
                <dd>
                  <BilingualText en={item.detailEn} zh={item.detailZh} />
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.contactRoutes}>
            <Link href="/work">
              <BilingualText en="Inspect project evidence" zh="查看项目证据" />
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href={`mailto:${site.email}`}>
              <BilingualText en="Email Alvin" zh="邮件联系 Alvin" />
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

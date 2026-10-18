import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bike,
  Bot,
  Crown,
  Dumbbell,
  Feather,
  Github,
  Linkedin,
  Mail,
  Piano,
  Scale,
  Volleyball
} from "lucide-react";
import { AboutMotion } from "@/components/about-motion";
import { BilingualText } from "@/components/bilingual-text";
import { RouteStage } from "@/components/route-stage";
import { openGraphBase, site } from "@/lib/site";
import styles from "./about.module.css";

const pageTitle = "About";
const pageDescription =
  "About Alvin Li: from telecommunications engineering into embedded hardware, now building wearable bioimpedance and EMG sensing hardware for human–robot interaction at NTU.";
const socialTitle = `${pageTitle} | Alvin Li`;

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

const embeddedWorld = [
  { en: "Traffic lights", zh: "红绿灯" },
  { en: "Elevators", zh: "电梯" },
  { en: "Washing machines", zh: "洗衣机" },
  { en: "Robot vacuums", zh: "扫地机器人" },
  { en: "Drones", zh: "无人机" },
  { en: "EV motor drives", zh: "电车电驱" },
  { en: "Robot arms", zh: "机械臂" },
  { en: "Satellites", zh: "卫星" },
  { en: "Lithography machines", zh: "光刻机" }
] as const;

const road = [
  {
    when: "2024.03–05",
    slug: "arduino-smart-car-line-tracker",
    titleEn: "Line tracker and digit counter",
    titleZh: "循迹小车与数码管计数器",
    copyEn:
      "Two MEC104 course builds. The first time I soldered, wired and wrote Arduino code until something actually ran.",
    copyZh: "MEC104 课上的两次实训。第一次自己焊板、接线、写 Arduino 代码，一直折腾到东西真的跑起来。"
  },
  {
    when: "2024.08–09",
    slug: "juanyun-diy-cooling-prototype",
    titleEn: "DIY laptop cooler",
    titleZh: "DIY 笔记本散热器",
    copyEn:
      "My first project of my own: an ESP32 between the computer and a fan, so the laptop could drive its own cooling.",
    copyZh: "第一个完全由自己起意的项目。用 ESP32 把电脑和风扇连起来，做成一台能被电脑控制的压风式散热器。"
  },
  {
    when: "2025.01–02",
    slug: "tianjin-metro-stm32-foundation",
    titleEn: "STM32 intern, Tianjin Jintie",
    titleZh: "天津津铁 STM32 实习",
    copyEn:
      "A month that took me from Arduino-style pin calls down to GPIO, interrupts, timers, ADC, PWM and UART on bare metal.",
    copyZh: "一个月的嵌入式实习，从 Arduino 式的高低电平一路补到 GPIO、中断、定时器、ADC、PWM 和串口。"
  },
  {
    when: "2025.08–09",
    slug: "nanjing-turing-qt-embedded-learning",
    titleEn: "Qt/C++ intern, Nanjing Turing",
    titleZh: "南京图灵 Qt 开发实习",
    copyEn:
      "Three weeks inside the Seamly2D codebase: my first features in a large open-source project, then Windows and macOS packaging.",
    copyZh: "三周泡在 Seamly2D 的代码里，第一次在大型开源项目里加功能，再把它打包成 Windows 和 macOS 的安装包。"
  },
  {
    when: "2025.10–2026.05",
    slug: "juanyun-thermal-hardware",
    titleEn: "Phase-change cooling controllers, Cirro Tech",
    titleZh: "卷云科技相变散热器控制系统",
    copyEn:
      "Hardware and firmware for the BaseUnit and the three-board ACUnit, carried from schematic all the way to a running refrigeration loop.",
    copyZh: "独立负责 BaseUnit 和三板 ACUnit 的硬件与固件，从原理图一路做到整条制冷链路跑通。"
  },
  {
    when: "2025.11–",
    slug: "sensorless-foc-learning-route",
    titleEn: "Custom driver board and sensorless FOC",
    titleZh: "自制驱动板与无感 FOC",
    copyEn:
      "My own driver board spins a compressor open-loop. The sensorless closed loop is still on the bench.",
    copyZh: "自己画的驱动板已经把压缩机开环转起来了，无感闭环还在台架上慢慢磨。"
  },
  {
    when: "2026.04–05",
    slug: "claude-chime-hardware-power-board",
    titleEn: "Claude Chime power board",
    titleZh: "Claude Chime 电源板",
    copyEn:
      "A commissioned board I took from requirements through schematic, PCB, hand assembly and bring-up on my own.",
    copyZh: "一块委托设计的电源板，从需求拆解、原理图、PCB 到手工焊接和上电调试，都由我一个人完成。"
  }
] as const;

const offClock = [
  { icon: Scale, en: "Cutting weight", zh: "减肥中" },
  { icon: Dumbbell, en: "Gym", zh: "健身" },
  { icon: Volleyball, en: "Badminton", zh: "羽毛球" },
  { icon: Bike, en: "Road cycling", zh: "公路车" },
  { icon: Piano, en: "Piano", zh: "钢琴" },
  { icon: Crown, en: "Chess", zh: "下棋" },
  { icon: Bot, en: "Talking with AI", zh: "跟 AI 聊天" },
  { icon: Feather, en: "Writing, now and then", zh: "偶尔写作" }
] as const;

const contacts = [
  { href: `mailto:${site.email}`, icon: Mail, label: site.email, external: false },
  { href: site.github, icon: Github, label: "GitHub", external: true },
  { href: site.linkedin, icon: Linkedin, label: "LinkedIn", external: true }
] as const;

export default function AboutPage() {
  return (
    <RouteStage>
      <main className={`signal-theme ${styles.about}`}>
        <AboutMotion />

        <section className={styles.hero} aria-labelledby="about-name">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true">01</span>
              <BilingualText en="About" zh="关于" />
            </p>
            <h1 id="about-name" className={styles.name}>
              Alvin Li
            </h1>
            <p className={styles.heroStatement}>
              <span className="bilingual-text">
                <span className="lang-en">The whole world is just one giant embedded system</span>
                <span className="lang-zh">
                  {/* Explicit lines: keep 一台 together on the second line. */}
                  <span className={styles.statementLine}>这个世界就是</span>
                  <span className={styles.statementLine}>一台巨大的嵌入式</span>
                </span>
              </span>
            </p>
            <p className={styles.heroIntro}>
              <BilingualText
                en="I'm Alvin Li. I studied telecommunications engineering and I'm now doing an MSc in Robotics and Intelligent Systems at NTU. Most days I draw schematics, lay out boards and write firmware; by the end of my bachelor's that added up to more than 30 PCBs, up to six layers. In the lab I now build sensing hardware for robots. Anything that moves on its own, from a traffic light to a lithography machine, hides control electronics and embedded code, and I want to understand how all of it works."
                zh="我是 Alvin Li，本科读通信工程，现在在 NTU 读机器人与智能系统硕士。平时画原理图、布板、写固件，本科四年下来画了 30 多块 PCB，最多做到 6 层，现在在实验室里给机器人做传感硬件。从路口的红绿灯到光刻机，能自己动起来的东西里都藏着电控和嵌入式，它们到底是怎么运转的，一直是最吸引我的问题。"
              />
            </p>
          </div>

          <figure className={styles.portraitPlate} data-motion-region>
            <span className={styles.portraitOrbit} aria-hidden="true" />
            <Image
              src="/uploads/projects/avatar.jpg"
              alt="Alvin Li hand-drawn portrait"
              width={1000}
              height={1000}
              sizes="(max-width: 760px) 72vw, (max-width: 1180px) 36vw, 380px"
              className={styles.portraitImage}
              preload
            />
            <figcaption>
              <span>NTU · MSc RIS</span>
              <span><BilingualText en="SINGAPORE" zh="新加坡" /></span>
            </figcaption>
          </figure>
        </section>

        <div className={styles.ticker} data-motion-region aria-label="Embedded systems around us">
          <div className={styles.tickerTrack} aria-hidden="true">
            {[0, 1].map((copy) =>
              embeddedWorld.map((item) => (
                <span key={`${copy}-${item.en}`} className={styles.tickerItem}>
                  <BilingualText en={item.en} zh={item.zh} />
                </span>
              ))
            )}
          </div>
          <p className="sr-only">
            <BilingualText
              en="Traffic lights, elevators, washing machines, robot vacuums, drones, EV motor drives, robot arms, satellites and lithography machines are all embedded systems."
              zh="红绿灯、电梯、洗衣机、扫地机器人、无人机、电车电驱、机械臂、卫星和光刻机，都是嵌入式系统。"
            />
          </p>
        </div>

        <section className={styles.roadSection} aria-labelledby="road-title">
          <header className={styles.sectionHeader} data-reveal>
            <span className={styles.sectionIndex} aria-hidden="true">02</span>
            <h2 id="road-title">
              <BilingualText en="The Road So Far" zh="我走的路" />
            </h2>
          </header>

          <div className={styles.roadLayout}>
            <div className={styles.roadStory} data-reveal>
              <p>
                <BilingualText
                  en="The turn toward embedded work happened slowly. Telecom foundation courses introduced me to microcontrollers, circuits and motor control, and I got hooked. I kept wanting to know how the world actually runs."
                  zh="转到嵌入式这条路，是一点点发生的。通信工程的专业通识课里学到单片机、电路和电控，越学越着迷，总想知道这个世界到底是怎么运转起来的。"
                />
              </p>
              <p>
                <BilingualText
                  en="The answer that stuck: the world is one huge embedded system. Every automatic thing around us, from the traffic light on the corner to the most precise lithography machine on Earth, depends on control electronics, embedded code and hardware. After that there was no stopping. I taught myself the basics from online roadmaps, slowly started building projects, and never left."
                  zh="学完才发现，这个世界就是一个巨大的嵌入式系统。身边的红绿灯也好，全世界最精密的光刻机也好，所有能自动控制的东西都离不开电控、嵌入式和硬件。从此一发不可收拾，先照着网上的学习路线自学入门，再慢慢开始做项目，就再也离不开这个方向了。"
                />
              </p>
              <p className={styles.studioNote}>
                <BilingualText
                  en="Alongside the projects, I co-founded the XJTLU Hardware Studio and led its electronics: every circuit-level piece of hardware went through me, while modelling and mechanics sat with others."
                  zh="做项目的同时，也参与创立了 XJTLU Hardware Studio，担任电子硬件主理人。工作室里所有电子电路方向的硬件都归我管，建模和机械交给其他伙伴。"
                />
              </p>
            </div>

            <div className={styles.roadTrack} data-road>
              <span className={styles.roadRail} aria-hidden="true">
                <span className={styles.roadRailFill} />
              </span>
              <ol className={styles.roadList}>
              {road.map((stop) => (
                <li key={stop.slug} className={styles.roadStop} data-reveal data-road-stop>
                  <span className={styles.roadNode} aria-hidden="true" />
                  <time className={styles.roadWhen}>{stop.when}</time>
                  <Link
                    href={`/work/${stop.slug}`}
                    transitionTypes={["nav-forward"]}
                    className={styles.roadLink}
                  >
                    <h3>
                      <BilingualText en={stop.titleEn} zh={stop.titleZh} />
                    </h3>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <p>
                    <BilingualText en={stop.copyEn} zh={stop.copyZh} />
                  </p>
                </li>
              ))}
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.nowSection} aria-labelledby="now-title">
          <header className={styles.sectionHeader} data-reveal>
            <span className={styles.sectionIndex} aria-hidden="true">03</span>
            <h2 id="now-title">
              <BilingualText en="Work in Progress" zh="在做的事" />
            </h2>
          </header>

          <div className={styles.nowLayout}>
            <div className={styles.nowCopy}>
              <p data-reveal>
                <BilingualText
                  en="I'm at NTU for the MSc in Robotics and Intelligent Systems, working on wearable muscle-sensing hardware in Assoc. Prof. Wang Yifan's Robotic Materials Group. My dissertation sits right there: a smaller, wearable bioimpedance and EMG acquisition platform, which for me means redesigning the mixed-signal front end, building the embedded data acquisition and getting the PCB and firmware to work as one. It's human–robot interaction work: bioimpedance becomes raw input for robot models, so a robot can better understand how a person applies force while gripping or moving."
                  zh="现在在 NTU 读机器人与智能系统硕士，在王一凡副教授的 Robotic Materials Group 里做可穿戴的肌肉传感硬件。毕业论文也落在这里，要做一套更小型化的可穿戴生物电阻抗与肌电（EMG）采集平台，手上的活是重新设计混合信号前端、搭嵌入式数据采集，再让 PCB 和固件真正配合起来。这属于人机交互方向，把电阻抗当作原始输入交给机器人模型，让机器人更懂人在抓握或做动作时到底是怎么发力的。"
                />
              </p>
              <p data-reveal>
                <BilingualText
                  en="Two families of algorithms keep showing up in my projects. On the control side there's PID, LQR and, more and more, NMPC. On the signal side there's EMA, lock-in amplification, SINC3 filtering and Kalman filtering with the EKF. The more I use them, the more they feel like two halves of the same job."
                  zh="做项目时常用到两类算法。一类管控制，PID、LQR，再到更主流一点的 NMPC；另一类管信号，EMA、锁相放大、SINC3 滤波，还有卡尔曼滤波和 EKF。用得越多，越觉得这两类东西是相辅相成的。"
                />
              </p>
              <p data-reveal>
                <BilingualText
                  en="Further out, I'm drawn to embodied intelligence and world models: how robots come to understand the world. The plan is to get the hardware solid first, then use the data it collects for reinforcement learning and model training. Which is why I basically live in the lab right now (sigh)."
                  zh="再往后，想往具身智能和世界模型走，弄明白机器人是怎么理解这个世界的。眼下的打算是先把硬件做扎实，以后再拿采集到的数据去做强化学习和模型训练。所以现在每天都泡在实验室里（悲）。"
                />
              </p>
              <p className={styles.availability} data-reveal>
                <BilingualText
                  en="A student pass caps work at 16 hours a week, so a proper full-time internship is off the table for now. I'm looking for research assistant or part-time roles that fit those hours, partly to keep myself fed (ha). If you have one, I'd love to hear from you."
                  zh="学生签证每周最多只能工作 16 小时，正经的 full-time 实习暂时找不了，所以在找能配合这个工时的 Research Assistant 或兼职机会，顺便补贴一下生活（笑）。如果你那边刚好有合适的位置，欢迎来聊。"
                />
              </p>
            </div>

            <figure className={styles.signalScope} data-motion-region data-reveal aria-hidden="true">
              <div className={styles.scopeHeader}>
                <span>CH1 · RAW |Z|</span>
                <span>CH2 · LOCK-IN</span>
              </div>
              <svg viewBox="0 0 480 260" className={styles.scopeSvg} preserveAspectRatio="none">
                <g className={styles.scopeGrid}>
                  {[52, 104, 156, 208].map((y) => (
                    <line key={`h${y}`} x1="0" x2="480" y1={y} y2={y} />
                  ))}
                  {[60, 120, 180, 240, 300, 360, 420].map((x) => (
                    <line key={`v${x}`} x1={x} x2={x} y1="0" y2="260" />
                  ))}
                </g>
                <g className={styles.scopeScroll}>
                  <path
                    className={styles.scopeRaw}
                    d="M0 92 L12 70 L20 104 L30 78 L40 118 L50 66 L60 99 L72 74 L80 121 L92 83 L100 108 L112 60 L120 96 L132 79 L140 117 L152 71 L160 101 L172 64 L180 113 L192 85 L200 106 L212 69 L220 98 L232 76 L240 122 L252 73 L260 103 L272 61 L280 95 L292 81 L300 116 L312 68 L320 100 L332 75 L340 119 L352 82 L360 107 L372 63 L380 97 L392 78 L400 114 L412 72 L420 102 L432 66 L440 111 L452 84 L460 105 L472 70 L480 92 L492 70 L500 104 L510 78 L520 118 L530 66 L540 99 L552 74 L560 121 L572 83 L580 108 L592 60 L600 96 L612 79 L620 117 L632 71 L640 101 L652 64 L660 113 L672 85 L680 106 L692 69 L700 98 L712 76 L720 122 L732 73 L740 103 L752 61 L760 95 L772 81 L780 116 L792 68 L800 100 L812 75 L820 119 L832 82 L840 107 L852 63 L860 97 L872 78 L880 114 L892 72 L900 102 L912 66 L920 111 L932 84 L940 105 L952 70 L960 92"
                  />
                  <path
                    className={styles.scopeClean}
                    d="M0 196 C40 196 40 164 80 164 S120 196 160 196 S200 164 240 164 S280 196 320 196 S360 164 400 164 S440 196 480 196 S520 164 560 164 S600 196 640 196 S680 164 720 164 S760 196 800 196 S840 164 880 164 S920 196 960 196"
                  />
                </g>
              </svg>
              <figcaption className={styles.scopeFooter}>
                <span>EMA · SINC3 · EKF</span>
                <span>PID · LQR · NMPC</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className={styles.offSection} aria-labelledby="off-title">
          <header className={styles.sectionHeader} data-reveal>
            <span className={styles.sectionIndex} aria-hidden="true">04</span>
            <h2 id="off-title">
              <BilingualText en="Off the Clock" zh="认真之余" />
            </h2>
          </header>

          <div className={styles.offLayout}>
            <ul className={styles.hobbyList} aria-label="Hobbies" data-reveal>
              {offClock.map(({ icon: Icon, en, zh }) => (
                <li key={en} className={styles.hobby}>
                  <Icon size={20} aria-hidden="true" />
                  <BilingualText en={en} zh={zh} />
                </li>
              ))}
            </ul>

            <div className={styles.offCopy}>
              <p data-reveal>
                <BilingualText
                  en="I love chasing new technology and genuinely enjoy building things together with AI; this site is one of them, designed and built by me with AI at my side. AI has raised the floor of everyone's life and lifted the ceiling of the world at the same time."
                  zh="喜欢追前沿技术，也很享受跟 AI 一起把东西做出来的感觉，这个网站就是我和 AI 一起从零搭起来的。对中文互联网上流行的“薄肌黄毛，大水大睡，AI 管理生活”理论，本人深表认同。AI 平等地抬高了每个人人生的下限，也拔高了这个世界的上限。"
                />
              </p>
              <p data-reveal>
                <BilingualText
                  en="That is exactly why I won't hand it my whole brain; lean on it long enough and the thinking muscles waste away. AI can do your work and write your code, but how you think and how you face the world are still yours to decide. I'd rather it taught me to fish. Plenty of world-changing things began as one ordinary thought, and that is the part AI probably can't help with. Reading widely and travelling far still matter."
                  zh="也正因为这样，更不想把脑子整个交给它，用久了是真的会退化。AI 可以替你干活、替你写代码，但该怎么思考、怎么面对这个世界，只能自己决定。最好让 AI 授人以渔，别只顾着授人以鱼。很多改变世界的东西，起点往往只是一个普通的念头，这一步 AI 大概帮不上忙。所以读万卷书、行万里路，放在今天依然重要。"
                />
              </p>
            </div>
          </div>
        </section>

        <section className={styles.contactSection} aria-labelledby="contact-title">
          <h2 id="contact-title" data-reveal>
            <BilingualText en="Say Hello" zh="保持联系" />
          </h2>
          <ul className={styles.contactList}>
            {contacts.map(({ href, icon: Icon, label, external }) => (
              <li key={label} data-reveal>
                <a
                  href={href}
                  className={`${styles.contactLink} signal-fill`}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span>{label}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </RouteStage>
  );
}

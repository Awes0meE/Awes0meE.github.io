export const site = {
  name: "Zhiyi Li / Awes0meE / 66CCFF Labs",
  title: "Zhiyi Li | Robotic Systems Hardware Portfolio",
  description:
    "Robotic systems hardware portfolio by Zhiyi Li, an NTU MSc (Robotics and Intelligent Systems) student working across embedded control, PCB design, board bring-up, motor drives, and power electronics.",
  descriptionZh: "Zhiyi Li 的机器人系统硬件作品集：现为南洋理工大学机器人与智能系统硕士生，关注嵌入式控制、原理图与 PCB、板级 bring-up、电机驱动和电力电子。",
  url: "https://www.66ccff-labs.com",
  github: "https://github.com/Awes0meE"
};

export const openGraphBase = {
  siteName: site.name,
  locale: "en_US",
  type: "website" as const
};

export const navItems = [
  { href: "/work", labelEn: "Work", labelZh: "项目" },
  { href: "/notes", labelEn: "Notes", labelZh: "笔记" },
  { href: "/media", labelEn: "Media", labelZh: "媒体" },
  { href: "/about", labelEn: "About", labelZh: "关于" }
];

export const site = {
  name: "Alvin Li",
  title: "Alvin Li | Robotic Systems Hardware Portfolio",
  description:
    "Robotic systems hardware portfolio by Alvin Li, currently pursuing the Master of Science (Robotics and Intelligent Systems) at NTU Singapore and working across embedded control, PCB design, board bring-up, motor drives, and power electronics.",
  descriptionZh: "Alvin Li 的机器人系统硬件作品集：现于新加坡南洋理工大学攻读机器人与智能系统理学硕士，实践方向覆盖嵌入式控制、原理图与 PCB、板级 bring-up、电机驱动和电力电子。",
  url: "https://www.66ccff-labs.com",
  github: "https://github.com/Awes0meE",
  email: "ZHIYI012@e.ntu.edu.sg"
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

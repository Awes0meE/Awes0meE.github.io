import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { getMediaItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "媒体"
};

export default function MediaPage() {
  const media = getMediaItems();

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <h1 className="text-5xl font-semibold text-ink">
        <BilingualText en="Media" zh="媒体" />
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">
        <BilingualText
          en="Images, videos, board renders, lab notes, and experiment visuals connected to portfolio projects."
          zh="这里集中放和作品集项目相关的图片、视频、板卡渲染图、实验记录和可视化材料。"
        />
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-lg border border-line bg-white">
            <div className="relative aspect-[4/3] bg-chalk">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
              {item.type === "video" ? (
                <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-pine">
                  <PlayCircle size={24} />
                </span>
              ) : null}
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold text-ink">
                <BilingualText en={item.title} zh={item.titleZh ?? item.title} />
              </h2>
              <p className="mt-2 text-sm leading-6 text-graphite">
                <BilingualText en={item.caption} zh={item.captionZh ?? item.caption} />
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-graphite">
                <span>{item.date}</span>
                <div className="flex items-center gap-3">
                  <a href={item.src} className="font-semibold text-pine hover:text-copper">
                    <BilingualText en="Open media" zh="打开媒体" />
                  </a>
                  {item.projectSlug ? (
                    <Link href={`/work/${item.projectSlug}`} className="font-semibold text-pine hover:text-copper">
                      <BilingualText en="Related project" zh="相关项目" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

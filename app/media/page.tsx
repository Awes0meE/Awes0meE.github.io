import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { getMediaItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Media / 媒体"
};

export default function MediaPage() {
  const media = getMediaItems();

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <h1 className="text-5xl font-semibold text-ink">Media / 媒体</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">
        Images, videos, dashboards, lab notes, and experiment visuals. 现在先用元数据文件管理，后续可以接入上传后台或对象存储。
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
              <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-graphite">{item.caption}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-graphite">
                <span>{item.date}</span>
                <div className="flex items-center gap-3">
                  <a href={item.src} className="font-semibold text-pine hover:text-copper">
                    Open media
                  </a>
                  {item.projectSlug ? (
                    <Link href={`/work/${item.projectSlug}`} className="font-semibold text-pine hover:text-copper">
                      Related project
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

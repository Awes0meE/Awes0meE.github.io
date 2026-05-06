"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ExternalLink, FileArchive, FileCode2, FileText, FileType2, ImageIcon, Video } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { ContentRenderer } from "@/components/content-renderer";
import { cn } from "@/lib/utils";
import type { ProjectAsset } from "@/components/project-assets";

type IconType = typeof FileText;

function getAssetIcon(asset: ProjectAsset): IconType {
  if (asset.kind === "image") {
    return ImageIcon;
  }

  if (asset.kind === "video") {
    return Video;
  }

  if (asset.kind === "text") {
    return FileCode2;
  }

  if (asset.kind === "pdf") {
    return FileType2;
  }

  if (asset.kind === "document") {
    return FileText;
  }

  return FileArchive;
}

function renderAssetName(asset: ProjectAsset) {
  if (!asset.nameEn || asset.nameEn === asset.name) {
    return asset.name;
  }

  return (
    <>
      <span className="lang-en">{asset.nameEn}</span>
      <span className="lang-zh">{asset.name}</span>
    </>
  );
}

function isMostlyChineseText(content: string) {
  const withoutCode = content.replace(/```[\s\S]*?```/g, " ");
  const chineseCount = withoutCode.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const englishWordCount = withoutCode.match(/[A-Za-z]{3,}/g)?.length ?? 0;
  return chineseCount >= 24 && chineseCount >= englishWordCount / 2;
}

function getRelatedNoteHref(href: string) {
  if (href.includes("seamly2d-release-packaging-flow")) {
    return "/notes/turing-release-packaging-cross-platform";
  }

  if (href.includes("windows11-qt6-seamly2d-onboarding")) {
    return "/notes/turing-qt-seamly2d-first-run";
  }

  if (href.includes("CMake 入门") || href.includes("关于编译的底层逻辑") || href.includes("24f669c3f4008089bc2df266992845de")) {
    return "/notes/turing-cmake-build-logic";
  }

  if (href.includes("week-1-development-log") || href.includes("week-2-development-log") || href.includes("week-3-development-log")) {
    return "/notes/turing-three-week-development-log";
  }

  if (href.includes("readme.txt") || href.includes("sample-pattern-example") || href.includes("sample-measurements")) {
    return "/notes/turing-sm2d-xml-data-format";
  }

  return null;
}

function PreviewBody({ asset }: { asset: ProjectAsset }) {
  if (asset.kind === "image") {
    return (
      <a href={asset.href} className="block bg-chalk">
        <div className="relative min-h-[420px]">
          <Image
            src={asset.href}
            alt={asset.name}
            fill
            sizes="(min-width: 1024px) 760px, calc(100vw - 40px)"
            loading="eager"
            unoptimized
            className="object-contain p-4"
          />
        </div>
      </a>
    );
  }

  if (asset.kind === "video") {
    return (
      <div className="bg-ink">
        <video controls className="aspect-video w-full" preload="metadata">
          <source src={asset.href} />
        </video>
      </div>
    );
  }

  if (asset.kind === "pdf") {
    return (
      <div className="h-[680px] bg-chalk">
        <iframe
          src={`${asset.href}#page=1&view=FitH`}
          title={asset.name}
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    );
  }

  if (asset.kind === "document" && asset.content) {
    const isChineseSourceDocument = isMostlyChineseText(asset.content);
    const relatedNoteHref = getRelatedNoteHref(asset.href);

    return (
      <>
        {isChineseSourceDocument ? (
          <div className="lang-en border-b border-line bg-paper px-5 py-4 text-sm leading-6 text-graphite">
            This uploaded file is an original Chinese source document. The translated article view is available in the related notes; the original remains inline in Simplified Chinese mode.
            {relatedNoteHref ? (
              <>
                {" "}
                <a href={relatedNoteHref} className="font-semibold text-pine hover:text-copper">
                  Open translated note
                </a>
                .
              </>
            ) : null}
          </div>
        ) : null}
        <div className={cn("max-h-[680px] overflow-auto bg-white px-5 pb-6 pt-2", isChineseSourceDocument && "lang-zh")}>
          <ContentRenderer source={asset.content} />
        </div>
      </>
    );
  }

  if (asset.kind === "text" && asset.content) {
    return (
      <figure className="overflow-hidden bg-[#10231e]">
        <figcaption className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-normal text-[#b9d2ca]">
          {asset.language}
        </figcaption>
        <pre className="max-h-[680px] overflow-auto p-4 text-xs leading-5 text-[#e8f3ef]">
          <code>{asset.content}</code>
        </pre>
      </figure>
    );
  }

  return (
    <div className="grid min-h-[360px] place-items-center bg-paper px-6 py-10 text-center">
      <div className="max-w-md">
        <FileArchive className="mx-auto text-pine" size={38} />
        <h3 className="mt-4 text-lg font-semibold text-ink">
          <BilingualText en="Preview not available" zh="暂不支持预览" />
        </h3>
        <p className="mt-2 text-sm leading-6 text-graphite">
          <BilingualText
            en="This file type is kept as a downloadable project artifact. Use the open button above to view it directly."
            zh="这个文件类型会作为项目附件保留。可以使用右上角按钮直接打开原文件。"
          />
        </p>
      </div>
    </div>
  );
}

export function ProjectAssetBrowser({ assets }: { assets: ProjectAsset[] }) {
  const [selectedHref, setSelectedHref] = useState(assets[0]?.href ?? "");
  const selectedAsset = useMemo(
    () => assets.find((asset) => asset.href === selectedHref) ?? assets[0],
    [assets, selectedHref]
  );

  if (!selectedAsset) {
    return null;
  }

  const SelectedIcon = getAssetIcon(selectedAsset);

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-line bg-white">
      <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="border-b border-line bg-paper lg:border-b-0 lg:border-r">
          <div className="border-b border-line px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-normal text-copper">
              <BilingualText en="Project Index" zh="项目索引" />
            </p>
            <p className="mt-1 text-xs text-graphite">
              <BilingualText en="Select a file to preview" zh="选择文件查看预览" />
            </p>
          </div>
          <div className="max-h-[340px] overflow-auto p-2 lg:max-h-[720px]">
            {assets.map((asset) => {
              const Icon = getAssetIcon(asset);
              const isSelected = asset.href === selectedAsset.href;

              return (
                <button
                  type="button"
                  key={asset.href}
                  aria-current={isSelected ? "true" : undefined}
                  onClick={() => setSelectedHref(asset.href)}
                  className={cn(
                    "mb-1 grid w-full grid-cols-[28px_minmax(0,1fr)] gap-2 rounded-md border px-2.5 py-2 text-left transition",
                    isSelected
                      ? "border-pine bg-white text-ink shadow-sm"
                      : "border-transparent text-graphite hover:border-line hover:bg-white"
                  )}
                >
                  <span className={cn("mt-0.5 text-pine", isSelected && "text-copper")}>
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{renderAssetName(asset)}</span>
                    <span className="mt-1 block truncate text-xs">
                      {asset.language} / {asset.sizeLabel}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <article className="min-w-0">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-line text-pine">
                <SelectedIcon size={18} />
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-ink">{renderAssetName(selectedAsset)}</h3>
                <p className="mt-1 text-xs text-graphite">
                  {selectedAsset.language} / {selectedAsset.sizeLabel}
                </p>
              </div>
            </div>
            <a
              href={selectedAsset.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-pine px-3 py-2 text-sm font-semibold text-pine transition hover:bg-pine hover:text-white"
            >
              <BilingualText en="Open file" zh="打开文件" />
              <ExternalLink size={15} />
            </a>
          </header>
          <PreviewBody asset={selectedAsset} />
        </article>
      </div>
    </div>
  );
}

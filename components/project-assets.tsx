import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import Image from "next/image";
import { Download, ExternalLink, FileArchive, FileCode2, FileText, ImageIcon, Video } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { ContentRenderer } from "@/components/content-renderer";

type ProjectAsset = {
  href: string;
  name: string;
  extension: string;
  sizeLabel: string;
  kind: "document" | "image" | "video" | "text" | "download";
  language: string;
  content?: string;
};

const publicRoot = path.join(process.cwd(), "public");
const textPreviewLimit = 256 * 1024;

const juanyunTechAllowlist = new Set([
  "/uploads/projects/juanyun-tech/acunit-v20-system-block.png",
  "/uploads/projects/juanyun-tech/acunit-v21-main-back.png",
  "/uploads/projects/juanyun-tech/acunit-v21-main-front.png",
  "/uploads/projects/juanyun-tech/acunit-v21-power-back.png",
  "/uploads/projects/juanyun-tech/acunit-v21-power-front.png",
  "/uploads/projects/juanyun-tech/acunit-v21-pressure-transmitter-params.jpg",
  "/uploads/projects/juanyun-tech/acunit-v21-pwm-fan-params.jpg",
  "/uploads/projects/juanyun-tech/acunit-v21-system-block.png",
  "/uploads/projects/juanyun-tech/acunit-v21-ui-back.png",
  "/uploads/projects/juanyun-tech/acunit-v21-ui-front.png",
  "/uploads/projects/juanyun-tech/diy-cooling-3d-print-preview-1.jpg",
  "/uploads/projects/juanyun-tech/diy-cooling-3d-print-preview-2.jpg",
  "/uploads/projects/juanyun-tech/diy-cooling-desktop-demo.mp4",
  "/uploads/projects/juanyun-tech/hardware-sop-cover.jpeg"
]);

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const videoExtensions = new Set([".mov", ".mp4", ".webm"]);
const textExtensions = new Set([
  ".c",
  ".cpp",
  ".cs",
  ".csproj",
  ".csv",
  ".h",
  ".hpp",
  ".html",
  ".ini",
  ".ino",
  ".ioc",
  ".json",
  ".md",
  ".sh",
  ".sm2d",
  ".smis",
  ".ts",
  ".tsx",
  ".txt",
  ".xml"
]);
const documentExtensions = new Set([".md", ".txt"]);

export function ProjectAssets({ paths }: { paths?: string[] }) {
  const assets = getProjectAssets(paths);

  if (!assets.length) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-line pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-ink">
            <BilingualText en="Public Project Files" zh="公开项目资料" />
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-graphite">
            <BilingualText
              en="Uploaded evidence served from the public asset folder. Text and source files are rendered inline; binary design, document, fabrication, and archive files open directly."
              zh="这里列出已经上传到公开目录的项目证据。文本和源码会直接内嵌展示；设计文件、文档、制造包和压缩包可直接打开。"
            />
          </p>
        </div>
        <span className="rounded border border-line bg-paper px-3 py-1 text-xs font-semibold text-graphite">
          {assets.length} files
        </span>
      </div>
      <div className="mt-6 grid gap-4">
        {assets.map((asset) => (
          <AssetCard key={asset.href} asset={asset} />
        ))}
      </div>
    </section>
  );
}

function AssetCard({ asset }: { asset: ProjectAsset }) {
  if (asset.kind === "image") {
    return (
      <article className="overflow-hidden rounded-lg border border-line bg-white">
        <AssetHeader asset={asset} icon={<ImageIcon size={18} />} />
        <a href={asset.href} className="block border-t border-line bg-chalk">
          <div className="relative aspect-[16/9]">
            <Image
              src={asset.href}
              alt={asset.name}
              fill
              sizes="(min-width: 1024px) 896px, calc(100vw - 40px)"
              loading="eager"
              unoptimized
              className="object-contain p-2"
            />
          </div>
        </a>
      </article>
    );
  }

  if (asset.kind === "video") {
    return (
      <article className="overflow-hidden rounded-lg border border-line bg-white">
        <AssetHeader asset={asset} icon={<Video size={18} />} />
        <div className="border-t border-line bg-ink">
          <video controls className="aspect-video w-full" preload="metadata">
            <source src={asset.href} />
          </video>
        </div>
      </article>
    );
  }

  if (asset.kind === "document" && asset.content) {
    const isChineseSourceDocument = isMostlyChineseText(asset.content);
    const relatedNoteHref = getRelatedNoteHref(asset.href);

    return (
      <article className="overflow-hidden rounded-lg border border-line bg-white">
        <AssetHeader asset={asset} icon={<FileText size={18} />} />
        {isChineseSourceDocument ? (
          <div className="lang-en border-t border-line bg-paper px-5 py-4 text-sm leading-6 text-graphite">
            This uploaded file is an original Chinese source document. The translated article view is available above in the related notes; the original remains inline in Simplified Chinese mode.
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
        <div className={`${isChineseSourceDocument ? "lang-zh " : ""}max-h-[640px] overflow-auto border-t border-line bg-white px-5 pb-6 pt-2`}>
          <ContentRenderer source={asset.content} />
        </div>
      </article>
    );
  }

  if (asset.kind === "text" && asset.content) {
    return (
      <article className="overflow-hidden rounded-lg border border-line bg-white">
        <AssetHeader asset={asset} icon={<FileCode2 size={18} />} />
        <pre className="max-h-[560px] overflow-auto border-t border-line bg-[#10231e] p-4 text-xs leading-5 text-[#e8f3ef]">
          <code>{asset.content}</code>
        </pre>
      </article>
    );
  }

  return (
    <article className="rounded-lg border border-line bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-line text-pine">
            {asset.kind === "text" ? <FileText size={18} /> : <FileArchive size={18} />}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-ink">{renderAssetName(asset.name)}</h3>
            <p className="mt-1 text-xs text-graphite">
              {asset.language} / {asset.sizeLabel}
            </p>
          </div>
        </div>
        <a
          href={asset.href}
          className="inline-flex items-center gap-2 rounded-md border border-pine px-3 py-2 text-sm font-semibold text-pine hover:bg-pine hover:text-white"
        >
          <BilingualText en="Open file" zh="打开文件" />
          <ExternalLink size={15} />
        </a>
      </div>
    </article>
  );
}

function AssetHeader({ asset, icon }: { asset: ProjectAsset; icon: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line text-pine">{icon}</span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-ink">{renderAssetName(asset.name)}</h3>
          <p className="mt-1 text-xs text-graphite">
            {asset.sizeLabel} / <a href={asset.href} className="font-semibold text-pine hover:text-copper">public URL</a>
          </p>
        </div>
      </div>
      <span className="inline-flex items-center gap-2 rounded border border-line bg-paper px-2 py-1 text-xs font-semibold text-graphite">
        <Download size={13} />
        {asset.language}
      </span>
    </div>
  );
}

function getProjectAssets(paths?: string[]) {
  const files = new Map<string, ProjectAsset>();

  for (const href of paths ?? []) {
    for (const filePath of resolvePublicFiles(href)) {
      const asset = buildAsset(filePath);

      if (asset) {
        files.set(asset.href, asset);
      }
    }
  }

  return [...files.values()].sort((a, b) => a.href.localeCompare(b.href));
}

function renderAssetName(name: string) {
  const englishName = getEnglishAssetName(name);

  if (englishName === name) {
    return name;
  }

  return (
    <>
      <span className="lang-en">{englishName}</span>
      <span className="lang-zh">{name}</span>
    </>
  );
}

function getEnglishAssetName(name: string) {
  if (!/[\u3400-\u9fff]/.test(name)) {
    return name;
  }

  const translated = name
    .replace("CMake 入门学习记录", "CMake primer learning record")
    .replace("关于编译的底层逻辑（Qt 学习导向）", "Qt-oriented build logic note");

  if (!/[\u3400-\u9fff]/.test(translated)) {
    return translated;
  }

  const extension = path.extname(name).replace(".", "").toUpperCase();
  return extension ? `${extension} evidence file` : "Public evidence file";
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

function resolvePublicFiles(href: string) {
  const normalized = normalizePublicHref(href);

  if (!normalized || isBlockedJuanyunTechPath(normalized)) {
    return [];
  }

  const filePath = hrefToPublicPath(normalized);

  if (!filePath || !fs.existsSync(filePath)) {
    return [];
  }

  const stat = fs.statSync(filePath);

  if (stat.isDirectory()) {
    return walkDirectory(filePath).filter((assetPath) => {
      const publicHref = publicPathToHref(assetPath);
      return publicHref ? !isBlockedJuanyunTechPath(publicHref) : false;
    });
  }

  return stat.isFile() ? [filePath] : [];
}

function buildAsset(filePath: string): ProjectAsset | null {
  const href = publicPathToHref(filePath);

  if (!href) {
    return null;
  }

  const extension = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const name = path.basename(filePath);
  const language = getLanguageLabel(extension);

  if (imageExtensions.has(extension)) {
    return { href, name, extension, sizeLabel: formatBytes(stat.size), kind: "image", language };
  }

  if (videoExtensions.has(extension)) {
    return { href, name, extension, sizeLabel: formatBytes(stat.size), kind: "video", language };
  }

  if (textExtensions.has(extension)) {
    const isPreviewable = stat.size <= textPreviewLimit && extension !== ".html";
    const content = isPreviewable ? fs.readFileSync(filePath, "utf8") : undefined;
    const kind = content && documentExtensions.has(extension) ? "document" : content ? "text" : "download";
    return {
      href,
      name,
      extension,
      sizeLabel: formatBytes(stat.size),
      kind,
      language,
      content
    };
  }

  return { href, name, extension, sizeLabel: formatBytes(stat.size), kind: "download", language };
}

function walkDirectory(directory: string) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkDirectory(entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function normalizePublicHref(href: string) {
  const cleaned = href.replaceAll("\\", "/");

  if (!cleaned.startsWith("/uploads/") || cleaned.includes("..")) {
    return null;
  }

  let decoded: string;

  try {
    decoded = decodeURI(cleaned);
  } catch {
    return null;
  }

  if (!decoded.startsWith("/uploads/") || decoded.includes("..") || decoded.includes("\0")) {
    return null;
  }

  return decoded.replace(/\/+$/, "");
}

function hrefToPublicPath(href: string) {
  const filePath = path.join(publicRoot, href);
  const normalizedRoot = publicRoot.endsWith(path.sep) ? publicRoot : `${publicRoot}${path.sep}`;

  if (!filePath.startsWith(normalizedRoot)) {
    return null;
  }

  return filePath;
}

function publicPathToHref(filePath: string) {
  const relative = path.relative(publicRoot, filePath);

  if (relative.startsWith("..")) {
    return null;
  }

  return `/${relative.replaceAll(path.sep, "/")}`;
}

function isBlockedJuanyunTechPath(href: string) {
  return href.startsWith("/uploads/projects/juanyun-tech/") && !juanyunTechAllowlist.has(href);
}

function getLanguageLabel(extension: string) {
  const labels: Record<string, string> = {
    ".3mf": "3MF",
    ".c": "C",
    ".cpp": "C++",
    ".cs": "C#",
    ".csproj": "C# project",
    ".csv": "CSV",
    ".dwg": "DWG",
    ".docx": "Word",
    ".epro": "EasyEDA",
    ".epro2": "EasyEDA",
    ".h": "C header",
    ".html": "HTML",
    ".ini": "INI",
    ".ino": "Arduino",
    ".ioc": "STM32CubeMX IOC",
    ".jpg": "JPEG",
    ".jpeg": "JPEG",
    ".md": "Markdown",
    ".mp4": "MP4",
    ".pdf": "PDF",
    ".png": "PNG",
    ".sh": "Shell",
    ".sm2d": "SM2D",
    ".smis": "SMIS",
    ".step": "STEP",
    ".svg": "SVG",
    ".txt": "Text",
    ".xlsx": "Excel",
    ".xml": "XML",
    ".zip": "ZIP"
  };

  return labels[extension] ?? (extension ? extension.slice(1).toUpperCase() : "File");
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

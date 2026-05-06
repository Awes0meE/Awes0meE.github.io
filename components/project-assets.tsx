import fs from "node:fs";
import path from "node:path";
import { TextDecoder } from "node:util";
import { BilingualText } from "@/components/bilingual-text";
import { ProjectAssetBrowser } from "@/components/project-asset-browser";

export type ProjectAsset = {
  href: string;
  name: string;
  nameEn?: string;
  extension: string;
  sizeLabel: string;
  kind: "document" | "image" | "video" | "text" | "pdf" | "download";
  language: string;
  content?: string;
};

const publicRoot = path.join(process.cwd(), "public");
const textPreviewLimit = 256 * 1024;
const maxPreviewContentBytes = 768 * 1024;
const maxResolvedAssetFiles = 240;
const maxDirectoryDepth = 6;
const utf8Decoder = new TextDecoder("utf-8", { fatal: true });
const skippedDirectoryNames = new Set([".git", ".next", "__macosx", "node_modules"]);

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

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
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
              en="Uploaded evidence served from the public asset folder. Use the file index to preview documents, source code, media, PDFs, and downloadable artifacts without leaving the page."
              zh="这里列出已经上传到公开目录的项目证据。可以在左侧索引里选择文件，在右侧直接预览文档、源码、媒体、PDF 和可下载附件。"
            />
          </p>
        </div>
        <span className="rounded border border-line bg-paper px-3 py-1 text-xs font-semibold text-graphite">
          <BilingualText en={`${assets.length} files`} zh={`${assets.length} 个文件`} />
        </span>
      </div>
      <ProjectAssetBrowser assets={assets} />
    </section>
  );
}

function getProjectAssets(paths?: string[]) {
  const files = new Map<string, ProjectAsset>();
  let remainingPreviewBytes = maxPreviewContentBytes;

  for (const href of paths ?? []) {
    for (const filePath of resolvePublicFiles(href)) {
      const asset = buildAsset(filePath, remainingPreviewBytes);

      if (asset) {
        const isNewAsset = !files.has(asset.href);

        if (isNewAsset && asset.content) {
          remainingPreviewBytes = Math.max(0, remainingPreviewBytes - Buffer.byteLength(asset.content, "utf8"));
        }

        files.set(asset.href, asset);
      }
    }
  }

  return [...files.values()].sort((a, b) => a.href.localeCompare(b.href));
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

function buildAsset(filePath: string, remainingPreviewBytes: number): ProjectAsset | null {
  const href = publicPathToHref(filePath);

  if (!href) {
    return null;
  }

  const extension = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const name = path.basename(filePath);
  const language = getLanguageLabel(extension);

  if (imageExtensions.has(extension)) {
    return { href, name, nameEn: getEnglishAssetName(name), extension, sizeLabel: formatBytes(stat.size), kind: "image", language };
  }

  if (videoExtensions.has(extension)) {
    return { href, name, nameEn: getEnglishAssetName(name), extension, sizeLabel: formatBytes(stat.size), kind: "video", language };
  }

  if (extension === ".pdf") {
    return { href, name, nameEn: getEnglishAssetName(name), extension, sizeLabel: formatBytes(stat.size), kind: "pdf", language };
  }

  if (textExtensions.has(extension)) {
    const isPreviewable = stat.size <= textPreviewLimit && stat.size <= remainingPreviewBytes && extension !== ".html";
    const content = isPreviewable ? readUtf8File(filePath) : undefined;
    const kind = content && documentExtensions.has(extension) ? "document" : content ? "text" : "download";
    return {
      href,
      name,
      nameEn: getEnglishAssetName(name),
      extension,
      sizeLabel: formatBytes(stat.size),
      kind,
      language,
      content
    };
  }

  return { href, name, nameEn: getEnglishAssetName(name), extension, sizeLabel: formatBytes(stat.size), kind: "download", language };
}

function walkDirectory(directory: string, depth = 0, files: string[] = []) {
  if (depth > maxDirectoryDepth || files.length >= maxResolvedAssetFiles) {
    return files;
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (files.length >= maxResolvedAssetFiles) {
      break;
    }

    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (skippedDirectoryNames.has(entry.name.toLowerCase())) {
        continue;
      }

      walkDirectory(entryPath, depth + 1, files);
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function readUtf8File(filePath: string) {
  return utf8Decoder.decode(fs.readFileSync(filePath));
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
  const resolvedPublicRoot = path.resolve(publicRoot);
  const filePath = path.resolve(publicRoot, `.${href}`);
  const normalizedRoot = `${resolvedPublicRoot}${path.sep}`;

  if (!filePath.toLowerCase().startsWith(normalizedRoot.toLowerCase())) {
    return null;
  }

  return filePath;
}

function publicPathToHref(filePath: string) {
  const relative = path.relative(publicRoot, filePath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
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

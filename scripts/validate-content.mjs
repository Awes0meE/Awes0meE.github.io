import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const publicRoot = path.join(root, "public");
const errors = [];

function readMdxCollection(folder) {
  const directory = path.join(contentRoot, folder);

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(directory, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);

      return {
        filePath,
        slug: file.replace(/\.mdx$/, ""),
        data: parsed.data,
        body: parsed.content
      };
    });
}

function isString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every(isString);
}

function addError(filePath, message) {
  errors.push(`${path.relative(root, filePath)}: ${message}`);
}

function normalizePublicHref(href) {
  if (!isString(href)) {
    return null;
  }

  const cleaned = href.replaceAll("\\", "/");

  if (!cleaned.startsWith("/uploads/") || cleaned.includes("..")) {
    return null;
  }

  try {
    const decoded = decodeURI(cleaned);

    if (!decoded.startsWith("/uploads/") || decoded.includes("..") || decoded.includes("\0")) {
      return null;
    }

    return decoded.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function publicHrefExists(href) {
  const normalized = normalizePublicHref(href);

  if (!normalized) {
    return false;
  }

  const filePath = path.join(publicRoot, normalized);
  const normalizedRoot = publicRoot.endsWith(path.sep) ? publicRoot : `${publicRoot}${path.sep}`;

  return filePath.startsWith(normalizedRoot) && fs.existsSync(filePath);
}

function validatePublicHref(filePath, fieldName, href) {
  if (!isString(href)) {
    addError(filePath, `${fieldName} must be a non-empty string`);
    return;
  }

  if (href.startsWith("/uploads/") && !publicHrefExists(href)) {
    addError(filePath, `${fieldName} points to a missing public file: ${href}`);
  }
}

function validateRequiredStrings(item, requiredFields) {
  for (const field of requiredFields) {
    if (!isString(item.data[field])) {
      addError(item.filePath, `${field} must be a non-empty string`);
    }
  }
}

function validateBodyUploadRefs(item) {
  const uploadRefs = [...item.body.matchAll(/!\[[^\]]*]\((\/uploads\/[^)]+)\)/g)].map((match) => match[1]);

  for (const href of uploadRefs) {
    if (!publicHrefExists(href)) {
      addError(item.filePath, `body references a missing public file: ${href}`);
    }
  }
}

const projects = readMdxCollection("projects");
const notes = readMdxCollection("notes");
const projectSlugs = new Set(projects.map((project) => project.slug));

for (const project of projects) {
  validateRequiredStrings(project, ["title", "titleZh", "summary", "summaryZh", "date", "status", "cover"]);

  if (!isStringArray(project.data.tags)) {
    addError(project.filePath, "tags must be an array of strings");
  }

  if (typeof project.data.featured !== "boolean") {
    addError(project.filePath, "featured must be a boolean");
  }

  validatePublicHref(project.filePath, "cover", project.data.cover);

  if (project.data.assetPaths !== undefined) {
    if (!isStringArray(project.data.assetPaths)) {
      addError(project.filePath, "assetPaths must be an array of public upload paths");
    } else {
      for (const href of project.data.assetPaths) {
        if (!publicHrefExists(href)) {
          addError(project.filePath, `assetPaths entry is missing: ${href}`);
        }
      }
    }
  }

  validateBodyUploadRefs(project);
}

for (const note of notes) {
  validateRequiredStrings(note, ["title", "titleZh", "summary", "summaryZh", "date"]);

  if (!isStringArray(note.data.tags)) {
    addError(note.filePath, "tags must be an array of strings");
  }

  if (note.data.visibility !== "public" && note.data.visibility !== "private") {
    addError(note.filePath, "visibility must be public or private");
  }

  if (note.data.projectSlug && !projectSlugs.has(note.data.projectSlug)) {
    addError(note.filePath, `projectSlug does not match a project: ${note.data.projectSlug}`);
  }

  validateBodyUploadRefs(note);
}

const mediaPath = path.join(contentRoot, "media.json");
const media = JSON.parse(fs.readFileSync(mediaPath, "utf8"));
const mediaIds = new Set();

if (!Array.isArray(media)) {
  addError(mediaPath, "media.json must contain an array");
} else {
  for (const item of media) {
    const itemLabel = isString(item.id) ? item.id : "unknown media item";

    for (const field of ["id", "title", "type", "src", "thumbnail", "date", "caption"]) {
      if (!isString(item[field])) {
        errors.push(`content/media.json:${itemLabel}: ${field} must be a non-empty string`);
      }
    }

    if (mediaIds.has(item.id)) {
      errors.push(`content/media.json:${itemLabel}: duplicate id`);
    }

    mediaIds.add(item.id);

    if (item.type !== "image" && item.type !== "video") {
      errors.push(`content/media.json:${itemLabel}: type must be image or video`);
    }

    if (item.projectSlug && !projectSlugs.has(item.projectSlug)) {
      errors.push(`content/media.json:${itemLabel}: projectSlug does not match a project: ${item.projectSlug}`);
    }

    for (const field of ["src", "thumbnail"]) {
      if (isString(item[field]) && item[field].startsWith("/uploads/") && !publicHrefExists(item[field])) {
        errors.push(`content/media.json:${itemLabel}: ${field} points to a missing public file: ${item[field]}`);
      }
    }
  }
}

if (errors.length) {
  console.error("Content validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Content validation passed: ${projects.length} projects, ${notes.length} notes, ${Array.isArray(media) ? media.length : 0} media items.`);

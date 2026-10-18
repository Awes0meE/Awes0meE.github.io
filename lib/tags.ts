import tagLabels from "@/content/tag-labels.json";

const labels: Record<string, string> = tagLabels;

/**
 * The Chinese label for a content tag. Word tags are translated in `content/tag-labels.json`
 * (product and tool names map to themselves); acronyms and part numbers such as `STM32` or
 * `PCB` have no entry and read the same in both languages.
 */
export function tagZh(tag: string) {
  return labels[tag] ?? tag;
}

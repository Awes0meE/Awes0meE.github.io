/*
 * Chinese titles wrap only between words. ICU's word segmenter knows common
 * words (有源, 寄生, 参数) but returns unknown technical terms in pieces
 * (混|频|器|板, 散热|器), so a lone character is joined to its neighbour,
 * except particles (的, 与, …) that read as their own word. The result is
 * computed on the server and passed down as plain strings, so server and
 * client never segment differently.
 */

const segmenter = new Intl.Segmenter("zh-Hans", { granularity: "word" });
const particles = new Set(["的", "与", "和", "及", "或", "在", "为", "是", "了", "对", "从", "到", "把", "被"]);
const singleHan = /^\p{Script=Han}$/u;

export function zhWords(text: string): string[] {
  const words: string[] = [];

  for (const { segment } of segmenter.segment(text)) {
    const previous = words[words.length - 1];
    const lastChar = previous?.slice(-1) ?? "";
    const isContent = (value: string) => singleHan.test(value) && !particles.has(value);
    const single = segment.length === 1 && isContent(segment);
    // A lone character joins its neighbour: 散热 + 器, 驱动 + 板, and 自 + 谐振.
    const joins = /^\p{Script=Han}/u.test(segment) && isContent(lastChar) && (single || (previous.length === 1));

    if (joins) {
      words[words.length - 1] += segment;
    } else {
      words.push(segment);
    }
  }

  // Particles never start or end a line on their own: 的 and 了 stay with the
  // word before them, the rest (与, 和, 在, …) with the word after them.
  const result: string[] = [];
  let carry = "";

  for (const word of words) {
    if ((word === "的" || word === "了") && result.length && !carry) {
      result[result.length - 1] += word;
    } else if (particles.has(word)) {
      carry += word;
    } else if (carry && /^\s+$/.test(word)) {
      // 与 V2.1: a no-break space keeps the particle on the next word's line.
      carry += "\u00a0";
    } else {
      result.push(carry + word);
      carry = "";
    }
  }

  if (carry) result.push(carry);
  return result;
}

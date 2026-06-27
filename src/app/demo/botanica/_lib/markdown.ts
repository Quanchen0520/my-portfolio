// 極簡 Markdown / Frontmatter 解析器
// ──────────────────────────────────────────────────────────
// 為了讓這個 Demo 零依賴、可直接執行，這裡手寫了一個小型解析器。
// 正式專案中，建議改用成熟套件：
//   - frontmatter：gray-matter
//   - Markdown → HTML：remark / rehype 或 markdown-it
// 介面刻意保持相同，未來抽換不影響上層元件。

export type Frontmatter = Record<string, string>;

// 解析 `---` 包起來的 YAML 風格 frontmatter（僅支援 key: value 單行）
export function parseFrontmatter(raw: string): {
  data: Frontmatter;
  content: string;
} {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, content: raw.trim() };

  const data: Frontmatter = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    // 去除前後引號
    value = value.replace(/^["']|["']$/g, '');
    if (key) data[key] = value;
  }
  return { data, content: match[2].trim() };
}

// 將內文轉為安全的 HTML 字串（支援標題、粗體、清單、引言、段落）
export function renderMarkdown(md: string): string {
  const esc = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const inline = (s: string) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');

  const blocks = md.split(/\n{2,}/);
  const html: string[] = [];

  for (const block of blocks) {
    const lines = block.split('\n');

    if (/^###\s/.test(block)) {
      html.push(`<h3>${inline(block.replace(/^###\s/, ''))}</h3>`);
    } else if (/^##\s/.test(block)) {
      html.push(`<h2>${inline(block.replace(/^##\s/, ''))}</h2>`);
    } else if (/^>\s/.test(block)) {
      html.push(
        `<blockquote>${inline(block.replace(/^>\s?/gm, ''))}</blockquote>`,
      );
    } else if (lines.every((l) => /^[-*]\s/.test(l))) {
      const items = lines
        .map((l) => `<li>${inline(l.replace(/^[-*]\s/, ''))}</li>`)
        .join('');
      html.push(`<ul>${items}</ul>`);
    } else {
      html.push(`<p>${inline(block)}</p>`);
    }
  }

  return html.join('\n');
}

// 粗略估算閱讀時間（以中文字 + 英文詞計）
export function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const cjk = (content.match(/[一-鿿]/g) || []).length;
  return Math.max(1, Math.round((words + cjk) / 300));
}

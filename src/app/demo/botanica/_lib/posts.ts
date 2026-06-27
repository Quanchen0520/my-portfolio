// 部落格內容來源（簡易 CMS）
// ──────────────────────────────────────────────────────────
// 文章以 Markdown 檔存放於 _content/posts/<lang>/<slug>.md。
// 非工程師只要新增 / 編輯這些 .md 檔（含 frontmatter），即可更新網站內容，
// 不需要碰任何程式碼 —— 這就是「簡易 CMS」要呈現的概念。

import fs from 'node:fs';
import path from 'node:path';
import type { Lang } from '../_i18n';
import { parseFrontmatter, readingMinutes } from './markdown';

const POSTS_DIR = path.join(
  process.cwd(),
  'src/app/demo/botanica/_content/posts',
);

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  cover: string;
  minutes: number;
};

export type Post = PostMeta & { content: string };

function dirFor(lang: Lang) {
  return path.join(POSTS_DIR, lang);
}

export function getSlugs(lang: Lang): string[] {
  const dir = dirFor(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getPost(lang: Lang, slug: string): Post | null {
  const file = path.join(dirFor(lang), `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    tag: data.tag ?? '',
    cover: data.cover ?? `https://picsum.photos/seed/${slug}/1200/800`,
    minutes: readingMinutes(content),
    content,
  };
}

// 取得某語系所有文章（依日期新到舊排序）
export function getAllPosts(lang: Lang): PostMeta[] {
  return getSlugs(lang)
    .map((slug) => {
      const post = getPost(lang, slug)!;
      // 內頁才需要 content，列表只回傳 meta
      const { content: _content, ...meta } = post;
      void _content;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const PAGE_SIZE = 3;

// 分頁工具
export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * size;
  return {
    items: items.slice(start, start + size),
    current,
    totalPages,
  };
}

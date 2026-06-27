// 品牌色票（Brand Palette）
// ──────────────────────────────────────────────────────────
// 將原本散落各處的色碼集中為一份品牌色票，作為設計依據。
// 主色：陶土 clay；中性：墨 ink → 紙 paper 的暖灰階。

export const brand = {
  ink: '#1c1a17', // 主文字 / 深色底
  charcoal: '#332f29', // 深色 hover
  taupe: '#6b645c', // 次要文字
  faint: '#9a9087', // 標註 / 弱化文字
  paper: '#f7f5f2', // 主背景
  sand: '#efece5', // 次背景
  stone: '#e7e2d9', // 圖底 / 分隔線
  line: '#cdc6ba', // 邊框
  clay: '#b5835a', // 主強調色
  clayDeep: '#a06f48', // 強調 hover
  clayLight: '#cba37b', // 漸層亮端
} as const;

// 對應到 CSS 變數，於 layout 注入後可用 var(--ss-*) 取用
export const cssVars: React.CSSProperties = {
  '--ss-ink': brand.ink,
  '--ss-clay': brand.clay,
  '--ss-clay-light': brand.clayLight,
  '--ss-paper': brand.paper,
  '--ss-sand': brand.sand,
} as React.CSSProperties;

// 簡單漸層（以 Tailwind 任意值字串集中管理，方便整站套用）
export const gradients = {
  // 主背景的微妙漸層
  paperFade: 'bg-gradient-to-b from-[#f7f5f2] to-[#efece5]',
  // 強調文字漸層（搭配 bg-clip-text text-transparent）
  clayText: 'bg-gradient-to-r from-[#a06f48] to-[#cba37b]',
  // 深色 CTA 漸層
  inkSheen: 'bg-gradient-to-br from-[#1c1a17] via-[#26231e] to-[#2e2a23]',
  // Hero 後方的暖光暈
  heroGlow:
    'bg-[radial-gradient(60%_60%_at_85%_15%,rgba(181,131,90,0.12),transparent)]',
} as const;

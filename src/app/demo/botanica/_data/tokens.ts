// 設計 Token（Design Tokens）+ 深色模式
// ──────────────────────────────────────────────────────────
// 以 CSS 變數集中管理品牌色彩，並提供 light / dark 兩套色票。
// ThemeProvider 會依使用者選擇，把對應的變數注入到品牌站根層，
// 所有元件以 `text-[var(--bo-ink)]` 取用，即可一鍵切換深淺色。

export type Vars = Record<string, string>;

export const lightVars: Vars = {
  '--bo-bg': '#f6f4ee', // 主背景（暖白）
  '--bo-surface': '#fffdf9', // 卡片表面
  '--bo-muted': '#ece8df', // 次要區塊
  '--bo-ink': '#222a1e', // 主文字（深墨綠）
  '--bo-sub': '#5f6657', // 次要文字
  '--bo-faint': '#9aa092', // 淡色／標註
  '--bo-leaf': '#4f6043', // 主色（葉綠）
  '--bo-sage': '#8a9a7b', // 輔色（鼠尾草）
  '--bo-clay': '#b5835a', // 強調色（陶土）
  '--bo-line': '#e3ded2', // 線條
  '--bo-glass': 'rgba(255,253,249,0.55)', // 玻璃擬態表面
  '--bo-glass-line': 'rgba(255,255,255,0.6)', // 玻璃邊框
};

export const darkVars: Vars = {
  '--bo-bg': '#10130d',
  '--bo-surface': '#181c13',
  '--bo-muted': '#1f241a',
  '--bo-ink': '#edf0e6',
  '--bo-sub': '#aab09f',
  '--bo-faint': '#79806c',
  '--bo-leaf': '#9cba84', // 深色底上提亮，確保對比
  '--bo-sage': '#aabd97',
  '--bo-clay': '#d4a172',
  '--bo-line': '#2a3122',
  '--bo-glass': 'rgba(24,28,19,0.5)',
  '--bo-glass-line': 'rgba(156,186,132,0.18)',
};

// 向後相容：預設（淺色）色票
export const colors = lightVars;
export const tokenStyle = lightVars as React.CSSProperties;

export type ThemeName = 'light' | 'dark';
export const themeVars: Record<ThemeName, Vars> = {
  light: lightVars,
  dark: darkVars,
};

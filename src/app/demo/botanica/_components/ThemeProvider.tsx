'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react';
import { themeVars, type ThemeName } from '../_data/tokens';

type ThemeCtx = { theme: ThemeName; toggle: () => void };
const Ctx = createContext<ThemeCtx>({ theme: 'light', toggle: () => {} });

export const useTheme = () => useContext(Ctx);

const STORAGE_KEY = 'bo-theme';
const EVENT = 'bo-theme-change';

// 以 useSyncExternalStore 讀取「外部」主題狀態（localStorage / 系統偏好），
// 這是 React 推薦的 client-only 讀取方式，可避免在 effect 內同步 setState。
function subscribe(cb: () => void) {
  window.addEventListener('storage', cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener('storage', cb);
    window.removeEventListener(EVENT, cb);
  };
}

function getSnapshot(): ThemeName {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// SSR / 首次 hydration 一律 light，確保伺服器與客戶端一致
const getServerSnapshot = (): ThemeName => 'light';

export default function ThemeProvider({
  children,
  fontClass,
}: {
  children: React.ReactNode;
  fontClass: string;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // 品牌站掛載期間啟用平滑錨點滾動，卸載時還原（不污染全域 CSS）
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'smooth';
    return () => {
      html.style.scrollBehavior = prev;
    };
  }, []);

  const toggle = useCallback(() => {
    const next: ThemeName =
      getSnapshot() === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return (
    <Ctx.Provider value={{ theme, toggle }}>
      <div
        data-theme={theme}
        style={themeVars[theme] as React.CSSProperties}
        className={`${fontClass} relative min-h-screen bg-[var(--bo-bg)] font-[family-name:var(--font-sans-tc)] text-[var(--bo-ink)] antialiased transition-colors duration-500`}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

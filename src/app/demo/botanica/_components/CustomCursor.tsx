'use client';

import { useEffect, useRef } from 'react';

// 自訂游標：一個小圓點 + 一個延遲跟隨的外環，滑過連結時放大。
// 僅在精準指標（滑鼠）裝置啟用追蹤；觸控裝置不掛載監聽、也不隱藏原生游標。
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia?.('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const interactive = (e.target as HTMLElement)?.closest(
        'a, button, input, textarea, select, [role="button"]',
      );
      ring.dataset.hot = interactive ? '1' : '';
    };

    const loop = () => {
      // 外環以 lerp 平滑跟隨，產生延遲感
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    // 啟用後才隱藏原生游標，避免 JS 載入前出現「無游標」空窗
    document.documentElement.classList.add('bo-cursor');
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove('bo-cursor');
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden lg:block">
      <style>{`.bo-cursor, .bo-cursor * { cursor: none !important; }`}</style>
      <div
        ref={dotRef}
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[var(--bo-leaf)]"
      />
      <div
        ref={ringRef}
        data-hot=""
        className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-[var(--bo-leaf)] opacity-100 transition-[width,height,margin,opacity] duration-200 ease-out data-[hot=1]:-ml-2 data-[hot=1]:-mt-2 data-[hot=1]:h-12 data-[hot=1]:w-12 data-[hot=1]:opacity-60"
      />
    </div>
  );
}

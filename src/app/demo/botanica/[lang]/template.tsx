'use client';

// 頁面轉場：template 會在每次路由切換時重新掛載，
// 因此這層的進場動畫會在每次換頁時重播，形成平滑轉場。
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="[animation:boPageIn_0.5s_ease-out]">{children}</div>;
}

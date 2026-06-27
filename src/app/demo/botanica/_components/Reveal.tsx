'use client';

import { useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'left' | 'right';

const hidden: Record<Direction, string> = {
  up: 'translate-y-8 opacity-0',
  left: '-translate-x-8 opacity-0',
  right: 'translate-x-8 opacity-0',
};

// 進場動畫：捲動進入視窗時，依方向淡入 / 滑入（IntersectionObserver，零依賴）
export default function Reveal({
  children,
  delay = 0,
  from = 'up',
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  from?: Direction;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? 'translate-x-0 translate-y-0 opacity-100' : hidden[from]
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

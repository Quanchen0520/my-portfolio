'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BASE, nav, site } from '../_data/site';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === BASE ? pathname === BASE : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7e2d9] bg-[#f7f5f2]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <Link
          href={BASE}
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-2"
        >
          <span className="font-[family-name:var(--font-serif-tc)] text-xl font-bold tracking-wide text-[#1c1a17]">
            {site.name}
          </span>
          <span className="font-[family-name:var(--font-playfair)] text-xs uppercase tracking-[0.2em] text-[#b5835a]">
            {site.enName}
          </span>
        </Link>

        {/* 桌機導覽 */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm transition-colors hover:text-[#1c1a17] ${
                isActive(item.href) ? 'text-[#1c1a17]' : 'text-[#6b645c]'
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[#b5835a]" />
              )}
            </Link>
          ))}
        </nav>

        {/* 手機選單按鈕 */}
        <button
          type="button"
          aria-label="開啟選單"
          onClick={() => setOpen((v) => !v)}
          className="text-[#1c1a17] md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* 手機展開選單 */}
      {open && (
        <nav className="border-t border-[#e7e2d9] bg-[#f7f5f2] px-5 py-3 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-[#ece7de] py-3 text-sm last:border-0 ${
                isActive(item.href) ? 'text-[#b5835a]' : 'text-[#4a443c]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

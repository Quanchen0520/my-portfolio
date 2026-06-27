'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Lang, Dict } from '../_i18n';
import LangSwitcher from './LangSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Header({
  lang,
  nav,
}: {
  lang: Lang;
  nav: Dict['nav'];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const base = `/demo/botanica/${lang}`;

  const items = [
    { href: base, label: nav.home },
    { href: `${base}/story`, label: nav.story },
    { href: `${base}/products`, label: nav.products },
    { href: `${base}/blog`, label: nav.blog },
    { href: `${base}/contact`, label: nav.contact },
  ];

  const isActive = (href: string) =>
    href === base ? pathname === base : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--bo-glass-line)] bg-[var(--bo-glass)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <Link
          href={base}
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-2"
        >
          <span className="font-[family-name:var(--font-serif-tc)] text-xl font-bold tracking-wide text-[var(--bo-ink)]">
            植感生活
          </span>
          <span className="font-[family-name:var(--font-playfair)] text-xs uppercase tracking-[0.2em] text-[var(--bo-leaf)]">
            Botanica
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-7 md:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm transition-colors hover:text-[var(--bo-ink)] ${
                  isActive(item.href)
                    ? 'text-[var(--bo-ink)]'
                    : 'text-[var(--bo-sub)]'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[var(--bo-leaf)]" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <LangSwitcher lang={lang} />
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <ThemeToggle />
          </div>

          <button
            type="button"
            aria-label="menu"
            onClick={() => setOpen((v) => !v)}
            className="text-[var(--bo-ink)] md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--bo-line)] bg-[var(--bo-bg)] px-5 py-3 md:hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-[var(--bo-line)] py-3 text-sm last:border-0 ${
                isActive(item.href)
                  ? 'text-[var(--bo-leaf)]'
                  : 'text-[var(--bo-sub)]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="py-3">
            <LangSwitcher lang={lang} />
          </div>
        </nav>
      )}
    </header>
  );
}

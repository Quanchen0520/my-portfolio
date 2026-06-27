'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, langLabel, type Lang } from '../_i18n';

// 多語系切換：保留目前路徑，只替換網址中的語系區段
export default function LangSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname();

  // /demo/botanica/zh/blog → 將 zh 換成目標語系
  const swap = (target: Lang) =>
    pathname.replace(/\/demo\/botanica\/(zh|en)/, `/demo/botanica/${target}`);

  return (
    <div className="flex items-center gap-1 text-xs">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-1 text-[var(--bo-faint)]">/</span>}
          <Link
            href={swap(l)}
            aria-current={l === lang ? 'true' : undefined}
            className={`rounded px-1.5 py-0.5 transition-colors ${
              l === lang
                ? 'font-bold text-[var(--bo-leaf)]'
                : 'text-[var(--bo-faint)] hover:text-[var(--bo-ink)]'
            }`}
          >
            {langLabel[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}

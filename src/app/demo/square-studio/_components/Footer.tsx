import Link from 'next/link';
import { BASE, nav, site } from '../_data/site';

export default function Footer() {
  return (
    <footer className="border-t border-[#e7e2d9] bg-[#efece5]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-serif-tc)] text-lg font-bold text-[#1c1a17]">
              {site.name}
            </span>
            <span className="font-[family-name:var(--font-playfair)] text-xs uppercase tracking-[0.2em] text-[#b5835a]">
              {site.enName}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6b645c]">
            {site.tagline}。提供住宅、商業空間設計與軟裝陳設服務，歡迎與我們聊聊你的空間。
          </p>
        </div>

        <div>
          <h4 className="font-[family-name:var(--font-playfair)] text-xs uppercase tracking-[0.18em] text-[#9a9087]">
            Sitemap
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[#4a443c] transition-colors hover:text-[#b5835a]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-[family-name:var(--font-playfair)] text-xs uppercase tracking-[0.18em] text-[#9a9087]">
            Contact
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-[#4a443c]">
            <li>{site.address}</li>
            <li>
              <a href={`tel:${site.phone}`} className="hover:text-[#b5835a]">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-[#b5835a]">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#e2ddd3]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-[#9a9087] sm:flex-row lg:px-8">
          <p>© 2026 {site.name} {site.enName}. 本頁為多頁企業官網展示範例。</p>
          <Link href={BASE} className="hover:text-[#b5835a]">
            回到首頁 ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}

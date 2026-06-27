import Link from 'next/link';
import type { Lang, Dict } from '../_i18n';

export default function Footer({ lang, dict }: { lang: Lang; dict: Dict }) {
  const base = `/demo/botanica/${lang}`;
  const links = [
    { href: base, label: dict.nav.home },
    { href: `${base}/story`, label: dict.nav.story },
    { href: `${base}/products`, label: dict.nav.products },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-[var(--bo-line)] bg-[var(--bo-muted)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2">
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-serif-tc)] text-lg font-bold text-[var(--bo-ink)]">
              植感生活
            </span>
            <span className="font-[family-name:var(--font-playfair)] text-xs uppercase tracking-[0.2em] text-[var(--bo-leaf)]">
              Botanica
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--bo-sub)]">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <h4 className="font-[family-name:var(--font-playfair)] text-xs uppercase tracking-[0.18em] text-[var(--bo-faint)]">
            {dict.footer.sitemap}
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[var(--bo-sub)] transition-colors hover:text-[var(--bo-leaf)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-[family-name:var(--font-playfair)] text-xs uppercase tracking-[0.18em] text-[var(--bo-faint)]">
            {dict.footer.newsletter}
          </h4>
          <p className="mt-4 text-sm text-[var(--bo-sub)]">
            {dict.footer.newsletterNote}
          </p>
          {/* 示意用，不串接後端 */}
          <div className="mt-3 flex overflow-hidden rounded-full border border-[var(--bo-line)] bg-[var(--bo-surface)]">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent px-4 py-2 text-sm text-[var(--bo-ink)] outline-none placeholder:text-[var(--bo-faint)]"
            />
            <button
              type="button"
              className="shrink-0 bg-[var(--bo-leaf)] px-4 text-xs font-medium text-white"
            >
              {dict.footer.subscribe}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--bo-line)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-[var(--bo-faint)] sm:flex-row lg:px-8">
          <p>© 2026 植感生活 Botanica — {dict.footer.rights}</p>
          <Link href={base} className="hover:text-[var(--bo-leaf)]">
            ↑ Top
          </Link>
        </div>
      </div>
    </footer>
  );
}

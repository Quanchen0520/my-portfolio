import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Lang, Dict } from '../_i18n';
import Reveal from './Reveal';

// 跨頁共用的行動呼籲
export default function CTA({ lang, dict }: { lang: Lang; dict: Dict }) {
  return (
    <section className="bg-[var(--bo-ink)] py-20 text-center text-[var(--bo-bg)]">
      <div className="mx-auto max-w-2xl px-5">
        <Reveal>
          <p className="font-[family-name:var(--font-playfair)] text-sm uppercase tracking-[0.25em] text-[var(--bo-sage)]">
            {dict.contact.eyebrow}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-serif-tc)] text-3xl font-bold sm:text-4xl">
            {dict.contact.title}
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--bo-sage)]">
            {dict.contact.lead}
          </p>
          <Link
            href={`/demo/botanica/${lang}/contact`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--bo-bg)] px-7 py-3.5 font-medium text-[var(--bo-ink)] transition-colors hover:bg-[var(--bo-sage)] hover:text-white"
          >
            {dict.common.talk}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

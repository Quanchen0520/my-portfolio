import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BASE } from '../_data/site';
import { gradients } from '../_data/tokens';
import Reveal from './Reveal';

// 跨頁共用的行動呼籲區塊（深色漸層背景）
export default function CTA() {
  return (
    <section
      className={`${gradients.inkSheen} py-20 text-center text-[#f7f5f2]`}
    >
      <div className="mx-auto max-w-2xl px-5">
        <Reveal>
          <p
            className={`inline-block bg-clip-text font-[family-name:var(--font-playfair)] text-sm uppercase tracking-[0.25em] text-transparent ${gradients.clayText}`}
          >
            Let&apos;s talk
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-serif-tc)] text-3xl font-bold sm:text-4xl lg:text-5xl">
            有一個空間，正在等一個想法
          </h2>
          <p className="mt-4 leading-relaxed text-[#bcb4a9]">
            無論是構思中的住家、籌備中的店面，或只是想聊聊可能性，歡迎與我們聯繫。
          </p>
          <Link
            href={`${BASE}/contact`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#f7f5f2] px-7 py-3.5 font-medium text-[#1c1a17] transition-colors hover:bg-[#cba37b] hover:text-white"
          >
            預約洽談
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

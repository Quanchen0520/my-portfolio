import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { services, process } from '../_data/site';
import Reveal from '../_components/Reveal';
import SectionHeading from '../_components/SectionHeading';
import CTA from '../_components/CTA';

export const metadata: Metadata = {
  title: '服務項目',
  description:
    '方寸設計提供住宅空間設計、商業空間設計、軟裝陳設與設計顧問四大服務。從格局規劃到軟裝佈置，量身打造你的理想空間。',
  alternates: { canonical: '/demo/square-studio/services' },
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:pt-24 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="量身打造的設計服務"
          desc="無論是全新規劃或局部改造，我們依你的需求與預算，提供最合適的服務組合。"
        />
      </section>

      {/* 服務清單 */}
      <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.no} delay={(i % 2) * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-[#e7e2d9] bg-white p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#cdc6ba]">
                    {s.no}
                  </span>
                  <span className="font-[family-name:var(--font-playfair)] text-xs uppercase tracking-[0.2em] text-[#b5835a]">
                    {s.en}
                  </span>
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-serif-tc)] text-2xl font-bold text-[#1c1a17]">
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[#6b645c]">{s.desc}</p>
                <ul className="mt-6 grid grid-cols-2 gap-2.5 border-t border-[#ece7de] pt-6">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-2 text-sm text-[#4a443c]"
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#b5835a]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 流程 */}
      <section className="bg-[#efece5] py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading eyebrow="How it works" title="服務流程" center />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[#e7e2d9] bg-[#f7f5f2] p-6">
                  <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#b5835a]">
                    {p.step}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-serif-tc)] text-base font-bold text-[#1c1a17]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b645c]">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

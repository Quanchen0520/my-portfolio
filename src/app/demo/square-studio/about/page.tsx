import type { Metadata } from 'next';
import Image from 'next/image';
import { site, process } from '../_data/site';
import Reveal from '../_components/Reveal';
import SectionHeading from '../_components/SectionHeading';
import CTA from '../_components/CTA';

export const metadata: Metadata = {
  title: '關於我們',
  description:
    '方寸設計 Square Studio 由一群相信「空間能改變生活」的設計師組成。我們的理念、團隊與設計流程，都從理解人開始。',
  alternates: { canonical: '/demo/square-studio/about' },
};

const values = [
  {
    title: '從人出發',
    desc: '空間是為生活服務的。我們花最多時間在傾聽，理解每位屋主真正的需求與習慣。',
  },
  {
    title: '材質誠實',
    desc: '相信好的材質會隨時間更有味道。我們偏好真實、耐看、能與時間共處的選擇。',
  },
  {
    title: '比例為先',
    desc: '在裝飾之前，先把比例與光線做對。對的尺度，是空間舒適感的根本。',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About us"
              title="我們相信，空間能改變生活"
              desc={site.description}
            />
          </div>
          <Reveal delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e7e2d9]">
              <Image
                src="https://picsum.photos/seed/sq-about-team/900/700"
                alt="方寸設計團隊工作情形"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 理念 */}
      <section className="bg-[#efece5] py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading eyebrow="Our values" title="三個不變的信念" center />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-[#e7e2d9] bg-[#f7f5f2] p-8">
                  <span className="font-[family-name:var(--font-playfair)] text-2xl text-[#b5835a]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-serif-tc)] text-xl font-bold text-[#1c1a17]">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b645c]">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 設計流程 */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Process"
          title="與我們合作的五個階段"
          desc="清楚透明的流程，讓你在每一步都安心。"
        />
        <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-[#e7e2d9]">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 60}>
              <div className="flex items-start gap-5 border-b border-[#ece7de] bg-white px-6 py-6 last:border-0 sm:items-center sm:gap-8 sm:px-8">
                <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#cdc6ba]">
                  {p.step}
                </span>
                <div className="sm:flex sm:flex-1 sm:items-center sm:gap-8">
                  <h3 className="font-[family-name:var(--font-serif-tc)] text-lg font-bold text-[#1c1a17] sm:w-40 sm:shrink-0">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6b645c] sm:mt-0">
                    {p.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}

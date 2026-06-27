import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { BASE, site, services } from './_data/site';
import { projects } from './_data/projects';
import { gradients } from './_data/tokens';
import Reveal from './_components/Reveal';
import SectionHeading from './_components/SectionHeading';
import ProjectCard from './_components/ProjectCard';
import CTA from './_components/CTA';

// 圖文交錯區塊的內容
const intro = [
  {
    eyebrow: 'Material & light',
    title: '材質與光線的對話',
    desc: '我們相信，空間的質感來自細節。每一種石材的紋理、每一道光的落點，都經過反覆推敲，只為呈現恰如其分的平衡。',
    points: ['天然材質選配', '採光與動線規劃', '比例與尺度拿捏'],
    img: 'https://picsum.photos/seed/sq-philo-1/900/680',
    alt: '材質與光線',
  },
  {
    eyebrow: 'From plan to life',
    title: '從一張平面圖開始',
    desc: '設計不只是好看，更要好住。我們從你的生活習慣出發，把每天的動線、收納與使用情境，仔細收進設計裡。',
    points: ['深度需求訪談', '3D 模擬提案', '監造到交屋'],
    img: 'https://picsum.photos/seed/sq-philo-2/900/680',
    alt: '從平面圖到生活',
  },
];

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* ── Hero（不對稱 7 / 5 版面 + 暖光漸層） ── */}
      <section className="relative overflow-hidden">
        <div
          className={`pointer-events-none absolute inset-0 ${gradients.heroGlow}`}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <Reveal from="left">
              <p
                className={`inline-block bg-clip-text font-[family-name:var(--font-playfair)] text-sm uppercase tracking-[0.25em] text-transparent ${gradients.clayText}`}
              >
                Interior Design Studio
              </p>
            </Reveal>
            <Reveal from="left" delay={80}>
              <h1 className="mt-5 font-[family-name:var(--font-serif-tc)] text-4xl font-bold leading-[1.12] text-[#1c1a17] sm:text-5xl lg:text-6xl xl:text-7xl">
                在方寸之間，
                <br />
                安放生活的尺度
              </h1>
            </Reveal>
            <Reveal from="left" delay={160}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#6b645c] sm:text-lg">
                我們以材質、光線與比例為語言，為住宅與商業空間，量身打造恰如其分的生活提案。
              </p>
            </Reveal>
            <Reveal from="left" delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href={`${BASE}/projects`}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#1c1a17] px-7 py-3.5 font-medium text-[#f7f5f2] transition-all hover:bg-[#332f29] hover:shadow-lg hover:shadow-[#1c1a17]/15"
                >
                  探索作品
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={`${BASE}/contact`}
                  className="rounded-full border border-[#cdc6ba] px-7 py-3.5 font-medium text-[#4a443c] transition-colors hover:border-[#b5835a] hover:text-[#b5835a]"
                >
                  預約洽談
                </Link>
              </div>
            </Reveal>
          </div>

          {/* 不對稱圖組 */}
          <div className="lg:col-span-5">
            <Reveal from="right" delay={120}>
              <div className="grid grid-cols-5 grid-rows-6 gap-3 sm:h-[30rem]">
                <div className="group relative col-span-3 row-span-6 overflow-hidden rounded-2xl bg-[#e7e2d9]">
                  <Image
                    src="https://picsum.photos/seed/sq-hero-a/700/1000"
                    alt="室內設計案例主視覺"
                    fill
                    sizes="(max-width: 1024px) 60vw, 30vw"
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="group relative col-span-2 row-span-3 overflow-hidden rounded-2xl bg-[#e7e2d9]">
                  <Image
                    src="https://picsum.photos/seed/sq-hero-b/500/500"
                    alt="空間細節"
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="group relative col-span-2 row-span-3 overflow-hidden rounded-2xl bg-[#e7e2d9]">
                  <Image
                    src="https://picsum.photos/seed/sq-hero-c/500/500"
                    alt="材質特寫"
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 數據 ── */}
      <section className="border-y border-[#e7e2d9] bg-[#efece5]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-12 sm:grid-cols-4 lg:px-8">
          {[
            { n: '12+', l: '年設計經驗' },
            { n: '160', l: '完成案場' },
            { n: '4.9', l: '客戶滿意評分' },
            { n: '8', l: '專業設計團隊' },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 80} className="text-center">
              <p className="font-[family-name:var(--font-serif-tc)] text-3xl font-bold text-[#1c1a17] sm:text-4xl">
                {s.n}
              </p>
              <p className="mt-1 text-sm text-[#6b645c]">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 圖文交錯（不對稱、左右滑入） ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="space-y-20 lg:space-y-28">
          {intro.map((row, idx) => {
            const imageFirst = idx % 2 === 0;
            const ImageBlock = (
              <Reveal
                from={imageFirst ? 'left' : 'right'}
                className={`lg:col-span-7 ${imageFirst ? '' : 'lg:order-2'}`}
              >
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e7e2d9]">
                  <Image
                    src={row.img}
                    alt={row.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </Reveal>
            );
            const TextBlock = (
              <Reveal
                from={imageFirst ? 'right' : 'left'}
                className={`lg:col-span-5 ${imageFirst ? '' : 'lg:order-1'}`}
              >
                <p
                  className={`inline-block bg-clip-text font-[family-name:var(--font-playfair)] text-sm uppercase tracking-[0.25em] text-transparent ${gradients.clayText}`}
                >
                  {row.eyebrow}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-serif-tc)] text-2xl font-bold leading-tight text-[#1c1a17] sm:text-3xl">
                  {row.title}
                </h3>
                <p className="mt-4 leading-relaxed text-[#6b645c]">{row.desc}</p>
                <ul className="mt-6 space-y-2.5">
                  {row.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2.5 text-sm text-[#4a443c]"
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#b5835a]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );

            return (
              <div
                key={row.title}
                className="grid items-center gap-10 lg:grid-cols-12"
              >
                {ImageBlock}
                {TextBlock}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 服務簡介 ── */}
      <section className={`${gradients.paperFade} py-20`}>
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="我們提供的服務"
            desc="從一張平面圖到一個完整的生活場景，我們陪你走完每一步。"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.no} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-[#e7e2d9] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#cdbba4] hover:shadow-lg hover:shadow-[#b5835a]/10">
                  <span className="font-[family-name:var(--font-playfair)] text-sm text-[#b5835a]">
                    {s.no}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-serif-tc)] text-lg font-bold text-[#1c1a17]">
                    {s.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6b645c]">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href={`${BASE}/services`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#b5835a] hover:text-[#1c1a17]"
            >
              查看完整服務內容
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 精選作品 ── */}
      <section className="bg-[#efece5] py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Selected works" title="精選作品" />
            <Link
              href={`${BASE}/projects`}
              className="group hidden whitespace-nowrap text-sm font-medium text-[#b5835a] hover:text-[#1c1a17] sm:inline-flex sm:items-center sm:gap-2"
            >
              全部案例
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProjectCard project={p} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />

      {/* 隱藏的品牌標語，給螢幕閱讀器與 SEO */}
      <p className="sr-only">{site.tagline}</p>
    </>
  );
}

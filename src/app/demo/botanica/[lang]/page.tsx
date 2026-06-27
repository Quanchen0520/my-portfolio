import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDict, type Lang } from '../_i18n';
import { products } from '../_data/products';
import { getAllPosts } from '../_lib/posts';
import Reveal from '../_components/Reveal';
import SectionHeading from '../_components/SectionHeading';
import ProductCard from '../_components/ProductCard';
import PostCard from '../_components/PostCard';
import CTA from '../_components/CTA';
import Aurora from '../_components/Aurora';
import Parallax from '../_components/Parallax';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const d = getDict(lang);
  const base = `/demo/botanica/${lang}`;
  const featuredProducts = products.slice(0, 3);
  const latestPosts = getAllPosts(lang).slice(0, 3);

  return (
    <>
      {/* ── Hero（雜誌式不對稱破格 + 動態背景 + 視差重疊圖層） ── */}
      <section className="relative overflow-hidden">
        <Aurora />
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-14 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            {/* 文字欄：大膽留白與超大標題 */}
            <div className="lg:col-span-7 lg:pb-10">
              <Reveal from="up">
                <p className="font-[family-name:var(--font-playfair)] text-sm uppercase tracking-[0.3em] text-[var(--bo-leaf)]">
                  {d.home.heroEyebrow}
                </p>
              </Reveal>
              <Reveal from="up" delay={80}>
                <h1 className="mt-6 font-[family-name:var(--font-serif-tc)] text-5xl font-bold leading-[1.04] tracking-tight text-[var(--bo-ink)] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  {d.home.heroTitle[0]}
                  <span className="mt-1 block font-[family-name:var(--font-playfair)] font-medium italic text-[var(--bo-leaf)]">
                    {d.home.heroTitle[1]}
                  </span>
                </h1>
              </Reveal>
              <Reveal from="up" delay={160}>
                <p className="mt-7 max-w-md text-base leading-relaxed text-[var(--bo-sub)] sm:text-lg">
                  {d.home.heroLead}
                </p>
              </Reveal>
              <Reveal from="up" delay={240}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href={`${base}/products`}
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--bo-ink)] px-7 py-3.5 font-medium text-[var(--bo-bg)] shadow-lg shadow-[var(--bo-ink)]/15 transition-all hover:bg-[var(--bo-leaf)] hover:shadow-xl hover:shadow-[var(--bo-leaf)]/25"
                  >
                    {d.common.explore}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  {/* 玻璃擬態次要按鈕 */}
                  <Link
                    href={`${base}/story`}
                    className="rounded-full border border-[var(--bo-glass-line)] bg-[var(--bo-glass)] px-7 py-3.5 font-medium text-[var(--bo-ink)] backdrop-blur-md transition-colors hover:text-[var(--bo-leaf)]"
                  >
                    {d.nav.story}
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* 圖像欄：主圖滿版 + 視差小圖重疊 + 玻璃資訊卡 */}
            <div className="relative lg:col-span-5">
              <Reveal from="right" delay={120}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[var(--bo-muted)] shadow-[0_40px_80px_-24px_rgba(34,42,30,0.45)] ring-1 ring-[var(--bo-line)]">
                  <Image
                    src="https://picsum.photos/seed/bo-hero/900/1100"
                    alt="植感生活主視覺"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
              </Reveal>

              {/* 視差重疊小圖（僅桌機） */}
              <Parallax
                speed={0.12}
                className="absolute -left-10 bottom-8 hidden w-40 lg:block"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--bo-muted)] shadow-2xl ring-4 ring-[var(--bo-bg)]">
                  <Image
                    src="https://picsum.photos/seed/bo-hero-2/400/400"
                    alt="植物細節"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              </Parallax>

              {/* 玻璃資訊卡，浮在主圖右上 */}
              <div className="absolute -right-3 top-6 hidden rounded-2xl border border-[var(--bo-glass-line)] bg-[var(--bo-glass)] px-4 py-3 shadow-xl backdrop-blur-md sm:block">
                <p className="font-[family-name:var(--font-serif-tc)] text-2xl font-bold text-[var(--bo-ink)]">
                  {d.home.stats[2].n}
                </p>
                <p className="text-xs text-[var(--bo-sub)]">{d.home.stats[2].l}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 數據 ── */}
      <section className="border-y border-[var(--bo-line)] bg-[var(--bo-muted)]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-12 sm:grid-cols-4 lg:px-8">
          {d.home.stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 80} className="text-center">
              <p className="font-[family-name:var(--font-serif-tc)] text-3xl font-bold text-[var(--bo-ink)] sm:text-4xl">
                {s.n}
              </p>
              <p className="mt-1 text-sm text-[var(--bo-sub)]">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 品牌故事預告 ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--bo-muted)]">
              <Image
                src="https://picsum.photos/seed/bo-story/900/700"
                alt="品牌故事"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow={d.home.storyEyebrow}
              title={d.home.storyTitle}
              desc={d.home.storyLead}
            />
            <Reveal delay={120}>
              <Link
                href={`${base}/story`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--bo-leaf)] hover:text-[var(--bo-ink)]"
              >
                {d.common.readMore}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 當季精選 ── */}
      <section className="bg-[var(--bo-muted)] py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow={d.home.productEyebrow}
              title={d.home.productTitle}
            />
            <Link
              href={`${base}/products`}
              className="hidden whitespace-nowrap text-sm font-medium text-[var(--bo-leaf)] hover:text-[var(--bo-ink)] sm:inline-flex sm:items-center sm:gap-2"
            >
              {d.common.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProductCard product={p} lang={lang} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 植感日誌 ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow={d.home.journalEyebrow}
            title={d.home.journalTitle}
            desc={d.home.journalLead}
          />
          <Link
            href={`${base}/blog`}
            className="hidden whitespace-nowrap text-sm font-medium text-[var(--bo-leaf)] hover:text-[var(--bo-ink)] sm:inline-flex sm:items-center sm:gap-2"
          >
            {d.common.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <PostCard
                post={post}
                lang={lang}
                minReadLabel={d.common.minRead}
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <CTA lang={lang} dict={d} />
    </>
  );
}

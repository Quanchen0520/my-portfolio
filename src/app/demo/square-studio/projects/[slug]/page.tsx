import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BASE } from '../../_data/site';
import { getProject, projects, projectSlugs } from '../../_data/projects';
import Reveal from '../../_components/Reveal';
import JsonLd from '../../_components/JsonLd';
import CTA from '../../_components/CTA';

// 預先靜態產生所有作品內頁（SSG）
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

// 每頁獨立 metadata（動態產生）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: '找不到作品' };

  return {
    title: `${project.title}｜${project.category}`,
    description: project.summary,
    alternates: { canonical: `${BASE}/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
      images: [{ url: project.cover, width: 1200, height: 900, alt: project.title }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // 下一個作品（循環）
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  // 結構化資料：CreativeWork
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    image: project.cover,
    dateCreated: project.year,
    locationCreated: project.location,
    creator: { '@type': 'Organization', name: '方寸設計 Square Studio' },
  };

  const meta = [
    { label: '類型', value: project.category },
    { label: '坪數', value: project.area },
    { label: '地點', value: project.location },
    { label: '完工', value: project.year },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <article>
        {/* 標題區 */}
        <header className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:pt-16 lg:px-8">
          <Link
            href={`${BASE}/projects`}
            className="inline-flex items-center gap-2 text-sm text-[#6b645c] transition-colors hover:text-[#b5835a]"
          >
            <ArrowLeft className="h-4 w-4" />
            返回作品列表
          </Link>
          <Reveal>
            <p className="mt-8 font-[family-name:var(--font-playfair)] text-sm uppercase tracking-[0.2em] text-[#b5835a]">
              {project.category}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-serif-tc)] text-4xl font-bold leading-tight text-[#1c1a17] sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6b645c]">
              {project.summary}
            </p>
          </Reveal>
        </header>

        {/* 主圖 */}
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#e7e2d9]">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* 資訊列 */}
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-[#e7e2d9] py-8 sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-xs uppercase tracking-wider text-[#9a9087]">
                  {m.label}
                </dt>
                <dd className="mt-1.5 font-[family-name:var(--font-serif-tc)] text-lg font-bold text-[#1c1a17]">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 內文 */}
        <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
          <Reveal>
            <h2 className="font-[family-name:var(--font-serif-tc)] text-2xl font-bold text-[#1c1a17]">
              專案概述
            </h2>
            <p className="mt-4 leading-loose text-[#4a443c]">{project.overview}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl bg-[#efece5] p-7">
                <h3 className="font-[family-name:var(--font-serif-tc)] text-lg font-bold text-[#1c1a17]">
                  設計挑戰
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6b645c]">
                  {project.challenge}
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl bg-[#1c1a17] p-7 text-[#f7f5f2]">
                <h3 className="font-[family-name:var(--font-serif-tc)] text-lg font-bold">
                  解決方式
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#bcb4a9]">
                  {project.solution}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-10">
              <h3 className="font-[family-name:var(--font-serif-tc)] text-lg font-bold text-[#1c1a17]">
                主要材質
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.materials.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-[#dcd6ca] bg-white px-4 py-1.5 text-sm text-[#4a443c]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 圖庫 */}
        <div className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {project.gallery.map((g, i) => (
              <Reveal key={g} delay={i * 100}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#e7e2d9]">
                  <Image
                    src={g}
                    alt={`${project.title} 空間照 ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 下一個作品 */}
        <div className="border-t border-[#e7e2d9]">
          <Link
            href={`${BASE}/projects/${next.slug}`}
            className="group mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-10 lg:px-8"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-[#9a9087]">
                下一個作品
              </p>
              <p className="mt-1 font-[family-name:var(--font-serif-tc)] text-2xl font-bold text-[#1c1a17] transition-colors group-hover:text-[#b5835a]">
                {next.title}
              </p>
            </div>
            <ArrowRight className="h-6 w-6 text-[#b5835a] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>

      <CTA />
    </>
  );
}

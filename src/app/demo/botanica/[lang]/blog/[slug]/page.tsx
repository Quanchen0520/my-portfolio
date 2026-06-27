import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getDict, isLang, locales, type Lang } from '../../../_i18n';
import { getPost, getSlugs, getAllPosts } from '../../../_lib/posts';
import { renderMarkdown } from '../../../_lib/markdown';
import Prose from '../../../_components/Prose';
import CTA from '../../../_components/CTA';

// 預先靜態產生所有語系 × 所有文章
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getSlugs(lang).map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const post = getPost(lang, slug);
  if (!post) return { title: '404' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/demo/botanica/${lang}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.cover, width: 1200, height: 800, alt: post.title }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getPost(lang, slug);
  if (!post) notFound();

  const d = getDict(lang);
  const base = `/demo/botanica/${lang}`;
  const html = renderMarkdown(post.content);

  // 找出下一篇
  const all = getAllPosts(lang);
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  // 結構化資料：Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    inLanguage: lang === 'zh' ? 'zh-TW' : 'en',
    author: { '@type': 'Organization', name: '植感生活 Botanica' },
    publisher: { '@type': 'Organization', name: '植感生活 Botanica' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="mx-auto max-w-3xl px-5 pb-10 pt-12 sm:pt-16 lg:px-8">
          <Link
            href={`${base}/blog`}
            className="inline-flex items-center gap-2 text-sm text-[var(--bo-sub)] transition-colors hover:text-[var(--bo-leaf)]"
          >
            <ArrowLeft className="h-4 w-4" />
            {d.common.backToList}
          </Link>

          <div className="mt-8 flex items-center gap-3 text-xs text-[var(--bo-faint)]">
            <span className="rounded-full bg-[var(--bo-muted)] px-2.5 py-0.5 text-[var(--bo-leaf)]">
              {post.tag}
            </span>
            <span>{post.date}</span>
            <span>
              · {post.minutes} {d.common.minRead}
            </span>
          </div>
          <h1 className="mt-3 font-[family-name:var(--font-serif-tc)] text-4xl font-bold leading-tight text-[var(--bo-ink)]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--bo-sub)]">
            {post.excerpt}
          </p>
        </header>

        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--bo-muted)]">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
          <Prose html={html} />
        </div>

        {/* 下一篇 */}
        <div className="border-t border-[var(--bo-line)]">
          <Link
            href={`${base}/blog/${next.slug}`}
            className="group mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-10 lg:px-8"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--bo-faint)]">
                {d.common.next}
              </p>
              <p className="mt-1 font-[family-name:var(--font-serif-tc)] text-xl font-bold text-[var(--bo-ink)] transition-colors group-hover:text-[var(--bo-leaf)]">
                {next.title}
              </p>
            </div>
            <ArrowRight className="h-6 w-6 text-[var(--bo-leaf)] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>

      <CTA lang={lang} dict={d} />
    </>
  );
}

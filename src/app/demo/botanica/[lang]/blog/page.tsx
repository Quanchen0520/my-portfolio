import type { Metadata } from 'next';
import { getDict, isLang, type Lang } from '../../_i18n';
import { getAllPosts, paginate } from '../../_lib/posts';
import Reveal from '../../_components/Reveal';
import SectionHeading from '../../_components/SectionHeading';
import PostCard from '../../_components/PostCard';
import Pagination from '../../_components/Pagination';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return {
    title: d.blog.title,
    description: d.blog.lead,
    alternates: { canonical: `/demo/botanica/${lang}/blog` },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  const { page } = await searchParams;
  const d = getDict(lang);

  const all = getAllPosts(lang);
  const { items, current, totalPages } = paginate(all, Number(page) || 1);
  const basePath = `/demo/botanica/${lang}/blog`;

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:pt-24 lg:px-8">
        <SectionHeading
          eyebrow={d.blog.eyebrow}
          title={d.blog.title}
          desc={d.blog.lead}
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 100}>
              <PostCard
                post={post}
                lang={lang}
                minReadLabel={d.common.minRead}
                priority={i < 3}
              />
            </Reveal>
          ))}
        </div>

        <Pagination
          basePath={basePath}
          current={current}
          totalPages={totalPages}
        />
      </section>
    </>
  );
}

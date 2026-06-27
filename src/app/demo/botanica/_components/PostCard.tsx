import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Lang } from '../_i18n';
import type { PostMeta } from '../_lib/posts';

export default function PostCard({
  post,
  lang,
  minReadLabel,
  priority = false,
}: {
  post: PostMeta;
  lang: Lang;
  minReadLabel: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/demo/botanica/${lang}/blog/${post.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--bo-muted)] shadow-sm ring-1 ring-[var(--bo-line)] transition-shadow duration-500 group-hover:shadow-[0_24px_50px_-18px_rgba(34,42,30,0.4)]">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-center gap-3 text-xs text-[var(--bo-faint)]">
        <span className="rounded-full bg-[var(--bo-muted)] px-2.5 py-0.5 text-[var(--bo-leaf)]">
          {post.tag}
        </span>
        <span>{post.date}</span>
        <span>· {post.minutes} {minReadLabel}</span>
      </div>
      <h3 className="mt-2 font-[family-name:var(--font-serif-tc)] text-xl font-bold leading-snug text-[var(--bo-ink)] transition-colors group-hover:text-[var(--bo-leaf)]">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--bo-sub)]">
        {post.excerpt}
      </p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm text-[var(--bo-leaf)]">
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

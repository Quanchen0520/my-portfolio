import Link from 'next/link';

// 文章列表分頁：以 ?page=N 控制
export default function Pagination({
  basePath,
  current,
  totalPages,
}: {
  basePath: string;
  current: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-14 flex items-center justify-center gap-2">
      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === current ? 'page' : undefined}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors ${
            p === current
              ? 'bg-[var(--bo-leaf)] font-bold text-white'
              : 'border border-[var(--bo-line)] text-[var(--bo-sub)] hover:border-[var(--bo-leaf)] hover:text-[var(--bo-leaf)]'
          }`}
        >
          {p}
        </Link>
      ))}
    </nav>
  );
}

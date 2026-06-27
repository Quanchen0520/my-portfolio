// 骨架屏元件：載入內容時的佔位，附流光效果（boShimmer keyframes）。
export function SkeletonBox({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[var(--bo-muted)] ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[var(--bo-glass-line)] to-transparent [animation:boShimmer_1.5s_infinite]" />
    </div>
  );
}

// 文章列表的卡片骨架
export function PostCardSkeleton() {
  return (
    <div className="flex flex-col">
      <SkeletonBox className="aspect-[16/10] w-full" />
      <SkeletonBox className="mt-4 h-3 w-24" />
      <SkeletonBox className="mt-3 h-5 w-5/6" />
      <SkeletonBox className="mt-2 h-3 w-full" />
      <SkeletonBox className="mt-1.5 h-3 w-2/3" />
    </div>
  );
}

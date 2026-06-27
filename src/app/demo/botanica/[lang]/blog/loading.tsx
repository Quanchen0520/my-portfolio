import { SkeletonBox, PostCardSkeleton } from '../../_components/Skeleton';

// 部落格列表載入時的骨架屏（此頁因使用 searchParams 分頁，為動態渲染）
export default function BlogLoading() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:pt-24 lg:px-8">
        <SkeletonBox className="h-4 w-28" />
        <SkeletonBox className="mt-4 h-9 w-64" />
        <SkeletonBox className="mt-4 h-4 w-80 max-w-full" />
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  );
}

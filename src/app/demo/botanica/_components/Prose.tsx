// 文章內文樣式（不依賴 typography plugin，以子選擇器套用樣式）
export default function Prose({ html }: { html: string }) {
  return (
    <div
      className="
        max-w-none text-[var(--bo-ink)]
        [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-[family-name:var(--font-serif-tc)] [&_h2]:text-2xl [&_h2]:font-bold
        [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-[family-name:var(--font-serif-tc)] [&_h3]:text-xl [&_h3]:font-bold
        [&_p]:my-4 [&_p]:leading-loose [&_p]:text-[var(--bo-sub)]
        [&_strong]:font-bold [&_strong]:text-[var(--bo-ink)]
        [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:pl-1
        [&_li]:relative [&_li]:pl-6 [&_li]:leading-relaxed [&_li]:text-[var(--bo-sub)]
        [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[var(--bo-leaf)] [&_li]:before:content-['—']
        [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--bo-leaf)] [&_blockquote]:pl-5
        [&_blockquote]:font-[family-name:var(--font-serif-tc)] [&_blockquote]:text-lg [&_blockquote]:italic [&_blockquote]:text-[var(--bo-ink)]
      "
      // 內容來自本地受信任的 Markdown，故可安全注入
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

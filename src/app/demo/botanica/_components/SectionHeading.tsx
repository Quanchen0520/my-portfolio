import Reveal from './Reveal';

// 跨頁共用區塊標題
export default function SectionHeading({
  eyebrow,
  title,
  desc,
  center = false,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? 'text-center' : ''}>
      <p className="font-[family-name:var(--font-playfair)] text-sm uppercase tracking-[0.25em] text-[var(--bo-leaf)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-serif-tc)] text-3xl font-bold leading-tight text-[var(--bo-ink)] sm:text-4xl">
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-4 leading-relaxed text-[var(--bo-sub)] ${
            center ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {desc}
        </p>
      )}
    </Reveal>
  );
}

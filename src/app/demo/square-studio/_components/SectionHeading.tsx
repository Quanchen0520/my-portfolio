import Reveal from './Reveal';
import { gradients } from '../_data/tokens';

// 跨頁共用的區塊標題：英文小標（漸層）+ 中文大標 + 選用說明
export default function SectionHeading({
  eyebrow,
  title,
  desc,
  center = false,
  from = 'up',
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  center?: boolean;
  from?: 'up' | 'left' | 'right';
}) {
  return (
    <Reveal from={from} className={center ? 'text-center' : ''}>
      <p
        className={`inline-block bg-clip-text font-[family-name:var(--font-playfair)] text-sm uppercase tracking-[0.25em] text-transparent ${gradients.clayText}`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-serif-tc)] text-3xl font-bold leading-[1.15] text-[#1c1a17] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-4 leading-relaxed text-[#6b645c] ${
            center ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {desc}
        </p>
      )}
    </Reveal>
  );
}

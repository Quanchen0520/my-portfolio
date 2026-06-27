import type { Metadata } from 'next';
import Image from 'next/image';
import { getDict, isLang, type Lang } from '../../_i18n';
import Reveal from '../../_components/Reveal';
import SectionHeading from '../../_components/SectionHeading';
import CTA from '../../_components/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return {
    title: d.nav.story,
    description: d.story.lead,
    alternates: { canonical: `/demo/botanica/${lang}/story` },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const d = getDict(lang);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow={d.story.eyebrow}
            title={d.story.title}
            desc={d.story.lead}
          />
          <Reveal delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--bo-muted)]">
              <Image
                src="https://picsum.photos/seed/bo-story-hero/900/700"
                alt={d.story.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 故事段落 */}
      <section className="mx-auto max-w-3xl px-5 pb-20 lg:px-8">
        <div className="space-y-12">
          {d.story.sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 60}>
              <div className="flex gap-6">
                <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[var(--bo-sage)]">
                  0{i + 1}
                </span>
                <div>
                  <h2 className="font-[family-name:var(--font-serif-tc)] text-2xl font-bold text-[var(--bo-ink)]">
                    {s.h}
                  </h2>
                  <p className="mt-3 leading-loose text-[var(--bo-sub)]">{s.p}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 三個堅持 */}
      <section className="bg-[var(--bo-muted)] py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading eyebrow="Values" title={d.story.valuesTitle} center />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {d.story.values.map((v, i) => (
              <Reveal key={v.h} delay={i * 100}>
                <div className="h-full rounded-2xl border border-[var(--bo-line)] bg-[var(--bo-surface)] p-8">
                  <span className="font-[family-name:var(--font-playfair)] text-2xl text-[var(--bo-leaf)]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-serif-tc)] text-xl font-bold text-[var(--bo-ink)]">
                    {v.h}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--bo-sub)]">
                    {v.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA lang={lang} dict={d} />
    </>
  );
}

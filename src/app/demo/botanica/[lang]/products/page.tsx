import type { Metadata } from 'next';
import { getDict, isLang, type Lang } from '../../_i18n';
import { products } from '../../_data/products';
import Reveal from '../../_components/Reveal';
import SectionHeading from '../../_components/SectionHeading';
import ProductCard from '../../_components/ProductCard';
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
    title: d.products.title,
    description: d.products.lead,
    alternates: { canonical: `/demo/botanica/${lang}/products` },
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const d = getDict(lang);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:pt-24 lg:px-8">
        <SectionHeading
          eyebrow={d.products.eyebrow}
          title={d.products.title}
          desc={d.products.lead}
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 100}>
              <ProductCard product={p} lang={lang} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTA lang={lang} dict={d} />
    </>
  );
}

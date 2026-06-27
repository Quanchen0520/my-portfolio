import Image from 'next/image';
import type { Lang } from '../_i18n';
import { type Product, cover } from '../_data/products';

export default function ProductCard({
  product,
  lang,
  priority = false,
}: {
  product: Product;
  lang: Lang;
  priority?: boolean;
}) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--bo-muted)] shadow-sm ring-1 ring-[var(--bo-line)] transition-shadow duration-500 group-hover:shadow-[0_24px_50px_-18px_rgba(34,42,30,0.4)]">
        <Image
          src={cover(product.seed)}
          alt={product.name[lang]}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--bo-bg)]/90 px-3 py-1 text-xs text-[var(--bo-leaf)]">
          {product.tag[lang]}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-[family-name:var(--font-serif-tc)] text-lg font-bold text-[var(--bo-ink)]">
            {product.name[lang]}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[var(--bo-sub)]">
            {product.desc[lang]}
          </p>
        </div>
        <span className="shrink-0 font-[family-name:var(--font-playfair)] text-[var(--bo-clay)]">
          NT${product.price}
        </span>
      </div>
    </article>
  );
}

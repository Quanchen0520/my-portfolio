// 產品系列假資料（多語系欄位）
import type { Lang } from '../_i18n';

type Localized = Record<Lang, string>;

export type Product = {
  slug: string;
  name: Localized;
  desc: Localized;
  tag: Localized;
  price: number;
  seed: string; // picsum 圖片種子
};

export const products: Product[] = [
  {
    slug: 'monstera',
    name: { zh: '龜背芋', en: 'Monstera' },
    desc: { zh: '新手友善的經典葉植，耐陰好養。', en: 'A beginner-friendly classic, shade-tolerant and easy.' },
    tag: { zh: '室內植栽', en: 'Indoor plant' },
    price: 880,
    seed: 'bo-monstera',
  },
  {
    slug: 'olive-tree',
    name: { zh: '室內橄欖樹', en: 'Olive Tree' },
    desc: { zh: '銀綠細葉，為空間帶來地中海氣息。', en: 'Silver-green leaves bringing a Mediterranean air.' },
    tag: { zh: '大型植栽', en: 'Statement plant' },
    price: 2680,
    seed: 'bo-olive',
  },
  {
    slug: 'stoneware-pot',
    name: { zh: '手作陶盆', en: 'Stoneware Pot' },
    desc: { zh: '在地陶藝家手拉胚，每只略有不同。', en: 'Hand-thrown by local potters; each one unique.' },
    tag: { zh: '生活器物', en: 'Object' },
    price: 1280,
    seed: 'bo-pot',
  },
  {
    slug: 'care-kit',
    name: { zh: '植物照顧組', en: 'Plant Care Kit' },
    desc: { zh: '剪、噴、養一次到位的入門工具。', en: 'Prune, mist and feed — the essentials in one kit.' },
    tag: { zh: '工具', en: 'Tools' },
    price: 690,
    seed: 'bo-kit',
  },
  {
    slug: 'linen-apron',
    name: { zh: '亞麻園藝圍裙', en: 'Linen Apron' },
    desc: { zh: '耐髒好洗的亞麻材質，整理植物的好夥伴。', en: 'Durable, washable linen — your potting companion.' },
    tag: { zh: '生活道具', en: 'Lifestyle' },
    price: 980,
    seed: 'bo-apron',
  },
  {
    slug: 'soy-candle',
    name: { zh: '森林大豆蠟燭', en: 'Forest Soy Candle' },
    desc: { zh: '雪松與苔蘚調，把森林帶進房間。', en: 'Cedar and moss notes that bring the forest indoors.' },
    tag: { zh: '香氛', en: 'Scent' },
    price: 760,
    seed: 'bo-candle',
  },
];

export const cover = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

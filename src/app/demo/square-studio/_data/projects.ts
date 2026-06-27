// 作品案例假資料 — 供列表頁與動態路由 [slug] 內頁共用

export type Project = {
  slug: string;
  title: string;
  category: '住宅空間' | '商業空間' | '軟裝陳設';
  year: string;
  location: string;
  area: string; // 坪數
  summary: string;
  cover: string;
  gallery: string[];
  overview: string;
  challenge: string;
  solution: string;
  materials: string[];
};

// 用 picsum seed 產生穩定的示意圖
const img = (seed: string, w = 1200, h = 900) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const projects: Project[] = [
  {
    slug: 'morning-light-residence',
    title: '晨光宅',
    category: '住宅空間',
    year: '2025',
    location: '台北・大安區',
    area: '32 坪',
    summary: '以暖白與木質鋪陳，讓光線成為空間的主角的三房住宅。',
    cover: img('sq-morning-cover'),
    gallery: [img('sq-morning-1'), img('sq-morning-2'), img('sq-morning-3')],
    overview:
      '屋主是一對重視生活儀式感的夫妻，希望家能像一杯溫熱的咖啡，安靜卻有溫度。我們以大面開窗引入自然光，搭配溫潤木皮與微水泥，營造寧靜而耐看的日常。',
    challenge:
      '原始格局採光集中於單側，公共區陰暗、動線迂迴，且收納嚴重不足。',
    solution:
      '拆除非結構隔間，將客廳、餐廚整併為開放場域，讓光線得以貫穿；沿牆規劃整合式收納櫃體，並以霧面玻璃拉門柔化光線層次。',
    materials: ['微水泥', '白橡木皮', '霧面玻璃', '亞麻織品'],
  },
  {
    slug: 'fold-coffee-bar',
    title: '摺 Coffee Bar',
    category: '商業空間',
    year: '2025',
    location: '台北・中山區',
    area: '18 坪',
    summary: '以摺紙為靈感的精品咖啡吧，幾何天花創造流動的視覺節奏。',
    cover: img('sq-fold-cover'),
    gallery: [img('sq-fold-1'), img('sq-fold-2'), img('sq-fold-3')],
    overview:
      '一間主打手沖的小型咖啡吧。品牌希望在有限坪數內，創造令人想拍照、也想久坐的場域，並讓吧檯成為與客人對話的舞台。',
    challenge:
      '空間狹長、樓高有限，需要在動線與座位數之間取得平衡，並強化品牌識別。',
    solution:
      '以摺面造型天花拉伸視覺高度，吧檯置中成為核心；選用深綠與黃銅點綴，搭配暖色照明，營造精緻而親近的氛圍。',
    materials: ['磨石子', '黃銅', '深綠烤漆', '梧桐木'],
  },
  {
    slug: 'quiet-office',
    title: '靜域辦公室',
    category: '商業空間',
    year: '2024',
    location: '新北・板橋區',
    area: '65 坪',
    summary: '為新創團隊打造的低彩度辦公場域，專注與協作並存。',
    cover: img('sq-quiet-cover'),
    gallery: [img('sq-quiet-1'), img('sq-quiet-2'), img('sq-quiet-3')],
    overview:
      '一間成長中的軟體新創，需要能容納協作、會議與專注工作的彈性空間，同時呈現沉穩專業的品牌形象。',
    challenge:
      '開放辦公易產生噪音干擾，會議與專注區需要清楚界定卻不顯封閉。',
    solution:
      '以玻璃隔間與植栽界定區域，導入吸音材與地毯降噪；色彩採低彩度灰階，輔以木質暖調，平衡理性與舒適。',
    materials: ['超耐磨木地板', '吸音板', '清玻璃隔間', '系統櫃'],
  },
  {
    slug: 'stone-house',
    title: '石光院',
    category: '住宅空間',
    year: '2024',
    location: '台中・西屯區',
    area: '48 坪',
    summary: '以天然石材與留白構築的當代禪意大宅。',
    cover: img('sq-stone-cover'),
    gallery: [img('sq-stone-1'), img('sq-stone-2'), img('sq-stone-3')],
    overview:
      '屋主嚮往日式侘寂的沉靜，希望回家就像走進一處安放身心的居所。我們以石、木、紙的對話，演繹質樸而雋永的空間。',
    challenge:
      '大坪數易顯空曠冷硬，如何讓自然材質溫潤卻不沉重是關鍵。',
    solution:
      '以洞石電視牆作為視覺定錨，搭配格柵與間接照明柔化量體；大量留白讓材質紋理自己說話。',
    materials: ['洞石', '梧桐實木', '和紙', '藝術塗料'],
  },
  {
    slug: 'bloom-flagship',
    title: 'BLOOM 花店旗艦',
    category: '商業空間',
    year: '2023',
    location: '台北・信義區',
    area: '24 坪',
    summary: '讓花成為主角的純白旗艦店，光與植物交織的展演舞台。',
    cover: img('sq-bloom-cover'),
    gallery: [img('sq-bloom-1'), img('sq-bloom-2'), img('sq-bloom-3')],
    overview:
      '高端花藝品牌的首間旗艦店，需要在白盒子中襯托花材的色彩與姿態，同時提供體驗與課程空間。',
    challenge:
      '商品色彩繁複，空間若過於搶眼將喧賓奪主；同時需兼顧展售與教學動線。',
    solution:
      '以純白與淺木打底，可移動展台靈活因應陳列；軌道燈精準打光，後場規劃獨立教室與冷藏花室。',
    materials: ['礦物塗料', '淺色橡木', '不鏽鋼', '軌道照明'],
  },
  {
    slug: 'linen-apartment',
    title: '亞麻小宅',
    category: '軟裝陳設',
    year: '2023',
    location: '台北・松山區',
    area: '15 坪',
    summary: '為單身屋主進行的軟裝改造，用織品與綠意翻新既有空間。',
    cover: img('sq-linen-cover'),
    gallery: [img('sq-linen-1'), img('sq-linen-2'), img('sq-linen-3')],
    overview:
      '不動格局、不大興土木，僅以傢俱、織品與佈置，在預算內為小宅換上溫柔的新表情。',
    challenge:
      '租屋條件不可大幅施工，且坪數小、收納與機能需兼顧美感。',
    solution:
      '挑選低矮傢俱放大視覺、引入亞麻窗簾與羊毛地毯增添層次，搭配綠植與燈飾，讓空間立刻有了生活感。',
    materials: ['亞麻織品', '羊毛地毯', '藤編傢俱', '陶器擺件'],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectSlugs = projects.map((p) => p.slug);

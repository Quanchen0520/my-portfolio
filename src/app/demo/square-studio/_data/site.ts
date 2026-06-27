// 方寸設計 Square Studio — 全站共用設定與假資料

export const BASE = '/demo/square-studio';

export const site = {
  name: '方寸設計',
  enName: 'Square Studio',
  tagline: '在方寸之間，安放生活的尺度',
  description:
    '方寸設計 Square Studio 是一間專注於住宅與商業空間的室內設計工作室。以材質、光線與比例為語言，為每一個空間量身打造恰如其分的生活提案。',
  email: 'hello@squarestudio.tw',
  phone: '(02) 2700-1688',
  address: '台北市信義區方寸街 27 號 3 樓',
  hours: '週一至週五 10:00–19:00（例假日預約制）',
};

export const nav = [
  { href: BASE, label: '首頁' },
  { href: `${BASE}/about`, label: '關於我們' },
  { href: `${BASE}/services`, label: '服務項目' },
  { href: `${BASE}/projects`, label: '作品案例' },
  { href: `${BASE}/contact`, label: '聯絡我們' },
];

export type Service = {
  no: string;
  title: string;
  en: string;
  desc: string;
  items: string[];
};

export const services: Service[] = [
  {
    no: '01',
    title: '住宅空間設計',
    en: 'Residential',
    desc: '從格局重整到材質選配，打造貼合生活動線、耐看耐住的居家空間。',
    items: ['全室規劃', '格局調整', '系統與訂製傢俱', '燈光與軟裝'],
  },
  {
    no: '02',
    title: '商業空間設計',
    en: 'Commercial',
    desc: '為品牌量身打造具識別度的營業場域，兼顧氛圍營造與營運效率。',
    items: ['店鋪／餐飲', '辦公室', '展示空間', '品牌視覺整合'],
  },
  {
    no: '03',
    title: '軟裝陳設',
    en: 'Styling',
    desc: '以傢俱、織品與藝術擺件，為既有空間注入層次與溫度。',
    items: ['傢俱選配', '佈置陳設', '色彩計畫', '採購代購'],
  },
  {
    no: '04',
    title: '設計顧問',
    en: 'Consulting',
    desc: '提供單次或階段性的專業諮詢，協助釐清需求、預算與設計方向。',
    items: ['現場勘查', '預算評估', '風格定調', '工程發包建議'],
  },
];

// 設計流程
export const process = [
  { step: '01', title: '初次洽談', desc: '了解需求、預算與期待，確認合作方向。' },
  { step: '02', title: '丈量與提案', desc: '現場丈量，提出平面配置與風格概念。' },
  { step: '03', title: '深化設計', desc: '完成 3D 圖、材質計畫與細部圖說。' },
  { step: '04', title: '發包施工', desc: '監造管理，確保品質與進度。' },
  { step: '05', title: '驗收交屋', desc: '完工驗收、軟裝佈置，正式入住。' },
];

import type { Metadata } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import Link from 'next/link';
import { Leaf, Flame, Coffee, MapPin, Clock, Phone, Mail } from 'lucide-react';
import ContactForm from './ContactForm';

// 刻意只使用「一種」無襯線字體，維持基礎、克制的視覺
const sans = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans-tc',
  display: 'swap',
});

// ── 基礎 SEO ───────────────────────────────────────────────
export const metadata: Metadata = {
  title: '晨光咖啡 Dawn Coffee｜城市裡的一杯溫暖手沖',
  description:
    '晨光咖啡 Dawn Coffee 是一間以手沖單品與自家烘焙為主的精品咖啡店。嚴選莊園生豆、每日新鮮烘焙，在城市的清晨為你沖一杯剛剛好的溫暖。',
  keywords: ['咖啡店', '精品咖啡', '手沖咖啡', '自家烘焙', '晨光咖啡', 'Dawn Coffee'],
  openGraph: {
    title: '晨光咖啡 Dawn Coffee｜城市裡的一杯溫暖手沖',
    description:
      '嚴選莊園生豆、每日新鮮烘焙，在城市的清晨為你沖一杯剛剛好的溫暖。',
    type: 'website',
    locale: 'zh_TW',
    siteName: '晨光咖啡 Dawn Coffee',
    images: [
      {
        url: 'https://picsum.photos/seed/dawncoffee-og/1200/630',
        width: 1200,
        height: 630,
        alt: '晨光咖啡 Dawn Coffee',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '晨光咖啡 Dawn Coffee',
    description:
      '嚴選莊園生豆、每日新鮮烘焙，在城市的清晨為你沖一杯剛剛好的溫暖。',
    images: ['https://picsum.photos/seed/dawncoffee-og/1200/630'],
  },
};

// ── 資料 ───────────────────────────────────────────────────
const navLinks = [
  { href: '#about', label: '關於我們' },
  { href: '#menu', label: '菜單精選' },
  { href: '#contact', label: '聯絡預約' },
];

const features = [
  { icon: Leaf, title: '莊園直選生豆', desc: '與產地小農合作，挑選具風土個性的單一莊園生豆。' },
  { icon: Flame, title: '每日新鮮烘焙', desc: '小批次淺中焙，鎖住果香與甜感，當週豆當週喝。' },
  { icon: Coffee, title: '職人手沖溫度', desc: '依豆款調整水溫與手法，為你呈現剛剛好的一杯。' },
];

const menu = [
  { name: '日曬耶加雪菲', en: 'Yirgacheffe', price: 180, note: '茉莉花香・莓果・明亮酸甜', seed: 'coffee-yirga' },
  { name: '哥倫比亞蜜處理', en: 'Colombia Honey', price: 160, note: '焦糖・堅果・圓潤厚實', seed: 'coffee-colombia' },
  { name: '招牌晨光拿鐵', en: 'Dawn Latte', price: 150, note: '綿密奶泡・微甜尾韻', seed: 'coffee-latte' },
  { name: '冰釀黑咖啡', en: 'Cold Brew', price: 140, note: '低酸・順口・清爽冰涼', seed: 'coffee-coldbrew' },
  { name: '手作肉桂捲', en: 'Cinnamon Roll', price: 90, note: '現烤・微酥・溫暖香氣', seed: 'cinnamon-roll' },
  { name: '北歐風乳酪蛋糕', en: 'Cheesecake', price: 120, note: '濃郁・不甜膩・佐咖啡剛好', seed: 'cheesecake' },
];

const info = [
  { icon: MapPin, label: '地址', value: '台北市大安區晨光路 88 號 1 樓' },
  { icon: Clock, label: '營業時間', value: '週一至週日 08:00 – 20:00（週三公休）' },
  { icon: Phone, label: '電話', value: '(02) 2345-6789', href: 'tel:0223456789' },
  { icon: Mail, label: '信箱', value: 'hello@dawncoffee.tw', href: 'mailto:hello@dawncoffee.tw' },
];

// ── 共用小元件 ─────────────────────────────────────────────
// 區塊標題：置中、對稱、字級對比平緩
function SectionTitle({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-neutral-800">{title}</h2>
      {note && <p className="mt-3 text-neutral-500">{note}</p>}
    </div>
  );
}

// ── 頁面 ───────────────────────────────────────────────────
export default function DawnCoffeePage() {
  return (
    <div
      className={`${sans.variable} min-h-screen bg-white font-[family-name:var(--font-sans-tc)] text-neutral-700 antialiased`}
    >
      {/* 返回服務頁（Demo 用，不屬於形象站本身） */}
      <Link
        href="/services"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-neutral-900/90 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-900"
      >
        ← 回服務頁
      </Link>

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <a href="#top" className="text-lg font-semibold tracking-wide text-neutral-800">
            Dawn<span className="text-[#6f4e37]">.</span>Coffee
          </a>
          <nav className="flex items-center gap-5 text-sm sm:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hidden text-neutral-500 transition-colors hover:text-[#6f4e37] sm:inline"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-[#6f4e37] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#5a3f2c]"
            >
              立即預約
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ── Hero（置中單欄） ── */}
        <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            Specialty Coffee · since 2018
          </p>
          <h1 className="mx-auto mt-4 max-w-xl text-3xl font-semibold leading-snug text-neutral-800 sm:text-4xl">
            城市裡的一杯溫暖晨光
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-neutral-500">
            晨光咖啡 Dawn Coffee，以手沖單品與自家烘焙為心。在每個清晨，為你沖一杯剛剛好的溫度與香氣。
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a
              href="#menu"
              className="rounded-full bg-[#6f4e37] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#5a3f2c]"
            >
              看看菜單
            </a>
            <a
              href="#contact"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-[#6f4e37] hover:text-[#6f4e37]"
            >
              預約座位
            </a>
          </div>

          {/* 單張置中主視覺，無視差、無浮動裝飾 */}
          <div className="mt-12 overflow-hidden rounded-xl border border-neutral-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/dawn-coffee-hero/1000/560"
              alt="晨光咖啡店內一隅與手沖咖啡"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </section>

        {/* ── 關於我們 ── */}
        <section id="about" className="border-t border-neutral-200 bg-neutral-50 py-16">
          <div className="mx-auto max-w-3xl px-5">
            <SectionTitle
              eyebrow="About Us"
              title="慢下來，好好喝一杯"
              note="從生豆挑選、烘焙曲線到手沖萃取，每個環節都親力親為。在晨光，只想陪你度過一段安靜而完整的時光。"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-neutral-200 bg-white p-6 text-center transition-colors hover:border-neutral-300"
                >
                  <f.icon className="mx-auto h-6 w-6 text-[#6f4e37]" strokeWidth={1.5} />
                  <h3 className="mt-4 font-semibold text-neutral-800">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 菜單精選（對稱網格） ── */}
        <section id="menu" className="py-16">
          <div className="mx-auto max-w-3xl px-5">
            <SectionTitle eyebrow="Our Menu" title="菜單精選" note="每日新鮮供應・季節限定品項另詢店員" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {menu.map((item) => (
                <article
                  key={item.name}
                  className="overflow-hidden rounded-xl border border-neutral-200 bg-white transition-colors hover:border-neutral-300"
                >
                  <div className="aspect-[4/3] overflow-hidden border-b border-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${item.seed}/600/450`}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-semibold text-neutral-800">{item.name}</h3>
                    <p className="mt-0.5 text-xs uppercase tracking-wide text-neutral-400">
                      {item.en}
                    </p>
                    <p className="mt-2 text-sm text-neutral-500">{item.note}</p>
                    <p className="mt-3 font-medium text-[#6f4e37]">NT$ {item.price}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 聯絡 / 預約（置中單欄） ── */}
        <section id="contact" className="border-t border-neutral-200 bg-neutral-50 py-16">
          <div className="mx-auto max-w-3xl px-5">
            <SectionTitle
              eyebrow="Visit Us"
              title="來坐坐，聊聊天"
              note="想預約座位、包場或詢問豆單，留下訊息給我們，或直接走進店裡。"
            />

            {/* 店家資訊：置中、對稱排列 */}
            <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4"
                >
                  <item.icon className="h-5 w-5 shrink-0 text-[#6f4e37]" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-400">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-neutral-700 transition-colors hover:text-[#6f4e37]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-neutral-700">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 預約表單：置中 */}
            <div className="mx-auto mt-8 max-w-2xl">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-10 text-center">
        <p className="text-lg font-semibold text-neutral-800">
          Dawn<span className="text-[#6f4e37]">.</span>Coffee
        </p>
        <p className="mt-2 text-sm text-neutral-500">城市裡的一杯溫暖晨光</p>
        <p className="mt-4 text-xs text-neutral-400">
          © 2026 晨光咖啡 Dawn Coffee — 本頁為形象網站展示範例
        </p>
      </footer>
    </div>
  );
}

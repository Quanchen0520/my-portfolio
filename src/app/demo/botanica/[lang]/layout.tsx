import type { Metadata } from 'next';
import { Noto_Serif_TC, Noto_Sans_TC, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, isLang, getDict } from '../_i18n';
import ThemeProvider from '../_components/ThemeProvider';
import Keyframes from '../_components/Keyframes';
import CustomCursor from '../_components/CustomCursor';
import Header from '../_components/Header';
import Footer from '../_components/Footer';
import DemoBadge from '../_components/DemoBadge';
import Analytics from '../_components/Analytics';

// 字體優化：next/font self-host、display swap
const serifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-serif-tc',
  display: 'swap',
});
const sansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans-tc',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-playfair',
  display: 'swap',
});

// 預先產生兩個語系
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// 依語系產生 metadata（每頁可再覆寫）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  const title = '植感生活 Botanica';
  return {
    title: { default: `${title}｜${d.home.heroEyebrow}`, template: `%s｜${title}` },
    description: d.home.heroLead,
    openGraph: { type: 'website', locale: lang === 'zh' ? 'zh_TW' : 'en_US', siteName: title },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDict(lang);

  const fontClass = `${serifTC.variable} ${sansTC.variable} ${playfair.variable}`;

  return (
    // ThemeProvider 注入 light/dark 設計 token、平滑滾動與自訂游標環境
    <ThemeProvider fontClass={fontClass}>
      {/* 品牌站專用 keyframes（一次注入） */}
      <Keyframes />
      {/* 數據分析串接位置（GA placeholder） */}
      <Analytics />
      {/* 自訂游標（僅滑鼠裝置啟用） */}
      <CustomCursor />
      <Header lang={lang} nav={dict.nav} />
      <main>{children}</main>
      <Footer lang={lang} dict={dict} />
      <DemoBadge />
    </ThemeProvider>
  );
}

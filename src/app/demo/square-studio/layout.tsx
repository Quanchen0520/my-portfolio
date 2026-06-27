import type { Metadata } from 'next';
import { Noto_Serif_TC, Noto_Sans_TC, Playfair_Display } from 'next/font/google';
import Header from './_components/Header';
import Footer from './_components/Footer';
import DemoBadge from './_components/DemoBadge';
import JsonLd from './_components/JsonLd';
import { site } from './_data/site';
import { cssVars } from './_data/tokens';

// 字體優化：next/font 自動 self-host、無外部請求、display swap
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

// 全站 metadata 模板：各子頁可覆寫 title（用 %s）與 description
export const metadata: Metadata = {
  title: {
    default: `${site.name} ${site.enName}｜室內設計工作室`,
    template: `%s｜${site.name} ${site.enName}`,
  },
  description: site.description,
  keywords: ['室內設計', '空間設計', '住宅設計', '商業空間', '軟裝', '方寸設計', 'Square Studio'],
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: `${site.name} ${site.enName}`,
  },
};

// LocalBusiness 結構化資料（全站共用）
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesignBusiness',
  name: `${site.name} ${site.enName}`,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address,
    addressCountry: 'TW',
  },
  openingHours: 'Mo-Fr 10:00-19:00',
};

export default function SquareStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={cssVars}
      className={`${serifTC.variable} ${sansTC.variable} ${playfair.variable} min-h-screen bg-[#f7f5f2] font-[family-name:var(--font-sans-tc)] text-[#1c1a17] antialiased`}
    >
      <JsonLd data={orgJsonLd} />
      <Header />
      <main>{children}</main>
      <Footer />
      <DemoBadge />
    </div>
  );
}

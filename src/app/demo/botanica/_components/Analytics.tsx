// 數據分析串接示意（Placeholder）
// ──────────────────────────────────────────────────────────
// 正式上線時，於此載入 GA4 / Plausible 等追蹤碼。
// 範例（Google Analytics 4，使用 next/script）：
//
//   import Script from 'next/script';
//   const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // 例如 G-XXXXXXXXXX
//   return (
//     <>
//       <Script
//         src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
//         strategy="afterInteractive"
//       />
//       <Script id="ga4" strategy="afterInteractive">{`
//         window.dataLayer = window.dataLayer || [];
//         function gtag(){dataLayer.push(arguments);}
//         gtag('js', new Date());
//         gtag('config', '${GA_ID}');
//       `}</Script>
//     </>
//   );
//
// Demo 不實際載入追蹤碼，僅保留位置與說明。
export default function Analytics() {
  return null;
}

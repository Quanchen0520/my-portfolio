import type { Metadata } from "next"; // 匯入 Next.js 的元資料型別（用於 SEO）
import { Geist, Geist_Mono } from "next/font/google"; // 匯入 Google 的 Geist 字體（Next.js 內建優化）
import "./globals.css"; // 匯入全域 CSS 樣式表

// 設定 Geist 無襯線字體（變數名稱與子集）
const geistSans = Geist({
  variable: "--font-geist-sans", // 定義 CSS 變數名稱，方便在 CSS 中使用
  subsets: ["latin"], // 指定字體包含的字元集（通常選拉丁文）
});

// 設定 Geist Mono 等寬字體（常用於程式碼顯示）
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 設定網頁的元資料（SEO 資訊），這會自動生成 <title> 和 <meta name="description">
export const metadata: Metadata = {
  title: "Quan portfolio", // 網頁標題
  description: "Quan 的個人網站", // 網頁描述
};

// 這是根佈局組件（Root Layout），所有的頁面都會被包裹在這裡面
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // 代表當前頁面的內容
}>) {
  return (
    <html lang="en">
      <body
        // 在 body 注入字體變數，並加上 antialiased（抗鋸齒）讓字體更平滑
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 這裡會渲染每個頁面的內容 */}
        {children}
      </body>
    </html>
  );
}
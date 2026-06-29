"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, ExternalLink } from 'lucide-react';

type Pkg = {
  tier: string;
  name: string;
  price: string;
  unit: string;
  feature: boolean;
  demo?: { href: string; label: string };
  feats: { text: string; off?: boolean }[];
};

// 形象官網方案
const websitePackages: Pkg[] = [
  {
    tier: 'Basic',
    name: '單頁形象站',
    price: 'NT$ 35,000',
    unit: ' 起',
    feature: false,
    demo: { href: '/demo/dawn-coffee', label: '晨光咖啡 Demo' },
    feats: [
      { text: '單頁式 RWD 響應式設計' },
      { text: '3–5 個區塊（首頁/關於/聯絡）' },
      { text: '聯絡表單串接' },
      { text: '基礎 SEO 設定' },
      { text: 'CMS 後台管理', off: true },
      { text: '多語系切換', off: true },
    ],
  },
  {
    tier: 'Standard',
    name: '多頁企業官網',
    price: 'NT$ 60,000',
    unit: ' 起',
    feature: true,
    demo: { href: '/demo/square-studio', label: '方寸設計 Demo' },
    feats: [
      { text: '5–8 頁完整網站' },
      { text: '客製化 UI 設計' },
      { text: 'Next.js + Tailwind 開發' },
      { text: '進階 SEO + 載入優化' },
      { text: 'Vercel 部署上線' },
      { text: '多語系切換', off: true },
    ],
  },
  {
    tier: 'Premium',
    name: '品牌官網 + CMS',
    price: 'NT$ 99,000',
    unit: ' 起',
    feature: false,
    demo: { href: '/demo/botanica', label: '植感生活 Demo' },
    feats: [
      { text: '不限頁數架構規劃' },
      { text: '內容管理後台' },
      { text: '多語系（中／英）' },
      { text: '動畫與互動效果' },
      { text: '部落格 / 文章系統' },
      { text: '數據分析串接' },
    ],
  },
];

// 全端 Web App 方案
const webAppPackages: Pkg[] = [
  {
    tier: 'MVP',
    name: '最小可行產品',
    price: 'NT$ 60,000',
    unit: ' 起',
    feature: false,
    feats: [
      { text: '核心功能 1–2 項' },
      { text: '使用者註冊／登入' },
      { text: '資料庫設計（SQLite/PG）' },
      { text: 'RESTful API 開發' },
      { text: '基礎後台' },
    ],
  },
  {
    tier: 'Standard',
    name: '完整應用系統',
    price: 'NT$ 120,000',
    unit: ' 起',
    feature: true,
    feats: [
      { text: '多模組功能開發' },
      { text: '權限與角色管理' },
      { text: '第三方 API 串接' },
      { text: '金流 / 通知整合' },
      { text: '後台儀表板' },
      { text: '上線部署 + 文件' },
    ],
  },
  {
    tier: 'Custom',
    name: '客製化大型專案',
    price: '面議',
    unit: ' / 報價',
    feature: false,
    feats: [
      { text: '完整需求訪談規劃' },
      { text: '系統架構設計' },
      { text: '即時功能（WebSocket）' },
      { text: '資料分析 / 圖表' },
      { text: '長期維護方案' },
      { text: '分階段交付' },
    ],
  },
];

// 加購 / 附加服務
const addons = [
  { name: '網域 + 主機代管設定', amount: 'NT$ 3,000' },
  { name: '多語系（每增一語）', amount: 'NT$ 8,000' },
  { name: '金流串接(綠界/Stripe)', amount: 'NT$ 10,000' },
  { name: 'RWD 手機版優化', amount: 'NT$ 6,000' },
  { name: 'SEO 進階優化', amount: 'NT$ 8,000' },
  { name: '每月維護保養（含時數）', amount: 'NT$ 3,000 / 月' },
  { name: '緊急加急（縮短工期）', amount: '+30%' },
  { name: '原始碼交付 + 技術文件', amount: '+15%' },
  { name: 'icon、視覺圖像', amount: '面議' },
];

// 合作方式
const terms = [
  { b: '兩、三階段付款', text: '：可依專案複雜度討論。' },
  { b: '修改範圍', text: '：方案內含 2 次免費修改，超出部分另行報價。' },
  { b: '交付時程', text: '：依專案規模約 1-16 週，確認需求時告知明確期程。' },
  { b: '報價有效期', text: '：報價單開立後 14 天內有效。' },
  { b: '智慧財產權', text: '：尾款結清後，成品著作權移轉予客戶。' },
  { b: '網域、資料庫', text: '：依使用量或第三方公司定價決定。' },
  { b: 'icon、視覺圖像', text: '：依使用量或第三方公司定價決定。' },
];

function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-slate-900/40 p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 ${
        pkg.feature
          ? 'border-2 border-emerald-400/70'
          : 'border border-slate-800'
      }`}
    >
      {pkg.feature && (
        <span className="absolute -top-3 right-5 rounded-full bg-emerald-400 px-3 py-0.5 font-mono text-[11px] font-bold tracking-wider text-slate-900">
          最常接
        </span>
      )}
      <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
        {pkg.tier}
      </span>
      <div className="mb-4 mt-1.5 text-lg font-bold text-white">{pkg.name}</div>
      <div className="text-3xl font-extrabold tracking-tight">
        {pkg.price}
        <span className="font-mono text-sm font-normal text-slate-400">{pkg.unit}</span>
      </div>
      <ul className="mt-5 flex-1">
        {pkg.feats.map((feat) => (
          <li
            key={feat.text}
            className={`relative border-t border-slate-800/70 py-1.5 pl-6 text-sm first:border-t-0 ${
              feat.off ? 'text-slate-600 line-through' : 'text-slate-300'
            }`}
          >
            <span
              className={`absolute left-1 font-mono font-bold ${
                feat.off ? 'text-slate-700' : 'text-emerald-400'
              }`}
            >
              {feat.off ? '×' : '›'}
            </span>
            {feat.text}
          </li>
        ))}
      </ul>
      {pkg.demo && (
        <Link
          href={pkg.demo.href}
          className="group mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-2.5 text-sm font-medium text-emerald-300 transition-colors hover:border-emerald-400 hover:bg-emerald-400/20 hover:text-emerald-200"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          看實際範例：{pkg.demo.label}
        </Link>
      )}
    </div>
  );
}

function SectionHead({ num, title, note }: { num: string; title: string; note?: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-3.5 border-b border-dashed border-slate-700 pb-3">
      <span className="font-mono text-sm font-bold text-emerald-400">{num}</span>
      <span className="text-xl font-bold">{title}</span>
      {note && <span className="ml-auto font-mono text-xs text-slate-500">{note}</span>}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 selection:bg-emerald-500/30">
      <main className="mx-auto max-w-4xl px-6 py-20">
        {/* 返回按鈕 */}
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          返回首頁
        </Link>

        {/* 標題區 */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b-2 border-slate-700 pb-7"
        >
          <div className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />
            FREELANCE WEB DEV · 服務報價
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            網頁開發<br />接案價目表
            <span className="mt-3 block font-mono text-xl font-bold text-slate-500">
              {'// rate card v1.0'}
            </span>
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-slate-400">
            從形象官網到全端 Web App，依專案規模彈性報價。以下價格為參考區間，實際依需求複雜度、時程與維護範圍另行估算。
          </p>
        </motion.header>

        {/* 01 形象官網 */}
        <section className="mt-16">
          <SectionHead num="01" title="形象官網 / Landing Page" note="固定報價・專案制" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {websitePackages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </section>

        {/* 02 全端 Web App */}
        <section className="mt-16">
          <SectionHead num="02" title="全端 Web App" note="固定報價・含後端" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {webAppPackages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </section>

        {/* 03 加購 / 附加服務 */}
        <section className="mt-16">
          <SectionHead num="03" title="加購 / 附加服務(皆可議價)" note="可疊加於任一方案" />
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-800 sm:grid-cols-2">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between gap-3 border-b border-slate-800/70 bg-slate-900/40 px-5 py-3.5 text-sm"
              >
                <span className="text-slate-300">{addon.name}</span>
                <span className="whitespace-nowrap font-mono font-bold text-emerald-400">
                  {addon.amount}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 04 合作方式 */}
        <section className="mt-16">
          <SectionHead num="04" title="合作方式" />
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-emerald-400">
              Terms &amp; Conditions
            </h3>
            <ul>
              {terms.map((term) => (
                <li
                  key={term.b}
                  className="relative border-t border-slate-800 py-2 pl-7 text-sm text-slate-300 first:border-t-0"
                >
                  <span className="absolute left-0 font-mono text-xs text-emerald-400/70">{'//'}</span>
                  <b className="text-white">{term.b}</b>
                  {term.text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 頁尾 */}
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-2 border-slate-700 pt-6">
          <div className="flex items-center gap-2 font-mono text-sm text-slate-400">
            <Mail className="h-4 w-4 text-emerald-400" />
            <a
              href="mailto:kevinquan0520@gmail.com"
              className="text-slate-200 transition-colors hover:text-emerald-400"
            >
              kevinquan0520@gmail.com
            </a>
          </div>
          <div className="font-mono text-xs text-slate-500">
            {'// 宥銓 · web developer'}
            <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-emerald-400" />
          </div>
        </footer>
      </main>
    </div>
  );
}

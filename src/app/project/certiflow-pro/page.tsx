'use client';

import Link from 'next/link';
import { ChevronLeft, ExternalLink } from 'lucide-react';

export default function CertiFlowProPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-slate-200 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          回到首頁
        </Link>

        <header className="mt-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">CertiFlow Pro</h1>
          <p className="text-slate-400 mt-4 leading-relaxed">活動證明產生系統，支援多種證明格式與自動化生成。</p>
        </header>

        <section className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">Role</p>
            <p className="text-lg font-semibold mt-2">Full Stack Developer</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">Timeline</p>
            <p className="text-lg font-semibold mt-2">2025</p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'GAS', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="text-xs uppercase tracking-wider bg-slate-800 px-2.5 py-1 rounded text-slate-200">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-xl font-bold mb-4">Highlights</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="leading-relaxed">• 建立活動證明模板管理流程。</li>
            <li className="leading-relaxed">• 串接 Google Apps Script 進行資料處理與自動產出。</li>
            <li className="leading-relaxed">• 優化使用者操作流程，降低手動發證時間。</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

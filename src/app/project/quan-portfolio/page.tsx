'use client';

import Link from 'next/link';
import { ChevronLeft, Github } from 'lucide-react';

export default function QuanPortfolioPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-slate-200 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          回到首頁
        </Link>

        <header className="mt-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">QUAN</h1>
          <p className="text-slate-400 mt-4 leading-relaxed">個人作品集網站，展示開發者的作品與技能。</p>
        </header>

        <section className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">Role</p>
            <p className="text-lg font-semibold mt-2">Frontend Developer</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">Timeline</p>
            <p className="text-lg font-semibold mt-2">2026</p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
              <span key={tech} className="text-xs uppercase tracking-wider bg-slate-800 px-2.5 py-1 rounded text-slate-200">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-xl font-bold mb-4">Highlights</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="leading-relaxed">• 以動畫與分區資訊強化專案展示體驗。</li>
            <li className="leading-relaxed">• 建立可擴充的專案卡片與分類結構。</li>
            <li className="leading-relaxed">• 支援行動裝置與桌面版的響應式排版。</li>
          </ul>

          <a
            href="https://github.com/Quanchen0520"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Github className="w-4 h-4" />
            查看 GitHub Repository
          </a>
        </section>
      </div>
    </main>
  );
}

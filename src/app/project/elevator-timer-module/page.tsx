'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import './style.css';

export default function ElevatorTimerModulePage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-slate-200 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          回到首頁
        </Link>

        <header className="mt-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">電梯倒數計時模組</h1>
          <p className="text-slate-400 mt-4 leading-relaxed">利用 Arduino UNO 結合電路設計，用於電梯開關門控制。</p>
        </header>

        <section className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">Role</p>
            <p className="text-lg font-semibold mt-2">Hardware Builder</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">Timeline</p>
            <p className="text-lg font-semibold mt-2">2026</p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['Arduino', '電路設計', '焊接'].map((tech) => (
              <span key={tech} className="text-xs uppercase tracking-wider bg-slate-800 px-2.5 py-1 rounded text-slate-200">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Highlights</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="leading-relaxed">• 整合mp4播放模組、顯示模組等...多項模組。</li>
            <li className="leading-relaxed">• 完成電路模組線路規劃、焊接與測試。</li>
            <li className="leading-relaxed">• 可依場域需求客製化調整倒數秒數。</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">專案預覽</h2>
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border border-slate-800">
            <Image
              src="/elevator-timer-module/elevator-timer-module_image24.png"
              alt=" Quan Portfolio 畫面預覽"
              fill
              className="object-cover border border-slate-700 rounded-lg"
              priority
            />
          </div>
          <p className="text-sm text-slate-400 mt-3">顯示模組。</p>
          
          <div className="divider" />

          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border border-slate-800">
            <Image
              src="/elevator-timer-module/elevator-timer-module_image22.png"
              alt=" Quan Portfolio 畫面預覽"
              fill
              className="object-cover border border-slate-700 rounded-lg"
              priority
            />
          </div>
          <p className="text-sm text-slate-400 mt-3">核心主機，控制模組。</p>
        </section>
      </div>
    </main>
  );
}

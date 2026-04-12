"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Calendar, MapPin, Award, Star, Mail, Github, ExternalLink, ChevronRight, Code2, Instagram } from 'lucide-react';

export default function AboutPage() {
  const experiences = [
    {
      year: "2025",
      title: "全國技能競賽分區賽 - 金牌 🥇",
      organization: "高雄市立海青工商",
      desc: "開發行動應用裝置",
      tags: ["Android", "Flutter"]
    },
    {
      year: "2024",
      title: "全國技能競賽分區賽 - 銅牌 🥉",
      organization: "高雄市立海青工商",
      desc: "開發行動應用裝置",
      tags: ["Android", "Flutter", "Adobe XD"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 selection:bg-sky-500/30">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* 返回按鈕 - 同步首頁簡潔感 */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          返回首頁
        </Link>

        {/* 個人簡介區塊 */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              About <span className="text-sky-400">Me</span>.
            </h1>
            <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed text-lg">
              <p className="mb-4">
                我是 <span className="text-white font-semibold">Quan</span>，從高一開始接觸行動裝置開發，對相關領域小有了解。曾參加全國技能競賽，獲得金牌與銅牌的成績，展現了在 Android 開發方面的實力。
              </p>
              <p>
                對資訊相關領域充滿好奇心，軟體、韌體、硬體皆是我的專長。
              </p>
            </div>
          </motion.div>
        </section>

        {/* 參賽經歷 - 時間軸設計 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
            <Trophy className="text-sky-400 w-6 h-6" /> 參賽與榮譽
          </h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 border-l border-slate-800 hover:border-sky-500/50 transition-colors group"
              >
                {/* 節點裝飾 */}
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-slate-800 group-hover:bg-sky-500 border border-[#0F172A] transition-colors" />
                
                <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-sky-500/30 transition-all">
                  <span className="text-xs font-mono text-sky-500 mb-2 block tracking-widest">{exp.year}</span>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">{exp.title}</h3>
                  <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.organization}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {exp.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider bg-slate-800/50 px-2 py-0.5 rounded text-slate-400 border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
        {/* Education 區塊 - 保持你的學歷資訊 */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all group">
            <h3 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" /> Education
            </h3>
            <div className="space-y-6">
            <div className="relative pl-4 border-l-2 border-sky-500/30">
                <p className="text-white font-medium text-sm">國立雲林科技大學</p>
                <p className="text-slate-500 text-xs">資訊管理系 人工智慧技優專班 · 2025 - NOW</p>
            </div>
            <div className="relative pl-4 border-l-2 border-slate-800">
                <p className="text-slate-300 font-medium text-sm">高雄市立海青工商</p>
                <p className="text-slate-500 text-xs">資訊科 · 2022 - 2025</p>
            </div>
            </div>
        </div>

        {/* Contact Me 區塊 - 重新設計 */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-[#0F172A] border border-slate-800 hover:border-sky-500/30 transition-all relative overflow-hidden group">
            {/* 背景微光裝飾 */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-sky-500/5 blur-3xl group-hover:bg-sky-500/10 transition-all"></div>
            
            <h3 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400" /> Contact Terminal
            </h3>
            
            <div className="space-y-3">
            {/* Email */}
            <a href="mailto:your-email@example.com" className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-sky-500/50 transition-all group/item">
                <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 text-slate-400 group-hover/item:text-sky-400">
                    <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-400 group-hover/item:text-slate-200">Email Me</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover/item:text-sky-400 transition-all" />
            </a>

            {/* GitHub / Social */}
            <a href="https://github.com/Quanchen0520" target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-sky-500/50 transition-all group/item">
                <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 text-slate-400 group-hover/item:text-white">
                    <Github className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-400 group-hover/item:text-slate-200">GitHub Profile</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover/item:text-sky-400 transition-all" />
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/youquan20__05" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-sky-500/50 transition-all group/item">
                <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-900 text-slate-400 group-hover/item:text-pink-400 transition-colors">
                <Instagram className="w-4 h-4" />
                </div>
              <span className="text-sm text-slate-400 group-hover/item:text-slate-200">Instagram Profile</span>
                </div>
              <ExternalLink className="w-3 h-3 text-slate-600 group-hover/item:text-sky-400 transition-all" />
            </a>
            </div>
        </div>
        </section>
      </main>
    </div>
  );
}
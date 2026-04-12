"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { Github, ExternalLink, Cpu, Smartphone, Mail, ChevronRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');
  const contactEmail = 'kevinquan0520@gmail.com';
  const profileImage = '/CEAC3C87-3901-4719-8177-08D5F1A7F284.JPG';

  const projects = [
    {
      title: "Building...",
      desc: "Building...",
      tech: ["Kotlin", "Jetpack Compose", "MVVM"],
      type: "mobile",
      href: '/project/building-mobile',
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      title: "電梯倒數計時模組",
      desc: "利用Arduino UNO結合電路設計，用於電梯開關門控制。",
      tech: ["Arduino", "電路設計", "焊接"],
      type: "hardware",
      href: '/project/elevator-timer-module',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      title: "CertiFlow Pro",
      desc: "活動證明產生系統，支援多種證明格式與自動化生成。",
      tech: ["Next.js", "GAS", "Tailwind CSS"],
      type: "web",
      href: '/project/certiflow-pro',
      icon: <Compass className="w-5 h-5" />
    },
    {
      title: "QUAN",
      desc: "個人作品集網站，展示開發者的作品與技能。",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      type: "web",
      href: '/project/quan-portfolio',
      icon: <Compass className="w-5 h-5" />
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 selection:bg-sky-500/30">
      {/* 導覽列 */}
      <nav className="fixed w-full z-50 backdrop-blur-md border-b border-slate-800/50 bg-[#0F172A]/70">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            QUAN
          </span>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#projects" className="hover:text-sky-400 transition-colors">Projects</a>
            <Link href="/about" className="hover:text-sky-400 transition-colors">About</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32">
        {/* Hero Section */}
        <section className="py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-[1fr_auto] items-center gap-12"
          >
            <div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                程式<span className="text-sky-400">能動</span>,<br />
                就<span className="text-emerald-400">不要</span>動它.
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
                我是 Quan ，目前就讀國立雲林科技大學，資訊管理系-人工智慧技優專班。
                <br />
                歡迎和我分享有趣的專案想法或合作機會！
              </p>
              <div className="flex gap-4">
                <a href="#projects" rel="noopener noreferrer" className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                  查看作品 <ChevronRight className="w-4 h-4" /> 
                </a>
                <a href="https://github.com/Quanchen0520" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg font-semibold transition-all border border-slate-700">
                  <Github className="w-5 h-5" /> GitHub
                </a>
              </div>
            </div>

            <div className="justify-self-center lg:justify-self-end">
              <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-slate-700/70 shadow-lg">
                <img
                  src={profileImage}
                  alt="Quan profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* 專案展示區塊 */}
        <section id="projects" className="py-20 border-t border-slate-800/50">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Projects</h2>
            <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800">
              {['all', 'mobile','web', 'hardware'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm capitalize transition-all ${
                    activeTab === tab ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => activeTab === 'all' || p.type === activeTab).map((project, index) => (
              <Link key={project.title} href={project.href} className="block">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-sky-500/50 transition-all hover:shadow-[0_0_30px_-10px_rgba(56,189,248,0.2)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    VIEW DETAIL <ExternalLink className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* 底部資訊 */}
        <footer className="py-20 text-center border-t border-slate-800/50">
          <p className="text-slate-500 text-sm mb-4">© 2026 Quan Dev. Built with Next.js.</p>
          <div className="flex justify-center gap-6 text-slate-400">
            <a href={`mailto:${contactEmail}`} aria-label="Send email" className="hover:text-sky-400 transition-colors">
              <Mail className="cursor-pointer w-5 h-5" />
            </a>
            <a href="https://github.com/Quanchen0520" target="_blank" rel="noopener noreferrer">
              <Github className="hover:text-sky-400 cursor-pointer w-5 h-5" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
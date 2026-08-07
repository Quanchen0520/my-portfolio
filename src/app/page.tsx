import Link from "next/link";
import { Github, ChevronRight, Mail } from "lucide-react";
import ProjectsSection from "@/components/ProjectsSection";
import { listProjects } from "@/lib/projects";

export const revalidate = 0;

export default async function Portfolio() {
  const contactEmail = "kevinquan0520@gmail.com";
  const profileImage = "/CEAC3C87-3901-4719-8177-08D5F1A7F284.JPG";
  const projects = await listProjects();

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
            <Link href="/services" className="hover:text-sky-400 transition-colors">Services</Link>
            <Link href="/about" className="hover:text-sky-400 transition-colors">About</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32">
        {/* Hero Section */}
        <section className="py-20">
          <div className="grid lg:grid-cols-[1fr_auto] items-center gap-12">
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
          </div>
        </section>

        {/* 專案展示區塊 */}
        <ProjectsSection projects={projects} />

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
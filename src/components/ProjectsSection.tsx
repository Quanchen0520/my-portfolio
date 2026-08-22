"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Compass, Cpu, ExternalLink, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  smartphone: Smartphone,
  compass: Compass,
  cpu: Cpu,
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section id="projects" className="py-20 border-t border-slate-800/50">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold">Projects</h2>
        <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800">
          {["all", "mobile", "web", "hardware"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm capitalize transition-all ${
                activeTab === tab
                  ? "bg-sky-500 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          .filter((p) => activeTab === "all" || p.type === activeTab)
          .map((project) => {
            const Icon = ICONS[project.icon] ?? Compass;
            return (
              <Link key={project.id} href={project.href} className="block">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-sky-500/50 transition-all hover:shadow-[0_0_30px_-10px_rgba(56,189,248,0.2)] overflow-hidden"
                >
                  {project.image_url ? (
                    <div className="relative w-full h-40 bg-slate-800">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    VIEW DETAIL <ExternalLink className="w-3 h-3" />
                  </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
      </div>
    </section>
  );
}
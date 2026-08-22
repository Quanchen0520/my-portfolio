import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";
import ViewCounter from "@/components/ViewCounter";
import { getProjectBySlug } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { title, description, role, timeline, tech, highlights, demo_url, github_url, gallery } = project;

  return (
    <main className="min-h-screen bg-[#0F172A] text-slate-200 px-6 py-16">
      <ViewCounter slug={slug} />
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          回到首頁
        </Link>

        <header className="mt-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
          {description && <p className="text-slate-400 mt-4 leading-relaxed">{description}</p>}
        </header>

        {(role || timeline) && (
          <section className="grid md:grid-cols-2 gap-4 mb-8">
            {role && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-400">Role</p>
                <p className="text-lg font-semibold mt-2">{role}</p>
              </div>
            )}
            {timeline && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-400">Timeline</p>
                <p className="text-lg font-semibold mt-2">{timeline}</p>
              </div>
            )}
          </section>
        )}

        {tech.length > 0 && (
          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-xs uppercase tracking-wider bg-slate-800 px-2.5 py-1 rounded text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {(highlights.length > 0 || demo_url || github_url) && (
          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
            {highlights.length > 0 && (
              <>
                <h2 className="text-xl font-bold mb-4">Highlights</h2>
                <ul className="space-y-3 text-slate-300">
                  {highlights.map((h, i) => (
                    <li key={i} className="leading-relaxed">
                      • {h}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {(demo_url || github_url) && (
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
                {github_url && (
                  <a
                    href={github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    查看 GitHub Repository
                  </a>
                )}
                {demo_url && (
                  <a
                    href={demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    查看線上作品
                  </a>
                )}
              </div>
            )}
          </section>
        )}

        {gallery.length > 0 && (
          <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">專案預覽</h2>
            {gallery.map((item, i) => (
              <div key={i}>
                {i > 0 && <div className="divider" />}
                <div
                  className={`relative w-full overflow-hidden rounded-lg border border-slate-800 ${
                    item.type === "video" ? "aspect-[16/9]" : "aspect-[16/10]"
                  }`}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt || title}
                      fill
                      className="object-cover border border-slate-700 rounded-lg"
                      priority={i === 0}
                    />
                  )}
                </div>
                {item.caption && <p className="text-sm text-slate-400 mt-3">{item.caption}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

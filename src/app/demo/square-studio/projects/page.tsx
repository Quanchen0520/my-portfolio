import type { Metadata } from 'next';
import { projects } from '../_data/projects';
import Reveal from '../_components/Reveal';
import SectionHeading from '../_components/SectionHeading';
import ProjectCard from '../_components/ProjectCard';
import CTA from '../_components/CTA';

export const metadata: Metadata = {
  title: '作品案例',
  description:
    '瀏覽方寸設計的住宅、商業空間與軟裝陳設作品。每一個案例，都是一段關於人與空間的對話。',
  alternates: { canonical: '/demo/square-studio/projects' },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:pt-24 lg:px-8">
        <SectionHeading
          eyebrow="Works"
          title="作品案例"
          desc="精選歷年完成的住宅與商業空間，點開任一案例，看見設計背後的思考。"
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 100}>
              <ProjectCard project={p} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}

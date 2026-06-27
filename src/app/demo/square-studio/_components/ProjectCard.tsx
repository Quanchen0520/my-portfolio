import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BASE } from '../_data/site';
import type { Project } from '../_data/projects';

export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Link
      href={`${BASE}/projects/${project.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e7e2d9]">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-[#f7f5f2] text-[#1c1a17] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-[family-name:var(--font-serif-tc)] text-lg font-bold text-[#1c1a17] transition-colors group-hover:text-[#b5835a]">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-[#6b645c]">
            {project.category}・{project.area}
          </p>
        </div>
        <span className="font-[family-name:var(--font-playfair)] text-sm text-[#9a9087]">
          {project.year}
        </span>
      </div>
    </Link>
  );
}

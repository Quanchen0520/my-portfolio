import { getSql } from "./db";

export type GalleryItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  type: string;
  icon: string;
  href: string;
  sort_order: number;
  image_url: string | null;
  role: string | null;
  timeline: string | null;
  highlights: string[];
  demo_url: string | null;
  github_url: string | null;
  gallery: GalleryItem[];
};

const COLUMNS = `id, slug, title, description, tech, type, icon, sort_order, image_url,
  role, timeline, highlights, demo_url, github_url, gallery`;

type ProjectInput = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  type: string;
  icon: string;
  sort_order?: number;
  image_url?: string | null;
  role?: string | null;
  timeline?: string | null;
  highlights?: string[];
  demo_url?: string | null;
  github_url?: string | null;
  gallery?: GalleryItem[];
};

function toHref(slug: string) {
  return `/project/${slug}`;
}

function toProject(row: Omit<Project, "href">): Project {
  return { ...row, href: toHref(row.slug) };
}

export async function listProjects(): Promise<Project[]> {
  const sql = getSql();
  const rows = (await sql`
    SELECT ${sql.unsafe(COLUMNS)}
    FROM projects
    ORDER BY sort_order ASC, id ASC
  `) as Omit<Project, "href">[];

  return rows.map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const sql = getSql();
  const rows = (await sql`
    SELECT ${sql.unsafe(COLUMNS)}
    FROM projects
    WHERE slug = ${slug}
  `) as Omit<Project, "href">[];

  const row = rows[0];
  return row ? toProject(row) : null;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO projects (slug, title, description, tech, type, icon, sort_order, image_url, role, timeline, highlights, demo_url, github_url, gallery)
    VALUES (
      ${input.slug}, ${input.title}, ${input.description}, ${input.tech}, ${input.type}, ${input.icon},
      ${input.sort_order ?? 0}, ${input.image_url ?? null}, ${input.role ?? null}, ${input.timeline ?? null},
      ${input.highlights ?? []}, ${input.demo_url ?? null}, ${input.github_url ?? null},
      ${JSON.stringify(input.gallery ?? [])}
    )
    RETURNING ${sql.unsafe(COLUMNS)}
  `) as Omit<Project, "href">[];

  return toProject(rows[0]);
}

export async function updateProject(id: number, input: ProjectInput): Promise<Project | null> {
  const sql = getSql();
  const rows = (await sql`
    UPDATE projects
    SET slug = ${input.slug},
        title = ${input.title},
        description = ${input.description},
        tech = ${input.tech},
        type = ${input.type},
        icon = ${input.icon},
        sort_order = ${input.sort_order ?? 0},
        image_url = ${input.image_url ?? null},
        role = ${input.role ?? null},
        timeline = ${input.timeline ?? null},
        highlights = ${input.highlights ?? []},
        demo_url = ${input.demo_url ?? null},
        github_url = ${input.github_url ?? null},
        gallery = ${JSON.stringify(input.gallery ?? [])},
        updated_at = now()
    WHERE id = ${id}
    RETURNING ${sql.unsafe(COLUMNS)}
  `) as Omit<Project, "href">[];

  const row = rows[0];
  return row ? toProject(row) : null;
}

export async function deleteProject(id: number): Promise<boolean> {
  const sql = getSql();
  const rows = (await sql`DELETE FROM projects WHERE id = ${id} RETURNING id`) as { id: number }[];
  return rows.length > 0;
}

import { getSql } from "./db";

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
};

function toHref(slug: string) {
  return `/project/${slug}`;
}

export async function listProjects(): Promise<Project[]> {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, slug, title, description, tech, type, icon, sort_order
    FROM projects
    ORDER BY sort_order ASC, id ASC
  `) as Omit<Project, "href">[];

  return rows.map((row) => ({ ...row, href: toHref(row.slug) }));
}

export async function createProject(input: {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  type: string;
  icon: string;
  sort_order?: number;
}): Promise<Project> {
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO projects (slug, title, description, tech, type, icon, sort_order)
    VALUES (${input.slug}, ${input.title}, ${input.description}, ${input.tech}, ${input.type}, ${input.icon}, ${input.sort_order ?? 0})
    RETURNING id, slug, title, description, tech, type, icon, sort_order
  `) as Omit<Project, "href">[];

  const row = rows[0];
  return { ...row, href: toHref(row.slug) };
}

export async function updateProject(
  id: number,
  input: {
    slug: string;
    title: string;
    description: string;
    tech: string[];
    type: string;
    icon: string;
    sort_order?: number;
  }
): Promise<Project | null> {
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
        updated_at = now()
    WHERE id = ${id}
    RETURNING id, slug, title, description, tech, type, icon, sort_order
  `) as Omit<Project, "href">[];

  const row = rows[0];
  if (!row) return null;
  return { ...row, href: toHref(row.slug) };
}

export async function deleteProject(id: number): Promise<boolean> {
  const sql = getSql();
  const rows = (await sql`DELETE FROM projects WHERE id = ${id} RETURNING id`) as { id: number }[];
  return rows.length > 0;
}
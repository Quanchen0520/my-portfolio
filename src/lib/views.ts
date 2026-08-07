import { getSql } from "./db";

export async function incrementView(slug: string): Promise<number> {
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO page_views (slug, views, updated_at)
    VALUES (${slug}, 1, now())
    ON CONFLICT (slug)
    DO UPDATE SET views = page_views.views + 1, updated_at = now()
    RETURNING views
  `) as { views: number }[];

  return rows[0].views;
}

export async function getViewCount(slug: string): Promise<number> {
  const sql = getSql();
  const rows = (await sql`SELECT views FROM page_views WHERE slug = ${slug}`) as {
    views: number;
  }[];
  return rows[0]?.views ?? 0;
}

export async function getAllViewCounts(): Promise<Record<string, number>> {
  const sql = getSql();
  const rows = (await sql`SELECT slug, views FROM page_views`) as {
    slug: string;
    views: number;
  }[];
  return Object.fromEntries(rows.map((r) => [r.slug, r.views]));
}
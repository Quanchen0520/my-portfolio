import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const seedProjects = [
  {
    slug: "building-mobile",
    title: "Building...",
    description: "Building...",
    tech: ["Kotlin", "Jetpack Compose", "MVVM"],
    type: "mobile",
    icon: "smartphone",
    sort_order: 0,
  },
  {
    slug: "",
    title: "憬宏半導體公司官網",
    description: "憬宏半導體公司官網。",
    tech: ["Next.js", "Tailwind CSS"],
    type: "web",
    icon: "compass",
    sort_order: 1,
  },
  {
    slug: "beyblade-interactive-module",
    title: "戰鬥陀螺互動計分模組",
    description: "利用Arduino Nano結合電路設計，用於戰鬥陀螺對戰分數控制及聲光控制。",
    tech: ["Arduino", "電路設計", "焊接"],
    type: "hardware",
    icon: "cpu",
    sort_order: 2,
  },
  {
    slug: "quan-watchlist",
    title: "QuanWatchlist",
    description: "本地端看盤小工具。",
    tech: ["Next.js", "Tailwind CSS"],
    type: "web",
    icon: "compass",
    sort_order: 3,
  },
  {
    slug: "elevator-timer-module",
    title: "電梯倒數計時模組",
    description: "利用Arduino UNO結合電路設計，用於電梯開關門控制。",
    tech: ["Arduino", "電路設計", "焊接"],
    type: "hardware",
    icon: "cpu",
    sort_order: 4,
  },
  {
    slug: "certiflow-pro",
    title: "CertiFlow Pro",
    description: "活動證明產生系統，支援多種證明格式與自動化生成。",
    tech: ["Next.js", "GAS", "Tailwind CSS"],
    type: "web",
    icon: "compass",
    sort_order: 5,
  },
  {
    slug: "quan-portfolio",
    title: "QUAN",
    description: "個人作品集網站，展示開發者的作品與技能。",
    tech: ["Next.js", "Tailwind CSS"],
    type: "web",
    icon: "compass",
    sort_order: 6,
  },
];

async function main() {
  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      tech TEXT[] NOT NULL DEFAULT '{}',
      type TEXT NOT NULL DEFAULT 'web',
      icon TEXT NOT NULL DEFAULT 'compass',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS page_views (
      slug TEXT PRIMARY KEY,
      views INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  console.log("Seeding projects (skipping ones that already exist)...");

  for (const p of seedProjects) {
    await sql`
      INSERT INTO projects (slug, title, description, tech, type, icon, sort_order)
      VALUES (${p.slug}, ${p.title}, ${p.description}, ${p.tech}, ${p.type}, ${p.icon}, ${p.sort_order})
      ON CONFLICT (slug) DO NOTHING
    `;
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
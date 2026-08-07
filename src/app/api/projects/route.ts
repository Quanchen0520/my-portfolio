import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { createProject, listProjects } from "@/lib/projects";

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const body = await request.json();
  const { slug, title, description, tech, type, icon, sort_order } = body;

  if (typeof slug !== "string" || typeof title !== "string") {
    return NextResponse.json({ error: "缺少必要欄位" }, { status: 400 });
  }

  try {
    const project = await createProject({
      slug,
      title,
      description: description ?? "",
      tech: Array.isArray(tech) ? tech : [],
      type: type ?? "web",
      icon: icon ?? "compass",
      sort_order,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message.includes("duplicate key")) {
      return NextResponse.json({ error: "slug 已經被使用" }, { status: 409 });
    }
    throw err;
  }
}
import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { deleteProject, updateProject } from "@/lib/projects";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: "無效的 id" }, { status: 400 });
  }

  const body = await request.json();
  const { slug, title, description, tech, type, icon, sort_order } = body;

  if (typeof slug !== "string" || typeof title !== "string") {
    return NextResponse.json({ error: "缺少必要欄位" }, { status: 400 });
  }

  try {
    const project = await updateProject(numericId, {
      slug,
      title,
      description: description ?? "",
      tech: Array.isArray(tech) ? tech : [],
      type: type ?? "web",
      icon: icon ?? "compass",
      sort_order,
    });

    if (!project) {
      return NextResponse.json({ error: "找不到專案" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (err) {
    if (err instanceof Error && err.message.includes("duplicate key")) {
      return NextResponse.json({ error: "slug 已經被使用" }, { status: 409 });
    }
    throw err;
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: "無效的 id" }, { status: 400 });
  }

  const deleted = await deleteProject(numericId);
  if (!deleted) {
    return NextResponse.json({ error: "找不到專案" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
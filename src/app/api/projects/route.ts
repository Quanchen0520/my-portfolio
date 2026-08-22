import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { createProject, listProjects } from "@/lib/projects";
import { parseProjectBody } from "@/lib/project-input";

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = parseProjectBody(body);

  if (!parsed) {
    return NextResponse.json({ error: "缺少必要欄位" }, { status: 400 });
  }

  try {
    const project = await createProject(parsed);

    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message.includes("duplicate key")) {
      return NextResponse.json({ error: "slug 已經被使用" }, { status: 409 });
    }
    throw err;
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getViewCount, incrementView } from "@/lib/views";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const views = await getViewCount(slug);
  return NextResponse.json({ slug, views });
}

export async function POST(_request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const views = await incrementView(slug);
  return NextResponse.json({ slug, views });
}
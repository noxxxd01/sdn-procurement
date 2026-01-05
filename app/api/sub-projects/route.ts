import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const projectId = Number(url.searchParams.get("projectId"));

    if (!projectId) return NextResponse.json([], { status: 400 });

    const [rows] = await db.query(
      "SELECT id, name FROM tbl_sub_projects WHERE project_id = ?",
      [projectId]
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch sub-projects" },
      { status: 500 }
    );
  }
}

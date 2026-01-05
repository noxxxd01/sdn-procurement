import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  const projectId = Number(params.projectID);
  if (!projectId || isNaN(projectId)) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 }
    );
  }

  const [rows] = await db.query(
    "SELECT id, name FROM tbl_sub_projects WHERE project_id = ?",
    [projectId]
  );

  return NextResponse.json(rows);
}

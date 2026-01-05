import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(req: Request, { params }: RouteContext) {
  try {
    const { slug } = await params; // ✅ THIS IS THE FIX

    if (!slug) {
      return NextResponse.json(
        { message: "Project slug is required" },
        { status: 400 }
      );
    }

    const projectName = slug.replace(/-/g, " ");

    const [rows] = await db.query(
      `
      SELECT
        id,
        procurement_id,
        project,
        sub_project,
        year,
        total_budget,
        total_budget AS remaining_balance,
        status,
        created_at
      FROM tbl_procurements
      WHERE LOWER(project) = LOWER(?)
      ORDER BY created_at DESC
      `,
      [projectName]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

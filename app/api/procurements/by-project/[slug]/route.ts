/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { message: "Project slug is required" },
        { status: 400 }
      );
    }

    // 1️⃣ Get project by slug
    const [projects] = await db.query<RowDataPacket[]>(
      "SELECT id, name FROM tbl_projects WHERE LOWER(slug) = LOWER(?)",
      [slug]
    );

    if (!projects.length) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    const project = projects[0];

    // 2️⃣ Get sub-projects for this project
    const [subProjectsRows] = await db.query<RowDataPacket[]>(
      "SELECT id, name FROM tbl_sub_projects WHERE project_id = ? ORDER BY name ASC",
      [project.id]
    );

    const subProjects = subProjectsRows.map((sp) => sp.name);

    // 3️⃣ Get all procurements for this project
    const [procurements] = await db.query<RowDataPacket[]>(
      `
      SELECT 
        p.id,
        p.procurement_id,
        p.year,
        p.total_budget,
        p.remaining_balance,
        p.status,
        pr.name AS project,
        pr.slug AS project_slug,
        sp.name AS sub_project
      FROM tbl_procurements p
      JOIN tbl_projects pr ON p.project_id = pr.id
      LEFT JOIN tbl_sub_projects sp ON p.sub_project_id = sp.id
      WHERE LOWER(pr.slug) = LOWER(?)
      ORDER BY p.created_at DESC;
      `,
      [slug]
    );

    return NextResponse.json({
      project: project.name,
      subProjects,
      rows: procurements,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

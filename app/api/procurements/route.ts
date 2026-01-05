/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all procurements
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.id,
        p.procurement_id,
        pr.name AS project,
        sp.name AS sub_project,
        p.year,
        p.total_budget,
        p.remaining_balance,
        p.status,
        p.created_at
      FROM tbl_procurements p
      JOIN tbl_projects pr ON p.project_id = pr.id
      LEFT JOIN tbl_sub_projects sp ON p.sub_project_id = sp.id
      ORDER BY p.created_at DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch procurements" },
      { status: 500 }
    );
  }
}

// CREATE procurement
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      procurementId,
      projectId, // now expects ID
      subProjectId, // optional
      year,
      totalBudget,
      status = "Pending",
    } = body;

    if (!procurementId || !projectId || !year || !totalBudget) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(
      `
      INSERT INTO tbl_procurements
        (procurement_id, project_id, sub_project_id, year, total_budget, status)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        procurementId,
        projectId,
        subProjectId || null,
        year,
        totalBudget,
        status,
      ]
    );

    return NextResponse.json(
      { message: "Procurement created" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Procurement ID already exists" },
        { status: 409 }
      );
    }

    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

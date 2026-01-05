/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all procurements
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        procurement_id,
        project,
        sub_project,
        year,
        total_budget,
        remaining_balance
        status,
        created_at
      FROM tbl_procurements
      ORDER BY created_at DESC
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
      project,
      subProject,
      year,
      totalBudget,
      status = "Pending",
    } = body;

    if (!procurementId || !project || !subProject || !year || !totalBudget) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(
      `
      INSERT INTO tbl_procurements
        (procurement_id, project, sub_project, year, total_budget, status)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [procurementId, project, subProject, year, totalBudget, status]
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/* ============================
   GET ALL PROCUREMENTS
============================ */
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

/* ============================
   CREATE PROCUREMENT
   + SUBTRACT FUND
============================ */
export async function POST(req: Request) {
  const connection = await db.getConnection();

  try {
    const body = await req.json();
    const {
      procurementId,
      projectId,
      subProjectId,
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

    /* 🔒 START TRANSACTION */
    await connection.beginTransaction();

    /* 1️⃣ Get project slug */
    const [[project]]: any = await connection.query(
      `SELECT slug FROM tbl_projects WHERE id = ?`,
      [projectId]
    );

    if (!project) {
      throw new Error("Project not found");
    }

    /* 2️⃣ Get sub-project name (optional) */
    let subProjectName: string | null = null;

    if (subProjectId) {
      const [[sub]]: any = await connection.query(
        `SELECT name FROM tbl_sub_projects WHERE id = ?`,
        [subProjectId]
      );
      subProjectName = sub?.name ?? null;
    }

    /* 3️⃣ Lock matching fund */
    const [[fund]]: any = await connection.query(
      `
      SELECT *
      FROM project_funds
      WHERE project_slug = ?
        AND year = ?
        AND (
          (sub_project IS NULL AND ? IS NULL)
          OR sub_project = ?
        )
      FOR UPDATE
      `,
      [project.slug, year, subProjectName, subProjectName]
    );

    if (!fund) {
      throw new Error("No matching fund found");
    }

    if (Number(fund.amount) < Number(totalBudget)) {
      throw new Error("Insufficient fund balance");
    }

    /* 4️⃣ Deduct fund */
    await connection.query(
      `
      UPDATE project_funds
      SET amount = amount - ?
      WHERE id = ?
      `,
      [totalBudget, fund.id]
    );

    /* 5️⃣ Create procurement */
    await connection.query(
      `
      INSERT INTO tbl_procurements
        (
          procurement_id,
          project_id,
          sub_project_id,
          year,
          total_budget,
          remaining_balance,
          status
        )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        procurementId,
        projectId,
        subProjectId || null,
        year,
        totalBudget,
        totalBudget, // ✅ IMPORTANT FIX
        status,
      ]
    );

    /* ✅ COMMIT */
    await connection.commit();

    return NextResponse.json(
      { message: "Procurement created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    await connection.rollback();

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Procurement ID already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}

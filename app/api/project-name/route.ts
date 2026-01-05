import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Remove created_at ordering
    const [rows] = await db.query(
      "SELECT id, name, slug FROM tbl_projects" // no ORDER BY
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

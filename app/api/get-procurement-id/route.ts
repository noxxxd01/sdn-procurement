// app/api/get-procurement-id/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query(
    "SELECT id, procurement_id FROM tbl_procurements"
  );
  return NextResponse.json(rows);
}

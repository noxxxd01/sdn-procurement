import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await db.query(`DELETE FROM tbl_procurements WHERE id = ?`, [id]);

    return NextResponse.json({ message: "Procurement deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete procurement" },
      { status: 500 }
    );
  }
}

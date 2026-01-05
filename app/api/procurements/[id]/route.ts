import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ unwrap params
    const procurementId = Number(id);

    if (!procurementId) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await db.query("DELETE FROM tbl_procurements WHERE id = ?", [
      procurementId,
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json(
      { message: "Failed to delete procurement" },
      { status: 500 }
    );
  }
}

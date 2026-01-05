import { db } from "@/lib/db";

type Params = { id: string };

export async function DELETE(
  request: Request,
  { params }: { params: Params | Promise<Params> } // make it a promise
) {
  // unwrap params
  const { id } = "then" in params ? await params : params;

  if (!id) throw new Error("Fund ID is missing");

  await db.query("DELETE FROM project_funds WHERE id = ?", [id]);

  return new Response(JSON.stringify({ message: "Fund deleted" }), {
    status: 200,
  });
}

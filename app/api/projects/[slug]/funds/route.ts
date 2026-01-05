// app/api/projects/[slug]/funds/route.ts
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const [rows] = await db.query(
    "SELECT id, sub_project AS projectName, amount AS budget, year, created_at FROM project_funds WHERE project_slug = ?",
    [slug]
  );

  return new Response(JSON.stringify(rows), { status: 200 });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  // unwrap params
  const { slug } = await context.params;

  if (!slug) throw new Error("Project slug is missing");

  const body = await request.json();
  const { subProject, fund, year } = body;

  await db.query(
    "INSERT INTO project_funds (project_slug, sub_project, amount, year) VALUES (?, ?, ?, ?)",
    [slug, subProject, fund, year]
  );

  return new Response(JSON.stringify({ message: "Fund added" }), {
    status: 201,
  });
}

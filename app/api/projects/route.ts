import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // make sure this exists

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT * FROM project_categories ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error); // <--- add this to see the error in server logs
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, amount = 0, progress = 0 } = body;

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    await db.query(
      `INSERT INTO project_categories (title, slug, amount, progress) VALUES (?, ?, ?, ?)`,
      [title, slug, amount, progress]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error); // <--- add this
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await db.query("DELETE FROM project_categories WHERE slug = ?", [slug]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

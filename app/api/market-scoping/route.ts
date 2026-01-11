// app/api/market-scoping/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();

  // Extract fields
  const marketScopingId = formData.get("marketScopingId") as string;
  const procurementId = formData.get("procurementId") as string;
  const status = formData.get("status") as string;
  const procuringEntity = formData.get("procuringEntity") as string;
  const endUser = formData.get("endUser") as string;
  const repName = formData.get("repName") as string;
  const repDesignation = formData.get("repDesignation") as string;
  const projectName = formData.get("projectName") as string;
  const estimatedBudget = Number(formData.get("estimatedBudget"));
  const marketScopingPeriod = JSON.parse(
    formData.get("marketScopingPeriod") as string
  );
  const expectedDeliveryDate = new Date(
    formData.get("expectedDeliveryDate") as string
  );

  // Handle file
  const file = formData.get("file") as File | null;
  let filePath: string | null = null;

  if (file) {
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Create uploads folder if not exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });

    // Generate a unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = path.join(uploadsDir, filename);

    // Convert file to buffer and save
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);

    filePath = `/uploads/${filename}`; // Path to store in DB
  }

  // Insert into database including file path
  await db.query(
    `INSERT INTO tbl_market_scoping
   (
     market_scoping_id,
     procurement_id,
     status,
     procuring_entity,
     end_user,
     rep_name,
     rep_designation,
     project_name,
     estimated_budget,
     market_scoping_from,
     market_scoping_to,
     expected_delivery_date,
     file_path
   )
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      marketScopingId, // ✅ NEW
      procurementId,
      status,
      procuringEntity,
      endUser,
      repName,
      repDesignation,
      projectName,
      estimatedBudget,
      marketScopingPeriod.from,
      marketScopingPeriod.to,
      expectedDeliveryDate,
      filePath, // ✅ THIS WAS MISSING
    ]
  );

  return NextResponse.json({
    message: "Market Scoping Template saved",
    filePath,
  });
}

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        market_scoping_id,
        procurement_id,
        status,
        procuring_entity,
        end_user,
        rep_name,
        rep_designation,
        project_name,
        estimated_budget,
        market_scoping_from,
        market_scoping_to,
        expected_delivery_date,
        file_path
      FROM tbl_market_scoping
      ORDER BY id DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch market scoping data" },
      { status: 500 }
    );
  }
}

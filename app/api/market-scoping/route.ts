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

  // Market Scoping Period
  const marketScopingPeriod = JSON.parse(
    formData.get("marketScopingPeriod") as string
  );
  let marketScopingFrom: string | null = null;
  let marketScopingTo: string | null = null;

  if (marketScopingPeriod) {
    if (marketScopingPeriod.from) {
      const [fromMonth, fromYear] = marketScopingPeriod.from
        .split("/")
        .map(Number);
      marketScopingFrom = `${fromYear}-${String(fromMonth).padStart(
        2,
        "0"
      )}-01`; // YYYY-MM-DD
    }
    if (marketScopingPeriod.to) {
      const [toMonth, toYear] = marketScopingPeriod.to.split("/").map(Number);
      marketScopingTo = `${toYear}-${String(toMonth).padStart(2, "0")}-01`; // YYYY-MM-DD
    }
  }

  // Expected Delivery Date
  const expectedDeliveryStr = formData.get("expectedDeliveryDate") as string;
  let expectedDeliveryDate: string | null = null;
  if (expectedDeliveryStr) {
    const [month, year] = expectedDeliveryStr.split("/").map(Number);
    if (!isNaN(month) && !isNaN(year)) {
      expectedDeliveryDate = `${year}-${String(month).padStart(2, "0")}-01`; // YYYY-MM-DD
    }
  }

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

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });

    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = path.join(uploadsDir, filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);

    filePath = `/uploads/${filename}`;
  }

  // Insert into DB
  await db.query(
    `INSERT INTO tbl_market_scoping
     (market_scoping_id, procurement_id, status, procuring_entity, end_user,
      rep_name, rep_designation, project_name, estimated_budget,
      market_scoping_from, market_scoping_to, expected_delivery_date, file_path)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      marketScopingId,
      procurementId,
      status,
      procuringEntity,
      endUser,
      repName,
      repDesignation,
      projectName,
      estimatedBudget,
      marketScopingFrom,
      marketScopingTo,
      expectedDeliveryDate,
      filePath,
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

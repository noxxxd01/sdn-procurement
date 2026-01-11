import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";

// Define the type of a single record, extending RowDataPacket
interface MarketScopingRecord extends RowDataPacket {
  market_scoping_id: string;
  procurement_id: string;
  status: string;
  procuring_entity: string;
  end_user: string;
  rep_name: string;
  rep_designation: string;
  project_name: string;
  estimated_budget: number;
  market_scoping_from: string | null;
  market_scoping_to: string | null;
  expected_delivery_date: string | null;
  file_path: string | null;
}

export async function GET(
  req: Request,
  { params }: { params: { msid: string } }
) {
  const { msid } = params;

  // Tell TypeScript we expect an array of MarketScopingRecord
  const [rows] = await db.query<MarketScopingRecord[]>(
    `SELECT 
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
     WHERE market_scoping_id = ?`,
    [msid]
  );

  if (!rows || rows.length === 0) {
    return NextResponse.json(
      { error: "Market Scoping not found" },
      { status: 404 }
    );
  }

  const record = rows[0];

  const marketScopingPeriod = {
    from: record.market_scoping_from
      ? new Date(record.market_scoping_from + "-01")
      : null,
    to: record.market_scoping_to
      ? new Date(record.market_scoping_to + "-01")
      : null,
  };

  const expectedDeliveryDate = record.expected_delivery_date
    ? new Date(record.expected_delivery_date + "-01")
    : null;

  return NextResponse.json({
    ...record,
    marketScopingPeriod,
    expectedDeliveryDate,
  });
}

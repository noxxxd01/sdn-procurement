/* eslint-disable @typescript-eslint/no-explicit-any */
export type Procurement = {
  id: number;
  procurement_id: string;
  project: string;
  sub_project: string;
  year: number;
  total_budget: number;
  remaining_balance: number;
  status: string;
  created_at: string;
};

export async function getProcurementsBySlug(slug: string) {
  const res = await fetch(`/api/procurements/by-project/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch procurements");
  return res.json();
}

export async function createProcurement(data: any) {
  const res = await fetch("/api/procurements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
}

export async function deleteProcurement(id: number) {
  const res = await fetch(`/api/procurements/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete procurement");
}

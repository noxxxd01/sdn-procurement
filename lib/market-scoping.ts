/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/api.ts

export async function fetchProcurements() {
  const res = await fetch("/api/get-procurement-id", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch procurements");
  return res.json(); // now returns just [{id, procurement_id}, ...]
}

export async function submitMarketScoping(formData: FormData) {
  const res = await fetch("/api/market-scoping", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to submit form");
  return res.json();
}

export async function fetchMarketScopings() {
  const res = await fetch("/api/market-scoping");

  if (!res.ok) {
    throw new Error("Failed to fetch market scopings");
  }

  return res.json();
}

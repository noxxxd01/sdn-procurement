export async function postFund(
  projectSlug: string,
  data: { subProject: string; fund: number; year: number }
) {
  const res = await fetch(`/api/projects/${projectSlug}/funds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add fund");
  return res.json();
}

export async function getFundsByProject(slug: string) {
  const res = await fetch(`/api/projects/${slug}/funds`, {
    cache: "no-store", // always fresh
  });

  console.log(slug);

  if (!res.ok) {
    throw new Error("Failed to fetch funds");
  }

  return res.json();
}

export async function deleteFund(fundId: number) {
  const res = await fetch(`/api/funds/${fundId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete fund");
  return res.json();
}

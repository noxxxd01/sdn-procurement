/* eslint-disable @typescript-eslint/no-explicit-any */

export type Project = {
  id: number;
  name: string;
  slug: string;
};

export type SubProject = {
  id: number;
  name: string;
};

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

// Get all projects
export async function getProjects() {
  const res = await fetch("/api/project-name", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json() as Promise<Project[]>;
}

// Get sub-projects by project ID
export async function getSubProjects(projectId: number) {
  const res = await fetch(`/api/sub-projects?projectId=${projectId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch sub-projects");
  return res.json() as Promise<SubProject[]>;
}

// Create procurement
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

// Delete procurement by ID
export async function deleteProcurement(id: number) {
  const res = await fetch(`/api/procurements/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete procurement");
  }
}

// Get procurements by project slug
export async function getProcurementsBySlug(slug: string) {
  const res = await fetch(`/api/procurements/by-project/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch procurements");
  return res.json();
}

export async function getProjects() {
  const res = await fetch("/api/projects", { cache: "no-store" }); // disable caching for real-time
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function postProject(data: {
  title: string;
  amount?: number;
  progress?: number;
}) {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Failed to create project");
  }

  return res.json();
}

export async function deleteProject(slug: string) {
  if (!slug) throw new Error("Slug is required");

  const res = await fetch(`/api/projects?slug=${slug}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || "Failed to delete project");
  }

  return true;
}

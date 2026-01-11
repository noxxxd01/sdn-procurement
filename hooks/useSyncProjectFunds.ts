/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQueries } from "@tanstack/react-query";
import { getFundsByProject } from "@/lib/funds";

export function useProjectTotals(projects: any[]) {
  const queries = useQueries({
    queries: projects.map((project) => ({
      queryKey: ["project-funds", project.slug],
      queryFn: () => getFundsByProject(project.slug),
      enabled: !!project.slug,
    })),
  });

  const totals: Record<string, number> = {};

  queries.forEach((q, index) => {
    const slug = projects[index]?.slug;
    const funds = q.data || [];

    totals[slug] = funds.reduce(
      (sum: number, fund: any) => sum + Number(fund.budget || 0),
      0
    );
  });

  return totals;
}

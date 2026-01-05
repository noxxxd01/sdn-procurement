"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbFromPath() {
  const pathname = usePathname(); // e.g., /dashboard/projects/asdas
  const segments = pathname.split("/").filter(Boolean); // ["dashboard", "projects", "asdas"]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = "/" + segments.slice(0, index + 1).join("/"); // build href for intermediate links
          const label = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()); // nice formatting

          return (
            <span key={index} className="flex items-center">
              {!isLast ? (
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                </BreadcrumbItem>
              )}

              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

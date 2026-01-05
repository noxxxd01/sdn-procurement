import AddFundButton from "@/components/add-fund-btn";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";

import { BoxIcon, Ellipsis } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import FundsGrid from "@/components/FundsGrid";
import CreateProcurementDialog from "@/components/CreateProcurementDialog";
import ProcurementTable from "@/components/ProcurementTable";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetails({ params }: PageProps) {
  const { slug } = await params;

  const projectLabel = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/dashboard" },
    { label: projectLabel, isActive: true },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <main>
        <div className="flex flex-row justify-end gap-2">
          <Button variant="outline" className="shadow-none">
            <Ellipsis className="w-2 h-2" />
          </Button>
          <AddFundButton slug={slug} />
        </div>
        <FundsGrid slug={slug} />
        <div className="mt-6 mb-6">
          <Separator />
        </div>
        <div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Procurement Tracker Table</CardTitle>
            </div>
            <div>
              <CreateProcurementDialog />
            </div>
          </div>
          <div>
            <ProcurementTable slug={slug} />
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

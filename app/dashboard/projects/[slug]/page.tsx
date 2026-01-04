import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderIcon } from "lucide-react";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetails({ params }: PageProps) {
  //const { slug } = await params;

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Building Your Application" },
        { label: "Data Fetching", isActive: true },
      ]}
    >
      <main>
        <div className="h-screen flex flex-col items-center justify-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderIcon />
              </EmptyMedia>
              <EmptyTitle>No Funds Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any funds yet. Get started by creating
                your first fund.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button>Create Fund</Button>
              </div>
            </EmptyContent>
          </Empty>
        </div>
      </main>
    </DashboardLayout>
  );
}

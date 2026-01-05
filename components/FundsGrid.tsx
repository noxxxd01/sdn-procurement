/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";

import AddFundButton from "@/components/add-fund-btn";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";
import { Ellipsis, FolderIcon, Trash2 } from "lucide-react";
import { deleteFund, getFundsByProject } from "@/lib/funds";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type FundsGridProps = {
  slug: string;
};

type Fund = {
  id: number;
  project_slug: string;
  sub_project: string;
  amount: number;
  year: number;
  created_at: string;
  progress?: number;
};

export default function FundsGrid({ slug }: FundsGridProps) {
  const queryClient = useQueryClient();
  const {
    data: projectFunds = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project-funds", slug],
    queryFn: () => getFundsByProject(slug),
  });

  // Sum total budget for the project
  const totalBudget = projectFunds.reduce(
    (sum: number, fund: Fund) => sum + parseFloat((fund as any).budget || "0"),
    0
  );

  console.log(`Total Budget for ${slug}: PHP ${totalBudget.toLocaleString()}`);

  // Delete fund mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteFund(id),
    onSuccess: () => {
      toast.success("Fund deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["project-funds", slug] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to delete fund"),
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this fund?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading funds...</p>;
  if (error) return <p>Failed to load funds</p>;

  if (projectFunds.length === 0)
    return (
      <div className="h-64 flex flex-col items-center justify-center">
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
            <AddFundButton slug={slug} />
          </EmptyContent>
        </Empty>
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {projectFunds.map((fund: any) => (
        <Card
          key={fund.id}
          className="shadow-none gap-0 hover:border-neutral-300 cursor-pointer transition h-full flex flex-col justify-between"
        >
          <CardHeader>
            <CardDescription>{fund.projectName}</CardDescription>
            <CardTitle className="text-2xl mt-4 font-bold text-[#134991]">
              PHP {Number(fund.budget).toLocaleString()}
            </CardTitle>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 m-0 text-xs text-neutral-500"
                  >
                    <Ellipsis className="w-2 h-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleDelete(fund.id)}>
                      <Trash2 className="w-2 h-2 mr-1 text-red-500" />{" "}
                      <span className="text-red-500">Delete Fund</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Progress
              value={fund.progress || 0}
              max={100}
              className="mt-4 w-full [&>div]:bg-[#134991]"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

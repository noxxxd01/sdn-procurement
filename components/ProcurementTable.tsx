/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, Trash2 } from "lucide-react";
import { getProcurementsBySlug, deleteProcurement } from "@/lib/procurements";
import { toast } from "sonner";
import { CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

type Props = {
  slug: string;
};

export default function ProcurementTable({ slug }: Props) {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["procurements", slug],
    queryFn: () => getProcurementsBySlug(slug),
    enabled: !!slug,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProcurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procurements", slug] });
      toast.success("Procurement deleted");
    },
  });

  if (isLoading) return <p className="mt-4">Loading procurements...</p>;

  return (
    <div className="border rounded-md mt-4">
      <Table>
        <TableHeader className="bg-neutral-100">
          <TableRow>
            <TableHead>Procurement ID</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Sub-project</TableHead>
            <TableHead>Year (SY)</TableHead>
            <TableHead>Total Budget</TableHead>
            <TableHead>Remaining Balance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((p: any) => (
            <TableRow key={p.id}>
              <TableCell>
                <CardTitle className="font-semibold text-[#134991]">
                  {p.procurement_id}
                </CardTitle>
              </TableCell>
              <TableCell>
                <CardDescription>{p.project}</CardDescription>
              </TableCell>
              <TableCell>
                <CardDescription>{p.sub_project}</CardDescription>
              </TableCell>
              <TableCell>
                <CardDescription>{p.year}</CardDescription>
              </TableCell>
              <TableCell>
                <CardDescription>
                  PHP {Number(p.total_budget).toLocaleString()}
                </CardDescription>
              </TableCell>
              <TableCell>
                <CardDescription>
                  PHP {Number(p.remaining_balance).toLocaleString()}
                </CardDescription>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  <BadgeCheckIcon />
                  {p.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMutation.mutate(p.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-sm">
                No procurements found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

type Props = {
  slug: string;
};

export default function ProcurementTable({ slug }: Props) {
  const queryClient = useQueryClient();

  // 🔹 delete dialog state
  const [confirmText, setConfirmText] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState(false);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["procurements", slug],
    queryFn: () => getProcurementsBySlug(slug),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProcurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procurements", slug] });
      toast.success("Procurement deleted");
      setOpen(false);
      setConfirmText("");
      setSelectedId(null);
    },
    onError: (err: any) => toast.error(err.message),
  });

  if (isLoading)
    return (
      <div className="mt-4 space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-8" />
        ))}
      </div>
    );

  return (
    <div className="mt-4 overflow-x-auto border rounded-md ">
      <Table className="min-w-full table-auto">
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
          {rows.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <Link
                  href={`/dashboard/projects/${p.project_slug}/procurement/${p.procurement_id}`}
                >
                  <CardTitle className="font-semibold text-[#134991] hover:underline cursor-pointer">
                    {p.procurement_id}
                  </CardTitle>
                </Link>
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
                  <BadgeCheckIcon className="w-3 h-3 mr-1" />
                  {p.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedId(p.id);
                        setConfirmText("");
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Procurement</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4">
                      <Label>Type &quot;DELETE&quot; to confirm</Label>
                      <Input
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <DialogFooter>
                      <Button
                        variant="destructive"
                        disabled={
                          confirmText !== "DELETE" || deleteMutation.isPending
                        }
                        onClick={() => {
                          if (selectedId) {
                            deleteMutation.mutate(selectedId);
                          }
                        }}
                      >
                        {deleteMutation.isPending
                          ? "Deleting..."
                          : "Delete Procurement"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}

          {rows.length === 0 && (
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

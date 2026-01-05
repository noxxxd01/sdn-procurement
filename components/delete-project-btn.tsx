/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/lib/projects";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

type DeleteProjectButtonProps = {
  slug: string;
};

export function DeleteProjectButton({ slug }: DeleteProjectButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [confirmation, setConfirmation] = useState("");

  const mutation = useMutation({
    mutationFn: () => deleteProject(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
      router.push("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete project");
    },
  });

  const canDelete = confirmation === "DELETE";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="shadow-none">
          <Trash2 className="w-2 h-2 text-red-500" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this project? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Label htmlFor="confirm-delete">
            Type &quot;DELETE&quot; to confirm:
          </Label>
          <Input
            id="confirm-delete"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className="mt-2"
          />
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate()}
            disabled={!canDelete || mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

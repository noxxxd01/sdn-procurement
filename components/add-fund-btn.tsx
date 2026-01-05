"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postFund } from "@/lib/funds";
import { Plus } from "lucide-react";

type FormValues = {
  subProject: string;
  fund: number;
  year: number;
};

type AddFundButtonProps = {
  slug: string;
};

export default function AddFundButton({ slug }: AddFundButtonProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const mutation = useMutation({
    mutationFn: (data: FormValues) => postFund(slug, data),
    onSuccess: () => {
      toast.success("Fund added successfully");
      queryClient.invalidateQueries({
        queryKey: ["project-funds", slug],
      });
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: FormValues) => mutation.mutate(data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-2 h-2" /> Add Fund
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Fund</DialogTitle>
            <DialogDescription>
              Add a fund under this project.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 my-6">
            <div className="space-y-2">
              <Label>Sub Project</Label>
              <Input
                {...register("subProject", { required: "Required" })}
                placeholder="Enter sub-project name"
                className="shadow-none"
              />
              {errors.subProject && (
                <p className="text-xs text-red-500">
                  {errors.subProject.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Fund</Label>
              <InputGroup className="shadow-none">
                <InputGroupInput
                  type="number"
                  {...register("fund", {
                    required: "Required",
                    valueAsNumber: true,
                  })}
                />
                <InputGroupAddon>
                  <InputGroupText>PHP</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="space-y-2">
              <Label>Year</Label>
              <InputGroup className="shadow-none">
                <InputGroupInput
                  type="number"
                  {...register("year", {
                    required: "Required",
                    valueAsNumber: true,
                  })}
                />
                <InputGroupAddon>
                  <InputGroupText>SY</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Add Fund"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

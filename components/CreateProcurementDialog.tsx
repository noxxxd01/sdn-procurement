/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoxIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { CardDescription, CardTitle } from "./ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProcurement } from "@/lib/procurements";

type FormValues = {
  project: string;
  subProject: string;
  year: number;
  totalBudget: number;
};

export default function CreateProcurementDialog() {
  const [open, setOpen] = React.useState(false);
  const [generatedId, setGeneratedId] = React.useState<string>("PR-----");

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      project: "",
      subProject: "",
      year: new Date().getFullYear(),
      totalBudget: 0,
    },
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      const { project, subProject, year } = values;

      if (!project && !subProject && !year) {
        setGeneratedId("PR-----");
        return;
      }

      const projectCode = project
        ? project
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
        : "-";
      const subProjectCode = subProject
        ? subProject
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
        : "-";
      const yearCode = year ? year.toString() : "----";
      const randomNumber = String(Math.floor(Math.random() * 900 + 100));

      setGeneratedId(
        `PR-${projectCode}-${subProjectCode}-${yearCode}-${randomNumber}`
      );
    });

    return () => subscription.unsubscribe(); // clean up
  }, []);

  const onSubmit = (data: FormValues) => {
    createMutation.mutate({
      procurementId: generatedId,
      project: data.project,
      subProject: data.subProject,
      year: data.year,
      totalBudget: data.totalBudget,
    });
  };

  const createMutation = useMutation({
    mutationFn: createProcurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procurements"] });
      toast.success("Procurement created");
      setOpen(false);
      reset();
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="shadow-none"
      >
        <BoxIcon className="w-2 h-2" /> Create Procurement
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Procurement</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new procurement entry.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Input
                  id="project"
                  placeholder="Enter Project Name"
                  className="shadow-none"
                  {...register("project", { required: "Project is required" })}
                />
                {errors.project && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.project.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subProject">Sub-project</Label>
                <Input
                  id="subProject"
                  placeholder="Enter Sub-project Name"
                  className="shadow-none"
                  {...register("subProject", {
                    required: "Sub-project is required",
                  })}
                />
                {errors.subProject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subProject.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="year">Year</Label>
              <Controller
                control={control}
                name="year"
                rules={{ required: "Year is required" }}
                render={({ field }) => (
                  <InputGroup className="shadow-none">
                    <InputGroupInput
                      type="number"
                      {...field}
                      min={2000}
                      max={2100}
                    />
                    <InputGroupAddon>
                      <InputGroupText>SY</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                )}
              />
              {errors.year && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.year.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="totalBudget">Total Budget</Label>
              <Controller
                control={control}
                name="totalBudget"
                rules={{
                  required: "Total budget is required",
                  min: { value: 1, message: "Budget must be greater than 0" },
                }}
                render={({ field }) => (
                  <InputGroup className="shadow-none">
                    <InputGroupInput type="number" {...field} />
                    <InputGroupAddon>
                      <InputGroupText>PHP</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                )}
              />
              {errors.totalBudget && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.totalBudget.message}
                </p>
              )}
            </div>

            <Separator />

            <div className="p-4 bg-green-100 rounded-md">
              <CardDescription>Procurement ID:</CardDescription>
              <div className="text-center mt-4">
                <CardTitle className="text-3xl">{generatedId}</CardTitle>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="shadow-none"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="ml-2" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

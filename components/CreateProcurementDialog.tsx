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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProcurement,
  getProjects,
  getSubProjects,
} from "@/lib/procurements";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type FormValues = {
  projectId: number;
  subProjectId?: number;
  year: number;
  totalBudget: number;
};

export default function CreateProcurementDialog() {
  const [open, setOpen] = React.useState(false);
  const [generatedId, setGeneratedId] =
    React.useState<string>("PR ---- ---- ----");
  const [selectedProjectId, setSelectedProjectId] = React.useState<number>();
  const [selectedSubProjectId, setSelectedSubProjectId] =
    React.useState<number>();

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
      projectId: 0,
      subProjectId: undefined,
      year: new Date().getFullYear(),
      totalBudget: 0,
    },
  });

  // Fetch all projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  // Fetch sub-projects for the selected project
  const { data: subProjects = [], isLoading: subProjectsLoading } = useQuery({
    queryKey: ["subProjects", selectedProjectId],
    queryFn: () =>
      selectedProjectId
        ? getSubProjects(selectedProjectId)
        : Promise.resolve([]),
    enabled: !!selectedProjectId,
  });

  // Watch form values to generate procurement ID
  React.useEffect(() => {
    const subscription = watch((values) => {
      const { projectId, subProjectId, year } = values;

      if (!projectId || !year) {
        setGeneratedId("PR-----");
        return;
      }

      const projectName = projects.find((p) => p.id === projectId)?.name || "-";
      const subProjectName =
        subProjects.find((sp) => sp.id === subProjectId)?.name || "-";

      const projectCode = projectName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase();

      const subProjectCode = subProjectName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase();

      const yearCode = year.toString();
      const randomNumber = String(Math.floor(Math.random() * 900 + 100));

      setGeneratedId(
        `PR-${projectCode}-${subProjectCode}-${yearCode}-${randomNumber}`
      );
    });

    return () => subscription.unsubscribe();
  }, [watch, projects, subProjects]);

  // Mutation to create procurement
  const createMutation = useMutation({
    mutationFn: createProcurement,
    onSuccess: () => {
      toast.success("Procurement created");

      // 🔄 refresh affected data
      queryClient.invalidateQueries({ queryKey: ["procurements"] });
      queryClient.invalidateQueries({ queryKey: ["project-funds"] });

      setOpen(false);
      reset();
      setSelectedProjectId(undefined);
      setSelectedSubProjectId(undefined);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create procurement");
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.projectId) return toast.error("Please select a project");

    createMutation.mutate({
      procurementId: generatedId,
      projectId: data.projectId,
      subProjectId: data.subProjectId || null,
      year: data.year,
      totalBudget: data.totalBudget,
    });
  };

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
            {/* Project & Sub-project */}
            <div className="grid grid-cols-2 gap-2">
              {/* Project */}
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Controller
                  name="projectId"
                  control={control}
                  rules={{ required: "Project is required" }}
                  render={({ field }) => (
                    <Controller
                      name="projectId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={(val) => {
                            const id = Number(val);
                            field.onChange(id);
                            setSelectedProjectId(id); // triggers sub-project fetch
                          }}
                          value={field.value?.toString() || ""}
                        >
                          <SelectTrigger className="shadow-none w-full">
                            <SelectValue placeholder="Select Project" />
                          </SelectTrigger>
                          <SelectContent>
                            {projects.map((p) => (
                              <SelectItem key={p.id} value={p.id.toString()}>
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  )}
                />
                {errors.projectId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.projectId.message}
                  </p>
                )}
              </div>

              {/* Sub-project */}
              <div className="space-y-2">
                <Label htmlFor="subProject">Sub-project</Label>
                <Controller
                  name="subProjectId"
                  control={control}
                  render={({ field }) => (
                    <Controller
                      name="subProjectId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onValueChange={(val) => field.onChange(Number(val))}
                          value={field.value?.toString() || ""}
                          disabled={
                            subProjectsLoading || subProjects.length === 0
                          }
                        >
                          <SelectTrigger className="shadow-none w-full">
                            <SelectValue placeholder="Select Sub-project" />
                          </SelectTrigger>
                          <SelectContent>
                            {subProjects.map((sp) => (
                              <SelectItem key={sp.id} value={sp.id.toString()}>
                                {sp.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  )}
                />
              </div>
            </div>

            {/* Year */}
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

            {/* Total Budget */}
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

            {/* Procurement ID preview */}
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

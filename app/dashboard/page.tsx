/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getProjects, postProject } from "@/lib/projects";

import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { BreadcrumbFromPath } from "@/components/DynamicBreadcrumb";
import { useProjectTotals } from "@/hooks/useSyncProjectFunds";

// ------------------ React Hook Form type ------------------
type ProjectFormValues = {
  title: string;
  amount?: number;
  progress?: number;
};

export default function Page() {
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  // Mutation to create project
  const mutation = useMutation<
    any, // return type of postProject
    Error, // error type
    ProjectFormValues // input type for mutate
  >({
    mutationFn: postProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project category created successfully");
    },
  });

  // ------------------ React Hook Form ------------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    defaultValues: { title: "", amount: 0, progress: 0 },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    await mutation.mutateAsync(data);
    reset();
  };

  const projectTotals = useProjectTotals(projects);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <BreadcrumbFromPath />
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          {isLoading
            ? Array.from({ length: Math.min(4, projects.length || 4) }).map(
                (_, i) => (
                  <div key={i}>
                    <Skeleton className="h-48 w-full mb-4 rounded-lg" />
                  </div>
                )
              )
            : projects.map((card: any) => (
                <Link
                  key={card.slug}
                  href={`dashboard/projects/${card.slug}`}
                  className="block"
                >
                  <Card className="shadow-none gap-0 hover:border-neutral-300 cursor-pointer transition h-full flex flex-col justify-between">
                    <CardHeader>
                      <CardDescription>{card.title}</CardDescription>
                      <CardTitle className="text-2xl mt-4 font-bold text-[#134991]">
                        PHP {(projectTotals[card.slug] || 0).toLocaleString()}
                      </CardTitle>
                      <CardAction>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-xs text-neutral-500"
                        >
                          View Details
                        </Button>
                      </CardAction>
                    </CardHeader>
                    <CardContent>
                      <Progress
                        value={Number(card.progress)}
                        className="mt-4 w-full [&>div]:bg-[#134991]"
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}

          {/* Add New Project Card */}
          <Card className="shadow-none border-dashed border-neutral-200 flex flex-col justify-center items-center hover:border-neutral-300 cursor-pointer transition h-full">
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link">
                    <Plus className="mr-2" /> Add New Project Category
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Add New Project Category</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new project category.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-6 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Project Name</Label>
                        <Input
                          id="title"
                          {...register("title", {
                            required: "Project name is required",
                          })}
                        />
                        {errors.title && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.title.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        disabled={isSubmitting || mutation.isPending}
                      >
                        {mutation.isPending
                          ? "Saving..."
                          : "Create Project Category"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

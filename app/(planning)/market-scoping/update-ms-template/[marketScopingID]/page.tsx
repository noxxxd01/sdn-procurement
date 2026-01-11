/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileIcon, Upload, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { type DateRange } from "react-day-picker";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProcurements, submitMarketScoping } from "@/lib/market-scoping";
import { toast } from "sonner";

type FormValues = {
  procurementId: string;
  status: string;
  procuringEntity: string;
  endUser: string;
  repName: string;
  repDesignation: string;
  projectName: string;
  estimatedBudget: number;
  marketScopingPeriod: DateRange;
  expectedDeliveryDate: Date;
  file: FileList | null;
};

type Procurement = {
  id: string;
  procurement_id: string;
};

// ---------------- Define the data type ----------------
type MarketScopingData = {
  market_scoping_id: string;
  procurement_id: string;
  status: string;
  procuring_entity: string;
  end_user: string;
  rep_name: string;
  rep_designation: string;
  project_name: string;
  estimated_budget: number;
  market_scoping_from: string | null; // mm/yyyy
  market_scoping_to: string | null; // mm/yyyy
  expected_delivery_date: string | null; // mm/yyyy
};

export default function UpdateMSTemplate() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [marketScopingId, setMarketScopingId] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue, // <-- ADD THIS
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      marketScopingPeriod: { from: undefined, to: undefined }, // empty by default
      expectedDeliveryDate: undefined, // optional or empty
    },
  });

  const fileList = watch("file");

  // ✅ Fetch procurement IDs using TanStack Query
  const { data: procurementOptions = [], isLoading } = useQuery<
    Procurement[],
    Error
  >({
    queryKey: ["procurements"],
    queryFn: fetchProcurements,
  });

  // ✅ Mutation to submit form
  const mutation = useMutation({
    mutationFn: (formData: FormData) => submitMarketScoping(formData),
    onSuccess: () => {
      toast.success("Market Scoping Template submitted successfully!");

      // ✅ Reset form fields
      reset({
        procurementId: "",
        status: "",
        procuringEntity: "",
        endUser: "",
        repName: "",
        repDesignation: "",
        projectName: "",
        estimatedBudget: 0,
        marketScopingPeriod: { from: undefined, to: undefined },
        expectedDeliveryDate: new Date(),
        file: null,
      });

      // ✅ Reset the file input manually
      if (fileInputRef.current) fileInputRef.current.value = "";

      // ✅ Reset generated Market Scoping ID
      setMarketScopingId("");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error submitting form");
    },
  });

  const onSubmit = (data: FormValues) => {
    const formatMonthYear = (date: Date) =>
      `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

    const formData = new FormData();
    formData.append("marketScopingId", marketScopingId);
    formData.append("procurementId", data.procurementId);
    formData.append("status", data.status);
    formData.append("procuringEntity", data.procuringEntity);
    formData.append("endUser", data.endUser);
    formData.append("repName", data.repName);
    formData.append("repDesignation", data.repDesignation);
    formData.append("projectName", data.projectName);
    formData.append("estimatedBudget", String(data.estimatedBudget));

    // Market Scoping Period
    const from = data.marketScopingPeriod.from
      ? new Date(
          data.marketScopingPeriod.from.getFullYear(),
          data.marketScopingPeriod.from.getMonth(),
          1
        )
      : null;
    const to = data.marketScopingPeriod.to
      ? new Date(
          data.marketScopingPeriod.to.getFullYear(),
          data.marketScopingPeriod.to.getMonth(),
          1
        )
      : null;

    formData.append(
      "marketScopingPeriod",
      JSON.stringify({
        from: from ? formatMonthYear(from) : null,
        to: to ? formatMonthYear(to) : null,
      })
    );

    // Expected Delivery Date
    if (!data.expectedDeliveryDate) {
      toast.error("Please select an expected delivery date");
      return;
    }

    const expectedDelivery = new Date(
      data.expectedDeliveryDate.getFullYear(),
      data.expectedDeliveryDate.getMonth(),
      1 // always first day of month
    );
    formData.append("expectedDeliveryDate", formatMonthYear(expectedDelivery));

    // File
    if (fileList && fileList.length > 0) {
      formData.append("file", fileList[0]);
    }

    mutation.mutate(formData);
  };

  //Generate MS ID
  const watchedFields = watch([
    "procurementId",
    "status",
    "procuringEntity",
    "endUser",
    "repName",
    "repDesignation",
    "projectName",
    "estimatedBudget",
    "marketScopingPeriod",
    "expectedDeliveryDate",
    "file",
  ]);

  React.useEffect(() => {
    const allFilled = watchedFields.every((field) => {
      if (field == null) return false;
      if (Array.isArray(field)) return field.length > 0;
      return true;
    });

    if (!allFilled) {
      setMarketScopingId("");
      return;
    }

    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    setMarketScopingId(`MS-${datePart}-${randomPart}`);
  }, watchedFields); // ✅ OK because this is a literal array of variables

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Building Your Application" },
        { label: "Data Fetching", isActive: true },
      ]}
    >
      <main>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                Upload Market Scoping Template
              </CardTitle>
              <CardDescription className="mt-1">
                Complete the field and select a .docx file to upload the Market
                Scoping Template.
              </CardDescription>
            </div>
            <div>
              <Button type="submit" disabled={mutation.isPending}>
                <Upload className="w-2 h-2 mr-1" />
                {mutation.isPending ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>

          {/* Procurement ID */}
          <div className="flex flex-row justify-between mt-6">
            <div className="flex flex-row justify-between gap-4">
              <div className="mt-4 w-100 space-y-2">
                <Label>Procurement ID</Label>
                <Controller
                  name="procurementId"
                  control={control}
                  rules={{ required: "Procurement ID is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full shadow-none">
                        <SelectValue placeholder="Please select a procurement ID" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {procurementOptions.map((p) => (
                            <SelectItem key={p.id} value={p.procurement_id}>
                              {p.procurement_id}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.procurementId && (
                  <p className="text-red-600 text-sm">
                    {errors.procurementId.message}
                  </p>
                )}
              </div>

              <div className="mt-4 w-100 space-y-2">
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full shadow-none">
                        <SelectValue placeholder="Please select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="To be signed">
                            To be signed
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-red-600 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-green-50 rounded-md border-dashed border w-100 p-4">
              <CardDescription>Market Scoping ID</CardDescription>
              <CardTitle className="mt-2 text-md">
                {marketScopingId || "---- ---- ----"}
              </CardTitle>
            </div>
          </div>

          {/* Agency Information */}
          <div className="grid grid-cols-2 mt-6 gap-10">
            <div className="flex flex-col gap-4">
              <Label className="underline">AGENCY INFORMATION</Label>
              <div className="space-y-2">
                <Label>Name of Procuring Entity</Label>
                <Input
                  type="text"
                  className="shadow-none"
                  {...register("procuringEntity", { required: "Required" })}
                />
                {errors.procuringEntity && (
                  <p className="text-red-600 text-sm">
                    {errors.procuringEntity.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>End-User/Implementing Unit</Label>
                <Input
                  type="text"
                  className="shadow-none"
                  {...register("endUser", { required: "Required" })}
                />
                {errors.endUser && (
                  <p className="text-red-600 text-sm">
                    {errors.endUser.message}
                  </p>
                )}
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="space-y-2 w-full">
                  <Label>Name of Representative</Label>
                  <Input
                    type="text"
                    className="shadow-none"
                    {...register("repName", { required: "Required" })}
                  />
                  {errors.repName && (
                    <p className="text-red-600 text-sm">
                      {errors.repName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 w-full">
                  <Label>Designation of Representative</Label>
                  <Input
                    type="text"
                    className="shadow-none"
                    {...register("repDesignation", { required: "Required" })}
                  />
                  {errors.repDesignation && (
                    <p className="text-red-600 text-sm">
                      {errors.repDesignation.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Project Overview */}
            <div className="flex flex-col gap-4">
              <Label className="underline">PROJECT OVERVIEW</Label>
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Textarea
                  className="shadow-none"
                  {...register("projectName", { required: "Required" })}
                />
                {errors.projectName && (
                  <p className="text-red-600 text-sm">
                    {errors.projectName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Estimated Budget</Label>
                <Input
                  type="number"
                  className="shadow-none"
                  {...register("estimatedBudget", { required: "Required" })}
                />
                {errors.estimatedBudget && (
                  <p className="text-red-600 text-sm">
                    {errors.estimatedBudget.message}
                  </p>
                )}
              </div>

              <div className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-2 w-full">
                  <Label>
                    Period of Market Scoping [From (mm/yyyy) To (mm/yyyy)]
                  </Label>
                  <Controller
                    name="marketScopingPeriod"
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        captionLayout="dropdown"
                        fromYear={2000}
                        toYear={2035}
                        showOutsideDays={false}
                        disabled={(date) => date.getDate() !== 1} // only first of the month selectable
                        className="rounded-lg border shadow-none w-full"
                      />
                    )}
                  />

                  {errors.marketScopingPeriod && (
                    <p className="text-red-600 text-sm">
                      {errors.marketScopingPeriod.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Expected Date of Delivery (mm/yyyy)</Label>
                  <Controller
                    name="expectedDeliveryDate"
                    control={control}
                    rules={{ required: "Expected delivery date is required" }}
                    render={({ field }) => (
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) {
                            const firstOfMonth = new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              1
                            );
                            field.onChange(firstOfMonth);
                            setValue("expectedDeliveryDate", firstOfMonth); // ensure RHF state is updated
                          }
                        }}
                        captionLayout="dropdown"
                        fromYear={2000}
                        toYear={2035}
                        disabled={(date) => date.getDate() !== 1}
                        className="rounded-md border shadow-none"
                      />
                    )}
                  />

                  {errors.expectedDeliveryDate && (
                    <p className="text-red-600 text-sm">
                      {errors.expectedDeliveryDate.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="mt-4">
            <div className="flex items-center justify-center w-full">
              {fileList && fileList.length > 0 ? (
                <div className="flex flex-row justify-between items-center w-full border rounded-md p-2">
                  <div className="flex flex-row items-center gap-4">
                    <div className="bg-[#134991] rounded-md p-2">
                      <FileIcon className="w-4 h-4 text-white" />
                    </div>
                    <CardDescription>{fileList[0].name}</CardDescription>
                  </div>
                  <div>
                    <XIcon
                      className="w-4 h-4 cursor-pointer text-red-500"
                      onClick={() => {
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                        setValue("file", null); // RHF now knows the file is cleared
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-neutral-200 rounded-md">
                  <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                    <p className="mb-2 text-sm">
                      Click the button below to upload
                    </p>
                    <p className="text-xs mb-4">
                      Max. File Size:{" "}
                      <span className="font-semibold">30MB</span>. PDF Only
                    </p>
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" /> Browse file
                    </Button>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      {...register("file", { required: "File is required" })}
                      ref={fileInputRef} // for triggering click
                      onChange={(e) => setValue("file", e.target.files)} // update RHF state
                    />
                    {errors.file && (
                      <p className="text-red-600 text-sm mt-2">
                        {errors.file.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </main>
    </DashboardLayout>
  );
}

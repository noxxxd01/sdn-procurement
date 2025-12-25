import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, CheckIcon, Plus, PlusCircle, X } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Building Your Application" },
        { label: "Data Fetching", isActive: true },
      ]}
    >
      <main className="pt-4">
        <div className="flex flex-row justify-end">
          <div className="flex flex-row gap-2">
            <Button variant="outline" className="shadow-none">
              <X className="w-2 h-2" /> Clear Form
            </Button>
            <Button>
              <Plus className="w-2 h-2" /> Save and Create
            </Button>
          </div>
        </div>
        <div className="pt-4 max-w-xl flex flex-col gap-4">
          <div>
            <Label htmlFor="ppmp-name">Procurement Project</Label>
            <InputGroup className="shadow-none mt-2">
              <InputGroupInput placeholder="IT Equipment Upgrade" />
              <InputGroupAddon align="inline-end">
                <div className="flex size-4 items-center justify-center rounded-full">
                  <CheckIcon className="size-3" />
                </div>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="ppmp-name">Implementing Unit</Label>
              <Select>
                <SelectTrigger className="w-full mt-2 shadow-none">
                  <SelectValue placeholder="Select Unit" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectGroup className="space-y-2">
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="ilcdb">ILCDB</SelectItem>
                    <Separator />
                    <SelectItem value="others">
                      <PlusCircle className="w-2 h-2 mr-2" /> Add New Unit
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ppmp-name">Year</Label>
              <InputGroup className="mt-2 shadow-none">
                <InputGroupInput className="pl-1!" />
                <InputGroupAddon>
                  <InputGroupText>SY</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <div>
            <Label htmlFor="ppmp-name">Estimated Budget (php)</Label>
            <InputGroup className="shadow-none mt-2">
              <InputGroupInput placeholder="" />
              <InputGroupAddon align="inline-end">
                <div className="flex size-4 items-center justify-center rounded-full">
                  <CheckIcon className="size-3" />
                </div>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <div className="pt-4">
          <div className="border rounded-md">
            <Table className="rounded-md">
              <TableHeader className="bg-neutral-100">
                <TableRow>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    #
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Item Name
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Item Category
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Unit Price (php)
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Unit
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Item Description (Specifications)
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Jan
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Feb
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Mar
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Apr
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    May
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Jun
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Jul
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Aug
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Sep
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Oct
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Nov
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Dec
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={20} className="text-center p-3">
                    <Button variant="ghost" size="sm">
                      <PlusCircle className="w-2 h-2" /> Add Item
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

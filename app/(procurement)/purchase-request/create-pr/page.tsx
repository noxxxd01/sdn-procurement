import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Save } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CreatePR() {
  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Building Your Application" },
        { label: "Data Fetching", isActive: true },
      ]}
    >
      <main className="pt-4">
        <div className="flex flex-row justify-end">
          <div>
            <Button>
              <Save className="w-2 h-2" /> Save and Create
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Card className="shadow-none p-4">
            <CardHeader className="text-center">
              <div className="align-middle flex justify-center">
                <Image
                  src="/pr-logo.png"
                  alt="PR Logo"
                  width={1000}
                  height={1000}
                  className="w-90"
                />
              </div>
              <CardTitle className="text-2xl mt-4">PURCHASE REQUEST</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="grid grid-cols-12 border p-4">
                  <div className="col-span-6">
                    <div className="flex flex-row gap-2 items-center">
                      <span>Department: </span>{" "}
                      <Input
                        type="text"
                        className="border-l-0 border-r-0 border-t-0 rounded-none shadow-none p-1 w-1/2 outline-none border-b"
                      />
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <span>Section: </span>
                      <Input
                        type="text"
                        className="border-l-0 border-r-0 border-t-0 rounded-none shadow-none p-1 w-1/2 outline-none border-b"
                      />
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="flex flex-row gap-2 items-center">
                      <span>PR No.:</span>
                      <Input
                        type="text"
                        className="border-l-0 border-r-0 border-t-0 rounded-none shadow-none p-1 w-1/2 outline-none border-b"
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="flex flex-row gap-2 items-center">
                        <span>SAI No.:</span>
                        <Input
                          type="text"
                          className="border-l-0 border-r-0 border-t-0 rounded-none shadow-none p-1 w-1/2 outline-none border-b"
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <span>Date: </span>
                        <Input
                          type="text"
                          className="border-l-0 border-r-0 border-t-0 rounded-none shadow-none p-1 w-1/2 outline-none border-b"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Table className="border">
                  <TableHeader>
                    <TableRow className="bg-neutral-100">
                      <TableHead className="w-32">Stock No.</TableHead>
                      <TableHead className="w-32">Unit</TableHead>
                      <TableHead>Item Description</TableHead>
                      <TableHead className="w-36">Qty</TableHead>
                      <TableHead className="w-36">Unit Cost</TableHead>
                      <TableHead className="w-36">Total Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="border">1</TableCell>
                      <TableCell className="border">pc</TableCell>
                      <TableCell className="border">
                        Customized Key Chain
                      </TableCell>
                      <TableCell className="border">10</TableCell>
                      <TableCell className="border">50.00</TableCell>
                      <TableCell className="border">500.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Button>
                          <PlusCircle className="w-4 h-4" /> Add Item
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align="center"
                        className="font-semibold"
                      >
                        x x x x x x x x x x x x x nothing follows x x x x x x x
                        x x x x x x x
                      </TableCell>
                    </TableRow>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="collapse">x</TableCell>
                        <TableCell className="collapse"></TableCell>
                        <TableCell className="collapse"></TableCell>
                        <TableCell className="collapse"></TableCell>
                        <TableCell className="collapse"></TableCell>
                        <TableCell className="collapse"></TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-neutral-100">
                      <TableCell className="border"></TableCell>
                      <TableCell className="border"></TableCell>
                      <TableCell className="border"></TableCell>
                      <TableCell colSpan={2} className="border">
                        TOTAL
                      </TableCell>
                      <TableCell className="font-semibold border">
                        500.00
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} className="border">
                        Purpose:
                      </TableCell>
                      <TableCell colSpan={4}>
                        <Textarea
                          className="w-full resize-none border-none shadow-none outline-none"
                          rows={3}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} className="border">
                        <span>
                          Signature: Printed Name <br /> Designation
                        </span>
                      </TableCell>
                      <TableCell className="border">
                        <div className="grid grid-cols-2 gap-6 ">
                          <div>
                            <span className="font-semibold">Requested by:</span>
                            <div className="flex flex-col mt-6">
                              <Input
                                type="text"
                                className="border-l-0 border-r-0 border-t-0 rounded-none shadow-none p-1 w-full outline-none border-b"
                                placeholder="Printed Name"
                              />
                              <Input
                                type="text"
                                className="border-l-0 border-r-0 border-t-0 rounded-none shadow-none p-1 w-full outline-none border-b mt-2"
                                placeholder="Designation"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col justify-between border-l pl-4">
                            <span className="font-semibold">
                              Recommending Approval:
                            </span>
                            <div className="flex flex-col mt-6">
                              <Label>ENGR. LAWRENCE P. SALANG</Label>
                              <CardDescription>
                                Chief, Technical Operations Division
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell colSpan={3}>
                        <div className="flex flex-col justify-between ">
                          <div>
                            <span className="font-semibold">Approved by:</span>
                          </div>
                          <div className="flex flex-col mt-7">
                            <Label>MARIO P. CUÑADO</Label>
                            <CardDescription>
                              Regional Director, DICT 13
                            </CardDescription>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
}

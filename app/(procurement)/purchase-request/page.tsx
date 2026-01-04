"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  BadgeCheckIcon,
  Ellipsis,
  Eye,
  Filter,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";

const prData = [
  {
    prNo: "PR13-2025-12-824",
    purpose:
      "To be used in the implementation of Cybersecurity Awareness Campaign CY2025.",
    department: "DICT-Provincial Office of Surigao del Norte",
    section: "Technical Operations Division",
    project: "Cybersecurity",
    requestedBy: "Engr. Ricardo T. Bacolod",
    dateRequested: "12/01/2025",
    status: "for_approval",
  },
  {
    prNo: "PR13-2025-12-825",
    purpose: "Procurement of IT equipment for regional operations.",
    department: "DICT-Regional Office XIII",
    section: "ICT Infrastructure Division",
    project: "IT Modernization",
    requestedBy: "Ms. Angela D. Reyes",
    dateRequested: "12/02/2025",
    status: "approved",
  },
  {
    prNo: "PR13-2025-12-826",
    purpose: "Subscription for cloud services CY2025.",
    department: "DICT-Central Office",
    section: "Information Systems Division",
    project: "Digital Transformation",
    requestedBy: "Mr. John P. Dela Cruz",
    dateRequested: "12/03/2025",
    status: "pending",
  },
];

const statusConfig: Record<
  string,
  { label: string; className: string; icon: React.ElementType }
> = {
  for_approval: {
    label: "For Approval",
    className: "bg-blue-500 text-white",
    icon: BadgeCheckIcon,
  },
  approved: {
    label: "Approved",
    className: "bg-green-500 text-white",
    icon: BadgeCheckIcon,
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-500 text-white",
    icon: BadgeCheckIcon,
  },
};

export default function PurchaseRequest() {
  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Building Your Application" },
        { label: "Data Fetching", isActive: true },
      ]}
    >
      <main className="pt-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2">
            <InputGroup className="shadow-none">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">results</InputGroupAddon>
            </InputGroup>
            <Button variant="outline" className="shadow-none">
              <Filter className="w-2 h-2" />
            </Button>
          </div>
          <div>
            <Link href="/purchase-request/create-pr">
              <Button>
                <Plus className="w-2 h-2" /> Create Purchase Request
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <div className="border rounded-md mt-4">
            <Table className="rounded-md">
              <TableHeader>
                <TableRow className="bg-neutral-100">
                  <TableHead>PR No.</TableHead>
                  <TableHead className="w-60">Purpose</TableHead>
                  <TableHead className="w-50">Department</TableHead>
                  <TableHead className="w-32">Section</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Date Requested</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prData.map((pr) => {
                  const status = statusConfig[pr.status];
                  const Icon = status.icon;

                  return (
                    <TableRow key={pr.prNo}>
                      <TableCell className="text-blue-600 font-semibold">
                        {pr.prNo}
                      </TableCell>
                      <TableCell>
                        <CardDescription className="text-pretty">
                          {pr.purpose}
                        </CardDescription>
                      </TableCell>

                      <TableCell>
                        <CardDescription className="text-pretty">
                          {pr.department}
                        </CardDescription>
                      </TableCell>
                      <TableCell>
                        <CardDescription className="text-pretty">
                          {pr.section}
                        </CardDescription>
                      </TableCell>
                      <TableCell>
                        <CardDescription className="text-pretty">
                          {pr.project}
                        </CardDescription>
                      </TableCell>
                      <TableCell>
                        <CardDescription className="text-pretty">
                          {pr.requestedBy}
                        </CardDescription>
                      </TableCell>
                      <TableCell>
                        <CardDescription className="text-pretty">
                          {pr.dateRequested}
                        </CardDescription>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={status.className}>
                          <Icon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-0">
                              <Ellipsis className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                              <DropdownMenuItem>
                                <Eye className="w-2 h-2 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                <Trash2 className="w-2 h-2 mr-2 text-red-500" />
                                <span className="text-red-500">Delete PR</span>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

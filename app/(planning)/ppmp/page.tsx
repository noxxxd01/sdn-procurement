import { DashboardLayout } from "@/components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  ClockIcon,
  Download,
  Ellipsis,
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import React from "react";

const ppmpData = [
  {
    id: "PPMP-2025-001",
    title: "Office Supplies Procurement",
    unit: "Administrative Office",
    budget: 250000,
    runningTotal: 180000,
    remaining: 70000,
    status: "Signed",
  },
  {
    id: "PPMP-2025-002",
    title: "IT Equipment Upgrade",
    unit: "Information Technology Unit",
    budget: 500000,
    runningTotal: 320000,
    remaining: 180000,
    status: "In Progress",
  },
  {
    id: "PPMP-2025-003",
    title: "Building Maintenance Services",
    unit: "General Services Office",
    budget: 300000,
    runningTotal: 300000,
    remaining: 0,
    status: "Signed",
  },
];

const statusConfig: Record<
  string,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  Signed: {
    label: "Signed",
    className: "bg-green-500 text-white dark:bg-green-600",
    icon: BadgeCheckIcon,
  },
  "In Progress": {
    label: "In Progress",
    className: "bg-yellow-500 text-white dark:bg-yellow-600",
    icon: ClockIcon,
  },
};

export default function PPMP() {
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
          <div className="flex flex-row gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shadow-none">
                  <Ellipsis className="w-2 h-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Download className="w-2 h-2 mr-2" />
                    Generate PPMP Template
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="shadow-none">
              <Upload className="w-2 h-2" /> Upload PPMP
            </Button>
            <Button>
              <Plus className="w-2 h-2" /> Create PPMP
            </Button>
          </div>
        </div>
        <div className="pt-4">
          <div className="border rounded-md">
            <Table className="rounded-md">
              <TableHeader className="bg-neutral-100">
                <TableRow>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    PPMP ID
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Activity Title
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    End-User/Implementing Unit
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Budget
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Running Total
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Remaining Balance
                  </TableHead>
                  <TableHead className="p-3 font-semibold text-neutral-500">
                    Status
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ppmpData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium p-3 text-blue-800">
                      {item.id}
                    </TableCell>
                    <TableCell className="p-3">{item.title}</TableCell>
                    <TableCell className="p-3">{item.unit}</TableCell>
                    <TableCell className="p-3">{item.budget}</TableCell>
                    <TableCell className="p-3">{item.runningTotal}</TableCell>
                    <TableCell className="p-3">{item.remaining}</TableCell>
                    <TableCell className="p-3">
                      {(() => {
                        const status = statusConfig[item.status];
                        const Icon = status.icon;

                        return (
                          <Badge
                            variant="secondary"
                            className={status.className}
                          >
                            <Icon className="w-4 h-4 mr-1" />
                            {status.label}
                          </Badge>
                        );
                      })()}
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
                            <DropdownMenuItem>
                              <Pencil className="w-2 h-2 mr-2" />
                              Edit PPMP
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              <Trash2 className="w-2 h-2 mr-2 text-red-500" />
                              <span className="text-red-500">Delete PPMP</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

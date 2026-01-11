"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Ban,
  BinocularsIcon,
  Building2,
  CheckCircle2,
  ClipboardList,
  Download,
  Ellipsis,
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
  Store,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchMarketScopings } from "@/lib/market-scoping";

type MarketScoping = {
  id: number;

  market_scoping_id: string;
  procurement_id: string;

  status: string;

  procuring_entity: string;
  end_user: string;

  rep_name: string;
  rep_designation: string;

  project_name: string;
  estimated_budget: number;

  market_scoping_from: string; // ISO date string
  market_scoping_to: string; // ISO date string
  expected_delivery_date: string; // ISO date string

  file_path: string | null;

  created_at: string; // ISO date string
};

const supplierData = [
  {
    id: 1,
    name: "TechWorld Solutions Inc.",
    category: "IT Equipment",
    status: "Active",
    location: "San Francisco, CA",
    contact: "John Doe - 092 234 5324",
    email: "john.doe@techworld.com",
  },
  {
    id: 2,
    name: "Global Supplies Co.",
    category: "Office Equipment",
    status: "Active",
    location: "Manila, Philippines",
    contact: "Maria Santos - 092 567 8901",
    email: "maria.santos@globalsupplies.com",
  },
  {
    id: 3,
    name: "BuildRight Construction",
    category: "Construction Materials",
    status: "Active",
    location: "Quezon City, Philippines",
    contact: "Carlos Reyes - 092 890 1234",
    email: "carlos.reyes@buildright.com",
  },
  {
    id: 4,
    name: "Premier Vehicles Ltd.",
    category: "Vehicle Services",
    status: "Inactive",
    location: "Cebu, Philippines",
    contact: "Ana Garcia - 092 345 6789",
    email: "ana.garcia@premierv.com",
  },
  {
    id: 5,
    name: "EduTrain Solutions",
    category: "Training Services",
    status: "Active",
    location: "Makati, Philippines",
    contact: "Robert Tan - 092 123 4567",
    email: "robert.tan@edutrain.com",
  },
  {
    id: 6,
    name: "Swift Logistics Inc.",
    category: "Logistics",
    status: "Active",
    location: "Las Piñas, Philippines",
    contact: "Elena Cruz - 092 678 9012",
    email: "elena.cruz@swiftlog.com",
  },
];

const stats = [
  {
    title: "Market Scopings",
    value: 5,
    icon: BinocularsIcon,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Completed Scopings",
    value: 2,
    icon: ClipboardList,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Cancelled Scopings",
    value: 0,
    icon: Ban,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    title: "Suppliers Engaged",
    value: 6,
    icon: Store,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
];

export default function MarketScoping() {
  const {
    data: marketScopings = [],
    isLoading,
    isError,
  } = useQuery<MarketScoping[]>({
    queryKey: ["market-scopings"],
    queryFn: fetchMarketScopings,
  });

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Building Your Application" },
        { label: "Data Fetching", isActive: true },
      ]}
    >
      <div className="flex w-full flex-col gap-6">
        <Tabs defaultValue="market-scoped">
          <TabsList className="space-x-2">
            <TabsTrigger value="market-scoped">
              <Search className="w-2 h-2" />
              Market Scoped
            </TabsTrigger>

            <TabsTrigger value="supplier-directory">
              <Building2 className="w-2 h-2" /> Supplier Directory
            </TabsTrigger>
          </TabsList>
          <TabsContent value="market-scoped">
            <div className="pt-4 w-full">
              <div className="grid grid-cols-4 gap-4 mb-4">
                {stats.map((stat, index) => (
                  <Card className="shadow-none" key={index}>
                    <CardHeader>
                      <CardDescription>{stat.title}</CardDescription>
                      <CardTitle className="text-3xl font-bold">
                        {stat.value}
                      </CardTitle>
                      <CardAction className={stat.bg + " p-2 rounded-sm"}>
                        <stat.icon className={stat.color + " w-4 h-4"} />
                      </CardAction>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2">
                  <Button variant="outline" className="shadow-none">
                    <Filter className="w-2 h-2" />
                  </Button>
                  <InputGroup className="shadow-none">
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                      <Search />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      results
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <div className="flex flex-row gap-2">
                  <Link href="/market-scoping/upload-ms-template">
                    <Button variant="outline" className="shadow-none">
                      <Upload className="w-2 h-2" />
                      Upload MS Template
                    </Button>
                  </Link>
                  <Button
                    className="text-white shadow-none"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = "/templates/MARKET SCOPING.docx"; // path relative to `public`
                      link.download = "MARKET SCOPING.docx"; // optional: specify the download filename
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="w-2 h-2" />
                    Download MS Template
                  </Button>
                </div>
              </div>
              <div className="pt-4">
                {/* Table goes here */}
                <div className="border rounded-md w-full overflow-x-hidden ">
                  <Table className="rounded-md table-auto w-full">
                    <TableHeader className="bg-neutral-100">
                      <TableRow>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          MS ID
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          Name of Procuring Entity
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          End-User/Implementing Unit
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          Name & <br />
                          Designation of Representative
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500 w-10">
                          Project Name
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          Estimated Budget
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          Status
                        </TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6">
                            Loading market scopings...
                          </TableCell>
                        </TableRow>
                      )}

                      {!isLoading && marketScopings.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6">
                            No market scoping records found
                          </TableCell>
                        </TableRow>
                      )}

                      {marketScopings.map((item) => (
                        <TableRow key={item.market_scoping_id}>
                          <TableCell>
                            <Link
                              href={`/market-scoping/${item.market_scoping_id}`}
                            >
                              <CardTitle className="font-semibold text-[#134991] hover:underline cursor-pointer">
                                {item.market_scoping_id}
                              </CardTitle>
                            </Link>
                          </TableCell>

                          <TableCell>
                            <CardDescription>
                              {item.procuring_entity}
                            </CardDescription>
                          </TableCell>

                          <TableCell>
                            <CardDescription>{item.end_user}</CardDescription>
                          </TableCell>

                          <TableCell>
                            <CardDescription>
                              {item.rep_name}
                              <br />
                              {item.rep_designation}
                            </CardDescription>
                          </TableCell>

                          <TableCell className="max-w-xs overflow-hidden whitespace-nowrap truncate ">
                            <CardDescription>
                              {item.project_name}
                            </CardDescription>
                          </TableCell>

                          <TableCell className="text-right">
                            <CardDescription>
                              {item.estimated_budget}
                            </CardDescription>
                          </TableCell>

                          <TableCell>
                            <Badge variant="outline">
                              <CheckCircle2 className="w-2 h-2 mr-1" />
                              {item.status}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Ellipsis className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/market-scoping/${item.market_scoping_id}`}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="supplier-directory">
            <div className="pt-4 w-full">
              <div className="flex flex-row items-center">
                <div className="flex flex-row gap-2">
                  <InputGroup className="shadow-none">
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                      <Search />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      results
                    </InputGroupAddon>
                  </InputGroup>
                  <Button className="shadow-none text-white">
                    <Plus className="w-2 h-2" /> Add Supplier
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-3 gap-3">
                {supplierData.map((supplier) => (
                  <Link
                    href={`/market-scoping/supplier/${supplier.id}`}
                    key={supplier.id}
                  >
                    <Card className="shadow-none">
                      <CardHeader>
                        <CardTitle>{supplier.name}</CardTitle>
                        <CardDescription>{supplier.category}</CardDescription>
                        <CardAction>
                          <Badge
                            variant="secondary"
                            className={
                              supplier.status === "Active"
                                ? "bg-green-100 text-green-600 dark:bg-green-600/10 dark:text-green-400"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-600/10 dark:text-gray-400"
                            }
                          >
                            {supplier.status}
                          </Badge>
                        </CardAction>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex flex-row justify-between items-center">
                            <CardDescription>Location</CardDescription>
                            <CardDescription>
                              {supplier.location}
                            </CardDescription>
                          </div>
                          <div className="flex flex-row justify-between items-center">
                            <CardDescription>Contact</CardDescription>
                            <CardDescription>
                              {supplier.contact}
                            </CardDescription>
                          </div>
                          <div className="flex flex-row justify-between items-center">
                            <CardDescription>Email</CardDescription>
                            <CardDescription className="font-semibold">
                              {supplier.email}
                            </CardDescription>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

import { DashboardLayout } from "@/components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Ban,
  BinocularsIcon,
  Building2,
  CheckCircle2,
  ClipboardList,
  Ellipsis,
  Eye,
  Filter,
  LayoutDashboard,
  Pencil,
  Plus,
  Search,
  Store,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";

const marketScopingData = [
  {
    id: "MS-2024-001",
    projectName: "IT Infrastructure Upgrade",
    budget: "₱2,500,000",
    procuringEntity: "Department of Information Technology",
    endUser: "Finance Division",
    status: "Completed",
    statusColor: "text-green-600",
    bgStatusColor: "bg-green-100",
  },
  {
    id: "MS-2024-002",
    projectName: "Office Equipment Procurement",
    budget: "₱850,000",
    procuringEntity: "Bureau of Internal Revenue",
    endUser: "Administrative Services",
    status: "In Progress",
    statusColor: "text-blue-600",
  },
  {
    id: "MS-2024-003",
    projectName: "Construction & Renovation",
    budget: "₱5,200,000",
    procuringEntity: "Department of Public Works",
    endUser: "Engineering Division",
    status: "Pending Review",
    statusColor: "text-yellow-600",
  },
  {
    id: "MS-2024-004",
    projectName: "Vehicle Fleet Acquisition",
    budget: "₱3,750,000",
    procuringEntity: "Bureau of Land Transportation",
    endUser: "Operations Department",
    status: "Draft",
    statusColor: "text-gray-600",
  },
  {
    id: "MS-2024-005",
    projectName: "Training & Development Program",
    budget: "₱450,000",
    procuringEntity: "Civil Service Commission",
    endUser: "Human Resources",
    status: "Completed",
    statusColor: "text-green-600",
  },
];

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
  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Building Your Application" },
        { label: "Data Fetching", isActive: true },
      ]}
    >
      <div className="flex w-full flex-col gap-6">
        <Tabs defaultValue="market-dashboard">
          <TabsList className="space-x-2">
            <TabsTrigger value="market-dashboard">
              <LayoutDashboard className="w-2 h-2" />
              Dashboard
            </TabsTrigger>

            <TabsTrigger value="market-scoped">
              <Search className="w-2 h-2" />
              Market Scoped
            </TabsTrigger>

            <TabsTrigger value="supplier-directory">
              <Building2 className="w-2 h-2" /> Supplier Directory
            </TabsTrigger>
          </TabsList>
          <TabsContent value="market-dashboard">
            <div className="grid grid-cols-4 gap-4 pt-4">
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
          </TabsContent>
          <TabsContent value="market-scoped">
            <div className="pt-4 w-full">
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
                  <Button variant="outline" className="shadow-none">
                    <Upload className="w-2 h-2" />
                    Upload MS Checklist
                  </Button>
                  <Button className="text-white shadow-none">
                    <Plus className="w-2 h-2" />
                    Generate MS Checklist
                  </Button>
                </div>
              </div>
              <div className="pt-4">
                {/* Table goes here */}
                <div className="border rounded-md">
                  <Table className="rounded-md">
                    <TableHeader className="bg-neutral-100">
                      <TableRow>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          MS ID
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          Project Name
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          Estimated Budget
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          Name of Procuring Entity
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          End-User/Implementing Unit
                        </TableHead>
                        <TableHead className="p-3 font-semibold text-neutral-500">
                          Status
                        </TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marketScopingData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium p-3 text-blue-800">
                            <Link href={`/market-scoping/${item.id}`}>
                              {item.id}
                            </Link>
                          </TableCell>
                          <TableCell className="p-3">
                            {item.projectName}
                          </TableCell>
                          <TableCell className="p-3">{item.budget}</TableCell>
                          <TableCell className="p-3">
                            {item.procuringEntity}
                          </TableCell>
                          <TableCell className="p-3">{item.endUser}</TableCell>
                          <TableCell className="p-3">
                            <Badge
                              variant="outline"
                              className={`${item.statusColor} ${item.bgStatusColor} `}
                            >
                              <CheckCircle2 className="w-2 h-2 mr-1" />
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right p-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Ellipsis className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                  <DropdownMenuItem asChild>
                                    <Link
                                      href={`/market-scoping/${item.id}`}
                                      className="cursor-pointer"
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Pencil className="w-2 h-2 mr-2" />
                                    Edit PPMP
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">
                                    <Trash2 className="w-2 h-2 mr-2 text-red-500" />
                                    <span className="text-red-500">
                                      Delete PPMP
                                    </span>
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

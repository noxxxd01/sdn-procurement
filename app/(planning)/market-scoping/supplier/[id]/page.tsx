import { DashboardLayout } from "@/components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  CornerUpRightIcon,
  Ellipsis,
  Eye,
  Package,
  Plus,
  Scroll,
  Search,
} from "lucide-react";
import Image from "next/image";

const items = [
  {
    id: 1,
    name: "Dell OptiPlex 5090",
    category: "Computer Hardware",
    unit: "Unit",
    price: "₱45,500.00",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Cisco Catalyst 2960",
    category: "Network Equipment",
    unit: "Unit",
    price: "₱28,900.00",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "HP LaserJet Pro M404",
    category: "Printing Equipment",
    unit: "Unit",
    price: "₱12,800.00",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Cat6 Ethernet Cable",
    category: "Networking Supplies",
    unit: "Box (305m)",
    price: "₱2,400.00",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop",
  },
];

export default function Supplier() {
  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Building Your Application" },
        { label: "Data Fetching", isActive: true },
      ]}
    >
      <div className="pt-4">
        <div className="flex flex-row gap-4">
          <Image
            src="https://media.istockphoto.com/id/1314210006/photo/grocery-store-shop-in-vintage-style-with-fruit-and-vegetables-crates-on-the-street.jpg?s=612x612&w=0&k=20&c=UFL3bRQkWH7dt6EMLswvM4u8-1sPQU9T5IFHXuBbClU="
            alt="Supplier Details"
            width={800}
            height={800}
            className="w-80 rounded-md"
          />
          <div className="w-full">
            <div className="flex flex-row justify-between">
              <div>
                <div className="flex flex-row items-center relative">
                  <h1 className="text-3xl font-semibold">
                    TechWorld Solutions Inc.
                  </h1>
                  <Badge className="absolute mr-0 ml-4 left-full bg-green-200 text-green-600">
                    Active
                  </Badge>
                </div>
                <CardDescription>IT Equipment</CardDescription>
              </div>
              <div>
                <Button variant="outline" className="shadow-none">
                  Edit Supplier
                </Button>
              </div>
            </div>
            <div>
              <CardDescription className="mt-4 pb-2 font-bold">
                Info:
              </CardDescription>
              <div className="grid grid-cols-8 gap-6">
                <div className="col-span-3 space-y-1.5">
                  <CardDescription className="flex flex-row justify-between">
                    <span>Location:</span>{" "}
                    <span className="flex flex-row items-center gap-2">
                      {" "}
                      <Badge variant="secondary" className="cursor-pointer">
                        <CornerUpRightIcon className="w-2 h-2" />
                      </Badge>
                      Tech Avenue, Silicon City
                    </span>
                  </CardDescription>
                  <CardDescription className="flex flex-row justify-between">
                    <span>Contact:</span> <span>John Doe - 0912 234 5234</span>
                  </CardDescription>
                  <CardDescription className="flex flex-row justify-between">
                    <span>Email:</span> <span>john.doe@techworld.com</span>
                  </CardDescription>
                  <CardDescription className="flex flex-row justify-between">
                    <span>Socials:</span> <span>@techworld</span>
                  </CardDescription>
                </div>
                <div className="col-span-3 border-l pl-6 space-y-1.5">
                  <CardDescription className="flex flex-row justify-between items-center">
                    <span>TIN:</span> <span>1244-5224-2345-000 </span>
                  </CardDescription>
                  <CardDescription className="flex flex-row justify-between items-center">
                    <span>PhilGEPS:</span>{" "}
                    <span className="flex flex-row items-center gap-2">
                      {" "}
                      <Badge variant="secondary">Platinum</Badge> 2025-24522
                    </span>
                  </CardDescription>
                  <CardDescription className="flex flex-row justify-between items-center">
                    <span>VAT/NON VAT:</span> <span>VAT</span>
                  </CardDescription>
                </div>
                <div className="col-span-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <Tabs defaultValue="item-catalog">
            <TabsList className="space-x-2">
              <TabsTrigger value="item-catalog">
                <Package className="w-2 h-2" />
                Item Catalog
              </TabsTrigger>
              <TabsTrigger value="bidder-requirements">
                <Scroll className="w-2 h-2" /> Bidder Requirements
              </TabsTrigger>
            </TabsList>
            <TabsContent value="item-catalog" className="pt-4">
              <div className="flex flex-row justify-between pb-4 items-center gap-4">
                <InputGroup className="shadow-none w-80">
                  <InputGroupInput placeholder="Search..." />
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">results</InputGroupAddon>
                </InputGroup>
                <Button>
                  <Plus className="w-2 h-2" />
                  Add Item to Catalog
                </Button>
              </div>
              <div className="border rounded-md">
                <Table className="rounded-md">
                  <TableHeader className="bg-neutral-100">
                    <TableRow>
                      <TableHead className="p-3 font-semibold text-neutral-500"></TableHead>
                      <TableHead className="p-3 font-semibold text-neutral-500">
                        Item Name
                      </TableHead>
                      <TableHead className="p-3 font-semibold text-neutral-500">
                        Category
                      </TableHead>
                      <TableHead className="p-3 font-semibold text-neutral-500">
                        Unit
                      </TableHead>
                      <TableHead className="p-3 font-semibold text-neutral-500">
                        Avg. Price
                      </TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="p-3">
                          <Image
                            width={500}
                            height={500}
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                        </TableCell>
                        <TableCell className="p-3">{item.name}</TableCell>
                        <TableCell className="p-3">{item.category}</TableCell>
                        <TableCell className="p-3">{item.unit}</TableCell>
                        <TableCell className="p-3">{item.price}</TableCell>
                        <TableCell className="p-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Ellipsis className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex flex-row items-center gap-1 text-neutral-700"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}

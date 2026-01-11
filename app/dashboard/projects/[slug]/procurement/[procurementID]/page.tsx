import { DashboardLayout } from "@/components/dashboard-layout";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarCheck2,
  ChevronRight,
  Download,
  Ellipsis,
  FileSearchCorner,
  Scale,
  ScrollText,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    slug: string;
    procurementID: string;
  }>;
}

interface MarketScoping {
  id: number;
  market_scoping_id: string;
  procurement_id: string;
  status: string;
  expected_delivery_date: string;
  file_path?: string;
}

// Fetch function
async function fetchMarketScopings(): Promise<MarketScoping[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/market-scoping`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch market scopings");
  return res.json();
}

export default async function Page({ params }: PageProps) {
  const { slug, procurementID } = await params;

  const projectLabel = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const marketScopings = await fetchMarketScopings();

  // Prepare tab data
  const tabs = [
    {
      value: "market-scoping",
      label: "Market Scoping",
      icon: <Search className="w-2 h-2" />,
      data: marketScopings.filter((ms) => ms.procurement_id === procurementID),
    },
    {
      value: "ppmp",
      label: "PPMP",
      icon: <ScrollText className="w-2 h-2" />,
      data: [], // Replace with actual PPMP data
    },
    {
      value: "app",
      label: "APP",
      icon: <CalendarCheck2 className="w-2 h-2" />,
      data: [], // Replace with actual APP data
    },
    {
      value: "pr",
      label: "Purchase Request",
      icon: <ShoppingCart className="w-2 h-2" />,
      data: [], // Replace with actual PR data
    },
    {
      value: "rfq",
      label: "RFQ",
      icon: <FileSearchCorner className="w-2 h-2" />,
      data: [], // Replace with actual RFQ data
    },
    {
      value: "apq",
      label: "APQ",
      icon: <Scale className="w-2 h-2" />,
      data: [], // Replace with actual APQ data
    },
  ];

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Projects", href: "/dashboard" },
        { label: projectLabel, href: `/dashboard/projects/${slug}` },
        { label: procurementID, isActive: true },
      ]}
    >
      <Tabs defaultValue="market-scoping">
        <TabsList className="rounded-none p-0 flex flex-wrap bg-white">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={tab.data.length === 0}
              className="
                group
                rounded-none
                flex items-center gap-2 px-4
                data-[state=inactive]:bg-gray-100
                data-[state=inactive]:text-gray-700
                data-[state=inactive]:border-b-gray-100
                data-[state=inactive]:border-b-2
                data-[state=active]:border-b-[#134991]
                data-[state=active]:border-b-2
                data-[state=active]:text-[#134991]
                data-[state=active]:shadow-none
                transition-colors duration-200
              "
            >
              <div className="flex flex-row items-center mr-2">
                {index + 1} <ChevronRight className="ml-2" />
              </div>
              {tab.icon} {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {tab.data.length === 0 ? (
              <p className="p-4 text-gray-500">
                No {tab.label} data available.
              </p>
            ) : (
              <Table>
                <TableHeader className="bg-neutral-100">
                  <TableRow>
                    <TableHead>Procurement ID</TableHead>
                    <TableHead>Market Scoping ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tab.data.map((ms: MarketScoping) => (
                    <TableRow key={ms.id}>
                      <TableCell>
                        <CardTitle className="font-semibold text-[#134991] cursor-pointer">
                          {ms.procurement_id}
                        </CardTitle>
                      </TableCell>
                      <TableCell>
                        <Link href={`/market-scoping/${ms.market_scoping_id}`}>
                          <CardTitle className="font-semibold text-[#134991] hover:underline cursor-pointer">
                            {ms.market_scoping_id}
                          </CardTitle>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{ms.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <CardDescription>
                          {new Date(
                            ms.expected_delivery_date
                          ).toLocaleDateString()}
                        </CardDescription>
                      </TableCell>
                      <TableCell align="right">
                        <Button variant="ghost">
                          {ms.file_path && (
                            <a
                              href={ms.file_path}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="w-4 h-4 cursor-pointer" />
                            </a>
                          )}
                        </Button>
                        <Button variant="ghost">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
}

import { DashboardLayout } from "@/components/dashboard-layout";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarCheck2,
  ChevronRight,
  FileSearchCorner,
  HandCoins,
  Scale,
  ScrollText,
  Search,
  ShoppingCart,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
    procurementID: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug, procurementID } = await params;

  const projectLabel = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

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
          <TabsTrigger
            value="market-scoping"
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
              1 <ChevronRight className="ml-2" />
            </div>
            <Search className="w-2 h-2" /> Market Scoping
          </TabsTrigger>

          <TabsTrigger
            value="ppmp"
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
              2 <ChevronRight className="ml-2" />
            </div>
            <ScrollText className="w-2 h-2" />
            PPMP
          </TabsTrigger>

          <TabsTrigger
            value="app"
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
              3 <ChevronRight className="ml-2" />
            </div>
            <CalendarCheck2 className="w-2 h-2" />
            APP
          </TabsTrigger>

          <TabsTrigger
            value="pr"
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
              4 <ChevronRight className="ml-2" />
            </div>
            <ShoppingCart className="w-2 h-2" />
            Purchase Request
          </TabsTrigger>

          <TabsTrigger
            value="rfq"
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
              5 <ChevronRight className="ml-2" />
            </div>
            <FileSearchCorner className="w-2 h-2" />
            RFQ
          </TabsTrigger>

          <TabsTrigger
            value="apq"
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
              6 <ChevronRight className="ml-2" />
            </div>
            <Scale className="w-2 h-2" />
            APQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market-scoping">Market Scoping Content</TabsContent>

        <TabsContent value="ppmp">PPMP Content</TabsContent>

        <TabsContent value="app">APP Content</TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

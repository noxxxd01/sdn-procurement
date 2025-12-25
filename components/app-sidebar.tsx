"use client";

import * as React from "react";
import {
  AudioWaveform,
  Calendar,
  ChartColumnBig,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  ShoppingCart,
  Truck,
  Wallet,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Planning",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Market Scoping",
          url: "/market-scoping",
        },
        {
          title: "PPMP",
          url: "/ppmp",
        },
        {
          title: "APP",
          url: "#",
        },
      ],
    },
    {
      title: "Procurement",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Purchase Requests",
          url: "#",
        },
        {
          title: "RFQ",
          url: "#",
        },
        {
          title: "APQ",
          url: "#",
        },
      ],
    },
    {
      title: "Orders & Funds",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "PO / JO",
          url: "#",
        },
        {
          title: "ORS",
          url: "#",
        },
      ],
    },
    {
      title: "Delivery & Payment",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "Delivery & Inspection",
          url: "#",
        },
        {
          title: "Disbursement Voucher",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: ChartColumnBig,
      items: [
        {
          title: "Procurement Reports",
          url: "#",
        },
        {
          title: "Supplier Reports",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMainWithActive = data.navMain.map((item) => ({
    ...item,
    isActive:
      (item.title === "Dashboard" && pathname === "/dashboard") ||
      (item.title === "Planning" && pathname.includes("market-scoping")) ||
      (item.title === "Planning" && pathname.includes("ppmp")),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActive} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

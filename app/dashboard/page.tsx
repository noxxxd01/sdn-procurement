import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { HatGlasses, ShieldCheck, Laptop, Building2 } from "lucide-react";
import Link from "next/link";

const budgetCards = [
  {
    title: "Cybersecurity",
    slug: "cybersecurity",
    amount: 100000,
    progress: 70,
    icon: HatGlasses,
  },
  {
    title: "IT Modernization",
    slug: "it-modernization",
    amount: 350000,
    progress: 45,
    icon: Laptop,
  },
  {
    title: "Office Infrastructure",
    slug: "office-infrastructure",
    amount: 500000,
    progress: 60,
    icon: Building2,
  },
  {
    title: "Data Protection",
    slug: "data-protection",
    amount: 200000,
    progress: 85,
    icon: ShieldCheck,
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="grid grid-cols-4 gap-4 p-4">
          {budgetCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.slug}
                href={`dashboard/projects/${card.slug}`}
                className="block"
              >
                <Card className="shadow-none gap-0 hover:border-neutral-300 cursor-pointer transition">
                  <CardHeader>
                    <CardDescription>{card.title}</CardDescription>

                    <CardTitle className="text-2xl mt-4 font-bold">
                      PHP {card.amount.toLocaleString()}
                    </CardTitle>

                    <CardAction>
                      <div className="rounded-full">
                        <Icon className="w-4 h-4" />
                      </div>
                    </CardAction>
                  </CardHeader>

                  <CardContent>
                    <Progress value={card.progress} className="mt-4 w-full" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

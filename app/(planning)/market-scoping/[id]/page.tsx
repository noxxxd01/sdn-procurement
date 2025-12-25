/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// Polyfill for DOMMatrix - must be before react-pdf imports
if (typeof window !== "undefined" && !window.DOMMatrix) {
  (window as any).DOMMatrix = class DOMMatrix {
    constructor(init?: any) {
      this.a = 1;
      this.b = 0;
      this.c = 0;
      this.d = 1;
      this.e = 0;
      this.f = 0;
    }
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
  };
}

import { DashboardLayout } from "@/components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeCheckIcon, Printer } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Use dynamic version with .mjs extension
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export default function MSPage() {
  const params = useParams();
  const id = params.id as string;

  const [numPages, setNumPages] = useState<number>(0);

  const pdfUrl = `/pdfs/${id}.pdf`;

  const handlePrint = () => {
    window.open(pdfUrl, "_blank")?.print();
  };

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Market Scoping" }, { label: id, isActive: true }]}
    >
      <div className="flex w-full flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-2xl font-semibold">{id}</h2>
          <Badge
            variant="secondary"
            className="bg-green-500 text-white dark:bg-green-600"
          >
            <BadgeCheckIcon />
            Completed
          </Badge>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Select>
            <SelectTrigger className="w-45 shadow-none">
              <SelectValue placeholder="Update" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="apple">Completed</SelectItem>
                <SelectItem value="banana">In Progress</SelectItem>
                <SelectItem value="blueberry">Draft</SelectItem>
                <SelectItem value="grapes">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="shadow-none"
            onClick={handlePrint}
          >
            <Printer className="w-2 h-2" />
          </Button>
        </div>
      </div>
      <div className="border rounded-lg flex justify-center">
        <div className="flex flex-col items-center">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={1.6}
              />
            ))}
          </Document>
        </div>
      </div>
    </DashboardLayout>
  );
}

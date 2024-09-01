import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

import { PaperStatusContainer } from "@/components/Paper/PapersTable/PaperStatus/PaperStatus";
import { Button } from "@/components/ui/button";
import { Approval } from "@/interfaces";
import { ProfessorStatusFilter } from "../ProfessorStatusFilter/ProfessorStatusFilter";

export type ProfessorTable = {
  id: string;
  dateRange: string;
  themeName: string;
  category: string;
  approvals: Approval[];
  link: string;
  type: string;
  status: string;
};

export const professorDetailColumns: ColumnDef<ProfessorTable>[] = [
  {
    accessorKey: "dateRange",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-xs font-medium">{row.getValue("dateRange")}</span>
      );
    },
  },
  {
    accessorKey: "themeName",
    header: "Tema",
    cell: ({ row }) => {
      return (
        <span className="text-xs font-medium">{row.getValue("themeName")}</span>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const link = row.getValue("link") as string;
      const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        window.open(link, "_blank");
      };

      return (
        <Button variant="link" className="pl-0 text-sm" onClick={handleClick}>
          {link}
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categorias",
    cell: ({ row }) => {
      return <span className="text-xs">{row.getValue("category")}</span>;
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      return <span className="text-xs">{row.getValue("type")}</span>;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <ProfessorStatusFilter
          onChange={(value) => {
            column.setFilterValue(value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      const paper = row.original;
      return <PaperStatusContainer approvals={paper?.approvals} />;
    },
  },
];

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { PaperActions } from "../PaperActions/PaperActions";
import { PaperStatusContainer } from "../PaperStatus/PaperStatus";
import { Approval } from "@/interfaces";

export type PaperTable = {
  id: string;
  dateRange: string;
  orientee: string;
  title: string;
  link: string;
  approvals: Approval[];
  type: "PTCC" | "TCC";
};

export const paperColumns: ColumnDef<PaperTable>[] = [
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
    accessorKey: "orientee",
    header: "Orientando",
    cell: ({ row }) => {
      return <span className="text-xs">{row.getValue("orientee")}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Titulo",
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue("title")}</span>;
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
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      return <span className="text-xs">{row.getValue("type")}</span>;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: () => {
      return <span className="block w-full text-center">Status</span>;
    },
    cell: ({ row }) => {
      const paper = row.original;
      return <PaperStatusContainer approvals={paper?.approvals} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const paper = row.original;
      return <PaperActions paperId={paper.id} approvals={paper.approvals} />;
    },
  },
];

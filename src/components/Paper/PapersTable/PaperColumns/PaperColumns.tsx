import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DocumentCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type PaperTable = {
  id: string;
  dateRange: string;
  orientee: string;
  title: string;
  link: string;
  approved: boolean;
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
    header: "Status",
    cell: ({ row }) => {
      const paper = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {paper?.approved ? (
                <DocumentCheckIcon className="w-5" />
              ) : (
                <DocumentTextIcon className="w-5" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              {paper?.approved ? (
                <span>Aprovado</span>
              ) : (
                <span>Em Andamento</span>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem>Detalhes</DropdownMenuItem>
            <DropdownMenuItem>Submeter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DashboardActions } from "../DashboardActions/DashboardActions";

export type DashboardTable = {
  id: string;
  name: string;
  enrollment: string;
  email: string;
  tccCount: number;
  ptccCount: number;
  themeCount: number;
  active: boolean;
};

export const dashboardColumns: ColumnDef<DashboardTable>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-xs font-medium">{row.getValue("name")}</span>
      );
    },
  },
  {
    accessorKey: "enrollment",
    header: "Matrícula",
    cell: ({ row }) => {
      return <span className="text-xs">{row.getValue("enrollment")}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue("email")}</span>;
    },
  },
  {
    accessorKey: "tccCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TCC <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium block text-center max-w-[6rem]">
          {row.getValue("tccCount")}
        </span>
      );
    },
  },
  {
    accessorKey: "ptccCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PTCC <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium block text-center max-w-[6rem]">
          {row.getValue("ptccCount")}
        </span>
      );
    },
  },
  {
    accessorKey: "themeCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Temas <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium block text-center max-w-[6rem]">
          {row.getValue("themeCount")}
        </span>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: () => {
      return <span className="block w-full text-center">Status</span>;
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <span className="block text-center max-w-[6rem]">
          {user.active ? "Ativo" : "Inativo"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <DashboardActions email={user.email} id={user.id} />;
    },
  },
];

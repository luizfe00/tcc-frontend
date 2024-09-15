import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ProfessorsStatusColumn } from "./ProfessorStatusColumn/ProfessorsStatusColumn";
import { ProfessorActions } from "./ProfessorActions/ProfessorActions";

export type ProfessorsTableColumns = {
  id: string;
  name: string;
  enrollment: string;
  email: string;
  tccCount: number;
  ptccCount: number;
  themeCount: number;
  active: boolean;
};

export const professorsTableColumns: ColumnDef<ProfessorsTableColumns>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      return <ProfessorsStatusColumn active={user.active} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <ProfessorActions email={user.email} id={user.id} />;
    },
  },
];

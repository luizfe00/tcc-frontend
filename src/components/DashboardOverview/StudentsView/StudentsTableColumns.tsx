import { ColumnDef } from "@tanstack/react-table";
import { StudentsActions } from "./StudentsActions/StudentsActions";
import { Checkbox } from "@/components/ui/checkbox";

export interface StudentsTableColumns {
  name: string;
  email: string;
  enrollment: string;
  theme: string;
  paperStatus: string;
  status: string;
}

export const studentsTableColumns: ColumnDef<StudentsTableColumns>[] = [
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
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "enrollment",
    header: "Matrícula",
  },
  {
    accessorKey: "theme",
    header: "Tema Cadastrado",
  },
  {
    accessorKey: "paper",
    header: "Trabalho",
    cell: ({ row }) => {
      return <span className="text-xs">{row.original.paperStatus}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return <StudentsActions email={row.original.email} />;
    },
  },
];

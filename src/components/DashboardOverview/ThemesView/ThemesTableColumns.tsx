import { PaperType, User } from "@/interfaces";
import { ColumnDef, FilterFn } from "@tanstack/react-table";

export type ThemesTable = {
  id: string;
  active: boolean;
  type?: PaperType;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  label: string;
  summary: string;
  owner: Partial<User>;
};

const ownerFilterFn: FilterFn<ThemesTable> = (
  row,
  columnId,
  filterValue: string
) => {
  const owner = row.getValue(columnId) as Partial<User>;
  if (owner?.name) {
    return owner.name.toLowerCase().includes(filterValue.toLowerCase());
  }
  if (owner?.email) {
    return owner.email.toLowerCase().includes(filterValue.toLowerCase());
  }
  return false;
};

export const papersTableColumns: ColumnDef<ThemesTable>[] = [
  {
    accessorKey: "active",
    header: "Tipo",
    cell: ({ row }) => {
      const { active } = row.original;
      return (
        <span className="text-sm font-medium">
          {active ? "Ativo" : "Inativo"}
        </span>
      );
    },
  },
  {
    accessorKey: "label",
    header: "Tema",
    cell: ({ row }) => {
      return (
        <span className="text-sm font-medium">{row.getValue("label")}</span>
      );
    },
    filterFn: ownerFilterFn,
  },
  {
    accessorKey: "summary",
    header: "Resumo",
    cell: ({ row }) => {
      return (
        <span className="text-sm font-medium">{row.getValue("summary")}</span>
      );
    },
  },
  {
    accessorKey: "owner",
    header: "Proprietário",
    cell: ({ row }) => {
      const { owner } = row.original;
      return <span className="text-sm font-medium">{owner.name}</span>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Início",
    cell: ({ row }) => {
      const { startDate } = row.original;
      return <span className="text-sm font-medium">{startDate}</span>;
    },
  },
  {
    accessorKey: "endDate",
    header: "Fim",
    cell: ({ row }) => {
      const { endDate } = row.original;
      return <span className="text-sm font-medium">{endDate}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <span className="text-sm font-medium">{createdAt}</span>;
    },
  },
];

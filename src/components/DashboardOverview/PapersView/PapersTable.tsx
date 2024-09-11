import { PaperType, User, Theme } from "@/interfaces";
import { formatDate } from "@/utils/DateUtil";
import { ColumnDef, FilterFn } from "@tanstack/react-table";

export type PapersTable = {
  id: string;
  status: string;
  documentUrl: string;
  type: PaperType;
  createdAt: string;
  updatedAt: string;
  advisor: Partial<User>;
  orientee: Partial<User>;
  theme: Partial<Theme>;
};

const themeFilterFn: FilterFn<PapersTable> = (
  row,
  columnId,
  filterValue: string
) => {
  return (
    (row.getValue(columnId) as Partial<Theme>)?.label
      ?.toLowerCase()
      .includes(filterValue.toLowerCase()) ?? true
  );
};

export const papersTableColumns: ColumnDef<PapersTable>[] = [
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const { type } = row.original;
      return <span className="text-sm font-medium">{type}</span>;
    },
  },
  {
    accessorKey: "theme",
    header: "Tema",
    cell: ({ row }) => {
      const { theme } = row.original;
      return <span className="text-sm font-medium">{theme.label}</span>;
    },
    filterFn: themeFilterFn,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return <span className="text-sm font-medium">{status}</span>;
    },
  },
  {
    accessorKey: "advisor",
    header: "Orientador",
    cell: ({ row }) => {
      const { advisor } = row.original;
      return <span className="text-sm font-medium">{advisor.name}</span>;
    },
  },
  {
    accessorKey: "orientee",
    header: "Orientando",
    cell: ({ row }) => {
      const { orientee } = row.original;
      return <span className="text-sm font-medium">{orientee.name}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <span className="text-sm font-medium">{formatDate(createdAt)}</span>
      );
    },
  },
];

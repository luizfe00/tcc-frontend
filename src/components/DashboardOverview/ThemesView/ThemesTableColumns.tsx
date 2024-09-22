import { PaperType, User } from "@/interfaces";
import { DashboardStore } from "@/stores/dashboard/dashboard.store";
import { cn } from "@/utils";
import { formatDate } from "@/utils/DateUtil";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { isPast, isWithinInterval, subDays } from "date-fns";

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
    accessorKey: "endDate",
    header: "Fim",
    cell: ({ row }) => {
      const { endDate } = row.original;
      const interval = DashboardStore.getState().reminderDaysBefore;
      const isThisWeek =
        isPast(new Date(endDate)) ||
        isWithinInterval(new Date(endDate), {
          start: subDays(new Date(), interval),
          end: new Date(),
        });
      return (
        <span
          className={cn("text-sm font-medium", isThisWeek && "text-red-600")}
        >
          {formatDate(endDate)}
        </span>
      );
    },
  },
  {
    accessorKey: "active",
    header: "Tipo",
    cell: ({ row }) => {
      const { active } = row.original;
      return (
        <span className="text-sm font-medium">
          {active ? "Atribuído" : "Disponível"}
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
      return (
        <span className="text-sm font-medium">{formatDate(startDate)}</span>
      );
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

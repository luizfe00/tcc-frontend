import { PaperType } from "@/interfaces";
import { DashboardStore } from "@/stores/dashboard/dashboard.store";
import { cn } from "@/utils";
import { formatDate } from "@/utils/DateUtil";
import { ColumnDef } from "@tanstack/react-table";
import { isPast, isWithinInterval, subDays } from "date-fns";

export type PapersTable = {
  id: string;
  status: string;
  documentUrl: string;
  type: PaperType;
  createdAt: string;
  updatedAt: string;
  endDate: string;
  advisorName: string;
  advisorEmail: string;
  orienteeName: string;
  orienteeEmail: string;
  themeLabel: string;
};

export const papersTableColumns: ColumnDef<PapersTable>[] = [
  {
    accessorKey: "endDate",
    header: "Data de entrega",
    cell: ({ row }) => {
      const { endDate } = row.original;
      if (!endDate)
        return <span className="text-sm font-medium">Não definido</span>;
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
      const { themeLabel } = row.original;
      return <span className="text-sm font-medium">{themeLabel}</span>;
    },
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
      const { advisorName, advisorEmail } = row.original;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{advisorName}</span>
          <span className="text-sm text-muted-foreground">{advisorEmail}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "orientee",
    header: "Orientando",
    cell: ({ row }) => {
      const { orienteeName, orienteeEmail } = row.original;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{orienteeName}</span>
          <span className="text-sm text-muted-foreground">{orienteeEmail}</span>
        </div>
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

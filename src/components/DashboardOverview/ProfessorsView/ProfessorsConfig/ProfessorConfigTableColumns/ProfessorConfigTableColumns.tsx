import { ColumnDef } from "@tanstack/react-table";
import { ProfessorsStatusColumn } from "../../ProfessorStatusColumn/ProfessorsStatusColumn";

export type ProfessorsConfigTableColumns = {
  academicUnitCode: number;
  registration: number;
  status: string;
  titration: string;
  active: boolean;
};

export const professorsConfigTableColumns: ColumnDef<ProfessorsConfigTableColumns>[] =
  [
    {
      accessorKey: "academicUnitCode",
      header: "Código da Unidade Acadêmica",
    },
    {
      accessorKey: "registration",
      header: "Matrícula",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "titration",
      header: "Titulação",
    },
    {
      accessorKey: "active",
      header: "Ativo",
      cell: ({ row }) => {
        const user = row.original;
        return <ProfessorsStatusColumn active={user.active} hideLabel />;
      },
    },
  ];

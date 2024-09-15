import { ColumnDef } from "@tanstack/react-table";

export interface StudentsTableColumns {
  name: string;
  email: string;
  enrollment: string;
  period: string;
}

export const studentsTableColumns: ColumnDef<StudentsTableColumns>[] = [
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
];

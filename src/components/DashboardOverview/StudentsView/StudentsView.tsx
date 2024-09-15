import { TableContainer } from "@/components/Table/TableContainer";
import { Card, CardContent } from "@/components/ui/card";
import {
  StudentsTableColumns,
  studentsTableColumns,
} from "./StudentsTableColumns";
import { Table } from "@tanstack/react-table";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";

export const StudentsView = () => {
  const studentsFilters = useCallback(
    (
      table: Table<StudentsTableColumns>,
      globalFilter: string,
      onGlobalFilterChange: (value: string) => void
    ) => {
      return (
        <Input
          placeholder="Filtrar alunos..."
          value={globalFilter}
          onChange={(event) => onGlobalFilterChange(event.target.value)}
          className="max-w-sm"
        />
      );
    },
    []
  );

  return (
    <Card>
      <CardContent className="py-4">
        <TableContainer
          columns={studentsTableColumns}
          data={[]}
          filters={studentsFilters}
        />
      </CardContent>
    </Card>
  );
};

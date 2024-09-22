import { TableContainer } from "@/components/Table/TableContainer";
import { Card, CardContent } from "@/components/ui/card";
import {
  StudentsTableColumns,
  studentsTableColumns,
} from "./StudentsTableColumns";
import { Table } from "@tanstack/react-table";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prerequistes } from "./Prerequisites/Prerequistes";

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
    <Card className="w-full max-w-6xl">
      <CardContent className="py-4">
        <Tabs defaultValue="students">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="students">Alunos</TabsTrigger>
            <TabsTrigger value="prerequisites">Pré-requisitos</TabsTrigger>
          </TabsList>
          <TabsContent value="students">
            <TableContainer
              columns={studentsTableColumns}
              data={[]}
              filters={studentsFilters}
            />
          </TabsContent>
          <TabsContent value="prerequisites">
            <Prerequistes />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

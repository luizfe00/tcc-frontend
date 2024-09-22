import { TableContainer } from "@/components/Table/TableContainer";
import { Card, CardContent } from "@/components/ui/card";
import {
  StudentsTableColumns,
  studentsTableColumns,
} from "./StudentsTableColumns";
import { Table } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prerequistes } from "./Prerequisites/Prerequistes";
import { getStudents } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { StudentsTableGlobalActions } from "./StudentsActions/StudentsActions";
import { getPaperStatus } from "@/utils/PaperUtil";

export const StudentsView = () => {
  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const studentsFilters = useCallback(
    (
      table: Table<StudentsTableColumns>,
      globalFilter: string,
      onGlobalFilterChange: (value: string) => void
    ) => {
      const showAction =
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate");
      return (
        <div className="flex justify-between items-center w-full">
          <Input
            placeholder="Filtrar professores..."
            value={globalFilter}
            onChange={(event) => onGlobalFilterChange(event.target.value)}
            className="max-w-sm"
          />
          {showAction && (
            <StudentsTableGlobalActions
              students={table
                .getSelectedRowModel()
                .rows.map((row) => row.original)}
            />
          )}
        </div>
      );
    },
    []
  );

  const studentsData: StudentsTableColumns[] = useMemo(() => {
    if (!students) return [];
    return students?.map((student) => ({
      id: student.id,
      name: student.name,
      email: student.email,
      enrollment: student.enrollment,
      theme: student?.themes?.[0]?.label || "",
      paperStatus: getPaperStatus(student?.papers?.[0]?.approvals || []).label,
      status: "Aprovado",
    }));
  }, [students]);

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
              data={studentsData}
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

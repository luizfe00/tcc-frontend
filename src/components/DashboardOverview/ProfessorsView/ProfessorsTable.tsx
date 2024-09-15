import { TableContainer } from "@/components/Table/TableContainer";
import { getDashboardData } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import {
  ProfessorsTableColumns,
  professorsTableColumns,
} from "./ProfessorsTableColumns";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ProfessorTableGlobalActions } from "./ProfessorActions/ProfessorActions";

export const ProfessorsTable = () => {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  const dashboardTableData = useMemo(() => {
    if (!data) return [];
    const dashboardData: ProfessorsTableColumns[] =
      data.papers.professorPaperBI.map((item) => {
        const professor = data.themes.professorThemeStats.find(
          (professor) => professor.professorEmail === item.professorEmail
        );

        return {
          active: true,
          email: item.professorEmail,
          enrollment: professor?.professorEnrollment ?? "",
          id: professor?.professorId ?? "",
          name: item.professorName,
          ptccCount: item.ptccCount,
          tccCount: item.tccCount,
          themeCount: professor?.totalThemes ?? 0,
        };
      });

    return dashboardData;
  }, [data]);

  const professorsFilters = useCallback(
    (
      table: Table<ProfessorsTableColumns>,
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
            <ProfessorTableGlobalActions
              professors={table
                .getSelectedRowModel()
                .rows.map((row) => row.original)}
            />
          )}
        </div>
      );
    },
    []
  );

  return (
    <TableContainer
      columns={professorsTableColumns}
      data={dashboardTableData}
      filters={professorsFilters}
    />
  );
};

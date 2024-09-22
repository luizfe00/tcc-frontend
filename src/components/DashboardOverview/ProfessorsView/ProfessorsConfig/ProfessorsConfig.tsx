import { TableContainer } from "@/components/Table/TableContainer";
import { getProfessors } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import {
  ProfessorsConfigTableColumns,
  professorsConfigTableColumns,
} from "./ProfessorConfigTableColumns/ProfessorConfigTableColumns";
import { useCallback, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

export const ProfessorsConfig = () => {
  const { data } = useQuery({
    queryKey: ["dashboard-professors"],
    queryFn: getProfessors,
  });

  const professorsFilters = useCallback(
    (
      table: Table<ProfessorsConfigTableColumns>,
      globalFilter: string,
      onGlobalFilterChange: (value: string) => void
    ) => {
      return (
        <div className="flex justify-between items-center w-full">
          <Input
            placeholder="Filtrar professores..."
            value={globalFilter}
            onChange={(event) => onGlobalFilterChange(event.target.value)}
            className="max-w-sm"
          />
        </div>
      );
    },
    []
  );

  const professorsConfigData: ProfessorsConfigTableColumns[] = useMemo(() => {
    if (!data) return [];
    return data
      .map((professor) => ({
        academicUnitCode: professor.academicUnitCode,
        registration: professor.registration,
        status: professor.status,
        titration: professor.titration,
        active: true,
      }))
      .filter((professor) => professor.status === "ATIVO");
  }, [data]);

  return (
    <TableContainer
      columns={professorsConfigTableColumns}
      data={professorsConfigData}
      filters={professorsFilters}
    />
  );
};

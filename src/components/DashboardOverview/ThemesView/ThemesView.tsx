import { TableContainer } from "@/components/Table/TableContainer";
import { Card, CardContent } from "@/components/ui/card";
import { getThemes } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { papersTableColumns, ThemesTable } from "./ThemesTableColumns";
import { useCallback, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { addDays } from "date-fns";
import { useNavigate } from "react-router-dom";

export const ThemesView = () => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["dashboard-themes"],
    queryFn: getThemes,
  });

  const tableData: ThemesTable[] = useMemo(() => {
    if (!data) return [];
    return data?.map((theme) => ({
      id: theme.id,
      active: theme?.paper ? true : false,
      type: theme?.paper ? theme.paper?.type : undefined,
      createdAt: theme.createdAt,
      updatedAt: theme.updatedAt,
      startDate: theme.startDate,
      endDate: addDays(theme.startDate, theme.duration).toISOString(),
      label: theme.label,
      summary: theme.summary,
      owner: theme.owner,
    }));
  }, [data]);

  const paperFilters = useCallback(
    (
      table: Table<ThemesTable>,
      globalFilter: string,
      onGlobalFilterChange: (value: string) => void
    ) => {
      return (
        <Input
          placeholder="Filtrar temas..."
          value={globalFilter}
          onChange={(event) => onGlobalFilterChange(event.target.value)}
          className="max-w-sm"
        />
      );
    },
    []
  );

  const handleRowClick = (row: ThemesTable) => {
    console.log(row);
    navigate(`/dashboard/papers?search=${row?.label}`);
  };

  return (
    <Card>
      <CardContent className="py-4">
        <TableContainer
          columns={papersTableColumns}
          data={tableData}
          filters={paperFilters}
          onRowClick={handleRowClick}
          rowClassName="cursor-pointer"
        />
      </CardContent>
    </Card>
  );
};

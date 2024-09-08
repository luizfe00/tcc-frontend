import { TableContainer } from "@/components/Table/TableContainer";
import { Card, CardContent } from "@/components/ui/card";
import { getPapers } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { PapersTable, papersTableColumns } from "./PapersTable";
import { useCallback, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

export const PapersView = () => {
  const { data } = useQuery({
    queryKey: ["dashboard-papers"],
    queryFn: getPapers,
  });

  const tableData: PapersTable[] = useMemo(() => {
    if (!data) return [];
    return data.map((paper) => ({
      id: paper.id,
      theme: paper.theme,
      status: paper.status,
      advisor: paper.advisor,
      orientee: paper.orientee,
      createdAt: paper.createdAt,
      documentUrl:
        paper.type === "PTCC"
          ? paper?.ptccDocumentUrl || ""
          : paper?.tccDocumentUrl || "",
      type: paper.type,
      updatedAt: paper.updatedAt,
    }));
  }, [data]);

  const paperFilters = useCallback((table: Table<PapersTable>) => {
    return (
      <Input
        placeholder="Filtrar titulos..."
        value={(table.getColumn("theme")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("theme")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    );
  }, []);

  return (
    <Card>
      <CardContent className="py-4">
        <div>
          <h1>Trabalhos</h1>
          <div>
            <TableContainer
              columns={papersTableColumns}
              data={tableData}
              filters={paperFilters}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

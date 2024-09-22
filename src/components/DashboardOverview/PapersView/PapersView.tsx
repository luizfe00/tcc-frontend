import { TableContainer } from "@/components/Table/TableContainer";
import { Card, CardContent } from "@/components/ui/card";
import { getPapers } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { PapersTable, papersTableColumns } from "./PapersTable";
import { useCallback, useMemo, useState } from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { PendingApprovalsList } from "@/components/Approvals/PendingApprovalsList/PendingApprovalsList";

export const PapersView = () => {
  const { data } = useQuery({
    queryKey: ["dashboard-papers"],
    queryFn: getPapers,
  });

  const [paperFilter, setPaperFilter] = useState("");

  const tableData: PapersTable[] = useMemo(() => {
    if (!data) return [];
    return data.map((paper) => ({
      id: paper.id,
      themeLabel: paper.theme?.label || "",
      status: paper.status,
      advisorName: paper.advisor?.name || "",
      advisorEmail: paper.advisor?.email || "",
      orienteeName: paper.orientee?.name || "",
      orienteeEmail: paper.orientee?.email || "",
      createdAt: paper.createdAt,
      orientee: paper.orientee,
      endDate: paper.theme?.endDate || "",
      documentUrl:
        paper.type === "PTCC"
          ? paper?.ptccDocumentUrl || ""
          : paper?.tccDocumentUrl || "",
      type: paper.type,
      updatedAt: paper.updatedAt,
    }));
  }, [data]);

  const papersFilters = useCallback(
    (
      table: Table<PapersTable>,
      globalFilter: string,
      onGlobalFilterChange: (value: string) => void
    ) => {
      return (
        <Input
          placeholder="Filtrar trabalhos..."
          value={globalFilter}
          onChange={(event) => {
            onGlobalFilterChange(event.target.value);
            setPaperFilter(event.target.value);
          }}
          className="max-w-sm"
        />
      );
    },
    []
  );

  return (
    <Card>
      <CardContent className="py-4">
        <PendingApprovalsList filter={paperFilter} horizontal />
        <TableContainer
          columns={papersTableColumns}
          data={tableData}
          filters={papersFilters}
        />
      </CardContent>
    </Card>
  );
};

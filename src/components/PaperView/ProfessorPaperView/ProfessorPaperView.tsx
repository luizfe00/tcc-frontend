import {
  paperColumns,
  PaperTable,
} from "@/components/Paper/PapersTable/PaperColumns/PaperColumns";
import { PaperDataTable } from "@/components/Paper/PapersTable/PaperData/PaperData";
import { Separator } from "@/components/ui/separator";
import { Paper } from "@/interfaces";
import { formatDate } from "@/utils/DateUtil";
import { addDays, format } from "date-fns";
import { useMemo } from "react";

export interface ProfessorPaperViewProps {
  papers?: Paper[];
}

export const ProfessorPaperView = ({
  papers = [],
}: ProfessorPaperViewProps) => {
  const paperDataTable = useMemo(() => {
    const dataTable: PaperTable[] = papers.map((paper) => ({
      dateRange: `de ${formatDate(paper.theme?.startDate)} até ${format(
        addDays(paper.theme?.startDate ?? "", paper.theme?.duration ?? 30),
        "dd/MM/yyyy"
      )}`,
      id: paper.id ?? "",
      link:
        paper.type === "PTCC"
          ? paper.ptccDocumentUrl ?? ""
          : paper.tccDocumentUrl ?? "",
      orientee: `${paper.orientee?.name} - ${paper.orientee?.email}`,
      title: paper.theme?.label ?? "",
      type: paper.type,
      approvals: paper?.approvals ?? [],
    }));

    return dataTable;
  }, [papers]);

  return (
    <>
      <div className="mb-4">
        <span className="text-gray-600 font-semibold">Aguardando Resposta</span>
        <Separator className="mt-1" />
      </div>
      <PaperDataTable columns={paperColumns} data={paperDataTable} />
    </>
  );
};

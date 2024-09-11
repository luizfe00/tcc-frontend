import {
  paperColumns,
  PaperTable,
} from "@/components/Paper/PapersTable/PaperColumns/PaperColumns";
import { PaperDataTable } from "@/components/Paper/PapersTable/PaperData/PaperData";
import { PendingStageCard } from "@/components/Stage/PendingStageCard/PendingStageCard";
import { Separator } from "@/components/ui/separator";
import { Paper } from "@/interfaces";
import { getPendingFeedback } from "@/services/stageService";
import { useQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import dayjs from "dayjs";
import { useMemo } from "react";

export interface ProfessorPaperViewProps {
  papers?: Paper[];
}

export const ProfessorPaperView = ({
  papers = [],
}: ProfessorPaperViewProps) => {
  const { data: pendingFeedback } = useQuery({
    queryKey: ["pendingFeedback"],
    queryFn: getPendingFeedback,
  });

  const paperDataTable = useMemo(() => {
    const dataTable: PaperTable[] = papers.map((paper) => ({
      dateRange: `de ${dayjs(paper.theme?.startDate).format(
        "DD/MM/YYYY"
      )} até ${format(
        addDays(paper.theme?.startDate ?? "", paper.theme?.duration ?? 30),
        "dd/MM/yyyy"
      )}`,
      id: paper.id ?? "",
      link: paper.documentUrl ?? "",
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
      <div className="flex flex-wrap gap-2 mb-4">
        {pendingFeedback?.map((stage) => (
          <PendingStageCard key={stage.id} stage={stage} />
        ))}
      </div>
      <PaperDataTable columns={paperColumns} data={paperDataTable} />
    </>
  );
};
